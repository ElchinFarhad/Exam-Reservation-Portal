'use strict'

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/scheduling.db', (err) => {
});

exports.listTeachers = function () {
  return new Promise((resolve, reject) => {
    const sql = 'select * from Teachers';
    db.all(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      const boards = rows.map((row) => ({name: row.name, id: row.id}));
      resolve(boards);
    });
  });
};

exports.getUserById = function (id) {
  return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Teachers WHERE name = ?"
      db.all(sql, [id], (err, rows) => {
          if (err) 
              reject(err);
          else if (rows.length === 0)
              resolve(undefined);
          else{
              const user = createUser(rows[0]);
              resolve(user);
          }
      });
  });
};

exports.listAllStudents = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT Student_Teacher.StudentName FROM Student_Teacher where TID=? and Checked=0"
    db.all(sql, [id], (err, rows) => {
      if (err) {
        throw err;
      }
        const students =  rows.map((row) => ({name: row.StudentName}));
        resolve(students);
      
    });
  });
};

exports.listAllPublicStudents = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from Students where CID=?"
    db.all(sql, [id], (err, rows) => {
      if (err) {
        throw err;
      }
        const students =  rows.map((row) => ({name: row.name}));
        resolve(students);
      
    });
  });
};

////////////+++++++++++++++++++++STUDENT Book available slot
exports.bookAvailableSlot = function(ReservedStudent, id) {
  return new Promise((resolve, reject) => {
      const sql = 'update Slot set ReservedStudent=? where ROWID=?';
      db.run(sql, [ReservedStudent, id], (err) => {
          if(err){
              reject(err);
          }
          else
              resolve(this.SlotID);
      })
  });
}


////////////+++++++++++++++++++++GET TEACHER ID 
exports.getTeacherId = function (name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT TID from Teachers where name=?"
    db.all(sql, [name], (err, rows) => {
      if (err) {
        throw err;
      }
        const students =  rows.map((row) => ({courseId: row.TID}));
        resolve(students);
      
    });
  });
};


// Teacher see reserved slot list by students for executing 
exports.listReservedSlots = function (TID) {
  return new Promise((resolve, reject) => {
    const sql = "select * from Slot where Slot.TeacherID=? AND (Slot.Grade IS NULL OR Slot.Grade = '') AND (Slot.Attendance IS NULL OR Slot.Attendance = '') AND  (Slot.ReservedStudent IS NOT NULL AND Slot.ReservedStudent <> '')"
    db.all(sql, [TID], (err, rows) => {
      if (err) {
        throw err;
      }
        const courses =  rows.map((row) => ({SlotID: row.SlotID, TeacherID: row.TeacherID, StartDate: row.StartDate, StartTime: row.StartTime, Duration: row.Duration, ReservedStudent: row.ReservedStudent, Attendance: row.Attendance, Grade: row.Grade}));
        resolve(courses);
      
    });
  });
};

//Teacher Overview list of slots registered by students 
exports.overviewReservedSlots = function (TID) {
  return new Promise((resolve, reject) => {
    const sql = "select * from Slot where Slot.TeacherID=? AND (Slot.ReservedStudent IS NOT NULL AND Slot.ReservedStudent <> '')"
    db.all(sql, [TID], (err, rows) => {
      if (err) {
        throw err;
      }
        const courses =  rows.map((row) => ({SlotID: row.SlotID, TeacherID: row.TeacherID, StartDate: row.StartDate, StartTime: row.StartTime, Duration: row.Duration, ReservedStudent: row.ReservedStudent, Attendance: row.Attendance, Grade: row.Grade}));
        resolve(courses);
      
    });
  });
};

exports.listAvailableSlots = function (TID) {
  return new Promise((resolve, reject) => {
    const sql = "select * from Slot where Slot.TeacherID=? and (Slot.ReservedStudent IS NULL OR Slot.ReservedStudent ='') ORDER by StartDate"
    db.all(sql, [TID], (err, rows) => {
      if (err) {
        throw err;
      }
        const courses =  rows.map((row) => ({SlotID: row.SlotID, TeacherID: row.TeacherID, StartDate: row.StartDate, StartTime: row.StartTime, Duration: row.Duration, ReservedStudent: row.ReservedStudent}));
        resolve(courses);
      
    });
  });
};

exports.updateCheckedStudent = function (arr, TID) {
  return new Promise((resolve, reject) => {
    let sql = "update Student_Teacher set Checked=1 where TID=? and StudentName IN( "
    arr.SID.forEach((SID,index) => {
    sql+='"'+ SID+'"';
    if(arr.SID.length-1===index) {
    sql+=')' 
    }
    else{
      sql += ', ';
    } 
    });
    db.run(sql, [TID], function(err)  {
      if (err) {
        throw err;
      }
        resolve(this.lastID);
      
    });
  });
};

//Update Execute Student Grade
exports.updateStudentGrade = function(Grade,Attendance,TeacherID,ReservedStudent) {
  return new Promise((resolve, reject) => {
      const sql = 'UPDATE Slot Set Grade=?, Attendance=? WHERE TeacherID=? and ReservedStudent=?';
      db.run(sql, [Grade, Attendance, TeacherID, ReservedStudent], (err) => {
          if(err){
              reject(err);
          }
          else
              resolve(this.SlotID);
      })
  });
}

// check if student has already booked or no for specific course
exports.checkStudentBookAccess = function (TID, SID) {
  return new Promise((resolve, reject) => {
    const sql = "select ReservedStudent from Slot where TeacherID=? and ReservedStudent=?"
    db.get(sql, [TID, SID], (err, rows) => {
      if (err) {
        throw err;
      }
        resolve(rows);
    });
  });
};

// GET student name
exports.getStudentName = function (SID) {
  return new Promise((resolve, reject) => {
    const sql = "select name from Students where SID=?"
    db.get(sql, [SID], (err, rows) => {
      if (err) {
        throw err;
      }
        resolve(rows);
    });
  });
};




exports.listRegisteredSlots = function (SID) {
  return new Promise((resolve, reject) => {
    const sql = "select * from Slot LEFT JOIN Student_Teacher ON Slot.TeacherID=Student_Teacher.TID where Slot.ReservedStudent=? and Checked=1 GROUP by TeacherID"
    db.all(sql, [SID], (err, rows) => {
      if (err) {
        throw err;
      }
        const courses =  rows.map((row) => ({CourseName: row.CourseName, SlotID: row.SlotID, TeacherID: row.TeacherID, StartDate: row.StartDate, StartTime: row.StartTime, Duration: row.Duration, ReservedStudent: row.ReservedStudent, Checked: row.Checked, Attendance: row.Attendance, Grade: row.Grade}));
        resolve(courses);
      
    });
  });
};

exports.getRegisteredCourses = function (SID) {
  return new Promise((resolve, reject) => {
    const sql = "Select * from Student_Teacher where Student_Teacher.SID=? and Student_Teacher.Checked=1"
    db.all(sql, [SID], (err, rows) => {
      if (err) {
        throw err;
      }
        const students =  rows.map((row) => ({STID: row.STID, SID: row.SID, StudentName: row.StudentName, TID: row.TID, CourseName: row.CourseName, }));
        resolve(students);
    });
  });
};


//Update Book slot by student(update Slot table)
exports.updateSlotBooked = function(slot) {
  return new Promise((resolve, reject) => {
      const sql = 'UPDATE Slot SET ReservedStudent=? where Slot.SlotID=?';
      db.run(sql, [slot.StudentID, slot.SlotID], (err) => {
          if(err){
              reject(err);
          }
          else
              resolve(this.SlotID);
      })
  });
}

//Cancel Booked slot by student(update Slot table)
exports.cancelBookedSlot = function(SlotID) {
  return new Promise((resolve, reject) => {
      const sql = 'UPDATE Slot SET ReservedStudent=NULL where Slot.SlotID=?';
      db.run(sql, [SlotID], (err) => {
          if(err){
              reject(err);
          }
          else
              resolve(this.SlotID);
      })
  });
}
//////////////////////////


exports.createSlot = function (arr) {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT into Slot(TeacherID,StartDate, StartTime,Duration) VALUES '
    arr.forEach((slot,index) => {
      sql+='("'+ slot.TeacherID+'" ,"'+slot.Date+'", "'+ slot.Time+'", '+slot.Duration;
      if(arr.length-1===index) {
      sql+=')' 
      }
      else{
        sql += '),';
      } 
      });
    db.run(sql,
       function (err) {
      if (err) {
        reject(err);
      }
      resolve(null);
    });
  });
};

//Get Selected Students from Student_Teacher List
exports.listCheckedStudents = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "select * from Student_Teacher where Student_Teacher.TID=? and Checked=1"
    db.all(sql, [id], (err, rows) => {
      if (err) {
        throw err;
      }
        const students =  rows.map((row) => ({name: row.StudentName, id: row.SID}));
        resolve(students);
      
    });
  });
};


////////////////////++++++++++++++++++++++
