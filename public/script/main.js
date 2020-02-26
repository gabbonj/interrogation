
var board = document.getElementById('board')
var subjectfilter = document.getElementById('subject')
var mode = ''

async function loadAllCalendars() {
    mode = 'calendars'
    boardRow()
    resetUi()

    const calendars = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/`)
    var index = 0
    calendars.forEach(element => {
        drawCalendar(element, index)
        index += 1
    });
}

async function loadAllDays(){
    mode = 'days'
    boardRow()
    resetUi()

    const days = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/days`)
    days.forEach(element => {
        drawDay(element)
    });
}

async function loadRemoveSection() {
    mode = 'remove'
    boardColumn()
    resetUi()

    board.innerHTML += '<h4 id="removetitle">Rimuovi calendari</h4>'
    const days = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/days`)
    days.forEach(element => {
        drawRemoveItem(element)
    });
}

function loadModifySection() {
    // TODO 
}

async function loadFilteredData() {
    board.innerHTML = ''
    if (mode === 'calendars') {
        var index = 0
        const calendars = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/subject/${subjectfilter.value.toLowerCase()}`)
        calendars.forEach(element => {
            drawCalendar(element, index)
            index += 1
        });
    }else if (mode === 'days'){
        const days = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/subject/${subjectfilter.value.toLowerCase()}/days`)
        days.forEach(element => {
            drawDay(element)
        });
    }else if (mode === 'remove') {
        const days = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/subject/${subjectfilter.value.toLowerCase()}/days`)
        days.forEach(element => {
            drawRemoveItem(element)
        });
    }
}

document.getElementById('calendars').onclick = loadAllCalendars
document.getElementById('days').onclick = loadAllDays
document.getElementById('filter').onclick = loadFilteredData
document.getElementById('rem').onclick = loadRemoveSection
document.getElementById('cng').onclick = loadModifySection

loadAllCalendars()
