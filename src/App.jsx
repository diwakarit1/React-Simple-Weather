import { useState } from "react";
import "./App.css";
//import { Button } from "bootstrap";
import Button from "react-bootstrap/Button";

const api = {
  key: "9d62474f55be8e7f3c81c5696e68b619",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  // const [error, setError] = useState(false);

  const clickHandler = () => {
    // console.log("search press");
    //console.log(search);

    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
        console.log(result);
      })
      .catch((err) => {
        alert(err + "    Enter valid city Name ");
        setWeather({});
      });

    setSearch("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <header>
        <h1 className="m-4">Weather App</h1>
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="p-2 m-4 rounded"
        />

        <Button className="mb-1" onClick={clickHandler} variant="info">
          Search
        </Button>

        {/* <Button variant="info" onClick={clickHandler}  >Info</Button> */}
        {typeof weather.main != "undefined" ? (
          <div className="text-white d-flex flex-column justify-content-center align-items-center fs-4">
            {/* {error?<p>Enter city properly</p>:}:(""))} */}

            <p> {weather.name}</p>
            <p> {weather.main.temp}&#8451;</p>

            <p> {weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
