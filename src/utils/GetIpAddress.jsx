import React, { useState } from 'react';

const GetIpAddress = () => {
    const [ipAddress, setIpAddress] = useState('');
  const [location, setLocation] = useState({});

  useEffect(() => {
    const fetchIpData = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setIpAddress(data.ip);
        setLocation({ city: data.city, country: data.country_name });
      } catch (error) {
        console.error(error);
      }
    };
    fetchIpData();
  }, []);

  return (
    <div>
      <p>IP Address: {ipAddress}</p>
      <p>Location: {location.city}, {location.country}</p>
    </div>
  );
}

export default GetIpAddress;
