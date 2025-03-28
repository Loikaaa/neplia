
import React from 'react';
import { Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Country {
  code: string;
  name: string;
  flag: string;
}

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

const countries: Country[] = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
  { code: 'nz', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
  { code: 'my', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'ph', name: 'Philippines', flag: '🇵🇭' },
  { code: 'hk', name: 'Hong Kong', flag: '🇭🇰' },
];

const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountry, onCountryChange }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="country-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Your Country
      </label>
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger id="country-select" className="w-full">
          <SelectValue placeholder="Select your country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code} className="flex items-center">
              <div className="flex items-center">
                <span className="mr-2 text-xl">{country.flag}</span>
                <span>{country.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelector;
