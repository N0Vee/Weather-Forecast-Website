// components/CityInput.js

import React, { useState } from "react";
import { Select } from "antd";

let timeout;
let currentValue;

const fetchCountries = (value, callback) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    const fake = () => {
        fetch("http://localhost:3000/api/countries") // ใช้ API ที่เราสร้างไว้
            .then((response) => response.json())
            .then((data) => {
                if (currentValue === value) {
                    const countries = data.data; // ดึงข้อมูลจาก response
                    const filteredCountries = countries.map((item) => ({
                        value: item.country, // ใช้ชื่อประเทศเป็น value
                        text: item.country, // ใช้ชื่อประเทศเป็น text
                    }));
                    callback(filteredCountries); // ส่งข้อมูลที่กรองแล้วให้ callback
                }
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
                callback([]); // หากเกิดข้อผิดพลาดให้ส่ง array ว่าง
            });
    };

    if (value) {
        timeout = setTimeout(fake, 300);
    } else {
        callback([]);
    }
};

const CityInput = (props) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState();

    const handleSearch = (newValue) => {
        fetchCountries(newValue, setData); // เรียกใช้ฟังก์ชัน fetchCountries
    };

    const handleChange = (newValue) => {
        setValue(newValue); // ตั้งค่าค่าที่เลือก
    };

    return (
        <Select
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch} // เมื่อค้นหาจะเรียก handleSearch
            onChange={handleChange} // เมื่อเลือกค่าจะแปลงค่าที่เลือก
            notFoundContent={null}
            options={(data || []).map((d) => ({
                value: d.value, // ชื่อประเทศ
                label: d.text, // ชื่อประเทศ
            }))}
        />
    );
};

export { CityInput };
