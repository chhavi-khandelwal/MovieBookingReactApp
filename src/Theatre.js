import React from 'react';
import { theatreData } from './bookings.js';
import SeatManager from './SeatManager';

class Theatre extends React.Component {

  constructor(props) {
    super(props);
    this.data = theatreData || [];

    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
    //clear ls when input changed
    if (bookingInfo && this.props.numberOfSeats !== bookingInfo.bookingInput.numberOfSeats) { localStorage.clear(); }

    this.state = {
      totalPrice: (bookingInfo && bookingInfo.price) || 0,
      seats: (bookingInfo && bookingInfo.seatNumbers) || []
    };

    this.seatId = 1;

    this.bookingInput = {
      numberOfSeats: this.props.numberOfSeats,
      category: this.props.category
    };
  }

  updateSeatInfo(ids, price) {
    this.seats = {};
    ids.forEach((id) => {
      this.seats[id] = {
        booked: 1
      };
    });
    this.setState({seats: ids});
    this.setState({totalPrice: price});
  }

  updateSeatId() {
    return this.seatId++;
  }

  getRowStart(rowLength) {
    let rowsTill = this.rowsTill || 1;
    this.rowsTill = rowsTill + 1 + rowLength;
    return rowsTill;
  }

  componentWillMount() {
    this.updateSeatInfo(this.state.seats, this.state.totalPrice);
  }

  render() {
    return(
      <div>
        <strong>TotalPrice: Rs.{this.state.totalPrice}</strong>
        
        { 
          this.data.map((category, _key) =>
            <div key={category.name + "category"}  id={category.name + "category"}>
              <div className="header">{category.name}-{category.price}</div>
              <div className="seating">
                <SeatManager
                  rowsFrom={this.getRowStart.bind(this)(category.rows.length)} 
                  rows={category.rows}
                  updateSeatId={this.updateSeatId.bind(this)}
                  updateSeatInfo={this.updateSeatInfo.bind(this)}
                  category={category}
                  bookingInput={this.bookingInput}
                  price={category.price}
                  bookedSeats={this.state.seats}>
                </SeatManager>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default Theatre;
