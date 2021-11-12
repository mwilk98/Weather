function CalTime(time,timezone)
{

    var date = new Date(time*1000+timezone*1000-7200000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var daytime = hours + ':' + minutes + ':' + seconds;

    return daytime;
}

export default CalTime;