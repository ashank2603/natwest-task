import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import isoCountries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

isoCountries.registerLocale(en);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCountryName(countryCode: string) {
  return isoCountries.getName(countryCode, 'en')
}