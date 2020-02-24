
var board = document.getElementById('board')

fetchall((calendars) => {
    var index = 0
    calendars.forEach(element => {
        drawCalendar(element, index)
        index += 1
    });
})
