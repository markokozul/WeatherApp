const getAPI = async (searchValue) => {
  /*
    if (!searchValue) {
      searchValue = "london";
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=8c37a0de3d0f3764695df622cf71fa1e&units=metric`,
        { mode: "cors" }
      );
      const response2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=8c37a0de3d0f3764695df622cf71fa1e&units=metric`,
        { mode: "cors" }
      );

      const currentWeatherData = await response.json();
      const weatherData12hr = await response2.json();

      
    } catch (error) {
      console.log(error);
    }
    */
  try {
    const [response, response2, response3] = await Promise.all([
      fetchCurrentWeather(),
      fetch12hWeather(),
      fetch5DaysWeather(),
    ]);
    return { response, response2, response3 };
  } catch (error) {
    console.log(error);
  }

  if (!searchValue) {
    searchValue = "london";
  }

  async function fetchCurrentWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=8c37a0de3d0f3764695df622cf71fa1e&units=metric`,
      { mode: "cors" }
    );
    return await response.json();
  }
  async function fetch12hWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=8c37a0de3d0f3764695df622cf71fa1e&units=metric`,
      { mode: "cors" }
    );
    return await response.json();
  }
  async function fetch5DaysWeather() {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=0479021aa782499c879102938231804&q=${searchValue}&days=5`,
      { mode: "cors" }
    );
    return await response.json();
  }
};
export { getAPI };
