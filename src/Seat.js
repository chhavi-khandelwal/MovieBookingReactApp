import React from 'react';
import { alreadyBookedSeats, maxCapBooking } from './bookings.js';

class Seat extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.id = this.props.id;
    this.updateSeatState = this.props.updateSeatState;
    this.state = {
      gray: alreadyBookedSeats[this.props.category.name.toLowerCase()].indexOf(this.id) >= 0
    }
    this.seats = this.props.seats;
  }

  handleClick(id) {
    let category = this.props.category.name.toLowerCase();
    let input = this.props.bookingInput;
    if (alreadyBookedSeats[category].indexOf(id) >= 0 ||
        alreadyBookedSeats[category].length > this.props.seatsToBeBooked ||
        input.category !== category ||
        input.numberOfSeats > maxCapBooking) { alert('can not book'); return; }
        this.updateSeatState(id, this.props.rowId, alreadyBookedSeats[category]);
  }

  render() {
    let isBooked = (this.props.selectedSeats && this.props.selectedSeats.indexOf(this.id) >= 0);
    return (
      <div className={(this.state.gray ? "filled" : "") + " seat " + (isBooked ? 'booked' : '' )} 
        id={this.id} 
        onClick={this.handleClick.bind(this, this.id)}>{this.props.id}</div>
    )
  }
}

export default Seat;
