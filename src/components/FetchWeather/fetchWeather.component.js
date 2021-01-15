import React from "react";

export default function FetchWeather(zipCode, setResponseObj, setLoading){
    console.log('FETCH WEATHER IS BEING CALLED!!')

    const apiKey = process.env.REACT_APP_WEATHER_TOKEN;
  
    const apiCall = 'https://api.openweathermap.org/data/2.5/weather/?zip='+zipCode+',us&appid='+apiKey+'&units=imperial'
    let request = new Request(apiCall);
  

    

    console.log(apiCall);
    console.log("fetchWeather zip: " + zipCode);
  
    fetch(request)
      .then(response => response.json())
      .then(response => {
        setResponseObj(response);
        setLoading(true);
      })
      .catch(error => console.log(error.message));
    
    return(
        <div>
        </div>
    );
  }