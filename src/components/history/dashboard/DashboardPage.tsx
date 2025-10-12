'use client'

import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { useDashboardContext } from "./DashboardContext"
import { fetchDashboardData } from "@/lib/api/record-api"
import { getContrastYIQ } from "@/lib/utils"
import { MonthlyLineGraph } from "./DashboardCharts"

function SearchBox() {
  const { setDashboardData, setCategoryStatus } = useDashboardContext();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchMessage, setFetchMessage] = useState("");
  const fetchData = async()=>{
    setFetching(true);
    try{
      let timeStart = "";
      let timeEnd = "";
      if(dateFrom){
        const dateFromArr = dateFrom.split('-').map(Number); // [YYYY, MM, DD]
        timeStart = (new Date(dateFromArr[0], dateFromArr[1] - 1, dateFromArr[2], 0, 0, 0)).toISOString();
      }
      if(dateTo){
        const dateToArr = dateTo.split('-').map(Number); // [YYYY, MM, DD]
        timeEnd = (new Date(dateToArr[0], dateToArr[1] - 1, dateToArr[2], 0, 0, 0)).toISOString();
      }

      const data = await fetchDashboardData(timeStart, timeEnd);
      if(!data){
        setFetchMessage("Failed to fetch dashboard data");
        return;
      }
      setFetchMessage("");
      const categoryStatus = new Map<string,boolean>();
      const arr = data.amount_by_category.keys();
      for(const key of arr){
        categoryStatus.set(key, true);
      }
      setCategoryStatus(categoryStatus);
      setDashboardData(data);
    } finally {
      setFetching(false);
    }
  }
  return (
    <div className="flex flex-col w-fit border-2 p-4 mx-auto rounded-xl my-4 xs:text-base text-sm">
      <div className="grid grid-cols-[max-content_1fr] w-fit xs:mx-10 mx-4">
        <div className="text-end mb-4 font-semibold">
          From:
        </div>
        <div className="ml-4 mb-4">
          <input
            name="date-from"
            type="date"
            value={dateFrom}
            onChange={(e: ChangeEvent<HTMLInputElement>)=>setDateFrom(e.target.value)}
            max={dateTo}
          />
        </div>
        <div className="text-end mb-4 font-semibold">
          To:
        </div>
        <div className="ml-4 mb-4">
          <input
            name="date-to"
            type="date"
            value={dateTo}
            onChange={(e: ChangeEvent<HTMLInputElement>)=>setDateTo(e.target.value)}
            min={dateFrom}
          />
        </div>
      </div>
      <button
        className="
          bg-foreground text-background font-medium rounded-full cursor-pointer disabled:cursor-default disabled:opacity-50
        "
        onClick={fetchData}
        disabled={fetching}
      >Go</button>
      <div className="text-bad text-xs w-fit self-center mt-2 font-medium">
        {fetchMessage}
      </div>
    </div>
  );
}

function DataPanel() {
  const { dashboardData, categoryStatus, setCategoryStatus } = useDashboardContext();
  
  const checkAllRef = useRef<HTMLInputElement | null>(null);
  const handleCheckAllChange = (value: boolean) => {
    const newMap = new Map(categoryStatus);
    for(const key of newMap.keys()){
      newMap.set(key, value);
    }
    setCategoryStatus(newMap);
  }
  const handleCheckboxChange = (category: string, value: boolean) => {
    const newMap = new Map(categoryStatus);
    newMap.set(category, value);
    setCategoryStatus(newMap);
  }
  useEffect(()=>{
    if(checkAllRef.current){
      let b0 = false;
      let b1 = false;
      for(const value of categoryStatus.values()){
        if(value) b1 = true;
        else b0 = true;
        if(b0 && b1) break;
      }
      if(b0 && b1) checkAllRef.current.indeterminate = true;
      else{
        checkAllRef.current.indeterminate = false;
        if(b1) checkAllRef.current.checked = true;
        else checkAllRef.current.checked = false;
      }
    }
  },[categoryStatus]);

  return (
    <div className="
      flex flex-col w-fit mx-auto
      border-2 rounded-xl overflow-scroll
      my-4 max-w-full max-h-90
    ">
      <div className="w-fit p-4">
        <div className="font-semibold w-fit">
          Total <span className="mx-2">:</span> {dashboardData.total_amount.toFixed(2)}
        </div>
        <div className="grid grid-cols-[max-content_max-content_max-content]">
          <div className="h-fit self-center my-2 mr-4">
            <input
              style={{ accentColor: "var(--foreground)" }}
              name="select-all"
              type="checkbox"
              ref={checkAllRef}
              onChange={(e: ChangeEvent<HTMLInputElement>)=>handleCheckAllChange(e.target.checked)}
            />
          </div>
          <div className="w-fit mx-auto font-semibold my-2">Category</div>
          <div className="w-fit mx-auto font-semibold my-2 ml-4">Total</div>
          {Array.from(dashboardData.amount_by_category).map(([category, total],i)=>(
            <React.Fragment key={i}>
              <div className="h-fit self-center mb-4 mr-4 sm:mr-8">
                <input
                  style={{ accentColor: "var(--foreground)" }}
                  name="toggle"
                  type="checkbox"
                  checked={categoryStatus.get(category)}
                  onChange={(e: ChangeEvent<HTMLInputElement>)=>handleCheckboxChange(category, e.target.checked)}
                />
              </div>
              <div
                className="
                  self-center h-fit w-fit text-center mx-auto
                  border-1 border-foreground rounded-full
                  lg:text-base lg:px-8
                  sm:text-sm
                  text-xs px-4 mb-4
                "
                style={{
                  backgroundColor: dashboardData.category_color.get(category),
                  color: getContrastYIQ(dashboardData.category_color.get(category)!, "#524439", "#ffffff"),
                  opacity: categoryStatus.get(category) ? "1" : "0.5"
                }}
              >
                {category}
              </div>
              <div className="mb-4">
                <span className="mx-2 font-semibold">:</span>
                {total.toFixed(2)}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartContainer() {
  return (
    <div className="flex flex-col border-2 p-4 mx-auto rounded-xl my-4 w-full">
      <MonthlyLineGraph/>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <SearchBox/>
      <DataPanel/>
      <ChartContainer/>
    </>
  );
}