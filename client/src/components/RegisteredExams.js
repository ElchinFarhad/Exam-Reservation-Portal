import React, {Component} from 'react';
import {
  Card,
  Nav,
  // NavLink,
  Alert,
  Navbar,
  Button
} from 'react-bootstrap'
import { NavLink, Link, Redirect } from 'react-router-dom';


import SlotList from './Student/SlotList';



class RegisteredExams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentID: "",
      showSlotList: false,
      teacherID: ""
    }
  }

  showSlotList=(e)=>{
    e.preventDefault();
     this.setState({showSlotList: true});
     this.setState({teacherID: e.target.value});
  }

  render() {
    if(this.state.showSlotList){
      return   <>
        <SlotList StudentName={this.props.StudentName} username={this.props.username} teacherID={this.state.teacherID}  /> </>
    }
    else
    return (
      <div>
        <div className="nav"> 
        <Navbar  variant="light" bg="light">
        <Navbar.Brand >
                <Navbar.Text>
                  Student:
                  <a> {this.props.StudentName}</a>
                </Navbar.Text>
              </Navbar.Brand>

          <Nav.Item>
          <Link style={{ color: 'ThreeDShadow', textDecoration: 'inherit'}} to="/" >Student Page</Link>
          </Nav.Item>

          <Nav.Link style={{ color: 'ThreeDShadow', textDecoration: 'inherit'}} href="http://localhost:3000/student/" >Logout</Nav.Link>
        </Navbar>
        </div>

        <Card
          style={{
          float: "left",
          margin: "20px"
        }}>
          <Card.Body>
            <Card.Title>Registered Courses</Card.Title>
            <Card.Text> 
              {this.props.registeredExams && this.props.registeredExams.map(i => {
                  return (
                    <Card
                    style={{
                    width: '20rem',
                    float: "left",
                    margin: "20px",
                    height: '10rem'
                  }}>
                    <Card.Body>
                      <Card.Text>
                    {/* <p key={i.courseName}> */}
                      <h5>Course Name:</h5>
                        <p>{i.courseName}</p>
                      <Button value={i.courseCode} onClick={this.showSlotList} >{i.courseName}</Button>
                    {/* </p> */}
                    </Card.Text>
          </Card.Body>
        </Card>
                    
                  );
                })}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default RegisteredExams;

