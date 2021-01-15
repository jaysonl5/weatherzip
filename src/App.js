import React from "react";
import "./css/App.css";
import "./sass/App.scss"
import Header from "./components/header.component";
import Footer from "./components/footer.component"

import DisplayWeather from "./components/DisplayWeather/displayWeather.component";
import WeatherForm from "./components/WeatherForm/weatherForm.component";

function App() {
  const [responseObj, setResponseObj] = React.useState({})
  const [loading, setLoading] = React.useState(false);
  const [zipCode, setZipCode] = React.useState(null);
  const [error, setError] = React.useState('');


  // React.useEffect(() => {
  //   if(!zipCode){
  //     return;
  //   }
  //   fetchWeather(zipCode, setResponseObj);
  // }, [zipCode])

  return (
    <div className="App">
      <Header />
        <WeatherForm zipCode={zipCode} setZipCode={setZipCode} setError={setError} error={error} setResponseObj={setResponseObj} setLoading={setLoading}/>
        {!loading ? null : <DisplayWeather responseObj={responseObj} />}

      {/* <Footer /> */}
    </div>
  );



}





export default App;
