import { FETCH_SUMMARY, FETCH_SUMMARY_FAILED, FETCH_SUMMARY_SUCCESS } from "../saga/actionTypes";

interface ICovidSummary {
    type: string;
};

interface ICovidSummaryState {
    type: string;
    success: boolean;
    data: any[]
}

export const fetchSummaryData = (): ICovidSummary => {
    return {
        type: FETCH_SUMMARY,
    }
}

export const fetchSummaryDataSuccess = (data: any): ICovidSummaryState => {
    return {
        type: FETCH_SUMMARY_SUCCESS,
        success: true,
        data
    }
}

export const fetchSummaryDataFailure = (data: any): ICovidSummaryState => {
    return {
        type: FETCH_SUMMARY_FAILED,
        success: false,
        data
    }
}

export type TCovidAction = ICovidSummary | ICovidSummaryState;
