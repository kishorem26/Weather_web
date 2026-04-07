async function getWeather() {
  const city = document.querySelector("input").value;

  // Step 1: Get coordinates
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );
  const geoData = await geoRes.json();

  if (!geoData.results) {
    alert("City not found");
    return;
  }

  const lat = geoData.results[0].latitude;
  const lon = geoData.results[0].longitude;

  // Step 2: Get weather
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  const weatherData = await weatherRes.json();

  console.log(weatherData);

  // Step 3: Show result
  document.querySelector(".result").innerHTML = `
    Temperature: ${weatherData.current_weather.temperature}°C <br>
    Wind Speed: ${weatherData.current_weather.windspeed} km/h
  `;
}