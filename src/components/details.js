import React, { Component } from 'react';
import _ from 'lodash';

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = { showing: false, city: props.city, list: props.list };

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    show(event){
        event.preventDefault();
        this.setState({ showing:true });
    }

    close(event){
        event.preventDefault();
        this.setState({ showing:false });
    }

    renderDetailsTable(){

        return(
            <table className="detailsTable table table-hover">
                <thead>
                    <tr>
                        <td>Time (UTC)</td>
                        <td>09:00</td>
                        <td>12:00</td>
                        <td>15:00</td>
                        <td>18:00</td>
                        <td>21:00</td>
                        <td>00:00</td>
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


export default Details;