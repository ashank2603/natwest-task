import { stateDataType } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface StateCardProps {
  state: stateDataType;
  index: number;
  handleStateInfo: (selectedState: stateDataType) => void;
}

const StateCard: React.FC<StateCardProps> = ({ state, index, handleStateInfo }) => {
  const assignColor = (temp: number) => {
    const maxTemp = 30;
    const minTemp = 9;
    const redVal = (255 / (maxTemp - minTemp)) * (temp - minTemp);
    const blueVal = (255 / (maxTemp - minTemp)) * (maxTemp - temp);

    return `rgb(${redVal}, 0, ${blueVal})`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={`p-4 border rounded-md ${
            index === 0 ? "row-span-4" : index === 1 ? "row-span-2" : ""
          }`}
          style={{
            backgroundColor: `${assignColor(
              state.summaryData.avgTemp.celsius
            )}`
          }}
          onClick={() => handleStateInfo(state)}
        >
          <h1 className="text-lg text-white">{state.name}</h1>
        </TooltipTrigger>
        <TooltipContent 
            className="bg-white space-y-3"
            side="bottom"
        >
          <h1 className="font-semibold text-lg">Summary</h1>  
          <h1><span className="font-semibold">Avg Humidity: </span>{state.summaryData.humidity}%</h1>
          <h1><span className="font-semibold">Population: </span>{state.summaryData.population}</h1>
          <h1><span className="font-semibold">Capital: </span>{state.summaryData.capital}</h1>
          <h1><span className="font-semibold">Avg Temp in Celsius: </span>{state.summaryData.avgTemp.celsius}</h1>
          <h1><span className="font-semibold">Avg Temp in Fahrenheit: </span>{state.summaryData.avgTemp.fahrenheit}</h1>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StateCard;
