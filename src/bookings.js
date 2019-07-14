const theatreData = [
  {name: 'CLUB', rows: [8, 9, 25], price: 200},
  {name: 'EXECUTIVE', rows: [10, 10, 10, 10, 8, 9, 10], price: 200},
  {name: 'NORMAL', rows: [10, 10], price: 200}
];

const alreadyBookedSeats = { club: [4, 5, 20, 25] ,  executive: [58, 60, 70, 77] , normal: [101, 102] };

const maxCapBooking = 10;

export { theatreData, alreadyBookedSeats, maxCapBooking };
