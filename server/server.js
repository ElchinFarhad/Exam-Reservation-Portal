'use strict'

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao.js');
const userDao = require('./user_dao');

const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors=require('cors');



const jwtSecret = '5amL4MARAbG49hcXf5GIYASvkDICiUAR6EDrZBR5dLdwW7hMzUjjMUe9t6M5kSAYVEL';
const expireTime = 3000; //seconds
// Authorization error
const authErrorObj = { errors: [{  'param': 'Server', 'msg': 'Authorization error' }] };

//create app
const app = express();
const PORT = 3001;
app.use(cors());


//set up logging
app.use(morgan('tiny'));

// Process body content
app.use(express.json());



// Authentication endpoint
app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  userDao.getUser(username)
    .then((user) => {

      if(user === undefined) {
          res.status(409).send({
              errors: [{ 'param': 'Server', 'msg': 'Invalid username' }] 
            });
      } else {
          if(!userDao.checkPassword(user, password)){
              res.status(401).send({
                  errors: [{ 'param': 'Server', 'msg': 'Wrong password' }] 
                });
          } else {
              //AUTHENTICATION SUCCESS
              const token = jsonwebtoken.sign({ user: user.name }, jwtSecret, {expiresIn: expireTime});
              res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000*expireTime });
              res.json(user);
          }
      } 
    }).catch(

      // Delay response when wrong user/pass is sent to avoid fast guessing attempts
      (err) => {
          new Promise((resolve) => {setTimeout(resolve, 1000)}).then(() => res.status(401).json(authErrorObj))
      }
    );
});


app.use(cookieParser());

// logout
app.post('/api/logout', (req, res) => {
  res
    .clearCookie('token')
    .end();
});

/////////////////////// *******************  Public students server
app.get('/api/studentLogin/:sid', (req, res) => {
  userDao.getStudentById(req.params.sid)
    .then((student) => res.json(student))
    .catch(() => res.status(500).send({
      errors: [{ 'param': 'Server', 'msg': 'Invalid username' }] 
    }));
});





//Student cancel booked slot
app.post('/api/student/cancelBookedSlot', (req, res) => {
  const SlotID = req.body.SlotID;
  dao.cancelBookedSlot(SlotID).then( (ok) => {
    res.status(200).end();
  }).catch( error => {
    res.status(502).json(error);
  });
});

///////
app.post('/api/teacher/insertSlot', (req, res) => {
  const slot = req.body;
  dao.createSlot(slot).then((ok) => {
      res.status(200).end();
  }).catch( error => {
      res.status(502).json(error);
  });
});



//getting all student list
app.get('/api/student/portal', (req, res) => {
  dao
    .listStudents()
    .then((boards) => res.json(boards))
    .catch(() => res.status(500).end())
});

//Student get all available slots for choosen course
app.get('/api/student/listAvailableSlots/:TID', (req, res) => {
  dao.listAvailableSlots(req.params.TID)
    .then((slots) => {res.json(slots);})
    .catch(() => {res.status(500).end();});
});

//Student get all available slots for choosen course
app.get('/api/student/checkStudentBookAccess/:TID/:SID', (req, res) => {
  dao.checkStudentBookAccess(req.params.TID, req.params.SID)
    .then((slots) => {res.json(slots);})
    .catch(() => {res.status(500).end();});
});



app.get('/api/student/listRegisteredSlots/:SID', (req, res) => {
  dao.listRegisteredSlots(req.params.SID)
    .then((slots) => {res.json(slots);})
    .catch(() => {res.status(500).end();});
});

app.get('/api/student/getStudentName/:SID', (req, res) => {
  dao.getStudentName(req.params.SID)
    .then((slots) => {res.json(slots);})
    .catch(() => {res.status(500).end();});
});

app.get('/api/student/getRegisteredCourses/:SID', (req, res) => {
  dao.getRegisteredCourses(req.params.SID)
    .then((courses) => {res.json(courses);})
    .catch(() => {courses.status(500).end();});
});

//Student book avaialble slot
app.post('/api/student/bookAvailableSlot', (req, res) => {
  const ReservedStudent=req.body.ReservedStudent
  const SlotID = req.body.SlotID;
  dao.bookAvailableSlot(ReservedStudent, SlotID).then( (ok) => {
    res.status(200).end();
  }).catch( error => {
    res.status(502).json(error);
  });
});



////////////////++++++++++++++++++++++++++






// For the rest of the code, all APIs require authentication
app.use(jwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
  getToken: req => req.cookies.token
}));

app.get('/api/teacher/getTeacherId/:name', (req, res) => {
  dao.getTeacherId(req.params.name)
    .then((students) => {res.json(students);})
    .catch(() => {res.status(500).end();});
});

// AUTHENTICATED REST API endpoints
//GET /user
app.get('/api/teacher/auth', (req,res) => {
  const user = req.user && req.user.user;
  userDao.getUser(user)
      .then((user) => {
          res.json({id: user.id, name: user.name});
      }).catch(
      (err) => {
       res.status(401).json(authErrorObj);
      }
    );
});


app.post('/api/teacher/updateCheckedStudents', (req, res) => {
  const SID = req.body;
  const TID=req.body.TID
  dao.updateCheckedStudent(SID, TID).then( (ok) => {
    res.status(200).end();
  }).catch( error => {
    res.status(502).json(error);
  });
});

//update student grade in Slot
app.post('/api/teacher/updateStudentGrade', (req, res) => {
  const Grade = req.body.Grade;
  const Attendance=req.body.Attendance
  const TeacherID = req.body.TeacherID;
  const ReservedStudent=req.body.ReservedStudent
  dao.updateStudentGrade(Grade, Attendance, TeacherID, ReservedStudent).then( (ok) => {
    res.status(200).end();
  }).catch( error => {
    res.status(502).json(error);
  });
});

app.get('/api/teacher/allStudentlist/:tid', (req, res) => {
  dao.listAllStudents(req.params.tid)
    .then((students) => res.json(students))
    .catch(() => res.status(500).end());
});

app.get('/api/teacher/getStList/:tid', (req, res) => {
  dao.listAllPublicStudents(req.params.tid)
    .then((students) => {res.json(students);})
    .catch(() => {res.status(500).end();});
});

///////////////+++++++++++++++++++++++++

app.get('/api/teacher/listReservedSlots/:TID', (req, res) => {
  dao.listReservedSlots(req.params.TID)
    .then((slots) => {res.json(slots);})
    .catch(() => {res.status(500).end();});
});

//overview slots registered by students
app.get('/api/teacher/overviewReservedSlots/:TID', (req, res) => {
  dao.overviewReservedSlots(req.params.TID)
    .then((slots) => {res.json(slots);})
    .catch(() => {res.status(500).end();});
})


app.get('/api/teacher/checkedStudentlist/:tid', (req, res) => {
  dao.listCheckedStudents(req.params.tid)
    .then((students) => res.json(students))
    .catch(() => res.status(500).end());
});


//Resources: Teachers, Students, Courses GET /teacher
app.get('/api/teacher/portal', (req, res) => {
  dao
    .listTeachers()
    .then((boards) => res.json(boards))
    .catch(() => res.status(500).end())
});



// To return a better object in case of errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .send({msg: 'UnauthorizedError'});
  }
});

///////////////**************************************************************/////////







// GET /student/<student_id> activate web server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));