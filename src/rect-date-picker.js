import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let selectedDate = props.selected || new Date();
    selectedDate.setMinutes(0);
    selectedDate.setSeconds(0);
    this.state = {
      startYear: selectedDate.getFullYear() - 10,
      years: this._setupYears(selectedDate.getFullYear() - 10),
      days: this._setupDays(selectedDate.getFullYear(), selectedDate.getMonth()),
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      _months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
      selectedDate: selectedDate,
      ampm: selectedDate.getHours() > 12 ? 'PM' : 'AM'
    }
    this.modal = React.createRef();
  }

  componentWillReceiveProps(nextProps){
    let selectedDate = nextProps.selected || new Date();
    selectedDate.setMinutes(0);
    selectedDate.setSeconds(0);
    this.setState({
      startYear: selectedDate.getFullYear() - 10,
      years: this._setupYears(selectedDate.getFullYear() - 10),
      days: this._setupDays(selectedDate.getFullYear(), selectedDate.getMonth()),
      selectedDate: selectedDate,
      ampm: selectedDate.getHours() > 12 ? 'PM' : 'AM'
    })
  }
  _setupYears = (startYear) => {
    let years = [];
    for (var year = startYear; year <= startYear + 10; year++) {
      years.push(year);
    }
    return years;
  }
  _setupDays = (year, month) => {
    let days = [];
    let date = new Date();
    date.setMonth(month);
    date.setYear(year);
    date.setHours(0, 0, 0);
    let day = 1;
    date.setDate(day);

    // buffer days based on weekday
    for (var wd = 0; wd < date.getDay(); wd++) {
      // push blank date
      days.push(null);
    }
    while (date.getMonth() === month) {
      days.push(new Date(date));
      day++;
      date.setDate(day);
    }
    return days;
  }
  renderMonth = (month) => {
    const { selectedDate, months } = this.state;
    const isCurrent = (month === selectedDate.getMonth());
    return (
      <div key={month}
        onClick={() => this.setMonth(month)}
        style={isCurrent ? { backgroundColor: this.props.theme || 'grey' } : null}
        className={[styles.month, isCurrent ? styles.selected : null].join(' ')}>
        {months[month]}
      </div>
    )
  }
  renderDay = (day, index) => {
    if (!day) {
      return <div key={index}></div>;
    }
    const { selectedDate } = this.state;
    const isCurrent = (day.getDate() === selectedDate.getDate());
    return (
      <div key={index}
        onClick={() => this.setDate(day.getDate())}
        style={isCurrent ? { backgroundColor: this.props.theme || 'grey' } : null}
        className={[styles.day, isCurrent ? styles.selected : null].join(' ')}>
        {day.getDate()}
      </div>
    )
  }
  renderYear = (year) => {
    const { selectedDate } = this.state;
    const isCurrent = (selectedDate.getFullYear() === year);
    return (
      <div key={year}
        onClick={() => this.setYear(year)}
        style={isCurrent ? { backgroundColor: this.props.theme || 'grey' } : null}
        className={[styles.value, isCurrent ? styles.selected : null].join(' ')}>
        {year}
      </div>
    )
  }
  renderHour = (hour) => {
    const { selectedDate } = this.state;
    let selectedHours12Format = selectedDate.getHours();
    if (selectedHours12Format > 12) {
      selectedHours12Format = selectedHours12Format - 12;
    }
    const isCurrent = (selectedHours12Format === hour);
    return (
      <div key={hour}
        onClick={() => this.setHours(hour)}
        style={isCurrent ? { backgroundColor: this.props.theme || 'grey' } : null}
        className={[styles.value, isCurrent ? styles.selected : null].join(' ')}>
        {hour.toString().padStart(2, 0)}
      </div>
    )
  }
  renderMinute = (minute) => {
    const { selectedDate } = this.state;
    const isCurrent = (selectedDate.getMinutes() === minute);
    return (
      <div key={minute}
        onClick={() => this.setMinutes(minute)}
        style={isCurrent ? { backgroundColor: this.props.theme || 'grey' } : null}
        className={[styles.value, isCurrent ? styles.selected : null].join(' ')}>
        {minute.toString().padStart(2, 0)}
      </div>
    )
  }

  // click handler - toggle am pm
  toggleAMPM = (e) => {
    const { selectedDate, ampm } = this.state;
    if (ampm === 'AM') {
      selectedDate.setHours(selectedDate.getHours() + 12);
      this.setState({ ampm: 'PM', selectedDate })
    } else {
      selectedDate.setHours(selectedDate.getHours() - 12);
      this.setState({ ampm: 'AM', selectedDate })
    }
  }
  // set minutes
  setMinutes = (minute) => {
    let { selectedDate } = this.state;
    selectedDate.setMinutes(minute);
    this.setState({ selectedDate })
  }
  // set hours
  setHours = (hour) => {
    let { selectedDate, ampm } = this.state;
    if (hour === 12) {
      selectedDate.setHours(hour);
      if (ampm === 'AM') {
        ampm = 'PM';
      }
    } else {
      selectedDate.setHours(ampm === 'PM' ? (hour + 12) : hour);
    }
    this.setState({ selectedDate, ampm })
  }
  // set date
  setDate = (date) => {
    let { selectedDate } = this.state;
    selectedDate.setDate(date);
    this.setState({ selectedDate })
  }
  daysInMonth = (m, y) => { // m is 0 indexed: 0-11
    switch (m) {
        case 1 :
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 8 : case 3 : case 5 : case 10 :
            return 30;
        default :
            return 31
    }
  }
  // set month
  setMonth = (month) => {
    let { selectedDate } = this.state;
    if(selectedDate.getDate() > this.daysInMonth(month, selectedDate.getFullYear())){
      selectedDate.setDate(1);
    }
    selectedDate.setMonth(month);
    this.setState({ selectedDate, days:  this._setupDays(selectedDate.getFullYear(), month)});
  }
  // set year
  setYear = (year) => {
    let { selectedDate } = this.state;
    if(selectedDate.getDate() > this.daysInMonth(selectedDate.getMonth(), year)){
      selectedDate.setDate(1);
    }
    selectedDate.setYear(year);
    this.setState({ selectedDate, days:  this._setupDays(year, selectedDate.getMonth()) })
  }
  // navigate year page
  navigateYearPage = (page) => {
    let { startYear } = this.state;
    // increment/decrement now
    startYear = startYear + (page * 10);
    this.setState({ startYear, years: this._setupYears(startYear) })
  }
  formatDate = () => {
    const { selectedDate, months } = this.state;

    return months[selectedDate.getMonth()] + " " +
      selectedDate.getDate().toString().padStart(2,0) + ", " +
      selectedDate.getFullYear() + " " +
      selectedDate.getHours().toString().padStart(2, 0) + ":" +
      selectedDate.getMinutes().toString().padStart(2, 0);
  }
  today = (e) => {
    let d = new Date()
    d.setMinutes(0);
    d.setSeconds(0);
    this.setState({ 
      selectedDate: d,
      years: this._setupYears(d.getFullYear()-10),
      days: this._setupDays(d.getFullYear(), d.getMonth()),
      ampm: d.getHours() > 12 ? 'PM' : 'AM'
    })
  }
  closeModal = (e) => {
    this.modal.current.style.display = 'none';
    if (this.props.onSelect) {
      this.props.onSelect(this.state.selectedDate);
    }
  }
  render() {
    const { years, hours, minutes, days, ampm, _months } = this.state;
    return (
      <div ref={this.modal}
        style={{ display: this.props.open ? 'block' : 'none' }}
        className={styles.modalWrapper}>
        <div className={styles.wrapper}>
          <div className={[styles.grid, styles.months].join(' ')}>
            {
              _months.map(month => this.renderMonth(month))
            }
          </div>
          <div className={styles.grid}>
            <div className={styles.weekdays}>
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className={styles.hours}>
              <div
                style={{ backgroundColor: this.props.theme || 'grey' }}
                className={styles.ampm} onClick={this.toggleAMPM}>{ampm}</div>
            </div>
          </div>
          <div className={styles.grid}>
            <div id="years" className={styles.select}>
              <div style={{marginBottom: 10}} className={styles.link} onClick={() => this.navigateYearPage(-1)}>Back</div>
              {
                years.map(year => this.renderYear(year))
              }
              <div style={{marginTop: 10}} className={styles.link} onClick={() => this.navigateYearPage(1)}>Next</div>
            </div>
            <div id="days" className={styles.days}>
              {
                days.map((day,index) => this.renderDay(day, index))
              }
            </div>
            <div id="hours" className={styles.select}>
              {
                hours.map(hour => this.renderHour(hour))
              }
            </div>
            <div id="minutes" className={styles.select}>
              {
                minutes.map(minute => this.renderMinute(minute))
              }
            </div>
          </div>
          <div style={{ display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', textAlign: 'center' }}>
            <div className={styles.date}>{this.formatDate()}</div>
            <div className={styles.button}
              style={{ backgroundColor: this.props.theme || 'grey' }}
              onClick={this.closeModal}>Done</div>
            <div className={styles.secondary}
              style={{ borderColor: this.props.theme || 'grey' }}
              onClick={this.today}>Today</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
