import React from 'react'
import { useState } from 'react';
import {IoSearchOutline, IoLocationOutline} from 'react-icons/io5'

function Inputs({setQuery, units, setUnits, setLoading}) {
    const [city, setCity] = useState('');

    const handleSearchClick = () => {
        if (city !== '') {
            setQuery({q: city});
            setLoading(true);
            setCity('');
        }
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setQuery({lat, lon});
                setLoading(true);
            });
        }
    };

    const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name;
        if (units !== selectedUnit) {
            setUnits(selectedUnit);
            setLoading(true);
        }
    };

    return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input
            data-cy='search_input' 
            type='text' 
            className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
            placeholder='Search for city...' 
            onChange = {(e) => setCity(e.currentTarget.value)}
            value = {city}/>

            <IoSearchOutline data-cy='search_btn' size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' 
            onClick = {handleSearchClick}/>
            <IoLocationOutline data-cy='search_current_location' size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' 
            onClick = {handleLocationClick}/>
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='metric' className='text-xl text-white font-light transition ease-out hover:scale-125'
            onClick = {handleUnitsChange}>
                °C
            </button>
            <p className='text-xl text-white mx-1'>|</p>
            <button name='imperial' className='text-xl text-white font-light transition ease-out hover:scale-125'
            onClick = {handleUnitsChange}>
                °F
            </button>
        </div>

    </div>
    );
}

export default Inputs