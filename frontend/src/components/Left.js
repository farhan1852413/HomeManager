import Time from "./Time"
import { useState, useEffect } from "react";
import Weather from "./Weather";
import News from "./News";
import BgTwo from "./styled-components/BgTwo";

const Left = () => {
    const [location, setLocation] = useState({ lat: null, lon: null });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error(error.message);       
                }
            );
        } else {
            console.error( "Geolocation is not supported by your browser");
        }
    }, []);
    return (
        <div className="flex flex-col justify-between h-full">
            <BgTwo className="relative z-10">
                <Time />
            </BgTwo>
            <BgTwo className="rounded-3xl">
                <News className="rounded-3xl"/>
            </BgTwo>
            <BgTwo className="h-[335px]">
                <Weather location={location} />
            </BgTwo>
        </div>
    )
}

export default Left