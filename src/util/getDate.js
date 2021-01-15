export default function getDate(){
  var months = new Array(12);
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";

    var currentDate = new Date();
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var month_value = currentDate.getMonth();
    var yyyy = currentDate.getFullYear();
  
    return months[month_value] + ' ' + dd + ', ' + yyyy;
  }