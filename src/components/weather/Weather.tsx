import {callForecastApi, callWeatherApi} from "@/api/api"

import ForecastList from "./ForecastList";
import {ForecastResponse} from "@/types/api/ForecastResponse"
import SearchForm from "./SearchForm";
import WeatherInfo from "./WeatherInfo";
import { useState } from "react";

interface Props {
    city: string
}

function Weather({city}: Props) {

    const [weatherState, setWeatherState] = useState<weather>({
        city: "",
        wind: 0,
        humidity: 0,
        description: "",
        icon: "",
        daily: []
    });

    const [forecastState, setForecastState] = useState<ForecastResponse | null>(null);

    const getWeatherData = async (city: string) => {
        const response = await callWeatherApi({city});

        const weather = {
            city: response.name,
            wind:response.wind.speed,
            humidity: response.main.humidity,
            description: response.weather[0].description,
            icon: response.weather[0].icon,
            daily: []
        }
        setWeatherState(weather);

        const forecastResponse =  await callForecastApi({lat: response.coord.lat, lon: response.coord.lon})
        setForecastState(forecastResponse);
    }

    if(weatherState.city.length === 0) {
        getWeatherData(city);
    }

    return (
        <div className="bg-white shadow mt-4 rounded-2xl p-8 py-16">
            <SearchForm city={city} getWeatherData={getWeatherData}/>
            <WeatherInfo weather={weatherState}/>
            <ForecastList forecast={forecastState}/>
        </div>
    );
}

export default Weather;