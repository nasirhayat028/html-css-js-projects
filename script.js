// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.querySelector('.weather-info');
const weatherIcon = document.getElementById('weather-icon');
const tempValue = document.getElementById('temp-value');
const weatherDesc = document.getElementById('weather-desc');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const feelsLike = document.getElementById('feels-like');

// API Key
const API_KEY = '89c10c7f87c88b4b93e2a98cc14a8a19';

// Function to fetch weather data
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod === '404') {
            throw new Error('City not found');
        }

        return data;
    } catch (error) {
        throw error;
    }
}

// Function to update UI with weather data
function updateUI(data) {
    // Convert temperature from Kelvin to Celsius
    const tempCelsius = (data.main.temp - 273.15).toFixed(1);
    const feelsLikeCelsius = (data.main.feels_like - 273.15).toFixed(1);

    // Update temperature
    tempValue.textContent = tempCelsius;

    // Update weather description
    weatherDesc.textContent = data.weather[0].description;

    // Update weather icon
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Update details
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    feelsLike.textContent = `${feelsLikeCelsius}°C`;

    // Show weather info
    weatherInfo.classList.add('active');
}

// Function to handle errors
function handleError(error) {
    weatherInfo.classList.remove('active');
    alert(error.message);
}

// Event listener for search button
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const weatherData = await getWeatherData(city);
        updateUI(weatherData);
    } catch (error) {
        handleError(error);
    }
});

// Event listener for Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
