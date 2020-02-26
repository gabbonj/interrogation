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

function drawRemoveItem(item) {
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

    var removebutton = document.createElement('button')
    removebutton.className = 'removebutton'
    removebutton.innerText = 'Rimuovi'
    removebutton.id = `${item.id}`
    container.appendChild(removebutton)

    board.appendChild(container)

    board.querySelectorAll('button.removebutton').forEach(butt => {
        butt.addEventListener('click', event => {
            fetchDeleteCalendar(event.target.id)
            loadRemoveSection()
        })
    });
}