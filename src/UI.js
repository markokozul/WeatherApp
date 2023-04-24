import { API } from "./API";

const UIManager = (() => {
  const container = document.getElementById("container");

  const initialPage = (() => {
    container.innerHTML = `
    <div id="column1">
      <nav id="nav">
          <form id="form">
            <input type="search" id="search" placeholder="Search for cities"/>
            <button type="submit" ><i class="fa fa-search"></i></button>
          </form>
        </nav>
        <div id="box">
          <div id="box-1">
            <div id="loc-con">
              <h1 id="location"></h1>
              <p id="condition"></p>
            </div>
            <h1 id="temp-c"></h1>
          </div>
          <div id="box-2">
            <img id="icon" />
          </div>
        </div>
        <div id="forecast-12hr">
          <p>12 hour forecast</p>
          <div id="forecast-12hr-divbox">
            <div class="forecast-12hr-div"></div>
            <div class="forecast-12hr-div"></div>
            <div class="forecast-12hr-div"></div>
            <div class="forecast-12hr-div"></div>
            <div class="forecast-12hr-div"></div>
          </div>
        </div>
      </div>
      <div id="column2">
        <div id="forecast-5days">
        <div class="forecast-5days-div"></div>
        <div class="forecast-5days-div"></div>
        <div class="forecast-5days-div"></div>
        <div class="forecast-5days-div"></div>
        <div class="forecast-5days-div"></div>
        </div>
      </div>`;
  })();

  const searchPlace = (() => {
    const form = document.getElementById("form");
    const search = document.getElementById("search");

    form.addEventListener("submit", (e) => {
      API.getAPI(search.value);
      console.log("Lol");
      e.preventDefault();
    });
  })();

  const displayCurrentForecastData = (data) => {
    const location = document.getElementById("location");
    const condition = document.getElementById("condition");
    const tempC = document.getElementById("temp-c");
    const icon = document.getElementById("icon");

    location.textContent = data.name;
    condition.textContent = data.condition;
    tempC.textContent = parseInt(data.temp_c) + "°";
    icon.src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
  };
  const display12hForecastData = (data12h) => {
    const divs = document.querySelectorAll(".forecast-12hr-div");
    console.log("dijk");
    for (let i = 0; i < divs.length; i++) {
      divs[
        i
      ].innerHTML = `<p>${data12h.time[i]}</p><img src="https://openweathermap.org/img/wn/${data12h.icon[i]}@2x.png"/><p>${data12h.temp_c[i]}°</p>`;
    }
  };
  const display5DaysForecastData = (data5Days) => {
    const divs = document.querySelectorAll(".forecast-5days-div");
    for (let i = 0; i < divs.length; i++) {
      divs[
        i
      ].innerHTML = `<p>${data5Days.time[i]}</p><img src="https://openweathermap.org/img/wn/${data5Days.icon[i]}@2x.png"/><p>${data5Days.temp_c[i]}°</p>`;
    }
  };
  return { displayCurrentForecastData, display12hForecastData };
})();

export { UIManager };
