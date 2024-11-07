import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [forecasts, setForecasts] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        populateChategoryData();
    }, []);

    useEffect(() => {
        populateWeatherData();
    }, []);



    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;





    const contents2 = categories === undefined
        ? <p>Error</p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                </tr>
            </thead>
            <tbody>
                {categories.map(category =>
                    <tr key={category.categoryId}>
                        <td>{category.categoryId}</td>
                        <td>{category.categoryName}</td>
                        <td><img src={`data:image/jpg;base64,${category.picture}`} /></td>

                    </tr>
                )}
            </tbody>
        </table>;
    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <h1 id="tabelLabel">Category List</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents2}
        </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }
    async function populateChategoryData() {
        const response = await fetch('api/Categories');
        const data = await response.json();
        setCategories(data);
    }

}

export default App;