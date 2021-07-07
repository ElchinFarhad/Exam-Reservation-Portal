import React, {Component} from 'react';
import {Card,Nav, Alert, Navbar, Button} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';
import {AuthContext} from '../auth/AuthContext'
import '../assets/index.css'
import API from '../api/API';
import CreateExam from './CreateExam';
import ExecuteExam from './ExecuteExam';
import OverviewExam from './OverviewExam';
import history from '../history'


class Teacher extends Component {
  

   constructor(props) {
    super(props);

    this.state = {
      // courseID: null,
      showCreateExam: false,
      showExecuteExam: false,
      showOverviewExam: false,
    }
  }

  // componentWillMount() {
  //   if (!this.props.submitted) {
  //     history.push('/');
  //   }
  // }

  // componentWillUpdate(nextProps) {
  //   if (!nextProps.submitted) {
  //     history.push('/');
  //   }
  // }

  componentDidMount(){ 
    this.props.getTeacherId(this.props.authUser);
    this.props.getAllStudents(this.props.courseID)
  }
  
  updateCheckedStudents(test){
    this.setState({checkedStudents: test});
  }

  // getTeacherId=(name)=>{
  //   API.getTeacherId(name).then((res) => {
  //         this.setState({courseID: res[0].courseId})
  //     }) 
  //     .catch((err) => {
  //       this.setState({AuthErr : err.msg});
  //     });
  // }

  
  createExamButton() {
    this.setState({showCreateExam: true});
  }
  execExamButton() {
    this.setState({showExecuteExam: true});
  }
  overviewExamButton() {
    this.setState({showOverviewExam: true});
  }

  render() {

  if (this.state.showCreateExam) {
    return   <>
      <CreateExam logout={this.props.logout} courseID={this.props.courseID}  updateCheckedStudents={this.updateCheckedStudents} allStudents={this.props.allStudents} getAllStudents={this.props.getAllStudents}  checkedStudents={this.state.checkedStudents} authUser={this.props.authUser} /> </>
  }
  else if(this.state.showExecuteExam){
    return   <>
      <ExecuteExam logout={this.props.logout} updateCheckedStudents={this.updateCheckedStudents} allStudents={this.props.allStudents} courseID={this.props.courseID} getAllStudents={this.props.getAllStudents}  checkedStudents={this.props.checkedStudents} authUser={this.props.authUser} /> </>
  }
  else if(this.state.showOverviewExam){
    return   <>
      <OverviewExam logout={this.props.logout} getCheckedStudents ={this.props.getCheckedStudents} updateCheckedStudents={this.updateCheckedStudents} allStudents={this.props.allStudents} courseID={this.props.courseID} getAllStudents={this.props.getAllStudents}  checkedStudents={this.props.checkedStudents} authUser={this.props.authUser} /> </>
  }
  else
    return (
        <AuthContext.Consumer>
          {value => (
      <div className="teacherP" >
        <div className="nav">
          <Navbar  variant="light" bg="light">
            <Navbar.Collapse className="justify-content-end">

              <Navbar.Brand >
                <Navbar.Text>
                  Instructor:
                  <a> {this.props.authUser}</a>
                </Navbar.Text>
              </Navbar.Brand>
              
            </Navbar.Collapse>
            <Nav className="ml-md-auto">
              <Link style={{ color: 'GrayText', textDecoration: 'inherit'}} to='/teacherLogin' onClick = {() => {this.props.logout()}}>Logout</Link>
          <Nav.Link href="#">
          </Nav.Link>
        </Nav>
          </Navbar>
        </div>

        {/* {!this.props.authUser && 
        <Redirect to="/teacherLogin"/>
        } */}
        <Card
        border="secondary"
        bg='light'
          style={{
          width: '22rem',
          float: "left",
          margin: "50px"
        }}>
            <Card.Header>
              <h5>Create an exam and a schedule</h5>
              </Card.Header>
          <Card.Body>
            {/* <Link to='/teacher/createExam'>  */}
            <Button variant='info' onClick={()=> {this.createExamButton()}}>Create</Button>
          </Card.Body>
        </Card>

        <Card
        border="secondary"
         bg='light'
          style={{
          width: '22rem',

          float: "left",
          margin: "50px"
        }}>
          <Card.Header>
              <h5>Execute an oral test</h5>
              </Card.Header>
          <Card.Body>
            <Button  onClick={()=> {this.execExamButton()}} margin="5px" variant="info">Execute</Button>
          </Card.Body>
        </Card>

        <Card
        border="secondary"
         bg='light'
          style={{
          width: '22rem',
          float: "left",
          margin: "50px"
        }}>
          <Card.Header>
              <h5>Overview</h5>
              </Card.Header>

          <Card.Body>
            <Button onClick={()=> {this.overviewExamButton()}}  margin="5px" variant="info">View</Button>
          </Card.Body>
        </Card>
        </div>
         )}
 </AuthContext.Consumer>     

      
    );
  }
}

export default Teacher;