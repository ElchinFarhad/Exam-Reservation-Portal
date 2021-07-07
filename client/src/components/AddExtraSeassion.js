import React, {Component} from 'react';
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
import moment from 'moment'
import API from '../api/API';

class AddExtraSeassion extends Component {
  constructor(props) {
    super(props);

    this.checkValidity = this
      .checkValidity
      .bind(this);
    this.onChangeDate = this
      .onChangeDate
      .bind(this);
    this.onChangeTime = this
      .onChangeTime
      .bind(this);
    this.onChangeDuration = this
      .onChangeDuration
      .bind(this);

    this.state = {
      checkedStudentLength: 0,
      validity: null,
      seassionDuration: null,
      seassionDate: null,
      seassionTime: null,
      showSeassion: false,
      showCheckButton: true,
      netice: 0,
      count: 0,
      alert: null,
      disableAdd: null
    }
  }

  addSeassion = () => {
    this.setState({
      count: this.state.count + 1
    });
    this.setState({showSeassion: true});
  }

  onChangeDate = (event) => {
    this.setState({seassionDate: event.target.value});
  };
  onChangeTime = (event) => {

    this.setState({seassionTime: event.target.value});
  };
  onChangeDuration = (event) => {
    this.setState({seassionDuration: event.target.value});
  };

  countIncrease() {
    let a = 0;
    a = a + 1;
    this.setState({count: a})

  }

  checkValidity() {

    if (this.state.count > 0) {}
    let seassionDate = this.state.seassionDate;
    let seassionDuration = this.state.seassionDuration;
    let seassionTime = this.state.seassionTime;

    for (let j = 0; j < parseInt(seassionDuration) / parseInt(this.props.slotDuration); j++) {

      if (j === 0) {
        let obj = {
          "TeacherID": this.props.courseID,
          "Date": seassionDate,
          "Time": seassionTime,
          "Duration": this.props.slotDuration
        };
        this
          .props
          .updateSeassion(obj);
      }

      if (j !== 0) {
        let startTime = seassionTime.split(':');
        let time = moment().set({'hour': startTime[0], 'minute': startTime[1]}).add(parseInt(this.props.slotDuration), 'minutes').format('HH:mm');
        seassionTime = time

        let obj = {
          // "SlotID": this.props.seassions.length,
          "TeacherID": this.props.courseID,
          "Date": seassionDate,
          "Time": time,
          "Duration": this.props.slotDuration
        };
        this
          .props
          .updateSeassion(obj);
      }
    }

    // ********Calculation */
    this
      .props
      .check(seassionDuration);
    //********/
  }

  componentWillReceiveProps(nextProps) {
    this.loadPosts(nextProps);
    if (this.state.validity === false) {
      this.setState({validity: false});
      this.setState({disableAdd: true});
    }

  }

  loadPosts(nextProps) {
    if (nextProps.requiredTime > 0) {
      this.setState({showCheckButton: false})

      this.setState({alert: 0});
      this.setState({validity: false})
    }
    if (nextProps.requiredTime <= 0) {

      this.setState({alert: 1});
      this.setState({showCheckButton: false})
      this.setState({validity: true})
    }
  }
  insertSlot() {
    this
      .props
      .insertSlot();
    this.setState({validity: false})
    this.setState({disableAdd: true})
  }
  render() {
    return (
      <div>
        <Card
          bg='light'
          style={{
          width: '20rem',
          float: "left",
          margin: "20px"
        }}>
          <Card.Title>Create Seassion</Card.Title >
          <Button
            disabled={this.state.disableAdd}
            onClick={() => this.addSeassion()}
            variant="info">Add Extra Seassion</Button>
          <Card.Body>
            <Form id="formID">
              <Form.Group >
                <Form.Label>Seassion Day</Form.Label>
                <Form.Control
                  value={this.state.seassionDate}
                  onChange={(ev) => this.onChangeDate(ev)}
                  id="date"
                  type="date"
                  name="deadlineDate"
                  required/>
              </Form.Group>
              <Form.Group >
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  value={this.state.seassionTime}
                  onChange={(ev) => this.onChangeTime(ev)}
                  required
                  id="time"
                  type="time"
                  name="deadlineTime"
                  required/>
              </Form.Group>
              <Form.Group >
                <Form.Label>Choose Duration:
                </Form.Label>
                <Form.Control
                  id="sduration"
                  as="select"
                  type="number"
                  value={this.state.value}
                  onChange={(ev) => this.onChangeDuration(ev)}
                  required>
                  <option id="T1" value=""></option>
                  <option id="T1" value={this.props.slotDuration}>{this.props.slotDuration}</option>
                  <option id="T1" value={this.props.slotDuration * 2}>{this.props.slotDuration * 2}</option>
                  <option id="T1" value={this.props.slotDuration * 3}>{this.props.slotDuration * 3}</option>
                  <option id="T1" value={this.props.slotDuration * 4}>{this.props.slotDuration * 4}</option>
                  <option id="T1" value={this.props.slotDuration * 5}>{this.props.slotDuration * 5}</option>
                  <option id="T1" value={this.props.slotDuration * 6}>{this.props.slotDuration * 6}</option>
                  <option id="T1" value={this.props.slotDuration * 7}>{this.props.slotDuration * 7}</option>
                  <option id="T1" value={this.props.slotDuration * 8}>{this.props.slotDuration * 8}</option>
                  <option id="T1" value={this.props.slotDuration * 9}>{this.props.slotDuration * 9}</option>
                  <option id="T1" value={this.props.slotDuration * 10}>{this.props.slotDuration * 10}</option>
                  <option id="T1" value={this.props.slotDuration * 11}>{this.props.slotDuration * 11}</option>
                  <option id="T1" value={this.props.slotDuration * 12}>{this.props.slotDuration * 12}</option>
                </Form.Control>
              </Form.Group>

            </Form>

            {this.state.alert === 0 && <Alert variant={"warning"}>
              Duration is not enough, please add new seassion
            </Alert>
}
            {this.state.showCheckButton && <Button
              form="formID"
              ref="btn"
              onClick={this.checkValidity}
              type="submit"
              variant="outline-primary">Check</Button>}

            {'   '}

            {this.state.validity && <div>
              <Alert variant={"success"}>
                Click Save
              </Alert>
              <Button
                onClick={() => {
                return this.insertSlot()
              }}
                margin="5px"
                variant="success">Save</Button>
            </div>}

          </Card.Body>
        </Card>

        {this.state.showSeassion && <AddExtraSeassion
          insertSlot={this.props.insertSlot}
          requiredTime2={this.props.requiredTime2}
          test={this.props.test}
          requiredTime={this.props.requiredTime}
          check={this.props.check}
          courseID={this.props.courseID}
          durationSum={this.props.durationSum}
          updateSeassion={this.props.updateSeassion}
          slotDuration={this.props.slotDuration}
          checkedStudents={this.props.checkedStudents}
          validity={this.state.validity}/>}

      </div>
    );

  }
}
export default AddExtraSeassion;