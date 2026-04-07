async function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    document.getElementById("error").innerText = "Enter city name";
    return;
  }

  try {
    document.getElementById("loader").style.display = "block";
    document.getElementById("error").innerText = "";

    const apiKey = "b90aaec436812d830bac7b95cfc5bb93";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("error").innerText = "City not found";
      document.getElementById("loader").style.display = "none";
      return;
    }

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp;
    document.getElementById("wind").innerText = data.wind.speed;
    document.getElementById("humidity").innerText = data.main.humidity;

    document.getElementById("weatherCard").style.display = "block";
    document.getElementById("loader").style.display = "none";

  } catch (err) {
    console.error(err);
    document.getElementById("error").innerText = "Something went wrong";
    document.getElementById("loader").style.display = "none";
  }
}