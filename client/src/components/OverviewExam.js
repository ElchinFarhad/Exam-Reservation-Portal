import React, {Component} from 'react';
import {Card, Nav, Alert, Navbar, Button,Form} from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import '../assets/index.css'
import API from '../api/API';
import {Link} from 'react-router-dom'



class OverviewExam extends Component {

  constructor(props) {
    super(props);

    this.state={
      StudentStatus: "Absent",
      StudentGrade: "",
      color: "",
      showGradeField: false,
      slotList:[],
      checkedStudents:[]
    }
  }

  componentDidMount(){
    this.getCheckedStudents(this.props.courseID);
    this.getAllSlots(this.props.courseID);
  }


  getAllSlots=(tid)=> {
    API.overviewReservedSlots(tid).then((res) => {
      let allList=[];
      for(let i=0; i<res.length; i++){
        allList.push(res[i]);
      }
      this.setState({slotList: allList} )
   })
   .catch((err) => {
    this.setState({AuthErr : err.msg});
   });
  }

  getCheckedStudents=(tid)=> {
    API.getCheckedStudentByTID(tid).then((res) => {
      let allStudents=[];
      for(let i=0; i<res.length; i++){
        allStudents.push({name: res[i].name, id: res[i].id});
      }
      this.setState({checkedStudents: allStudents})
   })
   .catch((err) => {
    this.setState({AuthErr : err.msg});
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
                  Instructor:
                  <a> {this.props.authUser}</a>
                </Navbar.Text>
              </Navbar.Brand>
              
            </Navbar.Collapse> 
            <Nav className="ml-md-auto">
           
            <Link style={{ color: 'GrayText', textDecoration: 'inherit'}} to="/">Teacher Portal</Link>

              <Nav.Link></Nav.Link>
              <Nav.Link></Nav.Link>
              <Link style={{ color: 'GrayText', textDecoration: 'inherit'}} onClick = {() => {this.props.logout()}}>Logout</Link>
          <Nav.Link href="#">
          </Nav.Link>
        </Nav>
          </Navbar>
        </div>
        

      <div>
      < Card 
      bg='light'
      style = {{
          float: "left",
          margin: "20px"
        }}
        border="dark" > <Card.Body>
           <Card 
       bg='light'
       style = {{
          float: "left",
        }} > <Card.Body>
            <Card.Title>List of Students</Card.Title>
            <Card.Text>        
              {this.state.checkedStudents.map(i => {
                  return (
                    <p> 
                     <td>{i.name} - {i.id}</td>
                    </p>
                  );
                })}
            </Card.Text>

          </Card.Body> 
          </Card>
            <Card.Title>Booked Slots by Choosen Students</Card.Title>
            <Card.Text>        
            


              {this.state.slotList.map(i => {
                if(i.Grade==="" || i.Grade===null){
                  return (
                    < Card 
                    border="primary"
                    bg={this.state.color}
                    style = {{
                      width: '17rem',
                      height: '20rem',
                      float: "left",
                      margin: "10px"
                    }} >

                    <Card.Body>
                      
                      <Card.Title>Slot Informations</Card.Title>
                      <InputGroup ></InputGroup>
                        <Card.Text>Start Date: {i.StartDate}</Card.Text>
                        <Card.Text>Start Time: {i.StartTime}</Card.Text>
                        <Card.Text>Exam Duration: {i.Duration}</Card.Text>
                        <Card.Text>Registered Student: {i.ReservedStudent}</Card.Text>
                        <Card.Text>Student Attendance: {i.Attendance}</Card.Text>
                        <Card.Text>Not Graded</Card.Text>
                    <Card.Text></Card.Text>  
                  
          </Card.Body> 
          </Card>);
                }
                else{
                  return (
                    < Card 
                    border="primary"
                    bg={this.state.color}
                    style = {{
                      width: '17rem',
                      height: '20rem',
                      float: "left",
                      margin: "10px"
                    }} >

                    <Card.Body>
                      
                      <Card.Title>Slot Informations</Card.Title>
                      <InputGroup ></InputGroup>
                        <Card.Text>Start Date: {i.StartDate}</Card.Text>
                        <Card.Text>Start Time: {i.StartTime}</Card.Text>
                        <Card.Text>Exam Duration: {i.Duration}</Card.Text>
                        <Card.Text>Registered Student: {i.ReservedStudent}</Card.Text>
                        <Card.Text>Student Grade:{i.Grade}</Card.Text>
                    <Card.Text></Card.Text>  
                  
          </Card.Body> 
          </Card>);
                }
        })}
            </Card.Text>
          </Card.Body> 
          </Card>

      </div>


      </div>
    );
  }
}

export default OverviewExam;