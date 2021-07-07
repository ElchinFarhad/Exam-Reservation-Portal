import React, {Component} from 'react';
import {Row, Alert, Form, Nav, Button} from 'react-bootstrap'
import {withRouter, Redirect} from "react-router-dom";
import API from '../api/API';
import {AuthContext} from '../auth/AuthContext';
import Student from './Student';
import '../assets/index.css'



class LoginStudent extends Component {

  constructor(props) {

    super(props);
    this.state = {
      username: '',
      authUser: null,
      errorMessage: '',
          };
  }


  onChangeUsername = (event) => {
    this.setState({username: event.target.value});    
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state.username);

  }

  render() {
    const value = {
      authUser: this.state.authUser,
      username: this.state.username,
      authErr: this.state.authErr,
      logout: this.logout
    }


    if (this.props.submitted && this.props.authErr === null) {
      return <>
      <Student getStudentName={this.props.getStudentName} registeredExams={this.props.registeredExams} getAllExams={this.props.getAllExams} authUser={this.state.authUser} StudentName={this.props.StudentName} username={this.props.username}/> </>
    }
    return (

      <AuthContext.Provider value={value}>
      <div className="Login">
             <Form method="POST" onSubmit={(event) => this.handleSubmit(event)}>
          <Nav.Link href="/teacherLogin">Login as Teacher</Nav.Link>
          <h2 class="text-center">Student Log in</h2>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="Student ID"
              value={this.state.username}
              onChange={(ev) => this.onChangeUsername(ev)}
              required/>
          </Form.Group>
          <Button  variant="primary" type="submit">Login</Button>
        </Form>


        {this.state.authErr && 
                            <Alert variant= "danger">
                                {this.state.authErr}
                            </Alert>
                            }
    
      </div>
      </AuthContext.Provider>
    );
  }
}

export default LoginStudent;