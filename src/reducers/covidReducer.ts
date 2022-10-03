import { FETCH_SUMMARY_SUCCESS } from "../saga/actionTypes";

interface ICovid {
    data: any;
}

const initialState: ICovid = {
    data: []
}

const covidReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_SUMMARY_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        default: 
            return state;
    }
};

export default covidReducer;
