import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);
    const [locationName, setLocationName] = useState("Chargement...");

    useEffect(() => {
        const fetchWeather = (lat, lon, name) => {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) throw new Error("API Error");
                    setWeather(data.current_weather);
                    setLocationName(name);
                })
                .catch(err => {
                    console.error("Weather error:", err);
                    setError(true);
                    setLocationName("Erreur");
                });
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // On pourrait faire un reverse geocoding ici pour avoir le vrai nom de la ville
                    // Pour l'instant on met "Ma Position"
                    fetchWeather(latitude, longitude, "Ma Position");
                },
                (err) => {
                    console.warn("Geolocation denied or error:", err);
                    // Fallback Paris
                    fetchWeather(48.8566, 2.3522, "Paris (Par défaut)");
                }
            );
        } else {
            // Fallback Paris if no geolocation support
            fetchWeather(48.8566, 2.3522, "Paris (Par défaut)");
        }
    }, []);

    return (
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow text-white">
            <h2 className="text-lg font-semibold opacity-90 mb-2">Météo - {locationName}</h2>
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
                <p className="animate-pulse">Localisation en cours...</p>
            )}
        </motion.div>
    );
}
