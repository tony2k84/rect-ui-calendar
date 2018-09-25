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
      <div style={{padding: 30, width: 500, border: '1px solid #444'}}>
        <RectDatePicker 
          selected={selected} 
          onSelect={(selected)=>this.setState({selected})}/>
      </div>
    )
  }
}
