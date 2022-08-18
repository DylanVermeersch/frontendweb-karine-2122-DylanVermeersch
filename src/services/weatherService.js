import {DateTime} from 'luxon';
import {toast} from 'react-toastify';
import config from '../config.json';

const API_KEY_PRIVATE = config.api_key;
const BASE_URL_API = config.base_url;

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL_API + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY_PRIVATE});

    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    try {
        const {
            coord: {lat, lon},
            main: {temp, feels_like, temp_min, temp_max, humidity}, 
            name, 
            dt, 
            sys: {country, sunrise, sunset}, 
            weather, 
            wind: {speed}, 
            visibility
        } = data;
    
        const {main: details, icon} = weather[0];
    
        return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, 
        name, dt, country, sunrise, sunset, details, icon, speed, visibility};
    } catch {
        toast.error(`${data.message}`);
        return data.message;
    }
}

const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data;
    daily = daily.slice(1,6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        };
    });

    hourly = hourly.slice(1,6).map(h => {
        return {
            title: formatToLocalTime(h.dt, timezone, 'hh:mm a'),
            temp: h.temp,
            icon: h.weather[0].icon
        };
    });

    return {timezone, daily, hourly}
};

const getFormattedWeatherData = async (searchParams) => {
    let formattedCurrentWeather = await getWeatherData ('weather', searchParams).then(formatCurrentWeather);

    if (typeof formattedCurrentWeather === 'string'){
        searchParams.q = 'ghent';
        formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);
    }

    const {lat, lon} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat,
        lon, 
        exclude: 'current,minutely,alerts', 
        units: searchParams.units
    }).then(formatForecastWeather)
    
    return {...formattedCurrentWeather, ...formattedForecastWeather};
};

const formatToLocalTime = (
    secs, 
    zone, 
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
    ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode};