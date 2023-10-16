const apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const apiKey = "2eaa827ac0b25ba8bcb28ef2a7c05860";
const inputField = document.querySelector(".search-block input");
const searchBtn = document.querySelector(".search-block button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(countryName) {
  const response = await fetch(
    `${apiUrl}q=${countryName}&appid=${apiKey}&units=metric`
  );
  console.log(response)

  const data = await response.json();
  console.log(data);

  if (response.status == 404) {
    console.log('in invaild')
    document.querySelector(".invalid-name").style.display = "block";
    document.querySelector(".input-empty").style.display = "none";
    document.querySelector(".weather-info").style.display = "none";
    
  }
   else if (countryName == "") {
    console.log('in empty')
    document.querySelector(".input-empty").style.display = "block"; 
    document.querySelector(".weather-info").style.display = "none";
    document.querySelector(".invalid-name").style.display = "none";
  } 
  else {
    document.querySelector(".invalid-name").style.display = "none";
    document.querySelector(".input-empty").style.display = "none";
    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".country-name").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} Km/h`;

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "Images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "Images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "Images/drizzle.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "Images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "Images/snow.png";
    } else {
      weatherIcon.src = "Images/mist.png";
    }
  }
}

searchBtn.addEventListener("click", () => getWeather(inputField.value));
