import React, { Component } from 'react'
import { Input, Button, Modal, Grid, Header, Label, Icon } from 'semantic-ui-react'
import styles from "./styles.css";

export default class RectDatePicker extends Component {

  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      open: false,
      daysInWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      selected: props.selected ? props.selected : today,
      selectedDateString: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: [],
      startYear: props.startYear ? props.startYear : today.getFullYear() - 5,
      years: [],
    }

  }

  componentDidMount() {
    this.updateData();
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  updateData() {
    const { selected, startYear } = this.state;

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

    let start = startYear;
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

    this.setState({
      selected: selectedDate,
      selectedDateString: selectedDate.getDate().toString().padStart(2, 0) + "/" + (selectedDate.getMonth() + 1).toString().padStart(2, 0) + "/" + selectedDate.getFullYear()
    }, () => { this.updateData(); this.close(); this.props.onSelect(selectedDate) });
  }

  navigateToday = () => {
    let selectedDate = new Date();
    this.setState({
      selected: selectedDate,
      selectedDateString: selectedDate.getDate().toString().padStart(2, 0) + "/" + (selectedDate.getMonth() + 1).toString().padStart(2, 0) + "/" + selectedDate.getFullYear()
    }, () => { this.updateData() });
  }

  renderMonths = () => {
    const { months, selected } = this.state;
    let currentMonth = months[selected.getMonth()];
    return months.map((item, index) =>
      <Grid.Column key={index} textAlign='center' onClick={() => this.navigateMonth(index)} style={{ cursor: 'pointer' }}>
        <Header as='h5' style={item === currentMonth ? { color: 'blue' } : { color: '#B3B3B3' }}>{item}</Header>
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
        className={selected.getFullYear() === item ? styles.selectedYear : styles.defaultYear}>{item}</div>
    )
  }

  renderDays = () => {
    const { days, selected } = this.state;
    return days.map((item, index) => {

      let dateRange = this.checkDate(item, selected);
      return (
        <Grid.Column key={index} textAlign='center'
          onClick={() => this.selectDate(item)} style={{ padding: 5 }}>
          <div className={dateRange == 0 ? styles.selectedDay : dateRange < 2 ? styles.defaultDay : styles.otherDay}>
            {item ? item.getDate() : ''}
          </div>
        </Grid.Column>
      )
    }
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
    let newStartYear = date.getFullYear() + (11 * page);
    date.setFullYear(newStartYear);
    this.setState({
      selected: date,
      startYear: newStartYear,
    }, () => this.updateData());

  }

  render() {
    const { open, selected, selectedDateString, months } = this.state
    return (
      <div>
        <Input icon='calendar' iconPosition='left' placeholder='DD/MM/YYYY' onClick={this.open} value={selectedDateString} />
        <Modal
          open={open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.close}
          size='small'
        >
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
          <Modal.Content>
            <Grid>
              <Grid.Row style={{ padding: 6 }}>
                <Grid.Column width={2} textAlign='center'>
                  <Icon key="0" name='chevron up' color='blue' style={{ marginBottom: 10 }} onClick={() => this.navigateYearPage(-1)} />
                  {
                    this.renderYears()
                  }
                  <Icon key="1" name='chevron down' color='blue' style={{ marginBottom: 10 }} onClick={() => this.navigateYearPage(1)} />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Grid columns={7} style={{ padding: 10, borderLeft: '1px solid rgba(179, 179, 179, 0.3)', borderRight: '1px solid rgba(179, 179, 179, 0.3)' }}>
                    {this.renderDays()}
                  </Grid>
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
      </div>
    )
  }
}