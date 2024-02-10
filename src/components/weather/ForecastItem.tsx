import {Daily} from "@/types/api/ForecastResponse"
import WeatherIcon from "./WeatherIcon";

interface Props {
    item: Daily
}

function ForecastItem({item}: Props) {

    let day = new Date(item.dt * 1000).toLocaleString("en-us", {weekday: "long"});

    return (
        <div className="flex justify-center items-center flex-col">
            <div>{day}</div>
            <WeatherIcon icon={item.weather[0].icon} size={36} />
            <div className="mt-3">
                <span className="text-primary">{Math.round(item.temp.min)}</span>
                -
                <span className="text-primary">{Math.round(item.temp.max)}</span>
            </div>
        </div>
    );
}

export default ForecastItem; 