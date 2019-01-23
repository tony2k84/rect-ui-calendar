import React, { Component } from 'react'
import { RectDatePicker } from 'rect-ui-calendar';
import { Input, Icon } from 'semantic-ui-react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      open: false,
      selectedDateString: '',
    }
  }
  onSelect = (selected) => {
    console.log(selected);
    var str = selected.getDate()+"/"+
              (parseInt(selected.getMonth(), 10)+1).toString().padStart(2,0)+"/"+
              selected.getFullYear() + " "+
              selected.getHours().toString().padStart(2,0) + ":"+
              selected.getMinutes().toString().padStart(2,0) + ":"+
              selected.getSeconds().toString().padStart(2,0);
    this.setState({open: false, selectedDateString: str});
  }
  handleDateChange = (e, d) => {
    this.setState({selectedDateString: d.value})
  }
  open = (e) => {
    const {selectedDateString} = this.state;
    var d = new Date();
    var ds = selectedDateString.split("/");
    d.setDate(ds[0]);
    d.setMonth(ds[1]-1);
    d.setFullYear(ds[2]);
    d.setHours(0, 0, 0);
    this.setState({selected: d, open: true})
  }
  render() {
    const { selectedDateString, selected, open } = this.state;
    return (
      <div style={{ padding: 30, width: 500 }}>
        <Input icon={<Icon name='calendar outline' link onClick={this.open} />}
          style={{minWidth: 230}}
          iconPosition='left'
          placeholder='DD/MM/YYYY'
          onChange={this.handleDateChange}
          value={selectedDateString}
          />
        <RectDatePicker 
          open={open}
          selected={selected}
          onSelect={this.onSelect}/>
      </div>
    )
  }
}
