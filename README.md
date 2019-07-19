## Available Scripts

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##files
* booking.js -> Hardcoded Input data
* App.js -> Entry Point Add your booking inputs to test 
  `<Theatre category="club" numberOfSeats="3"/>`
  Saves booked Info in localstorage. When Input is changed, localStorage is emptied.
* Theatre.js -> main view that allows you to book (Parent to Seat Manager)
* SeatManager.js -> Manages category wise seat placements and their states
* Seat.js -> responsible for marking a seat booked in UI and informing its parents of its state to update the totalPrice
