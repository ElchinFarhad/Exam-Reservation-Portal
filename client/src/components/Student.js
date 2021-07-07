import React, {Component} from 'react';
import {Card, Nav, Alert, Navbar, Button,Form} from 'react-bootstrap'
import API from '../api/API';
import { Link, Redirect } from 'react-router-dom';
import '../assets/index.css'
import RegisteredExams from './RegisteredExams';
import BookedSlotList from './Student/BookedSlotList';



class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // registeredExams: [],
      showRegisteredExams: false,
      showBookedSlots: false,
    
     }
  }
  componentDidMount(){
    this.props.getStudentName(this.props.username)
    console.log(this.props.username+" usernameee");
    this.props.getAllExams(this.props.username)

  }

  showRegisteredExams() {
    this.setState({showRegisteredExams: true});
  }
  showBookedSlots() {
    this.setState({showBookedSlots: true});
  }


  
  render() {
    if (this.state.showRegisteredExams) {
      return   <>
        <RegisteredExams StudentName={this.props.StudentName} authUser={this.props.authUser} username={this.props.username}  registeredExams={this.props.registeredExams} /> </>
    }else if (this.state.showBookedSlots) {
      return   <>
        <BookedSlotList StudentName={this.props.StudentName} authUser={this.props.authUser} username={this.props.username}  registeredExams={this.props.registeredExams} /> </>
    }
    else

    return (
      <div className="teacherP">
        <div className="nav">
        <Navbar  variant="light" bg="light">
            <Navbar.Collapse className="justify-content-end">

              <Navbar.Brand >
                <Navbar.Text>
                  Student:
                  <a> {this.props.StudentName}</a>
                </Navbar.Text>
              </Navbar.Brand>
              
            </Navbar.Collapse>
            <Nav className="ml-md-auto">
              <Nav.Link></Nav.Link>
              <Nav.Link></Nav.Link>
              <Nav.Link style={{ color: 'ThreeDShadow', textDecoration: 'inherit'}} href="http://localhost:3000/student/" >Logout</Nav.Link>
          <Nav.Link href="#">
          </Nav.Link>
        </Nav>
          </Navbar>
        </div>

        <Card
          style={{
          width: '25rem',
          float: "left",
          margin: "50px"
        }}>
          <Card.Img variant="top"/>

          <Card.Body>
            <Card.Title>List of Registered Courses</Card.Title>
            <Button onClick={()=> {this.showRegisteredExams()}} margin="5px" variant="primary">Click</Button>
          </Card.Body>
        </Card>

        <Card
          style={{
          width: '25rem',
          float: "left",
          margin: "50px"
        }}>
          <Card.Img variant="top"/>
          <Card.Body>
            <Card.Title>View your booked slots </Card.Title>
            <Button onClick={()=> {this.showBookedSlots()}}  margin="5px" variant="primary">View</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Student;