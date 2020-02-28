
var board = document.getElementById('board')
var boardtitle = document.getElementById('boardtitle')
var subjectfilter = document.getElementById('subject')
var mode = ''

async function loadAllCalendars() {
    mode = 'calendars'
    boardRow()
    resetUi()

    boardtitle.innerText = ''
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

    boardtitle.innerText = ''
    const days = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/days`)
    days.forEach(element => {
        drawDay(element)
    });
}

async function loadRemoveSection() {
    mode = 'remove'
    boardColumn()
    resetUi()

    boardtitle.innerText = 'Rimuovi calendari'
    const days = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/days`)
    days.forEach(element => {
        drawItem(element, mode)
    });
}

async function loadModifySection() {
    mode = 'modify'
    boardColumn()
    resetUi()
  
    boardtitle.innerText = 'Modifica calendari'
    const calendars = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/days`)
    calendars.forEach(element => {
        drawItem(element, mode)
    });
}

function loadAddSection() {
    mode = 'add'
    boardColumn()
    resetUi()

    boardtitle.innerText = 'Aggiungi calendario'
    drawmeditItem( {subject : '', days : [ {date : '', people : []} ]} )
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
    }else if (mode === 'remove' || 'modify') {
        subjectfilter.value === '' ?  
            days = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/days`) : 
            days = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/subject/${subjectfilter.value.toLowerCase()}/days`)
            
        days.forEach(element => {
            drawItem(element, mode)
        });
    }
}

document.getElementById('calendars').onclick = loadAllCalendars
document.getElementById('days').onclick = loadAllDays
document.getElementById('filter').onclick = loadFilteredData
document.getElementById('rem').onclick = loadRemoveSection
document.getElementById('cng').onclick = loadModifySection
document.getElementById('add').onclick = loadAddSection

loadAllCalendars()
