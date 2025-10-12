'use client'

import { DashboardData } from "@/types/api";
import { createContext, useContext, useState, ReactNode } from "react";
import { TestcaseDashboardData } from "./testcases";

type CategoryStatus = Map<string,boolean>

type DashboardContextType = {
  dashboardData: DashboardData,
  setDashboardData: (u: DashboardData)=>void,

  categoryStatus: CategoryStatus,
  setCategoryStatus: (u: CategoryStatus)=>void,
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardContextProvider({ children }:{ children: ReactNode }) {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    total_amount: 0,
    amount_by_category: new Map<string,number>(),
    category_color: new Map<string,string>(),
    records: []
  })
  const [categoryStatus, setCategoryStatus] = useState<CategoryStatus>(new Map<string,boolean>())

  const numberTests = 3;
  const [currentTest, setCurrentTest] = useState(1);
  const mockSetDashboardData = (_: DashboardData) => {
    const { dashboardData, categories } = currentTest==1 ? TestcaseDashboardData.getTest1() :
                                          currentTest==2 ? TestcaseDashboardData.getTest2() :
                                          TestcaseDashboardData.getTest3();
    setCurrentTest(1 + currentTest%numberTests);
    
    const mp = new Map<string,boolean>()
    categories.forEach((v)=>{
      mp.set(v, true);
    });
    setDashboardData(dashboardData);
    setCategoryStatus(mp);
  }

  return (
    <DashboardContext.Provider value={{
      dashboardData, setDashboardData: mockSetDashboardData,
      categoryStatus, setCategoryStatus,
    }}>
      { children }
    </DashboardContext.Provider>
  )
}

export function useDashboardContext() {
  const context = useContext(DashboardContext)
  if(!context){
    throw new Error("useDashboardContext must be used inside DashboardContextProvider")
  }
  return context
}