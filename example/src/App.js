import React, { Component } from 'react'
import {RectDatePicker} from 'rect-ui-kit';

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
      <div>
        <RectDatePicker 
          selected={selected} 
          startYear={2013}
          onSelect={(selected)=>this.setState({selected})}/>
      </div>
    )
  }
}
