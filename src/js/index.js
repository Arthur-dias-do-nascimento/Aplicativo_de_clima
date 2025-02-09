/* Variaveis */

/* Variaveis - Elementos HTML */

const form_search_weather = document.querySelector("#form-weather");

const title_city_weather = document.querySelector("#title");

const degree_value = document.querySelector("#degree-value");
const degree_description = document.querySelector("#degree-description");

const temp_max = document.querySelector("#temp-max");
const temp_min = document.querySelector("#temp-min");
const humidity = document.querySelector("#temp-humidity");
const wind = document.querySelector("#temp-wind");

const img_weather = document.querySelector("#img-weather");

const container_weather = document.querySelector(".container-weather");

/* Variaveis - Configurações da API */

const API_KEY = `ee92c5602b4da5b213df3311e9259692`;

const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather`;

/* Functions */

/* Function get Weather in API */

async function FetchWeather(name_city) {
    try {
        const response = await fetch(
            `${API_ENDPOINT}?q=${name_city}&appid=${API_KEY}&units=metric&lang=pt_br`
        );

        if (!response.ok) {
            throw new Error(`Error is Fetch, cod: ${response.status}`);
        }

        const data = await response.json();

        /* Object JSON Weather */

        const weather = {
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min,
            description: data.weather[0].description,
            tempIcon: data.weather[0].icon,
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
        };

        DisplayWeaher(weather);
    } catch (Error) {
        alert("Coloque um nome de uma cidade valído");

        console.error(Error);
    }
}

function DisplayWeaher(object) {
    container_weather.classList.remove("hidden");

    /* To place Object information for HTML Elements */

    title_city_weather.textContent = `${object.city}, ${object.country}`;

    degree_value.innerHTML = object.temp.toFixed(1).toString().replace(".", ",") + "<sup>°C</sup>";
    degree_description.textContent = object.description;

    img_weather.setAttribute("src", `http://openweathermap.org/img/wn/${object.tempIcon}@2x.png`);

    temp_max.innerHTML = object.tempMax.toFixed(1).toString().replace(".", ",") + "<sup>°C</sup>";
    temp_min.innerHTML = object.tempMin.toFixed(1).toString().replace(".", ",") + "<sup>°C</sup>";

    humidity.textContent = object.humidity + "%";

    wind.textContent = object.windSpeed + "km/h";
}

/* AddEventListener */

form_search_weather.addEventListener("submit", (event) => {
    event.preventDefault();

    const form_data = new FormData(form_search_weather);

    const name_city_weather = form_data.get("search-city-weather");

    FetchWeather(name_city_weather);
});