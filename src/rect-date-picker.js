import React, { Component } from 'react'
import { Button, Modal, Grid, Header, Icon } from 'semantic-ui-react'
import styles from './styles.css'

export default class RectDatePicker extends Component {

  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      daysInWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      selected: props.selected ? props.selected : today,
      selectedDateString: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: [],
      startYear: props.startYear ? props.startYear : today.getFullYear(),
      years: [],
      hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 59],
      selectedHour: 0,
      selectedMinutes: 0,
      ampm: 'AM',
      theme: props.theme ? props.theme:'blue'
    }

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected && nextProps.selected !== this.props.selected) {
      if (nextProps.selected instanceof Date && !isNaN(nextProps.selected)) {
        this.setState({ selected: nextProps.selected })
      } else {
        this.setState({ selected: new Date() })
      }
    }
  }
  componentDidMount() {
    this.updateData();
  }

  updateData() {
    const { selected, startYear } = this.state

    // generate days
    var firstDate = new Date(selected.getFullYear(), selected.getMonth(), 1);
    var lastDate = new Date(selected.getFullYear(), selected.getMonth() + 1, 1);
    lastDate.setDate(lastDate.getDate() - 1);

    var date = new Date(firstDate);
    var days = [];
    let years = [];
    // pre fill    
    while (date.getDay() !== 0) {
      date.setDate(date.getDate() - 1);
      days.unshift(new Date(date));
    }
    date = new Date(firstDate);
    while (date.getMonth() === selected.getMonth()) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    while (days.length < 42) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    let start = selected?selected.getFullYear():startYear;
    let end = start + 9;
    while (start <= end) {
      let _temp = start;
      years.push(start);
      start++;
    }

    this.setState({
      days: days,
      years: years
    });
  }

  checkDate = (date1, date2) => {
    if (date1.getFullYear() === date2.getFullYear()) {
      if (date1.getMonth() === date2.getMonth()) {
        if (date1.getDate() === date2.getDate()) {
          return 0;
        } else {
          return 1;
        }
      } else {
        return 2;
      }
    } else {
      return 3;
    }
  }

  selectDate = (selectedDate) => {
    const { ampm, selectedHour, selectedMinutes } = this.state;
    selectedDate.setHours(ampm === 'PM' ? selectedHour + 12 : selectedHour);
    selectedDate.setMinutes(selectedMinutes);
    selectedDate.setSeconds(0);
    this.setState({
      selected: selectedDate,
      selectedDateString: selectedDate.getDate().toString().padStart(2, 0)
        + '/'
        + (selectedDate.getMonth() + 1).toString().padStart(2, 0)
        + '/' + selectedDate.getFullYear()
        + ' ' + selectedDate.getHours().toString().padStart(2, 0)
        + ':' + selectedDate.getMinutes().toString().padStart(2, 0)
        + ':' + selectedDate.getSeconds().toString().padStart(2, 0)
    }, () => { this.updateData(); this.props.onSelect(selectedDate) });
  }

  navigateToday = () => {
    let selectedDate = new Date();
    this.setState({
      selected: selectedDate,
      selectedDateString: selectedDate.getDate().toString().padStart(2, 0) + '/' + (selectedDate.getMonth() + 1).toString().padStart(2, 0) + '/' + selectedDate.getFullYear()
    }, () => { this.updateData() });
  }

  renderMonths = () => {
    const { months, selected } = this.state;
    let currentMonth = months[selected.getMonth()];
    return months.map((item, index) =>
      <Grid.Column key={index}
        textAlign='center'
        onClick={() => this.navigateMonth(index)}
        style={{ cursor: 'pointer' }}>
        
        <Header
          as='h5'
          style={item === currentMonth ? { color: this.state.theme } : { color: '#B3B3B3' }}>
          {item}
        </Header>

      </Grid.Column>
    )
  }

  renderWeekHeaders = () => {
    const { daysInWeek } = this.state;
    return daysInWeek.map((item, index) =>
      <Grid.Column key={index} textAlign='center' style={{ padding: 5 }}>
        <Header as='h5' style={{ color: '#B3B3B3' }}>{item}</Header>
      </Grid.Column>
    )
  }

  renderYears = () => {
    const { years, selected } = this.state;
    return years.map((item) =>
      <div onClick={() => this.navigateYear(item)} key={item}
        style={selected.getFullYear() === item ? {color: this.state.theme}: {}}
        className={selected.getFullYear() === item ? styles.selectedYear : styles.defaultYear}>
        {item}
      </div>
    )
  }

  renderDays = () => {
    const { days, selected } = this.state;
    return days.map((item, index) => {

      let dateRange = this.checkDate(item, selected);
      return (
        <Grid.Column key={index} textAlign='center'
          onClick={() => this.selectDate(item)} style={{ padding: 5 }}>
          <div
            style={dateRange === 0 ? {backgroundColor: this.state.theme} : {}}
            className={dateRange === 0 ? styles.selectedDay : dateRange < 2 ? styles.defaultDay : styles.otherDay}>
            {item ? item.getDate() : ''}
          </div>
        </Grid.Column>
      )
    }
    )
  }

  renderHours() {
    const { hours, selectedHour } = this.state;
    return hours.map((item, index) =>

      <div key={item}
        onClick={() => this.setState({ selectedHour: item })}
        style={selectedHour === item ? { backgroundColor: this.state.theme } : {}}
        className={selectedHour === item ? styles.selectedTime : styles.defaultTime}>
        {item.toString().padStart(2, '0')}
      </div>

    )
  }

  renderMinutes() {
    const { minutes, selectedMinutes } = this.state;
    return minutes.map((item, index) =>
      <div key={item}
        onClick={() => this.setState({ selectedMinutes: item })}
        style={selectedMinutes === item ? { backgroundColor: this.state.theme } : {}}
        className={selectedMinutes === item ? styles.selectedTime : styles.defaultTime}>
        {item.toString().padStart(2, '0')}
      </div>
    )
  }

  navigateMonth = (month) => {
    let date = this.state.selected;
    date.setMonth(month);
    this.setState({
      selected: date
    }, () => this.updateData());
  }

  navigateYear = (year) => {
    let date = this.state.selected;
    date.setFullYear(year);
    this.setState({
      selected: date
    }, () => this.updateData());
  }

  navigateYearPage(page) {
    let date = this.state.selected;
    let newStartYear = date.getFullYear() + (10 * page);
    date.setFullYear(newStartYear);
    this.setState({
      selected: date,
      startYear: newStartYear
    }, () => this.updateData());
  }

  render() {
    const { selected, months, ampm } = this.state;
    const { open } = this.props;
    return (
      <Modal
        open={open}
        closeIcon={true}
        onClose={() => this.selectDate(selected)}
        size='small'>
        <Modal.Header>
          <Grid columns={12}>
            {
              this.renderMonths()
            }
          </Grid>
        </Modal.Header>
        <Modal.Header>
          <Grid>
            <Grid.Row style={{ padding: 6, alignItems: 'center' }}>
              <Grid.Column width={2}>
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid columns={7} style={{ padding: 10 }}>
                  {
                    this.renderWeekHeaders()
                  }
                </Grid>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button basic compact onClick={this.navigateToday}>Today</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Header>
        <Modal.Content style={{ padding: 7 }}>
          <Grid>
            <Grid.Row style={{ padding: 6 }}>
              <Grid.Column width={2} textAlign='center'>
                <Icon key='0'
                  style={{marginTop: 10, cursor: 'pointer', color: this.state.theme}}
                  name='chevron up'
                  onClick={() => this.navigateYearPage(-1)} />
                {
                  this.renderYears()
                }
                <Icon key='1'
                  name='chevron down'
                  style={{cursor: 'pointer', color: this.state.theme}}
                  onClick={() => this.navigateYearPage(1)} />
              </Grid.Column>
              <Grid.Column width={10} style={{ borderLeft: '1px solid rgba(179, 179, 179, 0.3)', borderRight: '1px solid rgba(179, 179, 179, 0.3)' }}>
                <Grid columns={7} style={{ padding: 10, }}>
                  {this.renderDays()}
                </Grid>
              </Grid.Column>
              <Grid.Column width={1} style={{ padding: 0, paddingBottom: 5, paddingTop: 5, textAlign: 'center' }}>
                <div
                  onClick={() => this.setState({ ampm: 'AM' })}
                  style={ampm === 'AM' ? {borderColor: this.state.theme} : {}}
                  className={ampm === 'AM' ? styles.selectedAMPM : styles.defaultAMPM}>AM</div>
                <div style={{ fontSize: 12, padding: 5 }}>HH</div>
                {this.renderHours()}
              </Grid.Column>
              <Grid.Column width={1} style={{ padding: 0, paddingBottom: 5, paddingTop: 5, textAlign: 'center', borderRight: '1px solid rgba(179, 179, 179, 0.3)' }}>
                <div
                  onClick={() => this.setState({ ampm: 'PM' })}
                  style={ampm === 'PM' ? {borderColor: this.state.theme} : {}}
                  className={ampm === 'PM' ? styles.selectedAMPM : styles.defaultAMPM}>PM</div>
                <div style={{ fontSize: 12, padding: 5 }}>MM</div>
                {this.renderMinutes()}
              </Grid.Column>
              <Grid.Column width={2} textAlign='center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Header as='h1' style={{ padding: 0, margin: 0 }}>{selected.getDate()}</Header>
                <Header as='h3' style={{ padding: 0, margin: 0 }}>{months[selected.getMonth()]}</Header>
                <Header as='h4' style={{ padding: 0, margin: 0, color: '#B3B3B3' }}>{selected.getFullYear()}</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }
}