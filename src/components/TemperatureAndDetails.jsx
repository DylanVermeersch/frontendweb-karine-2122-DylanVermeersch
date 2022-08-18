import React from 'react'
import {
    UilArrowUp, 
    UilArrowDown,
    UilEye,
    UilTemperature, 
    UilTear, 
    UilWind, 
    UilSun,
    UilSunset,
} from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({units, weather: {
    details, icon, temp, temp_min, temp_max, sunrise, sunset, speed,
    humidity, feels_like, timezone, visibility
}}) {
  return (
    <div>
        <div className='flex justify-center items-center py-6 text-xl text-cyan-300'>
            <p data-cy='weather_details'>{details}</p>
        </div>
        <div className='flex flex-row items-center justify-between text-white py-3'>
            <img src={iconUrlFromCode(icon)} alt='' className='w-20' />
            <p data-cy='weather_current_temp' className='text-5xl'>{`${temp.toFixed()}°`}</p>
            <div className='flex flex-col space-y-2'>
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilTemperature size={18} className='mr-1'/>
                    Real feel:
                    <span data-cy='weather_realfeel' className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                </div>
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilTear size={18} className='mr-1'/>
                    Humidity:
                    <span data-cy='weather_humidity' className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
                </div>
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilWind size={18} className='mr-1'/>
                    Wind:
                    <span data-cy='weather_wind_speed' className='font-medium ml-1'>{units === 'metric' ? `${(speed * 3.6).toFixed()} km/h` : `${speed.toFixed()} MPH`}</span>
                </div>
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilEye size={18} className='mr-1'/>
                    Visibility:
                    <span data-cy='weather_visibility' className='font-medium ml-1'>{`${(visibility / 1000).toFixed()} km`}</span>
                </div>
            </div>
        </div>
        <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
            <UilSun />
            <p className='font-light'>
                Rise: 
                <span data-cy='weather_sunrise' className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span>
            </p>
            <p className='font-light'>|</p>
            <UilSunset />
            <p className='font-light'>
                Set: 
                <span data-cy='weather_sunset' className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span>
            </p>
            <p className='font-light'>|</p>
            <UilArrowUp />
            <p className='font-light'>
                High: 
                <span data-cy='weather_temp_high' className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
            </p>
            <p className='font-light'>|</p>
            <UilArrowDown />
            <p className='font-light'>
                Low: 
                <span data-cy='weather_temp_low' className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
            </p>
        </div>
    </div>
  )
}

export default TemperatureAndDetails