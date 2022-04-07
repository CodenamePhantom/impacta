setInterval(function runClock() {
  var currentTime = new Date();
  var clockObject = document.getElementById("clock");

  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();
  var currentSecond = currentTime.getSeconds();

  if(currentHour < 10) {
    currentHour = "0" + currentHour;
  }
  if(currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }
  if(currentSecond < 10) {
    currentSecond = "0" + currentSecond;
  }

  var timeString = `${currentHour}:${currentMinute}:${currentSecond}`;

  clockObject.innerHTML = timeString;
}, 1000);
