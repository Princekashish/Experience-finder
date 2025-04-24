import React, { useState, useEffect } from "react";

interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const LocationAutocomplete: React.FC<Props> = ({
  name,
  value,
  onChange,
  placeholder,
  className,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
        );
        const data = await res.json();
        setSuggestions(data.slice(0, 5)); // Show top 5 results
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [value]);

  const handleSelect = (place: any) => {
    const fakeEvent = {
      target: {
        name,
        value: place.display_name,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(fakeEvent);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full ">
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
          setShowSuggestions(true);
        }}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white   w-full max-h-[200px] overflow-y-auto no-scrollbar z-50 rounded shadow-md">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(s)}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
