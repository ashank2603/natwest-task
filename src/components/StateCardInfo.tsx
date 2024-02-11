import { stateDataType } from "@/types";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";

interface StateCardInfoProps {
  state: stateDataType;
}

const StateCardInfo: React.FC<StateCardInfoProps> = ({ state }) => {
  const cityColors = ["#8A4B9F" ,"#2F7E92", "#D45A3F", "#5CBB74", "#E1803D"]  

  return (
    <div className="h-[800px] flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Legend name="cityName" />
            <Pie
              data={state.cityData.chart1}
              dataKey="population"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              nameKey="cityName"
            >
                {state.cityData.chart1.map((_, index) => (
                <Cell key={`cell-${index}`} fill={cityColors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={state.cityData.chart1}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cityName" />
            <Tooltip />
            <YAxis />
            <Legend />
            <Line
              dataKey="population"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-20">
        <DataTable 
            columns={columns}
            data={state.cityData.table}
        />
      </div>
    </div>
  );
};

export default StateCardInfo;
