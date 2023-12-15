document.getElementById("location-form").addEventListener("submit", getWeather);

function getWeather(e) {
  e.preventDefault();

  const API_KEY = "ff4da444dd4555b6435a028be6b62f4b";
  //Write you code logic here;
  const input = document.getElementById("location-input").value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input} &appid=${API_KEY}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("City Not found");
      }
      return res.json();
    })
    .then((data) => {
      const weatherType = data.weather;
      const weather_data = document.getElementById("weather-data");
      weather_data.innerHTML = "";
      const temp = data.main.temp;
      const tempInC = Math.floor(temp - 273);
      const cityName = data.name;
      // create h1 and append
      const h1 = document.createElement("h1");
      weather_data.appendChild(h1);
      h1.innerHTML = cityName;

      // create p and append
      const cityTemp = document.createElement("p");
      cityTemp.innerHTML = tempInC + " °C";

      weather_data.appendChild(cityTemp);

      // create span and appnend
      weatherType.map((data) => {
        let weatherTypes = data.main;
        const myWeatherType = document.createElement("span");
        weather_data.appendChild(myWeatherType);
        myWeatherType.innerHTML = weatherTypes;
      });
    })
    .catch((err) => {
      const weather_data = document.getElementById("weather-data");
      weather_data.innerHTML = "";
      let h5 = document.createElement("h5");
      h5.innerHTML = "Error: City Not Found";
      weather_data.appendChild(h5);
    });

  // Error should be very specific
  // Error: Failed to fetch weather data,   should always fetch this error in case of any failure otherwise you test cases will get failed.
}
