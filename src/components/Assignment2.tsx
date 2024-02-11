import { stateData } from "@/lib/data";
import StateCard from "./StateCard";
import { stateDataType } from "@/types";
import { useState } from "react";
import StateCardInfo from "./StateCardInfo";

const Assignment2 = () => {
  //@ts-expect-error obj-type-mismatch  
  const sortedStateData: stateDataType[] = stateData.slice().sort((a, b) => b.summaryData.population - a.summaryData.population);

  const [stateInfo, setStateInfo] = useState<stateDataType | null>(null)

  const handleStateInfo = (selectedState: stateDataType) => {
    setStateInfo(selectedState)
  }

  return (
    <div>
        <h1 className="text-3xl font-semibold px-20">Assignment 2</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-20 py-5">
        {sortedStateData.map((item, index) => (
            <StateCard 
                key={item.id}
                state={item}
                index={index}
                handleStateInfo={handleStateInfo}
            />
        ))}
        </div>
        {stateInfo && (
            <div className="px-8 xl:px-20 w-full">
                <h1 className="text-center mb-20 text-3xl font-semibold">State Data Information: {stateInfo?.name}</h1>
                <StateCardInfo 
                    state={stateInfo}
                />
            </div>
        )}
    </div>
  )
}

export default Assignment2