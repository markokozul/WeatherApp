import { API } from "./API";

const UIManager = () => {
  const container = document.getElementById("container");

  const initialPage = (() => {
    container.innerHTML = `<nav id="nav"><form id="form"><input type="search" id="search"><input type="submit"></form></nav><div id="box"><div id="box-1"><h1 id="location"></h1>
    <h1 id="condition"></h1></div><div id="box-2"><h1 id ="temp-c"></h1><img id="icon"></div></div>`;
  })();

  const searchPlace = (() => {
    const form = document.getElementById("form");
    const search = document.getElementById("search");

    form.addEventListener("submit", (e) => {
      API().getAPI(search.value);
      e.preventDefault();
    });
  })();

  const displayData = (data) => {
    const location = document.getElementById("location");
    const condition = document.getElementById("condition");
    const tempC = document.getElementById("temp-c");
    const icon = document.getElementById("icon");

    console.log(tempC);

    location.textContent = data.name;
    condition.textContent = data.condition;
    tempC.textContent = data.temp_c;
    icon.src = data.icon;
  };
  return { displayData };
};

export { UIManager };
