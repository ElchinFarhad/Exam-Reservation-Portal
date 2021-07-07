import React, {Component} from 'react';
import {Row, Alert, Form, Nav, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom';
import API from '../api/API';
import {NavLink, Link} from 'react-router-dom';
import Teacher from './Teacher';
import {AuthContext} from '../auth/AuthContext';
import '../assets/index.css'
import history from '../history'

class LoginInstr extends Component {

  constructor(props) {

    super(props);
    // this.getAllStudents = this.getAllStudents.bind(this);
    this.state = {
      username: '',
      password: '',
      authUser: null,
      errorMessage: '',
      courseID: '',
      // allStudents: [],
      render: false,
      submitted: false
    };
  }

//////////////////////////**********************/TEACHER Methods


// getAllStudents=(tid)=> {
//   API.getStudentByTID(tid).then((res) => {
//     let allStudents=[];
//     for(let i=0; i<res.length; i++){
//       allStudents.push(res[i].name);
//     }
//     this.setState({allStudents: allStudents} )
//  })
//  .catch((err) => {
//   this.setState({AuthErr : err.msg});
//  });
// }

  onChangeUsername = (event) => {
    this.setState({username: event.target.value});
  };

  onChangePassword = (event) => {
    this.setState({password: event.target.value});
  };

  handleSubmit = (event, onLogin) => {
    event.preventDefault();
    onLogin(this.state.username, this.state.password);
    this.setState({submitted : true});
    history.push("/teacher/portal")
  }

  render() {
    if (this.props.submitted && this.props.authErr === null) {

      return  <>
      {/* <Redirect to='/teacher/portal'></Redirect> */}
      <Teacher courseID={this.props.courseID} allStudents={this.props.allStudents} getTeacherId={this.props.getTeacherId} logout={this.props.logout} getAllStudents={this.props.getAllStudents} authUser={this.props.authUser} />
      </>
    } 
    else
    return (

      // <AuthContext.Provider value={value}>    
      <div className="Login">

        <Form method="POST" onSubmit={(event) => this.handleSubmit(event, this.props.login)}>
          <Nav.Link href="/student">Login as Student</Nav.Link>
          <h2 class="text-center">Teacher Log in</h2>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={(ev) => this.onChangeUsername(ev)}
              required/>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(ev) => this.onChangePassword(ev)}
              required/>
          </Form.Group>

          <Button variant="primary" type="submit">Login</Button>
        </Form>

        {this.props.authErr  && 
                            <Alert variant= "danger">
                                {this.props.authErr}
                            </Alert>
                            }


      </div>
      // </AuthContext.Provider>
    );
  }
}

export default LoginInstr;

