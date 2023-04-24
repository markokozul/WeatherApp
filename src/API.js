import { UIManager } from "./UI";

const API = (() => {
  const getAPI = async (searchValue) => {
    if (!searchValue) {
      searchValue = "london";
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=8c37a0de3d0f3764695df622cf71fa1e&units=metric`,
        { mode: "cors" }
      );
      const response2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=8c37a0de3d0f3764695df622cf71fa1e&cnt=5&units=metric`,
        { mode: "cors" }
      );

      const currentWeatherData = await response.json();
      const weatherData12hr = await response2.json();

      let usedCurrentWeatherData = {
        name: "",
        condition: "",
        temp_c: "",
        temp_f: "",
        icon: "",
      };

      usedCurrentWeatherData.name = currentWeatherData.name;
      usedCurrentWeatherData.condition =
        currentWeatherData.weather[0].description;
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

      console.log(currentWeatherData);
      console.log(weatherData12hr);
    } catch (error) {
      alert(`Can't find city named "${searchValue}",please try again.`);
      console.log(error);
    }
  };

  return { getAPI };
})();

export { API };
