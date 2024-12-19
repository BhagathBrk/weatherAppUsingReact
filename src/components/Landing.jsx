import React, { useState } from 'react'
import {TextField} from '@mui/material'



const Landing = () => {

  const [invalidInput, setInvalidInput] = useState(false)

  const [cityName, setCityName] = useState("");
  const[weatherData,setWeatherData] = useState(null)

const validateInput = (val)=>{
  if(!!val.match(/^[a-zA-Z ]*$/)){
    setInvalidInput(false)
    const newVal = val.trim().toLowerCase()
    setCityName(newVal);  
    
    if (!newVal) {
      setWeatherData(null)
     
    }
  }
  else{
    setInvalidInput(true)
  }
  
}

const weatherDetails = async () => {

  if(!cityName){
    alert("Enter city Name")
  }
  else{
    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8894fc8af9340b854bdda82ec4cdb8c3&units=metric`
      )
  
      const data = await result.json();
    console.log(data);
    setWeatherData(data)
    
  
    } catch (error) {
      console.log(error);
      setWeatherData(null)
      
    }
  }

}




  return (
    <>
     <div>

      <h2>Enter a City name to get weather details </h2>
       <div>
          <TextField   className='mt-3' onChange={(e)=>validateInput(e.target.value)}  id="outlined-basic" label="Enter city name eg:(Kochi)" variant="outlined" />
         <button onClick={weatherDetails}  disabled={invalidInput} className='btn btn-warning p-3 mt-3 ms-3'>Search</button>
        {invalidInput && <div className='text-danger text-center'>Invalid Input</div>}
       </div>

       </div>

       {weatherData &&
            <div className="ms-5 ps-5 mt-4">
              <h3>{weatherData.name}</h3>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>{weatherData.weather[0].main}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          }

    </>
  )
}

export default Landing