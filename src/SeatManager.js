import React from 'react';
import Seat from './Seat';

class SeatManager extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.rowsFrom = Number(this.props.rowsFrom);
    this.updateSeatId = this.props.updateSeatId;
    this.updateSeatInfo = this.props.updateSeatInfo;
    this.rowInfo = [];
    this.state = { selectedSeats: this.props.bookedSeats };
    this.categorySeats = [];
  }

  createSeats(seatsPerRow, rowId) {
    let seats = [], category = this.props.category;

    while(seatsPerRow > 0) {
      let seatId = this.updateSeatId();
      this.categorySeats.push({id: seatId, rowId: rowId, category: category});
      seats.push({seatId, rowId});
      seatsPerRow--;
    }
    return seats;
  }

  updateSeatState(id, rowId, unavailableSeats) {
    const seatsToBeBooked = Number(this.props.bookingInput.numberOfSeats);
    let ids = [];
    let filteredSeats = [];

    if (this.state.selectedSeats.length < seatsToBeBooked) {
      ids = this.state.selectedSeats;
    }
    
    this.categorySeats.forEach((seat) => {
      if(seat.rowId === rowId) {
        filteredSeats.push(seat.id);
      }
    });
    let bookedIds = [];
    for (let i = 0; i < ids.length; i++) {
      bookedIds.push(ids[i]);
    }

    //handle one by one seat booking
    let bookTill = seatsToBeBooked + id - ids.length;
    let price = 0;

    //case where last seat isn't under the current row
    if (filteredSeats.indexOf(bookTill-1) < 0) {
      bookedIds.push(id)
      ids = bookedIds;
      price = ids.length * Number(this.props.price);
      this.setState({selectedSeats: ids}, () => this.updateSeatInfo(ids, price));
      return;
    }

    let seatId = id;

    while(seatId < bookTill) {
      if (filteredSeats.indexOf(seatId) >= 0 && unavailableSeats.indexOf(seatId) < 0) {
        ids.push(seatId);
      }
      else {
        bookedIds.push(id)
        ids = bookedIds;
        break;
      }
      seatId++;

    }
    let selectedSeats = ids.length ? ids : [id];
    price = ids.length * Number(this.props.price);
    localStorage.setItem('bookingInfo', JSON.stringify({
      seatNumbers: ids,
      price: price,
      category: this.props.category.name,
      bookingInput: this.props.bookingInput}));
    this.setState({selectedSeats: selectedSeats}, () => this.updateSeatInfo(selectedSeats, price))
  }

  componentWillMount() {
    this.rowInfo = this.props.rows.map((seatsPerRow) => {
      let rowId = this.rowsFrom++;
      return {
        id: rowId,
        seats: this.createSeats(seatsPerRow, rowId)
      };
    });
  }

  render() {;
    return (
      <div>
        { 
          this.rowInfo.map((row) => {
            return (
              <div className="seat-row" key={"row"+ row.id} id={"row"+ row.id}>
                <div className="row-name">{row.id}</div>
                <div className="seat-container">
                  { 
                    row.seats.map((seat) => {
                      return(<Seat id={seat.seatId}
                        key={"seat-" + seat.seatId} 
                        updateSeatState={this.updateSeatState.bind(this)}
                        category={this.props.category}
                        rowId={seat.rowId}
                        selectedSeats={this.state.selectedSeats}
                        bookingInput={this.props.bookingInput}>
                    </Seat>
                    )})
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default SeatManager;
