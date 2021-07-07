import React, { Component } from 'react';
import {Card, Nav, Alert, Navbar, Button,Form} from 'react-bootstrap'
import API from '../../api/API';
import { Link, Redirect } from 'react-router-dom';


class BookedSlotList extends Component {
    
  constructor(props) {
    super(props);

    this.state={
      slotList:[],
      refresh: null,
      errors: null
    }
  }

    componentDidMount(){
        this.getAllSlots(this.props.username);
      }

    getAllSlots=(sid)=> {
        API.listRegisteredSlots(sid).then((res) => {
          let allList=[];
          for(let i=0; i<res.length; i++){
            allList.push(res[i]);
            // res[i];
          }
          this.setState({slotList: allList})
       })
       .catch((err) => {
        this.setState({AuthErr : err.msg});
       });
      }

      cancelBookedExam(index){
        API.cancelBookedSlot(index).then(()=>{
          this.getAllSlots(this.props.username);
        }).catch((obj)=>{
            this.setState({errors: obj})
        });
      }

    render() {
      return (
        <div>
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
            <Link style={{ color: 'ThreeDShadow', textDecoration: 'inherit'}} to='/' >Student Page</Link>
              <Nav.Link></Nav.Link>
              <Nav.Link></Nav.Link>
              <Nav.Link style={{ color: 'ThreeDShadow', textDecoration: 'inherit'}} href="http://localhost:3000/student/" >Logout</Nav.Link>

        </Nav>
          </Navbar>
        </div>
          
  
          <Card
            style={{
            float: "left",
            margin: "20px"
          }}>
            <Card.Body>
              <Card.Title>Registered Slots</Card.Title>
              <Card.Text> 
              {this.state.refresh  &&
              <Card.Text></Card.Text>
           }

                {this.state.slotList.map(i => {
                  if(i.Grade==="" || i.Grade===null){
                    return (
                      <Card
                      style={{
                      width: '20rem',
                      float: "left",
                      margin: "20px",
                    }}>
                      <Card.Body>
                        <Card.Text>
                          <h5>Course Name:</h5>
                          <p>{i.CourseName}</p>
                          <h5>Exam Date:</h5>
                          <p>{i.StartDate}</p>
                          <h5>Exam Time:</h5>
                          <p>{i.StartTime}</p>
                          <h5>Exam Duration:</h5>
                          <p>{i.Duration}</p>
                          
                        <Button onClick={()=>{ this.cancelBookedExam(i.SlotID)}}  variant="danger">Cancel</Button>
                      </Card.Text>
            </Card.Body>
          </Card>
                      
                    );
                  }
                  else{
                    return (
                      <Card
                      style={{
                      width: '20rem',
                      float: "left",
                      margin: "20px",
                    }}>
                      <Card.Body>
                        <Card.Text>
                          <h5>Course Name:</h5>
                          <p>{i.CourseName}</p>
                          <h5>Exam Date:</h5>
                          <p>{i.StartDate}</p>
                          <h5>Exam Time:</h5>
                          <p>{i.StartTime}</p>
                          <h5>Exam Duration:</h5>
                          <p>{i.Duration}</p>
                          <h5>Student Grade:</h5>
                          <p>{i.Grade}</p>
                      </Card.Text>
            </Card.Body>
          </Card>
                      
                    );
                  }
                  })}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
}

export default BookedSlotList;