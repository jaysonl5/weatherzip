import React from "react";
import FetchWeather from "../FetchWeather/fetchWeather.component";

export default function WeatherForm({setZipCode, setError, error, setResponseObj, setLoading}){

    const [currentZip, setCurrentZip] = React.useState('');
  
    function validateZip(zip) {
      return /^\d{5}(-\d{4})?$/.test(zip);
    }
  
    function handleSearch(event){ 
      event.preventDefault()
      setZipCode(event.target.elements.zipInput.value);
      FetchWeather(currentZip, setResponseObj, setLoading);
    
    } 
  
    function handleChange(event){
      setCurrentZip(event.target.value);
    }
  
    return(
    <div className="row">
        <div className="col-1-of-3"></div>
            <form className="form__container col-1-of-3" onSubmit={handleSearch}>
                <input
                    placeholder="Enter a zip code"
                    className="form__input"
                    pattern="[0-9]{5}"
                    id="zipInput"
                    value={currentZip}
                    onChange={handleChange}
                />
        
                <div>
                    {error}
                </div>
        
                <button className="form__button" disabled={Boolean(error)} type="submit" variant="dark">Submit</button> 
                
            </form>
        <div className="col-1-of-3"></div>
    </div>
    );
  }