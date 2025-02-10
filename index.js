import { getTime, getDate, getWeather, getImage } from "./main.js";

getTime();
setInterval(getTime, 1000);

getDate();
setInterval(getDate, 60000);

getWeather();
setInterval(getWeather, 180000);

getImage();
