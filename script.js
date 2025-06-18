document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const getWeatherButton = document.getElementById('get-weather-btn');
    const errorMessage = document.getElementById('error-message');
    const weatherInfo = document.getElementById('weather-info');

    const API_KEY = "e62ad86ad07c097f482f2ee750300e37";

    getWeatherButton.addEventListener('click', async ()=>{
        const city = cityInput.value.trim();     
        if(city === "") return;

        //server may throw you error
        //server|database is in another continent

        try{
           const waetherData = await fetchWeatherData(city);
           displayWeatherData(waetherData);
           cityInput.value = "";
        }
        catch (error) {
            showError();
            cityInput.value = "";
        }
        
    });

    async function fetchWeatherData(city){
        //get the dat
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(" City not found");
        }
        const data = await response.json();
        
        return data;
    }

    function displayWeatherData(data){
        //display
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp}`
        descriptionDisplay.textContent = `Description: ${weather[0].description}`
        //unlock display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError(error){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});