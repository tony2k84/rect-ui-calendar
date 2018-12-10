# React UI Calendar

> React UI Calendar

[![NPM](https://img.shields.io/npm/v/rect-ui-kit.svg)](https://www.npmjs.com/package/rect-ui-kit) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Description
This component is a unique calendar component based on semantic and react. This doesn't install the semantic and other dependencies. Hence please install 
  "prop-types": "^15.6.2",
  "react": "^16.4.1",
  "react-dom": "^16.4.1",
  "semantic-ui-css": "^2.3.3",
  "semantic-ui-react": "^0.82.1",

## Screenshot
<img src="screenshot.png"
     alt="How it looks"
     style="float: left; margin-right: 10px;" />

## Install

```bash
npm install --save rect-ui-calendar
```

## Usage

```jsx
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
    var str = selected.getDate()+"/"+(parseInt(selected.getMonth(), 10)+1).toString().padStart(2,0)+"/"+selected.getFullYear();
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


```

## License

MIT © [tony2k84](https://github.com/tony2k84/rect-ui-calendar)
