import { cityData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<cityData>[] = [
    {
      accessorKey: "cityName",
      header: "City Name",
    },
    {
      accessorKey: "population",
      header: "Population",
    },
    {
      accessorKey: "avgTemp",
      header: "Avg Temp (in Celsius)",
    },
    {
      accessorKey: "humidity",
      header: "Humidity",
      cell: ({ row }) => {
        return (
            <h1>{row.original.humidity}%</h1>
        )
      } 
    }
]