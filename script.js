const apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const apiKey = "2eaa827ac0b25ba8bcb28ef2a7c05860";
const inputField = document.querySelector(".search-block input");
const searchBtn = document.querySelector(".search-block button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(countryName) {
  const response = await fetch(
    `${apiUrl}q=${countryName}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  // If user enter invalid country-name, it will display invalid-name message.
  if (response.status == 404) {
    document.querySelector(".invalid-name").style.display = "block";
    document.querySelector(".input-empty").style.display = "none";
    document.querySelector(".weather-info").style.display = "none";
    
  }
  // If user clicked on search-btn without putting a value in input-field, it will display empty-input message.
   else if (countryName == "") {
    document.querySelector(".input-empty").style.display = "block"; 
    document.querySelector(".weather-info").style.display = "none";
    document.querySelector(".invalid-name").style.display = "none";
  }

// If user enter a valid country name, it will display it's weather info.
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

// Adding event listener, So when user clicks on the search-icon, it will call getWeather() and excute it.
searchBtn.addEventListener("click", () => getWeather(inputField.value));
