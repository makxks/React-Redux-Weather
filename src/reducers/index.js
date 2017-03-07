import { combineReducers } from 'redux';

import WeatherReducer from './reducer_weather';
import TimeReducer from './reducer_time';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  time: TimeReducer
});

export default rootReducer;
