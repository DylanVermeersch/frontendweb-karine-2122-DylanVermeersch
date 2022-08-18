import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import {useEffect, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({q: 'ghent'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q: 'current location.';
      
      toast.info('Fetching weather for ' + message);
      await getFormattedWeatherData({...query, units}).then((data) => {
        if (data instanceof String){
          setQuery({q: 'ghent'});
          fetchWeather();
        }
        else {
          toast.success(`Succesfully fetched weather for ${data.name}, ${data.country}.`);
          setWeather(data);
        }
        setLoading(false);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700';
    const threshold = units === 'metric' ? 20 : 68;
    if (weather.temp > threshold) return 'from-yellow-700 to-orange-700';

    return 'from-cyan-700 to-blue-700';
  };

  return(
  <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400`}>
    <TopButtons setQuery = {setQuery} setLoading = {setLoading} />
    <Inputs setQuery = {setQuery} units = {units} setUnits = {setUnits} setLoading = {setLoading} />

    {loading && (
      <div className='flex items-center justify-center my-3'>
      <h1 data-cy='loading_screen' className='text-white text-3xl font-medium'>
        Loading...
      </h1>
    </div>
    )}

    {weather && (
      <div>
        <TimeAndLocation weather = {weather}/>
        <TemperatureAndDetails weather = {weather} units = {units} />

        <Forecast title = {'hourly forecast'} items = {weather.hourly} />
        <Forecast title = {'daily forecast'} items = {weather.daily} />
      </div>
    )}
    <ToastContainer autoClose={3000} theme='colored' newestOnTop={true} />


  </div>
  );
}

export default App;
