function CalDate(time)
{

    var date = new Date(time * 1000);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();

    var daytime = day + '-' + 0 + month + '-' + year;

    return daytime;

}

export default CalDate;