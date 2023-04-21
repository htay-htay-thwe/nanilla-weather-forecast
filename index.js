function showDate(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}



let currentTime = new Date();
let timeElement = document.querySelector("#time");
timeElement.innerHTML = showDate(currentTime);

function showTemperature(response) {
  document.querySelector("#Name").innerHTML = response.data.name;

  
  document.querySelector("#temperatureNumber").innerHTML =
    Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity : ${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind : ${response.data.wind.speed}m/h`;

  document.querySelector("#descri").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  showDisplay(response.data.coord);
}

function showPosition(event) {
  event.preventDefault();
  let apiKey = "4d2c1bb3fb6e6c93ebaf9e2d8816b5ae";
  
  let cityName = document.querySelector("#forming").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
  
}
let searching = document.querySelector("#search");
searching.addEventListener("click",showPosition);

function formatDate(timestamp){
  let date=new Date(timestamp*1000);
  let day=date.getDay();
  let days=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
  return days[day];

}

function showForecast(response){
let forecastElement=document.querySelector("#forecast");
let  knowing=response.data.daily;
forecastHTML=`<div class="row">`;
knowing.forEach(function(day){

forecastHTML =
  forecastHTML +
  `<div class="col">
          <div class="dateDay">${formatDate(day)}</div>
             <p class="iconic">
                <img src="https://openweathermap.org/img/wn/10d@2x.png"/>
                </p>
                <div class="something">
                <span class="three">33°</span>
                <span class="six">36° </span>
            </div>
            </div>`;
});


            forecastHTML=forecastHTML +`</div>`;
forecastElement.innerHTML=forecastHTML;
}


function showDisplay(coordinates){
let apiKey = "97f8e93f00107773f88eafd933ce86b7";
let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(showForecast);
}