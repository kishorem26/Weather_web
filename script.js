async function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    document.getElementById("error").innerText = "Enter city name";
    return;
  }

  try {
    // loader show
    document.getElementById("loader").style.display = "block";
    document.getElementById("error").innerText = "";

    // Step 1: get coordinates
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoRes.json();

    if (!geoData.results) {
      document.getElementById("error").innerText = "City not found";
      document.getElementById("loader").style.display = "none";
      return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;

    // Step 2: get weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const data = await weatherRes.json();

    // show data
    document.getElementById("cityName").innerText = city;
    document.getElementById("temp").innerText = data.current_weather.temperature;
    document.getElementById("wind").innerText = data.current_weather.windspeed;
    document.getElementById("humidity").innerText = "--"; // open-meteo no humidity here

    document.getElementById("weatherCard").style.display = "block";

    // hide loader
    document.getElementById("loader").style.display = "none";

  } catch (err) {
    console.error(err);
    document.getElementById("error").innerText = "Something went wrong";
    document.getElementById("loader").style.display = "none";
  }
}