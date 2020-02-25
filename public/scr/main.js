
var board = document.getElementById('board')
var subjectfilter = document.getElementById('subject')
var mode = ''

function loadAllCalendars() {
    mode = 'calendars'
    board.style.flexDirection  = 'row'
    board.innerHTML = ''
    subjectfilter.value = ''
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
    subjectfilter.value = ''
    board.innerHTML = ''
    fetchAllDays(days => {
        days.forEach(element => {
            drawDay(element)
        });
    })
}

function loadFilteredData() {
    board.innerHTML = ''
    if (mode === 'calendars') {
        fetchFilteredCalendars(subjectfilter.value, calendars => {
            var index = 0
            calendars.forEach(element => {
                drawCalendar(element, index)
                index += 1
            });
        })    
    }else if (mode === 'days'){
        fetchFilteredDays(subjectfilter.value, days => {
            days.forEach(element => {
                drawDay(element)
            });
        })
    }
}


document.getElementById('calendars').onclick = loadAllCalendars
document.getElementById('days').onclick = loadAllDays
document.getElementById('filter').onclick = loadFilteredData

loadAllCalendars()
