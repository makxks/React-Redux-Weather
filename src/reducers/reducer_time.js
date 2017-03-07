import { FETCH_TIME } from '../actions/index';

export default function(state = null, action){

    switch (action.type) {
        case FETCH_TIME:
            state = action.payload.data;
    }

    return state;
}