import { UIManager } from "./UI";
const API = () => {
  let requiredData = {
    name: "",
    localtime: "",
    condition: "",
    temp_c: "",
    temp_f: "",
    icon: "",
  };
  const getAPI = async (search) => {
    try {
      let searchValue = search;
      if (!searchValue) {
        searchValue = "london";
      }
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=0479021aa782499c879102938231804&q=${searchValue}&days=5`,
        { mode: "cors" }
      );
      const weatherData = await response.json();

      requiredData.name = weatherData.location.name;
      requiredData.localtime = weatherData.location.localtime;
      requiredData.condition = weatherData.current.condition.text;
      requiredData.temp_c = weatherData.current.temp_c;
      requiredData.temp_f = weatherData.current.temp_f;
      requiredData.icon = weatherData.current.condition.icon;

      UIManager().displayData(requiredData);
      console.log(weatherData);
    } catch (error) {
      console.log(error);
    }
  };

  return { getAPI };
};
export { API };
