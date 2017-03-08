import { FETCH_TIME } from '../actions/index';

export default function(state = 0, action){

    switch (action.type) {
        case FETCH_TIME:
            return action.payload.data.gmtOffset;
    }
    return state;
}