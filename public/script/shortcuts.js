//localhost
//192.168.1.105
const urlstart = 'localhost'

const getRequest = { method : 'GET' }
const postRequest = { method : 'POST' }
const deleteRequest = { method : 'DELETE' }

function boardRow() {
    board.style.flexDirection  = 'row'
}

function boardColumn() {
    board.style.flexDirection  = 'column'
    board.style.justifyContent  = 'centre'
}

function resetUi() {
    board.innerHTML = ''
    subjectfilter.value = ''
}

async function getJsonFromFetch(url) {
    var out
    await fetch(url, getRequest)
        .then(res => {
            return res.json()
        }).then(data => {
            out = data
        })
    return out
}

function fetchDeleteCalendar(id) {
    fetch(`http://${urlstart}:8080/api/delete/${id}`, deleteRequest)
}


function drawCalendar(calendar, id) {
    var container = document.createElement('div')
    container.className = 'calendar'

    var cardtitle = document.createElement('div')
    cardtitle.className = 'cardtitle'
    var cardtitletext = document.createElement('h4')
    cardtitletext.innerHTML = `${calendar.subject.toUpperCase()}`
    cardtitle.appendChild(cardtitletext)
    container.appendChild(cardtitle)

    var cardbody = document.createElement('div')
    cardbody.className = 'cardbody card'
    for (let i = 0; i < calendar.days.length; i++) {
        var daycard = document.createElement('div')
        daycard.className = 'day'

        var date = document.createElement('div')
        date.className = 'date'
        var datetext = document.createElement('h4')
        datetext.innerText = `${calendar.days[i].date}`
        date.appendChild(datetext)
        daycard.appendChild(date)

        var people = document.createElement('div')
        people.className = 'people'
        calendar.days[i].people.forEach(pearson => {
            var pearsonname = document.createElement('h4')
            pearsonname.className = 'pearson'
            pearsonname.innerText = pearson
            people.appendChild(pearsonname)
        });
        daycard.appendChild(people)

        cardbody.appendChild(daycard)
    }
    container.appendChild(cardbody)

    board.appendChild(container)

}

function drawDay(day) {
    var container = document.createElement('div')
    container.className = 'dd'
    
    var name = document.createElement('div')
    name.className = 'name'
    var nametext = document.createElement('h4')
    nametext.innerText = `${day.subject.toUpperCase()}`
    name.appendChild(nametext)
    container.appendChild(name)

    var days = document.createElement('div')
    days.className = 'days'
    var daystext = document.createElement('h4')
    daystext.innerText = `|${day.days.toString().replace( /,/g, ' |---| ')}|`
    days.appendChild(daystext)
    container.appendChild(days)

    board.appendChild(container)
}

function drawItem(item, type) {
    var container = document.createElement('div')
    container.className = 'dd'

    var name = document.createElement('div')
    name.className = 'name'
    var nametext = document.createElement('h4')
    nametext.innerText = `${item.subject.toUpperCase()}`
    name.appendChild(nametext)
    container.appendChild(name)

    var days = document.createElement('div')
    days.className = 'days'
    var daystext = document.createElement('h4')
    daystext.innerText = `| Inizio : ${item.days[1]} |`
    days.appendChild(daystext)
    container.appendChild(days)

    var button = document.createElement('button')
    if (type === 'remove') {
        button.className = 'removebutton but'
        button.innerText = 'Rimuovi'
        button.addEventListener('click', event => {
            fetchDeleteCalendar(event.target.id)
            loadRemoveSection()
        })
    }else if (type === 'modify') {
        button.className = 'modifybutton but'
        button.innerText = 'Modifica'
        button.addEventListener('click', event => {
            drawmodifyitem(event.target.id)
        })
    }
    button.id = `${item.id}`
    container.appendChild(button)

    board.appendChild(container)
}

function getJsonFromForm(form) {
    var data = new FormData(form)
    console.log(data.keys.toString())
}

async function drawmodifyitem(itemid) {
    resetUi()
    const calendar = await getJsonFromFetch(`http://${urlstart}:8080/api/interrogations/${itemid}`)
    
    var container = document.createElement('form')
    container.className = 'editcalendar'
    container.action = "/"

    var subjectdisplay = document.createElement('div')
    subjectdisplay.className = 'subjectdisplay'
    var subjecttext = document.createElement('h4')
    subjecttext.innerText = 'Materia:'
    subjectdisplay.appendChild(subjecttext)
    var subjectinput = document.createElement('input')
    subjectinput.className = 'subject'
    subjectinput.name = 'subject0'
    subjectdisplay.appendChild(subjectinput)
    subjectinput.value = calendar.subject
    container.appendChild(subjectdisplay)

    var daysdisplay = document.createElement('div')
    daysdisplay.className = 'daysdisplay'
    var daystext = document.createElement('h4')
    daystext.innerText = 'Giorni'
    daysdisplay.appendChild(daystext)
    for (let i = 0; i < calendar.days.length; i++) {
        var dayrow = document.createElement('div')
        dayrow.className = 'dayrow'
        dayrow.id = i

        var dateinput = document.createElement('input')
        dateinput.className = 'subject dateinput'
        dateinput.value = calendar.days[i].date
        dateinput.name = `date${i}`
        dayrow.appendChild(dateinput)

        var peopleinput = document.createElement('input')
        peopleinput.className = 'subject peopleinput'
        peopleinput.style.marginLeft ='10px'
        peopleinput.value = calendar.days[i].people.toString()
        peopleinput.name = `people${i}`
        dayrow.appendChild(peopleinput)

        daysdisplay.appendChild(dayrow)
    }
    daysdisplay.style.marginTop = '10px'
    container.appendChild(daysdisplay)

    var sendbutton = document.createElement('button')
    sendbutton.className = 'but modifybutton'
    sendbutton.innerText = 'Conferma'
    sendbutton.style.marginTop = '10px'
    container.appendChild(sendbutton)

    ////////////////////////////////////// aggiungere la parte per aggiungere o togliere una dayrow 

    board.appendChild(container)
    // fix this
    sendbutton.onclick = getJsonFromForm(container)
}