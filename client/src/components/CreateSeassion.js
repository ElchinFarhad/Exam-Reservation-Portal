import React, {Component} from 'react';
import '../assets/index.css'
import AddExtraSeassion from './AddExtraSeassion';
import API from '../api/API';


class CreateSeassion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seassions:[],
      durationSum: null,
      slotDurations: [],
      requiredTime: props.slotDuration * props.checkedStudents.length,
      checkedStudents:[],
      requiredTime2: null
    }
  }

  // componentDidMount(){ 
  //   let requiredTime= this.props.slotDuration * this.props.checkedStudents.length; //15
  //    this.setState({requiredTime: requiredTime})
  // }


  check=(sessionTime)=>{
    let a=this.state.requiredTime-sessionTime;
    this.setState({requiredTime: a})
    this.checke2();
  }

  checke2=()=>{
    this.setState({requiredTime2: this.state.requiredTime});
  }



  updateSeassion=(input)=>{
    // alert(this.props.checkedStudents+" ccStudents");
    this.setState(prevState => ({
      seassions: [...prevState.seassions, input]
    }),() => {

    
      
  })    
  }

  insertSlot=()=>{    
    API.insertSlot(this.state.seassions);
  }


  render() {

    return ( 
        <div>
      <AddExtraSeassion insertSlot={this.insertSlot} checke2={this.checke2} test={this.test} requiredTime={this.state.requiredTime} check={this.check} courseID={this.props.courseID} durationSum={this.state.durationSum} seassions={this.state.seassions}  updateSeassion={this.updateSeassion} slotDuration={this.props.slotDuration} checkedStudents={this.props.checkedStudents} />
        </div> 
    );

  }
}

export default CreateSeassion;