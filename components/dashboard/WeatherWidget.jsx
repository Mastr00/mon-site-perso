import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Default: Paris. Could be dynamic.
        fetch("https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true")
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error("API Error");
                setWeather(data.current_weather);
            })
            .catch(err => {
                console.error("Weather error:", err);
                setError(true);
            });
    }, []);

    return (
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow text-white">
            <h2 className="text-lg font-semibold opacity-90 mb-2">Météo (Paris)</h2>
            {error ? (
                <p className="text-sm opacity-80">Impossible de charger la météo.</p>
            ) : weather ? (
                <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold">{weather.temperature}°C</span>
                    <div className="text-right">
                        <p className="text-sm opacity-80">Vent: {weather.windspeed} km/h</p>
                        <p className="text-xs opacity-70">Code: {weather.weathercode}</p>
                    </div>
                </div>
            ) : (
                <p className="animate-pulse">Chargement...</p>
            )}
        </motion.div>
    );
}
