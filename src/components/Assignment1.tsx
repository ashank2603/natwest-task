import { XCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import WeatherCard from "./WeatherCard"
import { cityWeatherDataType } from "@/types"
import axios, { AxiosError } from "axios"
import { getCountryName } from "@/lib/utils"
import { useToast } from "./ui/use-toast"

const Assignment1 = () => {
  const [cityName, setCityName] = useState<string>("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [country, setCountry] = useState<string>("")
  const [cityWeatherData, setCityWeatherData] = useState<cityWeatherDataType | null>(null)

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

  const { toast } = useToast()

  const getWeatherData = async () => {
    try {
        setIsLoading(true)
        if (cityName === "") {
            throw new Error("City name cannot be empty")
        }

        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
        console.log(res)
        setCityWeatherData({
            coord: {
                lat: res.data.coord.lat,
                lon: res.data.coord.lon,
            },
            weather: res.data.weather,
            main: {
                temp: res.data.main.temp,
                temp_max: res.data.main.temp_max,
                temp_min: res.data.main.temp_min,
                pressure: res.data.main.pressure,
                humidity: res.data.main.humidity,
            },
            wind: {
                speed: res.data.wind.speed,
                deg: res.data.wind.deg
            },
            name: res.data.name,
            country: res.data.sys.country
        })

        const countryName = getCountryName(res.data.sys.country)
        setCountry(countryName!)

        setRecentSearches([...recentSearches, cityName])
        setCityName("")
    } catch(error) {
        if (error instanceof AxiosError) {
            toast({
                description: error.response?.data.message,
                variant: "destructive"
            })
        } else {
            toast({
                description: "Something went wrong!",
                variant: "destructive"
            })
        }
        console.log(error)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="px-8 xl:px-20 py-8">
        <h1 className="text-3xl font-semibold py-2">Assignment 1</h1>
        <div className="flex flex-col lg:flex-row gap-5">
            <div className="bg-zinc-200 p-8 rounded-2xl h-[350px]">
                <h1 className="mb-2 text-sm font-semibold">Enter City Name</h1>
                <div className="flex gap-2">
                    <div className="relative">
                        <Input 
                            placeholder="eg: Mumbai"
                            className="w-[100px] lg:w-[300px] placeholder:text-slate-500"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                        />
                        {cityName !== "" && (
                            <XCircle 
                                size={20} 
                                className="absolute top-2.5 right-3 text-slate-600 cursor-pointer" 
                                onClick={() => setCityName("")}
                            />
                        )}
                    </div>
                    <Button 
                        disabled={cityName === ""} 
                        className="bg-black text-white hover:bg-zinc-800"
                        onClick={() => getWeatherData()}
                    >
                        Search
                    </Button>
                </div>
                <div className="pt-3">
                    <h1 className="text-sm italic font-semibold mb-1">Recent Searches</h1>
                    {recentSearches.length > 0 ? (
                        <div className="flex flex-col gap-2 py-1">
                            {recentSearches.slice(-5).reverse().map((item, index) => (
                                <div 
                                    key={index} 
                                    className="py-1 px-5 rounded-xl bg-zinc-100 cursor-pointer hover:bg-zinc-400 mr-10"
                                    onClick={() => setCityName(item)}
                                >
                                    <h1>{item}</h1>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center text-sm italic pt-5">
                            <h1>No recent searches</h1>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full">
                {cityWeatherData && (
                    <WeatherCard 
                        cityWeatherData={cityWeatherData}
                        country={country}
                        loading={isLoading}
                    />
                )}
            </div>
        </div>
    </div>
  )
}

export default Assignment1