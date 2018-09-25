import React, { Component } from 'react'
import {RectDatePicker} from 'rect-ui-calendar';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: '',
    }
  }
  render () {
    const {selected} = this.state;
    return (
      <div style={{padding: 30, width: 500}}>
        <RectDatePicker 
          icon='calendar outline'
          iconPosition='left'
          selected={selected} 
          onSelect={(selected)=>this.setState({selected})}/>
      </div>
    )
  }
}
