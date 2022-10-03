import React, { useEffect } from "react";
import get from "lodash/get";
import { useDispatch, useSelector } from "react-redux";

import ChartVisualization, { IChartData } from "../ChartVisualization";
import Select, { IOptions } from "../Select/Select";
import { fetchSummaryData } from "../../actions/covidAction";

import "./ChartContainer.scss";

const Chart: React.FC = () => {
  const covid = useSelector((state: any) => get(state, "covid.data.Countries", []));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSummaryData());
  }, [dispatch]);

  const formatData: IChartData[] = covid.map((item: any) => ({
    id: item.ID,
    country: item.Country,
    total_confirm: item.TotalConfirmed,
    total_deaths: item.TotalDeaths
  })).slice(0, 15);

  const countries: IOptions[] = covid.map((item: any) => ({
    value: item.Slug,
    label: item.Country
  }));

  return (
    <div className="container">
      <div className="select-country-wrapper">
        <Select options={countries} />
      </div>
      <ChartVisualization data={formatData} />
    </div>
  )
};

export default Chart;
