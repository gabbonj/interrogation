
var board = document.getElementById('board')
var mode = ''

function loadAllCalendars() {
    mode = 'calendars'
    board.style.flexDirection  = 'row'
    board.innerHTML = ''
    fetchAllCalendars(calendars => {
        var index = 0
        calendars.forEach(element => {
            drawCalendar(element, index)
            index += 1
        });
    })
}

function loadAllDays(){
    mode = 'days'
    board.style.flexDirection  = 'column'
    board.style.justifyContent  = 'centre'
    board.innerHTML = ''
    fetchAllDays(days => {
        days.forEach(element => {
            drawDay(element)
        });
    })
}

document.getElementById('calendars').onclick = loadAllCalendars
document.getElementById('days').onclick = loadAllDays

loadAllCalendars()
