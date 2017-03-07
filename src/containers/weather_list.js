import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';
import Details from '../components/details';

class WeatherList extends Component {
    renderWeather(cityData) {
        const list = cityData.list;
        const city = cityData.city;
        const name = city.name;
        const temps = list.map(weather => weather.main.temp - 273);
        const pressures = list.map(weather => weather.main.pressure);
        const humidities = list.map(weather => weather.main.humidity);
        const { lon, lat }  = city.coord;

        function max(units){
            var max = units[0];
            for(var i=0; i<units.length; i++){
                if(units[i]>max){
                    max = units[i];
                }
            }
            return max;
        }

        function min(units){
            var min = units[0];
            for(var i=0; i<units.length; i++){
                if(units[i]<min){
                    min = units[i];
                }
            }
            return min;
        }

        return (
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat} />{name}</td>
                <td><Chart data={temps} max={max(temps)} min={min(temps)} color="orange" units="°C" /></td>
                <td><Chart data={pressures} max={max(pressures)} min={min(pressures)} color="blue" units="hPa" /></td>
                <td><Chart data={humidities} max={max(humidities)} min={min(humidities)} color="green" units="%" /></td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature (Celsius)</th>
                            <th>Pressure (hPa)</th>
                            <th>Humidity (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.weather.map(this.renderWeather)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps({ weather }) {
    return { weather };
}

export default connect(mapStateToProps)(WeatherList);