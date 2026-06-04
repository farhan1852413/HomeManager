import { useState, useEffect, useCallback } from "react";
import locationIcon from "../assets/images/location-icon.svg"

const Weather = (props) => {
    const [weatherData, setWeatherData] = useState({});
    const [todayWeather, setTodayWeather] = useState(null);
    const [upcomingWeather, setUpcomingWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locationData, setLocationData] = useState(null)
    const location = props.location;

    const getTodayForecast = useCallback(() => {
        if(weatherData.list){
        const currentDate = new Date().toLocaleDateString('en-us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        
        const todayForecast = weatherData.list
            .filter((forecast) => {
                const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
                return forecastDate === currentDate;
            })
            .reduce((closest, forecast) => {
                const forecastTime = new Date(forecast.dt * 1000).getTime();
                const currentTime = new Date().getTime();
                return Math.abs(forecastTime - currentTime) < Math.abs(closest.dt * 1000 - currentTime)
                    ? forecast
                    : closest;
            }, weatherData.list[0]);
            setTodayWeather(todayForecast)
        }
    }, [weatherData.list]);

    
    // Function to get weather for the upcoming days at a specific time (e.g., 12:00 PM)
    const getUpcomingDaysForecasts = useCallback(() => {
        if(weatherData.list){
        const currentDate = new Date().toLocaleDateString('en-us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    
        const upcomingDaysForecasts = weatherData.list
            .filter((forecast) => {
                const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
                
                return forecastDate !== currentDate && new Date(forecast.dt * 1000).getHours() === 11;
            })
            .slice(0, 4);
        setUpcomingWeather(upcomingDaysForecasts);
        }
    }, [weatherData.list]);

    const fetchData =  useCallback(async() => {
            const apiKey = process.env.REACT_APP_YOUR_OPEN_WEATHER_API_KEY;
        
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`);
                const weatherData = await response.json();
                const data = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lon}&format=json`)
                const jsonData = await data.json();
                setLocationData(jsonData);
                setWeatherData(weatherData);      
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
    },[location]) 


    useEffect(() => { 
        fetchData();
        // console.log(location);
        setInterval(fetchData, 10 * 60 * 1000)
    },[fetchData, locationData, location])

    useEffect(() => {
        if(!loading){
            getTodayForecast();
            getUpcomingDaysForecasts();
        }
    },[loading, getTodayForecast, getUpcomingDaysForecasts])


    return(
        <div className="h-full flex items-center justify-center">
            {loading? <div className="animate-pulse">Fetching the Data....</div> : (
            <div className="weather-div">
            {(todayWeather )&& (upcomingWeather) && (locationData) && (
                <div className="p-3 items-center">
                        <div>
                            <div className="">
                            <h1 className="text-xl text-left font-semibold">Weather</h1>
                            <div className="flex opacity-50 text-sm ml-[-6px]">
                            <img className="scale-75" src={locationIcon} alt="location"/>
                            <h1  className="text-sm">{locationData.address?.city || locationData.address?.town || locationData.address?.suburb}, {locationData.address?.state}</h1>
                            </div>
                                <div className="flex justify-between items-center h-12 my-4">
                                <h1 className="text-2xl"><span className="text-[45px]">{todayWeather.main.temp.toFixed(0)}&deg;</span>C</h1>
                                <img className="scale-150" src={`https://openweathermap.org/img/wn/${todayWeather.weather[0].icon}@2x.png`} alt="weather-icon"/>
                                </div>
                            </div>          
                    </div>
                    <div className="flex justify-between items-baseline">
                            <h1 className="text-lg">Forecast</h1>
                            <h1 className="text-sm">Next 4 days</h1>
                    </div>
                    <div className="flex items-center">
                        {upcomingWeather.map((forecast, index) => (
                            <div key={index} className="bg-white/20 m-2 p-1 rounded-2xl forecast-item items-center">
                                <h1>{new Date(forecast.dt * 1000).toLocaleDateString('en-us', { weekday: 'short' })}</h1>
                                <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="weather-icon"/> 
                                <p>{forecast.main.temp.toFixed(0)}&deg;C</p>
                            </div>
                        ))}
                    </div>
                    {/* <div className="items-center">
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather-icon" />
                    </div> */}
                </div>
            )}
            </div>
            )}
        </div>
    )
}

export default Weather;