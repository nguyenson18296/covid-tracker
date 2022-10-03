import { FETCH_COUNTRY_SUCCESS } from "../saga/actionTypes";
import { ICountry } from "../type";

interface ICountryReducer {
    countries: ICountry[]
}

const initialState: ICountryReducer = {
    countries: []
}

const countriesReducer = (state = initialState, action: any): ICountryReducer => {
    switch (action.type) {
        case FETCH_COUNTRY_SUCCESS:
            return {
                ...state,
                countries: action.data
            }
        default:
            return state;
    }
}

export default countriesReducer;
