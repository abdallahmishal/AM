// Current time
var now = new Date().getTime();

// Prayer times
var prayerTimes = [
  { name: "Fajr", time: "05:06" },
  { name: "Dhuhr", time: "12:27" },
  { name: "Asr", time: "15:53" },
  { name: "Maghrib", time: "18:33" },
  { name: "Isha", time: "20:33" }
];

// Next prayer time and countdown time to the next prayer
var nextPrayerTime = "";
var countdownTime = 0;

// Find the next prayer time
for (var i = 0; i < prayerTimes.length; i++) {
  var prayerTime = new Date().setHours(
    prayerTimes[i].time.split(":")[0], 
    prayerTimes[i].time.split(":")[1], 
    0
  );
  
  if (prayerTime > now) {
    nextPrayerTime = prayerTimes[i].name;
    countdownTime = prayerTime - now;
    break;
  }
}

// Countdown to the next prayer
if (nextPrayerTime !== "") {
  var countdown = formatTimeRemaining(countdownTime);

  // Add prayer time and buttons to the HTML
  var prayerTimeHTML = '<div>' + nextPrayerTime + ' (' + prayerTimes[i].time + ')</div>';
  prayerTimeHTML += '<div><button onclick="increasePrayerTime(' + i + ')">+</button>';
  prayerTimeHTML += '<button onclick="decreasePrayerTime(' + i + ')">-</button></div>';
  document.getElementById("prayer-time").innerHTML = prayerTimeHTML;
  
  document.getElementById("countdown").innerHTML = countdown;

  // Start countdown again after page reload
  setInterval(function() {
    countdownTime = countdownTime - 1000;

    if (countdownTime <= 0) {
      location.reload();
    } else {
      var countdown = formatTimeRemaining(countdownTime);
      document.getElementById("countdown").innerHTML = countdown;
    }
  }, 1000);
} else {
  document.getElementById("prayer-time").innerHTML = "No prayer left for today";
  document.getElementById("countdown").innerHTML = "";
}

function formatTimeRemaining(time) {
  var hours = Math.floor(time / (1000 * 60 * 60));
  var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((time % (1000 * 60)) / 1000);
  
  var formattedTime = '';
  
  if (hours < 10) {
    formattedTime += '0';
  }
  
  formattedTime += hours + ':';
  
  if (minutes < 10) {
    formattedTime += '0';
  }
  
  formattedTime += minutes + ':';
  
  if (seconds < 10) {
    formattedTime += '0';
  }
  
  formattedTime += seconds;
  
  return formattedTime;
}

// Increase prayer time
function increasePrayerTime(index) {
  var time = prayerTimes[index].time.split(":");
  var hours = parseInt(time[0]);
  var minutes = parseInt(time[1]);
  
  if (minutes === 59) {
    hours++;
    minutes = 0;
  } else {
    minutes++;
  }
  
  if (hours === 24) {
    hours = 0;
  }
  
  prayerTimes[index].time = formatTime(hours) + ":" + formatTime(minutes);
  updatePrayerTime(index);
}

// Decrease prayer time
// Decrease prayer time
function decreasePrayerTime(index) {
  var time = prayerTimes[index].time.split(":");
  var hours = parseInt(time[0]);
  var minutes = parseInt(time[1]);
  
  if (minutes === 0) {
  hours--;
  minutes = 59;
  } else {
  minutes--;
  }
  
  if (hours < 0) {
  hours = 23;
  }
  
  prayerTimes[index].time = formatTime(hours) + ":" + formatTime(minutes);
  updatePrayerTime(index);
  }
  
  // Update prayer time and countdown
  function updatePrayerTime(index) {
  var prayerTimeHTML = '<div>' + prayerTimes[index].name + ' (' + prayerTimes[index].time + ')</div>';
  prayerTimeHTML += '<div><button onclick="increasePrayerTime(' + index + ')">+</button>';
  prayerTimeHTML += '<button onclick="decreasePrayerTime(' + index + ')">-</button></div>';
  document.getElementById("prayer-time").innerHTML = prayerTimeHTML;
  
  if (nextPrayerTime === prayerTimes[index].name) {
  countdownTime = new Date().setHours(
  prayerTimes[index].time.split(":")[0],
  prayerTimes[index].time.split(":")[1],
  0
  ) - now;
  
  var countdown = formatTimeRemaining(countdownTime);
  document.getElementById("countdown").innerHTML = countdown;
  }
  }
  
  // Format time to add leading zeros
  function formatTime(time) {
  if (time < 10) {
  return "0" + time;
  } else {
  return time;
  }
  }