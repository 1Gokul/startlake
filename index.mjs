import { appid, latitude, longitude } from "./config.js";

export const getTime = () => {
  const date = new Date();
  const [hour, minutes] = [date.getHours(), date.getMinutes()];

  document.getElementById("hour").innerHTML = hour.toString().padStart(2, "0");
  document.getElementById("minute").innerHTML = minutes
    .toString()
    .padStart(2, "0");
};

export const getDate = () => {
  const date = new Date();
  const [month, dateString] = [date.getMonth(), date.getDate()];

  document.getElementById("date").innerHTML = `${new Intl.DateTimeFormat(
    "en-IN",
    { month: "short" }
  ).format(month)} ${dateString}`;
  document.getElementById("day").innerHTML = date.toLocaleDateString("en-IN", {
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
      document.getElementById("temp").innerHTML = `${Math.round(
        json?.main?.temp ?? 0
      )}°`;
    }

    if (json?.weather?.length) {
      document.getElementById("weather").innerHTML =
        json.weather[0]?.description ?? "unknown";
    }
  } catch (error) {
    console.error(error.message);
  }
};
