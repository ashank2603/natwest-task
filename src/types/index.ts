export type stateDataType = {
    id: string;
    name: string;
    summaryData: {
        avgTemp: {
            celsius: number;
            fahrenheit: number;
            kelvin: number;
        },
        humidity: number;
        population: number;
        capital: string;
    },
    cityData: {
        chart1: {
            cityName: string;
            population: number;
        }[];
        table: cityData[]
    }
}

export type cityData = {
    id: number;
    cityName: string;
    population: number;
    avgTemp: number;
    humidity: number;
}

export type cityWeatherDataType = {
    coord: {
        "lon": number,
        "lat": number
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    name: string;
    country: string;
}