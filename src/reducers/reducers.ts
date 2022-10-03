import { Reducer, combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";

import covidReducer from "./covidReducer";
import countriesReducer from "./countriesReducer";

export const rootReducer = (history: History): Reducer => {
    return combineReducers({
        router: connectRouter(history),
        covid: covidReducer,
        country: countriesReducer
    })
};
