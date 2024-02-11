import { pastWeatherData } from "@/lib/data";
import { cityWeatherDataType } from "@/types";
import { ArrowLeftRight, Loader } from "lucide-react";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface WeatherCardProps {
  cityWeatherData: cityWeatherDataType;
  country: string;
  loading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  cityWeatherData,
  country,
  loading,
}) => {
  const [tempFormat, setTempFormat] = useState<"celsius" | "fahrenheit">(
    "celsius"
  );
  const [temp, setTemp] = useState<string>(
    `${(cityWeatherData.main.temp - 273.15).toFixed(2)} °C`
  );

  function convertTemperature(tempKelvin: number) {
    if (typeof tempKelvin !== "number" || isNaN(tempKelvin)) {
      return "Invalid temperature input";
    }

    const tempCelsius = tempKelvin - 273.15;
    const tempFahrenheit = ((tempKelvin - 273.15) * 9) / 5 + 32;

    if (tempFormat === "celsius") {
      setTemp(tempCelsius.toFixed(2) + " °C");
    } else if (tempFormat === "fahrenheit") {
      setTemp(tempFahrenheit.toFixed(2) + " °F");
    }
  }

  return (
    <div className="bg-zinc-200 rounded-2xl">
      {loading ? (
        <div className="flex justify-center">
          <Loader className="animate-spin mt-40" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-10 xl:gap-20 w-full px-8 py-10">
          <div className="flex flex-col gap-4 py-5">
            <h1 className="text-lg font-semibold">
              City: <span className="font-normal">{cityWeatherData.name}</span>
            </h1>
            <h1 className="text-lg font-semibold">
              Country: <span className="font-normal">{country}</span>
            </h1>
            <h1 className="text-lg font-semibold">
              Weather:{" "}
              <span className="font-normal">
                {cityWeatherData.weather[0].main}
              </span>
            </h1>
            <h1 className="text-lg font-semibold">
              Humidity:{" "}
              <span className="font-normal">
                {cityWeatherData.main.humidity} %
              </span>
            </h1>
            <div className="flex gap-1">
              <h1 className="text-lg font-semibold">Temperature:</h1>
              <h1 className="text-lg font-normal">{temp}</h1>
              <ArrowLeftRight
                size={16}
                className="mt-2 ml-2 cursor-pointer"
                onClick={() => {
                  if (tempFormat === "celsius") {
                    setTempFormat("fahrenheit");
                    convertTemperature(cityWeatherData.main.temp);
                  } else {
                    setTempFormat("celsius");
                    convertTemperature(cityWeatherData.main.temp);
                  }
                }}
              />
            </div>
            <h1 className="text-lg font-semibold">
              Wind Speed:{" "}
              <span className="font-normal">
                {cityWeatherData.wind.speed} m/s
              </span>
            </h1>
          </div>
          <div className="h-[400px] w-full">
            <h1 className="text-xl font-semibold xl:ml-20 mb-2">Past Weather Data</h1>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={400}
                height={250}
                data={pastWeatherData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="tempC"
                  stroke="#8884d8"
                />
                <Line type="monotone" dataKey="tempF" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
