const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

var ticketPrice = parseInt(movieSelect.value);
// save selected movie index and price
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}
// update total and count....
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    const seatIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));


    console.log(seatIndex);
    console.log(seats);
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    //console.log(selectedSeatsCount);
}
// get data from LocalStorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !==null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex!==null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
    
}
// movie select event...
movieSelect.addEventListener('change',function(e){
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
});

// Seat click event...
container.addEventListener('click',function(e){
    if(
        e.target.classList.contains('seat') &&
        ! e.target.classList.contains('occupied')
    ){
        e.target.classList.toggle('selected');
        
        updateSelectedCount();
    }
}); 

// Initial count and total set;
updateSelectedCount();