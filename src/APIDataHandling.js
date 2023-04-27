import { UIManager } from "./UI";
import { getAPI } from "./API";

const APIDataHandling = async (searchValue) => {
  const data = await getAPI(searchValue);

  const currentWeatherData = data.response;
  const weatherData12hr = data.response2;
  const weatherData5Days = data.response3;
  console.log(weatherData5Days);

  let usedCurrentWeatherData = {
    name: "",
    condition: "",
    temp_c: "",
    icon: "",
  };

  usedCurrentWeatherData.name = currentWeatherData.name;
  usedCurrentWeatherData.condition = currentWeatherData.weather[0].description;
  usedCurrentWeatherData.temp_c = currentWeatherData.main.temp;
  usedCurrentWeatherData.icon = currentWeatherData.weather[0].icon;

  UIManager.displayCurrentForecastData(usedCurrentWeatherData);

  let usedWeatherData12hr = {
    time: [],
    icon: [],
    temp_c: [],
  };

  for (let i = 0; i < weatherData12hr.list.length; i++) {
    usedWeatherData12hr.temp_c.push(
      parseInt(weatherData12hr.list[i].main.temp)
    );
    usedWeatherData12hr.icon.push(weatherData12hr.list[i].weather[0].icon);

    const dt = weatherData12hr.list[i].dt_txt;
    let time = dt.split(/[/ :]/);
    time[1] += ":00";

    usedWeatherData12hr.time.push(time[1]);
  }
  UIManager.display12hForecastData(usedWeatherData12hr);

  const getCurrentDate = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (parseInt(day) < 10) {
      day = `0${day}`;
    }
    if (parseInt(month) < 10) {
      month = `0${month}`;
    }
    let currentDate = `${year}-${month}-${day}`;

    return currentDate;
  };

  let usedWeatherData5Days = {
    time: ["today"],
    icon: [currentWeatherData.weather[0].icon],
    temp_c: [currentWeatherData.main.temp],
  };
  function parseDate(input) {
    let parts = input.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  function getName(day) {
    if (day == 0) return "Sunday";
    else if (day == 1) return "Monday";
    else if (day == 2) return "Tuesday";
    else if (day == 3) return "Wednesday";
    else if (day == 4) return "Thursday";
    else if (day == 5) return "Friday";
    return "Saturday";
  }
  for (let i = 1; i < weatherData5Days.forecast.forecastday.length; i++) {
    const dt = weatherData5Days.forecast.forecastday[i].date;
    const date = parseDate(dt);
    const dayName = getName(date.getDay());

    if (i === 1 && dt == getCurrentDate()) {
    } else {
      usedWeatherData5Days.time.push(dayName);

      usedWeatherData5Days.icon.push(weatherData12hr.list[i].weather[0].icon);
    }
  }
  console.log(usedWeatherData5Days);

  console.log(currentWeatherData);
  console.log(weatherData12hr);
};

export { APIDataHandling };
