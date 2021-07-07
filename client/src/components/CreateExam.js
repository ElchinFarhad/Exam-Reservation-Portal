import React, {Component} from 'react';
import {Card,Nav,Alert,Navbar,Button} from 'react-bootstrap'
import {AuthContext} from '../auth/AuthContext.js'
import '../assets/index.css'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import Slot from './Slot.js';
import API from '../api/API.js';
import history from '../history'
import {Link} from 'react-router-dom'
import { NavLink } from 'react-router-dom'


// const history = history({forceRefresh:true});

class CreateExam extends Component {
  constructor(props) {
    super(props);

    this.state={
      showSlot: false,
      checkedStudents:[], 
      hideList: true
    }
  }
  componentDidMount(){
    this.props.getAllStudents(this.props.courseID);
  }
  
  hideList=()=>{
    this.setState({hideList: false});
  }

  showSlot(){
    //insert checked studentds into DB 
    this.setState({showSlot: true});
  }

  chooseStudent(event, id){
    const isChecked = event.target.checked;
    if(isChecked) {
        let students = [...this.state.checkedStudents, id];
        this.setState({checkedStudents: students});

    } else {
        let students = this.state.checkedStudents.filter(student => 
          {return student !== id});
        this.setState({checkedStudents: students});
    }
}

logout(){
  history.push("/teacher")
}

  

  render() {
    return (
      <div className="teacherP">
        <AuthContext.Consumer>
          {(context) => ( 
          <>
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
              
              {/* <Link style={{ color: 'GrayText', textDecoration: 'inherit'}} to="/teacher/executeExam" >Execute Exam</Link> */}
              <Nav.Link></Nav.Link>
              <Link style={{ color: 'GrayText', textDecoration: 'inherit'}} to="/">Teacher Portal</Link>

              <Nav.Link></Nav.Link>
              <Nav.Link></Nav.Link>
              <Link style={{ color: 'GrayText', textDecoration: 'inherit'}} onClick = {() => {this.props.logout()}}>Logout</Link>
        </Nav>
          </Navbar>
        </div>
        

          {this.state.hideList && 
          < Card 
          bg='light'
          style = {{
          width: '20rem',
          float: "left",
          margin: "20px"
        }} > <Card.Body>
            <Card.Title>Choose Students</Card.Title>
            <Card.Text>        
              {this.props.allStudents && this.props.allStudents.map(i => {
                  return (
                    <p key={i}>
                      <td><input type="checkbox" 
                      onChange={event => this.chooseStudent(event, i)}/></td>
                     <td>{i}</td>
                    </p>
                  );
                })}
            </Card.Text>
            {this.state.checkedStudents.length !==0 &&
            <Button onClick={()=> {this.showSlot()}}  margin="5px" variant="primary">Next</Button>
  }
          </Card.Body> 
          </Card>
  }
          {this.state.showSlot && <Slot courseID={this.props.courseID} hideList={this.hideList} checkedStudents={this.state.checkedStudents}/>}

         {
            context.authErr && <Alert variant="danger">
                {context.authErr.msg}
              </Alert>
          } 
          </>
       )}
        </AuthContext.Consumer>
      </div>

    );
  }
}

export default CreateExam;