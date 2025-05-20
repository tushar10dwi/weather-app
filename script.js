const iconMap = {
  "clear-day": "https://openweathermap.org/img/wn/01d.png",
  "clear-night": "https://openweathermap.org/img/wn/01n.png",
  "partly-cloudy-day": "https://openweathermap.org/img/wn/02d.png",
  "partly-cloudy-night": "https://openweathermap.org/img/wn/02n.png",
  "cloudy": "https://openweathermap.org/img/wn/03d.png",
  "rain": "https://openweathermap.org/img/wn/09d.png",
  "snow": "https://openweathermap.org/img/wn/13d.png",
  "fog": "https://openweathermap.org/img/wn/50d.png",
  "wind": "https://openweathermap.org/img/wn/50d.png"
};

function createWeatherCard(address,icon,temp,weather,humid,wind) {
    const card = document.querySelector(".weather-card");
    card.removeChild(card.lastChild);

    const container = document.createElement('div');
    container.classList.add("elements");

    const location = document.createElement('div');
    location.classList.add('location');
    location.textContent = address;
    container.appendChild(location);

    const weatherIcon = document.createElement('img');
    weatherIcon.classList.add('weather-icon');
    weatherIcon.src = iconMap[icon] || iconMap["clear-day"];
    container.appendChild(weatherIcon);


    const temperature = document.createElement('div');
    temperature.classList.add('temperature');
    temperature.textContent = `${temp}°`;
    container.appendChild(temperature);


    const description = document.createElement('div');
    description.classList.add('description');
    description.textContent = weather;
    container.appendChild(description);

    const details = document.createElement('div');
    details.classList.add('details');

    const humidity = document.createElement('div');
    humidity.textContent = `Humidity: ${humid}%`;

    const windspeed = document.createElement('div');
    windspeed.textContent = `Wind: ${wind} km/h`;
    
    details.appendChild(humidity);
    details.appendChild(windspeed);
    container.appendChild(details);

    card.appendChild(container);


}

async function getWeatherDetails() {
    const request = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/mumbai?unitGroup=metric&key=RQKLNMNFNXFB4SG7WS4FAHCXB&contentType=json", {
    "method": "GET",
    "mode":"cors",
    "headers": {
    }
    });

    const response = await request.json();

    console.log(response);

//     const request = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/mumbai?unitGroup=us&key=RQKLNMNFNXFB4SG7WS4FAHCXB&contentType=json", {
//   "method": "GET",
//   "mode": "cors",
//   "headers": {
//   }
//   })
// .then(response => {
//   setTimeout(()=>{console.log(response.json())},1000);
// })
// .catch(err => {
//   console.error(err);
// });

    const address = response.resolvedAddress;
    const icon = response.currentConditions.icon;
    const temperature = response.currentConditions.temp;
    const weather = response.currentConditions.conditions;
    const humid = response.currentConditions.humidity;
    const wind = response.currentConditions.windspeed;
    
    createWeatherCard(address,icon,temperature,weather,humid,wind);

}

getWeatherDetails();

const search = document.querySelector(".search-button");
search.addEventListener('click', ()=> {
    getWeatherDetails();
})