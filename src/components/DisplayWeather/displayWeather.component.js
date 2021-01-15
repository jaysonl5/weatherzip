import React from 'react';
import getDate from "../../util/getDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';

export default function DisplayWeather(responseObj){
    console.log("displayWeather Called!")
    return(
      <div className="row">
        <div className="col-1-of-3"></div>
        {responseObj.responseObj.cod === 200 ? 
            <div className="weatherCard col-1-of-3">
            <h6 className="weatherCard__date">{getDate()}</h6>
              <h2 className="weatherCard__cityName">{responseObj.responseObj.name}</h2>
              
              <span className="weatherCard__mainWeather">
                <h1 className="weatherCard__currentTemp">{Math.round(responseObj.responseObj.main.temp)}°</h1>
                <h1 className="weatherCard__condition">{responseObj.responseObj.weather[0].main}</h1>
              </span>
              
              <img className="weatherCard__icon" src={`http://openweathermap.org/img/wn/`+responseObj.responseObj.weather[0].icon+`@4x.png`} alt="weather icon"></img>
                
                <span className="weatherCard__subTemps">
                  <p className="weatherCard__maxTemp"><FontAwesomeIcon icon={faChevronUp} size="lg" /> {Math.round(responseObj.responseObj.main.temp_max)}°</p>
                  <p className="weatherCard__minTemp"><FontAwesomeIcon icon={faChevronDown} size="lg" /> {Math.round(responseObj.responseObj.main.temp_min)}°</p>
                  <p className="weathercard__wind"><FontAwesomeIcon icon={faWind} size="lg" /> {Math.round(responseObj.responseObj.wind.speed)} mph</p>
                </span>
                
            </div>
          : null 
        }
      <div className="col-1-of-3"></div>
      </div>
    );
}

