import {
  appid,
  clientId,
  latitude,
  longitude,
  numberOfImages,
} from "./config.js";

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

  try {
    const dateElement = document.getElementById("date");

    if (dateElement) {
      dateElement.innerText = `${new Intl.DateTimeFormat("en-IN", {
        month: "short",
      }).format(date)} ${date.getDate()}`;
    }

    const dayElement = document.getElementById("day");
    if (dayElement) {
      dayElement.innerText = date.toLocaleDateString("en-IN", {
        weekday: "long",
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}&units=metric`,
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    const tempElement = document.getElementById("temp");
    const weatherElement = document.getElementById("weather");

    if (tempElement) {
      if (json?.main) {
        tempElement.innerText = `${Math.round(json?.main?.temp ?? 0)}°`;
      }
    }
    if (weatherElement) {
      if (json?.weather?.length) {
        weatherElement.innerText = json.weather[0]?.description ?? "N/A";
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getImage = async () => {
  try {
    const randomImageIndex = Math.floor(Math.random() * numberOfImages);
    const imageElement = document.getElementById("main-image");

    if (imageElement) {
      imageElement.src = `./img/${randomImageIndex}.jpeg`;
    }
  } catch (error) {
    console.error(error.message);
  }
};
