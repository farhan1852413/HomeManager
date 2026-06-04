import { useState, useEffect } from "react";

const CUrrentLocation = () => {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);

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
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <p>Latitude: {location.lat}</p>
                    <p>Longitude: {location.lon}</p>
                </div>
            )}
        </div>
    );
};

export default CUrrentLocation;
