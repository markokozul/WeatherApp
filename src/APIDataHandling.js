import { UIManager } from "./UI";
import { getAPI } from "./API";

const APIDataHandling = async (searchValue) => {
  const data = await getAPI(searchValue);
  const currentWeatherData = data.response;
  const weatherData12hr = data.response2;

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

  let usedDetailedData = {
    keys: [
      "Feels like",
      "Humidity",
      "Pressure",
      "Temperature",
      "Max temp",
      "Min temp",
    ],
    values: [],
  };

  usedDetailedData.values.push(currentWeatherData.main.feels_like + "°");
  usedDetailedData.values.push(currentWeatherData.main.humidity);
  usedDetailedData.values.push(currentWeatherData.main.pressure);
  usedDetailedData.values.push(currentWeatherData.main.temp + "°");
  usedDetailedData.values.push(currentWeatherData.main.temp_max + "°");
  usedDetailedData.values.push(currentWeatherData.main.temp_min + "°");

  UIManager.displayDetailedData(usedDetailedData);

  console.log(usedDetailedData);
  console.log(currentWeatherData);
  console.log(weatherData12hr);
};

export { APIDataHandling };
