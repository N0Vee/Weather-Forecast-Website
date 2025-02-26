'use client'

import { useState } from "react";
import { CityInput } from "@/components/CityInput";

export default function Home() {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        if (!city || !country) {
            setError("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        try {
            const res = await fetch(`https://pro.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=a6a4658f756933f7ca35660ed0e3bdca`);
            const data = await res.json();

            if (res.ok) {
                setWeather(data);
                setError(null);
            } else {
                setWeather(null);
                setError(data.error || "เกิดข้อผิดพลาด");
            }
        } catch (err) {
            setError("ไม่สามารถเชื่อมต่อกับ API");
            setWeather(null);
        }
    };

    return (
        <div>
            <h1>ตรวจสอบสภาพอากาศ</h1>
            <input
                type="text"
                placeholder="กรอกจังหวัด"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <CityInput
                placeholder="Search for a city"
                style={{
                    width: 200,
                }}
                onChange={(e) => setCity(e.target.value)}
            />

            <input
                type="text"
                placeholder="กรอกประเทศ"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <button onClick={fetchWeather}>ค้นหา</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {weather && (
                <div>
                    <h2>อุณหภูมิ: {weather.main.temp}°C</h2>
                    <p>สภาพอากาศ: {weather.weather[0].description}</p>
                    <p>ความชื้น: {weather.main.humidity}%</p>
                </div>
            )}
        </div>
    );
}
