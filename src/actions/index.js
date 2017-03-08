import axios from 'axios';

const API_KEY = '49018c4eb7d53ab4927fe95e59a42a27';
const TIME_KEY = '57OP4L4A74AV';

const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
const TIME_ROOT_URL = `http://api.timezonedb.com/v2/get-time-zone?key=${TIME_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_TIME = 'FETCH_TIME';

export function fetchWeather(city, country='uk') {
    const url = `${ROOT_URL}&q=${city},${country}`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}

export function fetchTime(lon, lat) {
    const url = `${TIME_ROOT_URL}&format=json&by=position&lat=${lat}&lng=${lon}`;
    const request = axios.get(url);

    return {
        type: FETCH_TIME,
        payload: request
    }
}