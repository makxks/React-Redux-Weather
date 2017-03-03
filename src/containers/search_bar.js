import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { city: '', country: '' };

        this.onCityInputChange = this.onCityInputChange.bind(this);
        this.onCountryInputChange = this.onCountryInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    
    onCityInputChange(event) {
        this.setState({ city: event.target.value} );
    }

    onCountryInputChange(event) {
        this.setState({ country: event.target.value} );
    }

    onFormSubmit(event) {
        event.preventDefault();

        // go and fetch weather data
        this.props.fetchWeather(this.state.city, this.state.country);
        this.setState({ city: '', country: '' });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="searchBar">
                <input
                    placeholder="Get a five-day forecast for your favourite cities"
                    value={this.state.city}
                    className="formInput"
                    onChange={this.onCityInputChange} />
                <input
                    placeholder="Enter country code (default uk)"
                    value={this.state.country}
                    className="formInput"
                    onChange={this.onCountryInputChange} />
                <span className="formButtonContainer">
                    <button type="submit" className="formButton">Submit</button>
                </span>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);