# React UI Calendar

> React UI Calendar

[![NPM](https://img.shields.io/npm/v/rect-ui-kit.svg)](https://www.npmjs.com/package/rect-ui-kit) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Description
This component is a unique calendar component based on semantic and react.

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
      <div>
        <RectDatePicker 
          selected={selected} 
          startYear={2013}
          onSelect={(selected)=>this.setState({selected})}/>
      </div>
    )
  }
}

```

## License

MIT © [tony2k84](https://github.com/tony2k84)
