
import React, { useState, useEffect } from 'react';
import { Check, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'it', name: 'Italy', flag: '🇮🇹' },
  { code: 'es', name: 'Spain', flag: '🇪🇸' },
  { code: 'jp', name: 'Japan', flag: '🇯🇵' },
  { code: 'cn', name: 'China', flag: '🇨🇳' },
  { code: 'br', name: 'Brazil', flag: '🇧🇷' },
  { code: 'mx', name: 'Mexico', flag: '🇲🇽' },
  { code: 'nl', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'se', name: 'Sweden', flag: '🇸🇪' },
];

const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountry, onCountryChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Filter countries based on search term
    const filtered = countries.filter(country => 
      country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm]);

  // Get selected country name from code
  const getSelectedCountryName = (code: string) => {
    const country = countries.find(c => c.code === code);
    return country ? `${country.flag} ${country.name}` : 'Select your country';
  };

  return (
    <div className="space-y-2">
      <label htmlFor="country-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Your Country
      </label>
      <Select 
        value={selectedCountry} 
        onValueChange={onCountryChange}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setSearchTerm(''); // Clear search when closing dropdown
          }
        }}
      >
        <SelectTrigger id="country-select" className="w-full">
          <SelectValue placeholder="Select your country">
            {selectedCountry ? getSelectedCountryName(selectedCountry) : "Select your country"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <div className="px-2 py-2 sticky top-0 bg-white dark:bg-gray-950 z-10">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                autoFocus={isOpen}
              />
            </div>
          </div>
          <div className="max-h-[220px] overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <SelectItem key={country.code} value={country.code} className="flex items-center p-2">
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No countries found
              </div>
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelector;
