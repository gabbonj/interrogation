
var board = document.getElementById('board')
var mode = ''

function loadAllCalendars() {
    mode = 'calendars'
    board.innerHTML = ''
    fetchallCalendars((calendars) => {
        var index = 0
        calendars.forEach(element => {
            drawCalendar(element, index)
            index += 1
        });
    })
}

function loadAllDays(){
    mode = 'days'
    board.innerHTML = ''
    //TODO
}

document.getElementById('calendars').onclick = loadAllCalendars
document.getElementById('days').onclick = loadAllDays

loadAllCalendars()
