const loader = document.getElementById("loader");

async function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Enter city name");
    return;
  }

  loader.style.display = "block";
  document.getElementById("weatherCard").style.display = "none";

  try {
    // 🌍 Get coordinates
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results) {
      loader.style.display = "none";
      alert("City not found");
      return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;

    // 🌦 Get weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const data = await weatherRes.json();

    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    const code = data.current_weather.weathercode;

    document.getElementById("cityName").innerText = geoData.results[0].name;
    document.getElementById("temp").innerText = temp;
    document.getElementById("wind").innerText = wind;
    document.getElementById("humidity").innerText = "--";

    // 🌤 Weather icon
    let icon = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // sunny
    if (code > 3 && code <= 67) {
      icon = "https://cdn-icons-png.flaticon.com/512/414/414825.png"; // cloudy
    } else if (code > 67) {
      icon = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // rain
    }

    document.getElementById("icon").src = icon;

    loader.style.display = "none";
    document.getElementById("weatherCard").style.display = "block";

  } catch (err) {
    loader.style.display = "none";
    alert("Error fetching weather");
  }
}