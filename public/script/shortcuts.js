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

function fetchAllCalendars(calback) {
    fetch(`http://${urlstart}:8080/api/interrogations/`, getRequest)
    .then(res => {
        return res.json()
    }).then(data => {
        calback(data)
    })
}

function fetchAllDays(calback) {
    fetch(`http://${urlstart}:8080/api/interrogations/days`, getRequest)
        .then(res => {
            return res.json()
        }).then(data => {
            calback(data)
        })
}

function fetchFilteredCalendars(name, calback) {
    fetch(`http://${urlstart}:8080/api/interrogations/subject/${name.toLowerCase()}`, getRequest)
        .then(res => {
            return res.json()
        }).then(data => {
            calback(data)
        })
}

function fetchFilteredDays(name, calback) {
    if (name === ''){
        fetchAllDays(calback)
    }else{
        fetch(`http://${urlstart}:8080/api/interrogations/subject/${name.toLowerCase()}/days`, getRequest)
        .then(res => {
            return res.json()
        }).then(data => {
            calback(data)
        })
    }
}

function fetchDeleteCalendar(id) {
    fetch(`http://${urlstart}:8080/api/delete/${id}`, deleteRequest)
}


function drawCalendar(calendar, id) {
    board.innerHTML += `<div class="calendar" id ="c${id}"></div>`

    var card = document.getElementById(`c${id}`)
    card.innerHTML = 
        `<div class="cardtitle card">\
            <h4>${calendar.subject.toUpperCase()}</h4>\
        </div>\
        <div class="cardbody card"></div>`

    var cardbody = document.querySelector(`#c${id} div.cardbody`)
    calendar.days.forEach(day => {
        cardbody.innerHTML += '<div class="day"></div>'
    });

    var daycards = document.querySelectorAll(`#c${id} div.day`)
    var i = 0
    daycards.forEach(daycard => {
        daycard.innerHTML = 
            `<div class="date">\
                <h4>${calendar.days[i].date}</h4>\
            </div>\
            <div class="people"></div>`
        
        calendar.days[i].people.forEach(pearson => {
            daycard.querySelector('.people').innerHTML +=
                `<h4 class="pearson">${pearson}</h4>`
        });
        i += 1
    });
}

function drawDay(day) {
    board.innerHTML += 
        `<div class="dd">\
            <div class="name">\
                <h4>${day.subject.toUpperCase()}</h4>\
            </div>\
            \
            <div class="days">\
                <h4>|${day.days.toString().replace( /,/g, ' |---| ')}|</h4>\
            </div>\
        </div>`
}

function drawRemoveItem(item) {
    board.innerHTML += 
        `<div class="dd">\
            <div class="name">\
                <h4>${item.subject.toUpperCase()}</h4>\
            </div>\
            \
            <div class="days">\
                <h4>| Inizio : ${item.days[1]} |</h4>\
            </div>\

            <button id="${item.id}" class="removebutton">Rimuovi</button>\
        </div>`
    
    board.querySelectorAll('button.removebutton').forEach(butt => {
        butt.addEventListener('click', event => {
            fetchDeleteCalendar(event.target.id)
            loadRemoveSection()
        })
    });
}