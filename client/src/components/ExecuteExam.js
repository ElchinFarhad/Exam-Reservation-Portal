import React, {Component} from 'react';
import {Card, Nav, Alert, Navbar, Button,Form} from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import '../assets/index.css'
import API from '../api/API';
import { Link, Redirect } from 'react-router-dom';


class ExecuteExam extends Component {

  constructor(props) {
    super(props);

    this.state={
      StudentStatus: "",
      StudentGrade: "",
      color: "",
      showGradeField: false,
      slotList:[],
      hideSlotButton: true,
      alert: false
    }
  }

  componentDidMount(){
    this.getAllSlots(this.props.courseID);
  }

  showAddGrade=(event, i)=>{
    event.persist();
    this.setState({StudentStatus:event.target.value});
    this.setState(prevState => {
      let prevList=prevState.slotList
      prevList[i].Attendance= event.target.value
      this.setState({slotList: prevList});
    })
  }

  addGrade=(event, i)=>{
    event.persist();
    this.setState({StudentGrade: event.target.value});
    this.setState(prevState => {
      let prevList=prevState.slotList
      prevList[i].Grade= event.target.value
      this.setState({slotList: prevList});
    }) 
  }

  getAllSlots=(tid)=> {
    API.listReservedSlots(tid).then((res) => {
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


  updateGrade(StudentID){
    API.updateStudentGrade(this.state.StudentGrade, this.state.StudentStatus, this.props.courseID,StudentID )
    this.setState({alert: true});
  }
  hideAlert=()=>{
    this.setState({alert: false})
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
              <Link to="/" style={{ color: 'GrayText', textDecoration: 'inherit'}} onClick = {() => {this.props.logout()}}>Logout</Link>
        </Nav>
          </Navbar>
        </div>

      <div>
        {this.state.alert && 
      <Alert variant={"success"}>
    Grade Updated. Please check Overview
    <p> </p>
    <Button  onClick={() =>  {return this.hideAlert()}}>OK</Button>
  </Alert>
  }
      <Card 
      bg='light'
      style = {{
          float: "left",
          margin: "20px"
        }}
        border="dark" > <Card.Body>
            <Card.Title>Evaluate Students</Card.Title>
            <Card.Text>        
            
              {this.state.slotList.map((i,index) => {
                  return (
                    <Card 
                    border="primary"
                    bg={this.state.color}
                    style = {{
                      width: '17rem',
                      float: "left",
                      height: '28rem',
                      margin: "12px"
                    }} >

                    <Card.Body>
                      
                      <Card.Title>Slot Informations</Card.Title>
                      <InputGroup ></InputGroup>
                        <Card.Text>Start Date: {i.StartDate}</Card.Text>
                        <Card.Text>Start Time: {i.StartTime}</Card.Text>
                        <Card.Text>Exam Duration: {i.Duration}</Card.Text>
                        <Card.Text value={i.ReservedStudent}>Registered Student: {i.ReservedStudent}</Card.Text>
                        {/* <Card.Text>Student index: {this.state.disableIndex[index]}</Card.Text> */}
                        <Card.Text>Student Status:</Card.Text>

                        <Form.Control
                        id="sduration"
                        as="select"
                        type="number"
                        value={this.state.value}
                        onChange={(ev) => this.showAddGrade(ev,index)}
                        // disabled={this.state.disableIndex[index]}
                        required>
                    <option id="T1" value=""></option>
                    <option id="T1" value={"Present"}>Present</option>
                    <option id="T1" value={"Absent"}>Absent</option>
                    </Form.Control>

                    <Card.Text></Card.Text>  
                   {i.Attendance==="Present"  &&  
                    <div>
                    <Card.Text>Add Student Grade: </Card.Text>  
                <Form.Control
                  id="sduration"
                  as="select"
                  type="number"
                  value={this.state.value}
                  onChange={(ev) => this.addGrade(ev, index)}
                  // disabled={this.state.disableIndex[index]}
                  required>
                    <option id="T1" value=""></option>
                    <option id="T1" value={"Fail"}>Fail</option>
                    <option id="T1" value={"Withdrow"}>Withdraw</option>
                    <option id="T1" value={"18"}>18</option>
                    <option id="T1" value={"19"}>19</option>
                    <option id="T1" value={"20"}>20</option>
                    <option id="T1" value={"21"}>21</option>
                    <option id="T1" value={"22"}>22</option>
                    <option id="T1" value={"23"}>23</option>
                    <option id="T1" value={"24"}>24</option>
                    <option id="T1" value={"25"}>25</option>
                    <option id="T1" value={"26"}>26</option>
                    <option id="T1" value={"27"}>27</option>
                    <option id="T1" value={"28"}>28</option>
                    <option id="T1" value={"29"}>29</option>
                    <option id="T1" value={"30"}>30</option>
                    <option id="T1" value={"30L"}>30L</option>
                    </Form.Control>
                    </div> 
                }
                <Card.Text></Card.Text> 
                {((i.Attendance==="Present" || i.Attendance==="Absent"))  &&
              <Button onClick={()=>{this.updateGrade(i.ReservedStudent)}}  margin="5px" variant="primary">Submit</Button>} 
              </Card.Body> 
          </Card> 
          );})}
            </Card.Text>
          </Card.Body> 
          </Card>

      </div>


      </div>
    );
  }
}

export default ExecuteExam;