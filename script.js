async function fetchWeather() {
  const city = document.getElementById("city").value.trim();
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=43cc65892bcc492c810102828252107&q=${city}&aqi=no`;

  const weatherDiv = document.getElementById("weather");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      weatherDiv.innerHTML = `<p>Error: ${data.error.message}</p>`;
      return;
    }

    weatherDiv.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <img src="https:${data.current.condition.icon}" alt="Weather Icon">
      <p><strong>${data.current.condition.text}</strong></p>
      <p>Temperature: ${data.current.temp_c}°C</p>
      <p>Humidity: ${data.current.humidity}%</p>
      <p>Wind: ${data.current.wind_kph} kph</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = "<p>Failed to load weather data.</p>";
    console.error("Error fetching weather:", error);
  }
}
