import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTime } from '../actions/index';
import _ from 'lodash';

class Details extends Component {
    constructor(props) {
        super(props);

        this.props.fetchTime(props.city.coord.lon, props.city.coord.lat);

        this.state = { showing: false, city: props.city, list: props.list };

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.getTime = this.getTime.bind(this);
        this.date = this.date.bind(this);
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

    date(){
        const date = new Date(this.state.list[0].dt * 1000);
        return (date.getHours() + date.getTimezoneOffset()/60);
    }

    renderDetailsTable(){
        return(
            <table className="detailsTable table table-hover">
                <thead>
                    <tr>
                        <td>Local Time</td>
                        <td>{this.getTime(this.date(), this.props.time)}:00</td>
                        <td>{this.getTime(this.date() + 3, this.props.time)}:00</td>
                        <td>{this.getTime(this.date() + 6, this.props.time)}:00</td>
                        <td>{this.getTime(this.date() + 9, this.props.time)}:00</td>
                        <td>{this.getTime(this.date() + 12, this.props.time)}:00</td>
                        <td>{this.getTime(this.date() + 15, this.props.time)}:00</td>
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

    renderDetails(){
        if(this.state.showing){
            return (
                <div className="details">
                    <h2>Today's forecast details</h2>
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
                <div>
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
