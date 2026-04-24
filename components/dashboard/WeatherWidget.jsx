import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  Wind,
  MapPin,
  Loader2,
} from 'lucide-react';

// Maps WMO code to Lucide Icon and background color
const getWeatherInfo = (code) => {
  if (code === 0)
    return {
      icon: <Sun size={32} className="text-yellow-400" />,
      text: 'Ciel clair',
      color: 'from-blue-400 to-cyan-400',
    };
  if ([1, 2, 3].includes(code))
    return {
      icon: <Cloud size={32} className="text-gray-300" />,
      text: 'Nuageux',
      color: 'from-slate-500 to-slate-400',
    };
  if ([45, 48].includes(code))
    return {
      icon: <CloudFog size={32} className="text-gray-400" />,
      text: 'Brouillard',
      color: 'from-slate-400 to-gray-500',
    };
  if ([51, 53, 55, 56, 57].includes(code))
    return {
      icon: <CloudDrizzle size={32} className="text-blue-300" />,
      text: 'Bruine',
      color: 'from-blue-400 to-indigo-500',
    };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return {
      icon: <CloudRain size={32} className="text-blue-400" />,
      text: 'Pluie',
      color: 'from-blue-600 to-indigo-600',
    };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return {
      icon: <CloudSnow size={32} className="text-cyber-100" />,
      text: 'Neige',
      color: 'from-blue-200 to-blue-400',
    };
  if ([95, 96, 99].includes(code))
    return {
      icon: <CloudLightning size={32} className="text-yellow-300" />,
      text: 'Orage',
      color: 'from-slate-700 to-purple-900',
    };
  return {
    icon: <Sun size={32} className="text-yellow-400" />,
    text: 'Inconnu',
    color: 'from-blue-500 to-cyan-500',
  };
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat, lon, fallbackName) => {
      try {
        // Fetch reverse geocoding to get city
        let city = fallbackName;
        if (!fallbackName.includes('défaut')) {
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const geoData = await geoRes.json();
            city =
              geoData.address.city ||
              geoData.address.town ||
              geoData.address.village ||
              'Position Actuelle';
          } catch (e) {
            console.warn('Geocoding failed');
          }
        }

        setLocationName(city);

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await res.json();

        if (data.error) throw new Error('API Error');
        setWeather(data.current_weather);
        setLoading(false);
      } catch (err) {
        console.error('Weather error:', err);
        setError(true);
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude, 'Ma Position');
        },
        (err) => {
          console.warn('Geolocation denied or error:', err);
          fetchWeather(48.8566, 2.3522, 'Paris (défaut)');
        }
      );
    } else {
      fetchWeather(48.8566, 2.3522, 'Paris (défaut)');
    }
  }, []);

  if (loading) {
    return (
      <div className="h-full min-h-[160px] p-6 bg-cyber-900 border border-cyber-500/20 rounded-2xl flex flex-col items-center justify-center text-cyber-400">
        <Loader2 className="animate-spin mb-2" size={24} />
        <span className="text-sm">Localisation en cours...</span>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="h-full min-h-[160px] p-6 bg-cyber-900 border border-red-500/20 rounded-2xl flex flex-col items-center justify-center text-red-400">
        <span className="text-sm">Météo indisponible</span>
      </div>
    );
  }

  const info = getWeatherInfo(weather.weathercode);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`h-full p-6 bg-gradient-to-br ${info.color} rounded-2xl shadow-lg text-cyber-100 relative overflow-hidden flex flex-col justify-between`}
    >
      <div className="absolute top-[-20%] right-[-10%] opacity-20 pointer-events-none transform scale-150">
        {info.icon}
      </div>

      <div className="flex justify-between items-start z-10 relative">
        <div>
          <h3 className="text-3xl font-bold flex items-start">
            {Math.round(weather.temperature)}°
          </h3>
          <p className="text-sm font-medium opacity-90 mt-1">{info.text}</p>
        </div>
        <div className="bg-cyber-50/20 p-2 rounded-xl backdrop-blur-md border border-white/20">
          {info.icon}
        </div>
      </div>

      <div className="mt-4 pt-4 flex items-center justify-between border-t border-white/20 text-sm z-10 relative">
        <div className="flex items-center gap-1.5 opacity-90 font-medium">
          <MapPin size={16} /> <span className="truncate max-w-[100px]">{locationName}</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-90">
          <Wind size={16} /> {weather.windspeed} km/h
        </div>
      </div>
    </motion.div>
  );
}
