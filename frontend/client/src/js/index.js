// import '../css/style.css' //!uncomment when using webpack

function search() {
    const date = $('#datepicker').val()
    const sport = $('#selection').val()
    const location = $('#location').val()
    console.log(date, sport, location)
}

$('#search-btn').on('click', search)
