import { useState } from 'react';
import './App.css'

const api = {
  key: import.meta.env.VITE_APIKEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {

    if (evt) evt.preventDefault(); // Prevents default behavior

    // if (!query.trim()) {
    //   console.log("Please enter a city name.");
    //   return;
    // }
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);

      });

  }

  const dateBuilder = (d) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

  }

  return (
    <>
      <div className='app '>
        <main>
          <div className='searchBox'>
            <input
              type='text'
              className='searchBar'
              placeholder='Search...'
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyDown={(e) => e.key === "Enter" && search(e)} />
          </div>
          <div className='locationBox'>
            <div className='location'>Athens</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className="weatherBox">
            <div className="temperature">15°C</div>
            <div className="weather">Sunny</div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
