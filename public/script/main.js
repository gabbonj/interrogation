
var board = document.getElementById('board')
var subjectfilter = document.getElementById('subject')
var mode = ''

function loadAllCalendars() {
    mode = 'calendars'
    boardRow()
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
    boardRow()
    board.innerHTML = ''
    subjectfilter.value = ''
    fetchAllDays(days => {
        days.forEach(element => {
            drawDay(element)
        });
    })
}

function loadRemoveSection() {
    mode = 'remove'
    boardColumn()
    board.innerHTML = ''
    board.innerHTML += '<h4 id="removetitle">Rimuovi calendari</h4>'
    fetchAllDays(days => {
        days.forEach(element => {
            drawRemoveItem(element)
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
    }else if (mode === 'remove') {
        fetchFilteredDays(subjectfilter.value, days => {
            days.forEach(element => {
                drawRemoveItem(element)
            });
        })
    }
}



document.getElementById('calendars').onclick = loadAllCalendars
document.getElementById('days').onclick = loadAllDays
document.getElementById('filter').onclick = loadFilteredData
document.getElementById('rem').onclick = loadRemoveSection

loadAllCalendars()
