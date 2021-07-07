import React, {Component} from 'react';
import './assets/Login.css'
import StudentLogin from './components/LoginStudent';
import InstrLogin from './components/LoginInstr';
import API from './api/API';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Teacher from './components/Teacher';
import Student from './components/Student';
import {AuthContext} from './auth/AuthContext.js'
import CreateExam from './components/CreateExam';
import LoginInstr from './components/LoginInstr';
import ExecuteExam from './components/ExecuteExam';
import OverviewExam from './components/OverviewExam';
import RegisteredExams from './components/RegisteredExams';
import { withRouter } from 'react-router-dom';
import history from './history'
import BookedSlotList from './components/Student/BookedSlotList';
import SlotList from './components/Student/SlotList';
import LoginStudent from './components/LoginStudent';

class App extends Component {
  constructor(props) {
    super(props);
     this.state={authUser: null,  authErr: null,
    submitted: false,
    refresh: null,
    courseID: null,
    student: null,
    allStudents: [],
    registeredExams:[], 
    SauthErr: null, 
    Ssubmitted: null,
    StudentName: null,
    SID: null}
  }


  //authentication
  componentDidMount() {
    API.isAuthenticated().then(
      (user) => {
        this.setState({authUser: user.name});
      }

    ).catch((err) => { 
      this.setState({authErr: err.errorObj});
      // this.props.history.push("/teacherLogin");
    });
  }

  handleErrors(err) {
    if (err) {
        if (err.status && err.status === 401) {
          this.setState({authErr: err.errorObj});
          this.props.history.push("/login");
        }
    }
}

//login
login = (username, password) => {
  API
    .userLogin(username, password)
    .then((user) => {
      this.setState({username: user, authErr: null, submitted: true, authUser: user.name})
    })
    .catch((err) => {
      const err0 = err.errors[0];
      this.setState({authErr: err0.msg, submitted: true});
    });
}

  //logout 
  logout = () => {
    API.userLogout().then(() => {
      this.setState({authUser: null,authErr: null, tasks: null});
      history.push('/teacherLogin');
      window.location.reload(false);
    },() => {
      this.setState({
        authErr:'Error occured while logging out. Please try again.'
      });
  }
    );
  }

  //////Teacher 
  getTeacherId=(name)=>{
    API.getTeacherId(name).then((res) => {
          this.setState({courseID: res[0].courseId})
      }) 
      .catch((err) => {
        this.setState({AuthErr : err.msg});
      });
  }

  ////Student Instr
  getAllStudents=(tid)=> {
    API.getStudentByTID(tid).then((res) => {
      let allStudents=[];
      for(let i=0; i<res.length; i++){
        allStudents.push(res[i].name);
      }
      this.setState({allStudents: allStudents} )

    })
   .catch((err) => {
    this.setState({AuthErr : err.msg});
   });
  }

  //Student Login
  setStudent=(s)=>{
      this.setState({student: s})
  }
  StudentLogout=()=>{
    this.setState({student: null})
  }

  
  studentlogin = (name) => {
    API.studentLogin(name)
    .then((user) => {     
      
      this.setState({SID: name, SauthErr: null, Ssubmitted: true, studentName: user.name})
      this.props.setStudent(user.name);
    })
    .catch((err) => {
       const err0 = "Wrong Username";
      this.setState({authErr: err0, submitted: false});
    });
  }

  getAllExams=(sid)=> {
    API.getRegisteredCourses(sid).then((res) => {
      let registeredExams=[];
      for(let i=0; i<res.length; i++){
        registeredExams.push({"courseName": res[i].CourseName, "courseCode": res[i].TID});
      }
      this.setState({registeredExams: registeredExams})
   })
   .catch((err) => {
    this.setState({AuthErr : err.msg});
   });
  }

  getStudentName=(sid)=>{
    API.getStudentName(sid).then((res) => {
      this.setState({StudentName: res.name})
   })
   .catch((err) => {
    this.setState({AuthErr : err.msg});
   });
  }

  render() {
    return (
        <Router>
          <Switch>
          <Route exact path="/">
            {this.state.authUser ? <Redirect to='/teacher/portal'></Redirect> : 
            (this.state.studentName ? <Redirect to='/student/portal'></Redirect> :
                  <InstrLogin getAllStudents={this.getAllStudents} allStudents={this.state.allStudents} courseID={this.state.courseID} getTeacherId={this.getTeacherId} getAllStudents={this.getAllStudents} logout={this.logout} submitted={this.state.submitted} authErr={this.state.authErr} login={this.login} logout={this.logout} authUser={this.state.authUser}/>
            )}
            </Route>

            <Route exact path="/teacherLogin">
                  <InstrLogin getAllStudents={this.getAllStudents} allStudents={this.state.allStudents} courseID={this.state.courseID} getTeacherId={this.getTeacherId} getAllStudents={this.getAllStudents} logout={this.logout} submitted={this.state.submitted} authErr={this.state.authErr} login={this.login} logout={this.logout} authUser={this.state.authUser}/>
            </Route>

            <Route exact path="/teacher/portal">
              <Teacher allStudents={this.state.allStudents} courseID={this.state.courseID} getTeacherId={this.getTeacherId} getAllStudents={this.getAllStudents} logout={this.logout} submitted={this.state.submitted} authErr={this.state.authErr} login={this.login} logout={this.logout} authUser={this.state.authUser}/>
            </Route>



            <Route exact path="/student">
                <LoginStudent username={this.state.SID} StudentName={this.state.studentName} getStudentName={this.getStudentName} submitted={this.state.Ssubmitted} authErr={this.state.SauthErr} login={this.studentlogin} registeredExams={this.state.registeredExams} getAllExams={this.getAllExams} studentName={this.state.student} StudentLogout={this.StudentLogout} setStudent={this.setStudent}></LoginStudent>
            </Route>
            
            <Route exact path="/student/portal" >
            <Student username={this.state.SID} StudentName={this.state.studentName} getStudentName={this.getStudentName} submitted={this.state.Ssubmitted} authErr={this.state.SauthErr} login={this.studentlogin} registeredExams={this.state.registeredExams} getAllExams={this.getAllExams} studentName={this.state.student} StudentLogout={this.StudentLogout} setStudent={this.setStudent}></Student>

            </Route>


          </Switch>
        </Router>
    );
  }
}

export default withRouter(App);
