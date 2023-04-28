import { APIDataHandling } from "./APIDataHandling";

const UIManager = (() => {
  const content = document.getElementById("content");

  const initialPage = (() => {
    content.innerHTML = `
    <div id="container">
    <div id="loader-container">
    <div class="loader"></div>
    </div>
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
        <div id="details">
          <p>Detailed forecast</p>

          <div class ="details-row">
           <div class="details-item"></div>
           <div class="details-item"></div>
           <div class="details-item"></div>
          </div>
          <div class ="details-row">
           <div class="details-item"></div>
           <div class="details-item"></div>
           <div class="details-item"></div>
           </div>
        </div>
      </div>`;
  })();

  const searchPlace = (() => {
    const form = document.getElementById("form");
    const search = document.getElementById("search");

    form.addEventListener("submit", (e) => {
      APIDataHandling(search.value);
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
    for (let i = 0; i < 5; i++) {
      divs[
        i
      ].innerHTML = `<p>${data12h.time[i]}</p><img src="https://openweathermap.org/img/wn/${data12h.icon[i]}@2x.png"/><p>${data12h.temp_c[i]}°</p>`;
    }
  };
  const displayDetailedData = (detailedData) => {
    const divs = document.querySelectorAll(".details-item");
    for (let i = 0; i < detailedData.keys.length; i++) {
      divs[i].innerHTML = `<p>${detailedData.keys[i]}</p>
      <p>${detailedData.values[i]}</p>`;
    }
  };
  const loadIndicator = (state) => {
    const loader = document.getElementById("loader-container");
    console.log(loader);

    if (state === "active") {
      loader.classList.add("active");
    } else if (state === "done") {
      loader.classList.remove("active");
    }
  };

  return {
    displayCurrentForecastData,
    display12hForecastData,
    displayDetailedData,
    loadIndicator,
  };
})();

export { UIManager };
