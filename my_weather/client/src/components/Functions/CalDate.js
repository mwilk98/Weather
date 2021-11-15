function CalDate(time,timezone)
{

    var date = new Date(time*1000+timezone*1000-3600000);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();

    var daytime = day + '-' + month + '-' + year;

    return daytime;

}

export default CalDate;