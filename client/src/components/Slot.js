import React, { Component } from 'react';
import '../assets/index.css'
import API from '../api/API.js';
import {
    InputGroup,
    FormControl,
    Card,
    Nav,
    NavLink,
    Alert,
    Navbar,
    Button,
    Form
  } from 'react-bootstrap'
import CreateSeassion from './CreateSeassion';

class Slot extends Component {
    constructor(props) {
        super(props);
    
        this.state={
          showSeassion: false,
          slotDuration: null,
        }   
      }

      showSeassion(){
        API.updateCheckedStudents(this.props.checkedStudents, this.props.courseID)

        this.setState({showSeassion: true});
        // this.hello();
        this.props.hideList();
      }
     
      onChangeSlotDuration = (event) => {
        this.setState({slotDuration: event.target.value});

      };


    render() {
      if (this.state.showSeassion) {
        return   <> 
           <CreateSeassion courseID={this.props.courseID} slotDuration={this.state.slotDuration} checkedStudents={this.props.checkedStudents}/>
            </>
      }
      else
        return (
            <div>
                    
        <Card style = {{
          width: '20rem',
          height: '20rem',
          float: "left",
          margin: "20px"
        }}>
          <Card.Title>Check Time Slot</Card.Title > 
          <Form>
          <Form.Group >
                <Form.Label>Choose Duration:</Form.Label>
                <InputGroup className="mb-3">
                
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      value={this.state.value}
          onChange={(ev) => this.onChangeSlotDuration(ev)}
          required/>
          <InputGroup.Append>
      <InputGroup.Text id="inputGroup-sizing-default">min</InputGroup.Text>
    </InputGroup.Append>
    
    </InputGroup>
           
          </Form.Group>
            </Form>
          <Card.Body>
          <Button onClick={()=> {this.showSeassion()}}  margin="5px" variant="primary">Next</Button>
          </Card.Body>
          </Card>
            </div>
        );
    }
}

export default Slot;