import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTime } from '../actions/index';
import _ from 'lodash';

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = { showing: false, city: props.city, list: props.list, details: "1day" };

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.getTime = this.getTime.bind(this);
        this.hour = this.hour.bind(this);
        this.day1 = this.day1.bind(this);
        this.day5 = this.day5.bind(this);
        this.dailyMaxTemp = this.dailyMaxTemp.bind(this);
        this.dailyMinTemp = this.dailyMinTemp.bind(this);
        this.fiveDay = this.fiveDay.bind(this);
        this.dailyHumidity = this.dailyHumidity.bind(this);
        this.dailyPressure = this.dailyPressure.bind(this);
        this.dailyWind = this.dailyWind.bind(this);
    }

    show(event, props){
        event.preventDefault();
        this.props.fetchTime(this.state.city.coord.lon, this.state.city.coord.lat);
        this.setState({ showing:true });
    }

    close(event){
        event.preventDefault();
        this.setState({ showing:false });
    }

    getTime(utcTime, difference){
        if(utcTime + difference/(60*60) < 0){
            return 24 + (utcTime + difference/(60*60));
        }
        else if(utcTime + difference/(60*60) >= 24){
            return (utcTime + difference/(60*60)) - 24;
        }
        else
        {
            return utcTime + difference/(60*60);        
        }
    }

    hour(){
        const date = new Date(this.state.list[0].dt * 1000);
        return (date.getHours() + date.getTimezoneOffset()/60);
    }

    date(day){
        const date = new Date((this.state.list[0].dt * 1000) + (day*24*60*60*1000));
        return (date.getDate());
    }

    day1(event){
        event.preventDefault();
        this.setState({ details:"1day"});
    }

    day5(event){
        event.preventDefault();
        this.setState({ details:"5day"});
    }

    dailyMaxTemp(iterations, start, state){
        var max = state.list[start].main.temp_max - 273;
        for(var i=1 ; i<iterations; i++){
            if((start + i)>37){
                return max;
            }
            if(!((start + i)>37) && (state.list[start + i].main.temp_max - 273) > max){
                max = state.list[i].main.temp_max - 273;
            }
        }
        return max;
    }

    dailyMinTemp(iterations, start, state){
        var min = state.list[start].main.temp_min - 273;
        for(var i=1 ; i<iterations; i++){
            if(!((start + i)>37) && (state.list[start + i].main.temp_min - 273) < min){
                min = state.list[start + i].main.temp_min - 273;
            }
        }
        return min;
    }

    dailyPressure(iterations, start, state){
        var totalPressure = state.list[start].main.pressure;
        for(var i=1 ; i<iterations; i++){
            if(!((start + i)>37)){
                totalPressure += state.list[start + i].main.pressure
            }
        }
        var averagePressure = totalPressure / iterations;
        return averagePressure;
    }

    dailyHumidity(iterations, start, state){
        var totalHumidity = state.list[start].main.humidity;
        for(var i=1 ; i<iterations; i++){
            if(!((start + i)>37)){
                totalHumidity += state.list[start + i].main.humidity
            }
        }
        var averageHumidity = totalHumidity / iterations;
        return averageHumidity;
    }

    dailyWind(iterations, start, state){
        var totalWind = state.list[start].wind.speed;
        for(var i=1 ; i<iterations; i++){
            if(!((start + i)>37)){
                totalWind += state.list[start + i].wind.speed
            }
        }
        var averageWind = totalWind / iterations;
        return averageWind;
    }

    fiveDay(state){
        const time = this.getTime(this.hour(), this.props.time);
        var forecasts = _.floor(((24 - time)/3) + 1);
        var nextStart = forecasts;
        var start = 0;
        var fiveDayForecast = {};
        
        for(var i=0; i<5 ; i++){
            if(i==0){
                forecasts = forecasts;
                start = 0;       
            }
            else { 
                start = nextStart;
                forecasts = 8;
                nextStart += forecasts;                              
            }
            var day = {
            maxTemp: this.dailyMaxTemp(forecasts,start,state), 
            minTemp: this.dailyMinTemp(forecasts,start,state),
            pressure: this.dailyPressure(forecasts,start,state),
            humidity: this.dailyHumidity(forecasts,start,state),
            wind: this.dailyWind(forecasts,start,state)
            }
            fiveDayForecast[i] = day;
        }
        return fiveDayForecast; 
    }

    renderDetailsTable(){
        if(this.state.details=="1day" || this.state.details==""){
            return(
                <table className="detailsTable table table-hover">
                    <thead>
                        <tr>
                            <td>Local Time</td>
                            <td>{this.getTime(this.hour(), this.props.time)}:00</td>
                            <td>{this.getTime(this.hour() + 3, this.props.time)}:00</td>
                            <td>{this.getTime(this.hour() + 6, this.props.time)}:00</td>
                            <td>{this.getTime(this.hour() + 9, this.props.time)}:00</td>
                            <td>{this.getTime(this.hour() + 12, this.props.time)}:00</td>
                            <td>{this.getTime(this.hour() + 15, this.props.time)}:00</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><img src={`http://openweathermap.org/img/w/${this.state.list[0].weather[0].icon}.png`} /></td>
                            <td><img src={`http://openweathermap.org/img/w/${this.state.list[1].weather[0].icon}.png`} /></td>
                            <td><img src={`http://openweathermap.org/img/w/${this.state.list[2].weather[0].icon}.png`} /></td>
                            <td><img src={`http://openweathermap.org/img/w/${this.state.list[3].weather[0].icon}.png`} /></td>
                            <td><img src={`http://openweathermap.org/img/w/${this.state.list[4].weather[0].icon}.png`} /></td>
                            <td><img src={`http://openweathermap.org/img/w/${this.state.list[5].weather[0].icon}.png`} /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{this.state.list[0].weather[0].description}</td>
                            <td>{this.state.list[1].weather[0].description}</td>
                            <td>{this.state.list[2].weather[0].description}</td>
                            <td>{this.state.list[3].weather[0].description}</td>
                            <td>{this.state.list[4].weather[0].description}</td>
                            <td>{this.state.list[5].weather[0].description}</td>
                        </tr>
                        <tr>
                            <td>Temperature (°C)</td>
                            <td>{_.round(this.state.list[0].main.temp - 273)}</td>
                            <td>{_.round(this.state.list[1].main.temp - 273)}</td>
                            <td>{_.round(this.state.list[2].main.temp - 273)}</td>
                            <td>{_.round(this.state.list[3].main.temp - 273)}</td>
                            <td>{_.round(this.state.list[4].main.temp - 273)}</td>
                            <td>{_.round(this.state.list[5].main.temp - 273)}</td>
                        </tr>
                        <tr>
                            <td>Wind (mph)</td>
                            <td>{_.round(this.state.list[0].wind.speed)}</td>
                            <td>{_.round(this.state.list[1].wind.speed)}</td>
                            <td>{_.round(this.state.list[2].wind.speed)}</td>
                            <td>{_.round(this.state.list[3].wind.speed)}</td>
                            <td>{_.round(this.state.list[4].wind.speed)}</td>
                            <td>{_.round(this.state.list[5].wind.speed)}</td>
                        </tr>
                        <tr>
                            <td>Pressure (hPa)</td>
                            <td>{_.round(this.state.list[0].main.pressure)}</td>
                            <td>{_.round(this.state.list[1].main.pressure)}</td>
                            <td>{_.round(this.state.list[2].main.pressure)}</td>
                            <td>{_.round(this.state.list[3].main.pressure)}</td>
                            <td>{_.round(this.state.list[4].main.pressure)}</td>
                            <td>{_.round(this.state.list[5].main.pressure)}</td>
                        </tr>
                        <tr>
                            <td>Humidity (%)</td>
                            <td>{this.state.list[0].main.humidity}</td>
                            <td>{this.state.list[1].main.humidity}</td>
                            <td>{this.state.list[2].main.humidity}</td>
                            <td>{this.state.list[3].main.humidity}</td>
                            <td>{this.state.list[4].main.humidity}</td>
                            <td>{this.state.list[5].main.humidity}</td>
                        </tr>
                    </tbody>
                </table>
            )
        }
        else if (this.state.details=="5day"){
            return(
                <table className="detailsTable table table-hover">
                    <thead>
                        <tr>
                            <td>Day</td>
                            <td>{this.date(0)}</td>
                            <td>{this.date(1)}</td>
                            <td>{this.date(2)}</td>
                            <td>{this.date(3)}</td>
                            <td>{this.date(4)}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Max Temp (°C)</td>
                            <td>{_.round(this.fiveDay(this.state)[0].maxTemp)}</td>
                            <td>{_.round(this.fiveDay(this.state)[1].maxTemp)}</td>
                            <td>{_.round(this.fiveDay(this.state)[2].maxTemp)}</td>
                            <td>{_.round(this.fiveDay(this.state)[3].maxTemp)}</td>
                            <td>{_.round(this.fiveDay(this.state)[4].maxTemp)}</td>
                        </tr>
                        <tr>
                            <td>Min Temp (°C)</td>
                            <td>{_.round(this.fiveDay(this.state)[0].minTemp)}</td>
                            <td>{_.round(this.fiveDay(this.state)[1].minTemp)}</td>
                            <td>{_.round(this.fiveDay(this.state)[2].minTemp)}</td>
                            <td>{_.round(this.fiveDay(this.state)[3].minTemp)}</td>
                            <td>{_.round(this.fiveDay(this.state)[4].minTemp)}</td>
                        </tr>
                        <tr>
                            <td>Wind (mph)</td>
                            <td>{_.round(this.fiveDay(this.state)[0].wind)}</td>
                            <td>{_.round(this.fiveDay(this.state)[1].wind)}</td>
                            <td>{_.round(this.fiveDay(this.state)[2].wind)}</td>
                            <td>{_.round(this.fiveDay(this.state)[3].wind)}</td>
                            <td>{_.round(this.fiveDay(this.state)[4].wind)}</td>
                        </tr>
                        <tr>
                            <td>Pressure (hPa)</td>
                            <td>{_.round(this.fiveDay(this.state)[0].pressure)}</td>
                            <td>{_.round(this.fiveDay(this.state)[1].pressure)}</td>
                            <td>{_.round(this.fiveDay(this.state)[2].pressure)}</td>
                            <td>{_.round(this.fiveDay(this.state)[3].pressure)}</td>
                            <td>{_.round(this.fiveDay(this.state)[4].pressure)}</td>
                        </tr>
                        <tr>
                            <td>Humidity (%)</td>
                            <td>{_.round(this.fiveDay(this.state)[0].humidity)}</td>
                            <td>{_.round(this.fiveDay(this.state)[1].humidity)}</td>
                            <td>{_.round(this.fiveDay(this.state)[2].humidity)}</td>
                            <td>{_.round(this.fiveDay(this.state)[3].humidity)}</td>
                            <td>{_.round(this.fiveDay(this.state)[4].humidity)}</td>
                        </tr>
                    </tbody>
                </table>
            )
        }
    }

    renderDetails(){
        if(this.state.showing){
            return (
                <div className={"details"+this.state.showing}>
                    <button className="formHalfButton" onClick={this.day1}>Single day forecast</button>
                    <button className="formHalfButton" onClick={this.day5}>5 day forecast</button>
                    {this.renderDetailsTable()}
                    <button className="formButton" onClick={this.close}>Close</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <button className="formButton" onClick={this.show}>Details</button>
                <div className={"detailsContainer"}>
                    {this.renderDetails()}
                </div>
            </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchTime }, dispatch);
}

function mapStateToProps({ time }) {
    return { time };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
