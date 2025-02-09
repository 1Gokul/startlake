import { appid, clientId, latitude, longitude } from "./config.js";

export const getTime = () => {
  const date = new Date();
  const [hour, minutes] = [date.getHours(), date.getMinutes()];

  document.getElementById("hour").innerText = hour.toString().padStart(2, "0");
  document.getElementById("minute").innerText = minutes
    .toString()
    .padStart(2, "0");
};

export const getDate = () => {
  const date = new Date();
  const [month, dateString] = [date.getMonth(), date.getDate()];

  document.getElementById("date").innerText = `${new Intl.DateTimeFormat(
    "en-IN",
    { month: "short" }
  ).format(month)} ${dateString}`;
  document.getElementById("day").innerText = date.toLocaleDateString("en-IN", {
    weekday: "long",
  });
};

export const getWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    if (json?.main) {
      document.getElementById("temp").innerText = `${Math.round(
        json?.main?.temp ?? 0
      )}°`;
    }

    if (json?.weather?.length) {
      document.getElementById("weather").innerText =
        json.weather[0]?.description ?? "unknown";
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getImage = async () => {
  try {
    const params = new URLSearchParams({
      query: "landscape",
      orientation: "landscape",
      client_id: clientId,
    });

    const response = await fetch(
      `https://api.unsplash.com/photos/random?${params}`
    );
    if (!response.ok) {
      document.getElementById("main-image").src = "lake.jpg";
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    if (json?.urls?.full) {
      document.getElementById("main-image").src = json.urls.full;
    }
  } catch (error) {
    document.getElementById("main-image").src = "lake.jpg";
    console.error(error.message);
  }
};
