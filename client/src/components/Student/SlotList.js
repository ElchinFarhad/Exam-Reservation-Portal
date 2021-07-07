import React, { Component } from 'react';
import {Card, Nav, Alert, Navbar, Button,Form} from 'react-bootstrap'
import API from '../../api/API';
import { NavLink, Link, Redirect } from 'react-router-dom';


class SlotList extends Component {
    
  constructor(props) {
    super(props);

    this.state={
      slotList:[],
      result:null
    }
  }


  componentWillMount(){
    this.checkStudentBookAccess(this.props.teacherID, this.props.username)

  }

    componentDidMount(){
        this.getAllSlots(this.props.teacherID);
      }

      checkStudentBookAccess=(TID, SID)=> {
        API.checkStudentBookAccess(TID, SID).then((res) => {
          this.setState({result: res.Grade})
       })
       .catch((err) => {
        this.setState({AuthErr : err.msg});
       });
      }


    getAllSlots=(tid)=> {
        API.listAvailableSlots(tid).then((res) => {
          let allList=[];
          for(let i=0; i<res.length; i++){
            allList.push(res[i]);
            // res[i];
          }
          this.setState({slotList: allList} )
       })
       .catch((err) => {
        this.setState({AuthErr : err.msg});
       });
      }

      
      book(i){
        API.bookAvailableSlot(this.props.username, i);
        this.checkStudentBookAccess(this.props.teacherID, this.props.username)
      }

    render() {
      if(this.state.result === null || this.state.result ===""){
        return (
          <div>
           <div className="nav"> 
            <Navbar expand="lg" variant="light" bg="light">
            <Navbar.Brand >
                <Navbar.Text>
                  Student:
                  <a> {this.props.StudentName}</a>
                </Navbar.Text>
                <Nav.Item>
          <Link style={{ color: 'ThreeDShadow', textDecoration: 'inherit'}} to='/' >Student Page</Link>
          </Nav.Item>
              </Navbar.Brand>

              <Nav.Link style={{ color: 'ThreeDShadow', textDecoration: 'inherit'}} href="http://localhost:3000/student/" >Logout</Nav.Link>
            </Navbar>
            </div>
    
            <Card
              style={{
              float: "left",
              margin: "20px"
            }}>
              <Card.Body>
                <Card.Title>Available Slots:</Card.Title>
                <Card.Text> 

                  {this.state.slotList.map((i, index) => {
                      return (
                        <Card
                        border="secondary"
                        bg='light'
                        style={{
                        width: '20rem',
                        float: "left",
                        margin: "20px",
                      }}>
                        <Card.Body>
                          <Card.Text>
                            <h5>Exam Date:</h5>
                            <p>{i.StartDate}</p>
                            <h5>Exam Time:</h5>
                            <p>{i.StartTime}</p>
                            <h5>Exam Duration:</h5>
                            <p>{i.Duration}</p>
                          
                        </Card.Text>
              </Card.Body>
              <Button onClick={()=>{this.book(i.SlotID)}} margin="5px" variant="info">Book</Button>
            </Card>     
                      );
                    })}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        );
      }
      if(this.state.result !==null || this.state.result !==""){
      return(
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
          <Link style={{ color: 'ThreeDShadow', textDecoration: 'inherit'}} to='/' >Student Page</Link>
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
              <Card.Title>You already registered for this course </Card.Title>
              Check Booked Exams List
              <Card.Text> </Card.Text>
              <Card.Text> 
                      <Card
                      border="secondary"
                      bg='light'
                      style={{
                      width: '20rem',
                      float: "left",
                      margin: "20px",
                    }}>
          </Card>     
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
      }
    }
}

export default SlotList;