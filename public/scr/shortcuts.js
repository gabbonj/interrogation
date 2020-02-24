
function fetchallCalendars(calback) {
    fetch('http://localhost:8080/api/interrogations/')
    .then(res => {
        return res.json()
    }).then(data => {
        calback(data)
    })
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