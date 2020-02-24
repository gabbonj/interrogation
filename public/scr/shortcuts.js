
function fetchall(calback) {
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
            <h4>${calendar.subject.toUpperCase()}<h4>\
        </div>\
        <div class="cardbody card"></div>`
}