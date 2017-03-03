import axios from 'axios';

const API_KEY = '49018c4eb7d53ab4927fe95e59a42a27';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city, country='uk') {
    const url = `${ROOT_URL}&q=${city},${country}`;
    const request = axios.get(url);

    //call breezometer api with long/lat of city from request

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}

// add breezometer api function definition  here