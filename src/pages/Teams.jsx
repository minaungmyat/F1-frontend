import React, { useState } from "react";
import TeamCard from "../components/TeamCard";
import { Search, X, ChevronDown } from "lucide-react";

// Import team car images
import redbullCar from "../assets/cars/redbull.jpg";
import mercedesCar from "../assets/cars/mercedes.jpg";
import ferrariCar from "../assets/cars/ferrari.jpg";
import mclarenCar from "../assets/cars/mclaren.jpg";
import astonmartinCar from "../assets/cars/astonmartin.jpg";
import alpineCar from "../assets/cars/alpine.jpg";
import williamsCar from "../assets/cars/williams.jpg";
import vcarbCar from "../assets/cars/vcarb.jpg";
import sauberCar from "../assets/cars/sauber.jpg";
import haasCar from "../assets/cars/haas.jpg";

// Import team logos
import redbullLogo from "../assets/team-logo/redbull-logo.jpg";
import mercedesLogo from "../assets/team-logo/mercedes-logo.jpg";
import ferrariLogo from "../assets/team-logo/ferrari-logo.jpg";
import mclarenLogo from "../assets/team-logo/mclaren-logo.jpg";
import astonmartinLogo from "../assets/team-logo/astonmartin-logo.jpg";
import alpineLogo from "../assets/team-logo/alpine-logo.jpg";
import williamsLogo from "../assets/team-logo/williams-logo.jpg";
import vcarbLogo from "../assets/team-logo/vcarb-logo.jpg";
import sauberLogo from "../assets/team-logo/sauber-logo.jpg";
import haasLogo from "../assets/team-logo/haas-logo.jpg";

const Teams = () => {
  const teamsData = [
    {
      name: "Red Bull Racing",
      teamKey: "red_bull",
      gradient: "from-blue-900 via-blue-700 to-blue-500",
      drivers: ["Max Verstappen", "Yuki Tsunoda"],
      carImage: redbullCar,
      logoImage: redbullLogo,
      country: "Austria",
      championships: 6,
      base: "Milton Keynes, UK"
    },
    {
      name: "Mercedes-AMG Petronas",
      teamKey: "mercedes",
      gradient: "from-teal-900 via-teal-600 to-cyan-400",
      drivers: ["George Russell", "Kimi Antonelli"],
      carImage: mercedesCar,
      logoImage: mercedesLogo,
      country: "Germany",
      championships: 8,
      base: "Brackley, UK"
    },
    {
      name: "Scuderia Ferrari",
      teamKey: "ferrari",
      gradient: "from-red-900 via-red-600 to-red-400",
      drivers: ["Charles Leclerc", "Lewis Hamilton"],
      carImage: ferrariCar,
      logoImage: ferrariLogo,
      country: "Italy",
      championships: 16,
      base: "Maranello, Italy"
    },
    {
      name: "McLaren F1 Team",
      teamKey: "mclaren",
      gradient: "from-orange-900 via-orange-500 to-orange-300",
      drivers: ["Lando Norris", "Oscar Piastri"],
      carImage: mclarenCar,
      logoImage: mclarenLogo,
      country: "United Kingdom",
      championships: 8,
      base: "Woking, UK"
    },
    {
      name: "Aston Martin",
      teamKey: "aston_martin",
      gradient: "from-emerald-900 via-emerald-700 to-green-400",
      drivers: ["Fernando Alonso", "Lance Stroll"],
      carImage: astonmartinCar,
      logoImage: astonmartinLogo,
      country: "United Kingdom",
      championships: 0,
      base: "Silverstone, UK"
    },
    {
      name: "Alpine F1 Team",
      teamKey: "alpine",
      gradient: "from-pink-900 via-pink-600 to-blue-400",
      drivers: ["Pierre Gasly", "Franco Colapinto"],
      carImage: alpineCar,
      logoImage: alpineLogo,
      country: "France",
      championships: 2,
      base: "Enstone, UK"
    },
    {
      name: "Williams Racing",
      teamKey: "williams",
      gradient: "from-blue-900 via-blue-600 to-blue-400",
      drivers: ["Alex Albon", "Carlos Sainz"],
      carImage: williamsCar,
      logoImage: williamsLogo,
      country: "United Kingdom",
      championships: 9,
      base: "Grove, UK"
    },
    {
      name: "RB F1 Team",
      teamKey: "rb",
      gradient: "from-blue-900 via-blue-700 to-indigo-500",
      drivers: ["Isack Hadjar", "Liam Lawson"],
      carImage: vcarbCar,
      logoImage: vcarbLogo,
      country: "Italy",
      championships: 0,
      base: "Faenza, Italy"
    },
    {
      name: "Stake F1 Team Kick Sauber",
      teamKey: "kick_sauber",
      gradient: "from-green-900 via-green-600 to-emerald-400",
      drivers: ["Nico Hulkenberg", "Gabriel Bortoleto"],
      carImage: sauberCar,
      logoImage: sauberLogo,
      country: "Switzerland",
      championships: 0,
      base: "Hinwil, Switzerland"
    },
    {
      name: "MoneyGram Haas F1 Team",
      teamKey: "haas",
      gradient: "from-gray-800 via-gray-600 to-gray-400",
      drivers: ["Oliver Bearman", "Esteban Ocon"],
      carImage: haasCar,
      logoImage: haasLogo,
      country: "United States",
      championships: 0,
      base: "Kannapolis, USA"
    }
  ];

  // State for tabs
  const [activeTab, setActiveTab] = useState("all");
  
  // State for search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  // State for country filter
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");

  // Get unique countries
  const uniqueCountries = [...new Set(teamsData.map((team) => team.country))].sort();

  // Filter teams by country
  const teamsByCountry = selectedCountry
    ? teamsData.filter((team) => team.country === selectedCountry)
    : [];

  // Filter countries based on search
  const filteredCountries = uniqueCountries.filter((country) =>
    country.toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = teamsData.filter(
      (team) =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.drivers.some((driver) =>
          driver.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        team.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            F1 Teams 2024
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explore all Formula 1 constructor teams
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveTab("all");
              setSelectedCountry(null);
              setSearchQuery("");
              setSearchResults([]);
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "all"
                ? "bg-red-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            All Teams
          </button>
          <button
            onClick={() => {
              setActiveTab("country");
              setSearchQuery("");
              setSearchResults([]);
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "country"
                ? "bg-red-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            By Country
          </button>
          <button
            onClick={() => {
              setActiveTab("search");
              setSelectedCountry(null);
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "search"
                ? "bg-red-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Search className="inline-block mr-2" size={18} />
            Search
          </button>
        </div>

        {/* All Teams View */}
        {activeTab === "all" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {teamsData.map((team) => (
              <TeamCard
                key={team.teamKey}
                name={team.name}
                teamKey={team.teamKey}
                gradient={team.gradient}
                drivers={team.drivers}
                carImage={team.carImage}
                logoImage={team.logoImage}
              />
            ))}
          </div>
        )}

        {/* By Country View */}
        {activeTab === "country" && (
          <div>
            {/* Country Dropdown */}
            <div className="mb-12 max-w-md mx-auto relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Select Country
              </label>
              <div className="relative flex gap-4">
                <div className="relative flex-1">
                <button
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-left flex justify-between items-center hover:border-red-500 dark:hover:border-red-500 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedCountry || "Choose a country..."}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${
                      countryDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {countryDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setCountryDropdownOpen(false)}
                    />
                    {/* Solid blocking panel */}
                    <div className="absolute z-[19] left-full ml-4 top-0 w-80 h-96 bg-gray-50 dark:bg-gray-950" />
                    {/* Dropdown Menu */}
                    <div className="absolute z-20 left-full ml-4 top-0 w-80">
                      <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-2xl max-h-64 overflow-hidden">
                        {/* Search Input */}
                        <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                          <input
                            type="text"
                            placeholder="Search countries..."
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        {/* Options */}
                        <div className="overflow-y-auto max-h-48 bg-white dark:bg-gray-800">
                          {filteredCountries.map((country) => (
                            <button
                              key={country}
                              onClick={() => {
                                setSelectedCountry(country);
                                setCountryDropdownOpen(false);
                                setCountrySearchQuery("");
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors bg-white dark:bg-gray-800"
                            >
                              {country}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              </div>

              {/* Selected Country Tag */}
              {selectedCountry && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm">
                  <span>{selectedCountry}</span>
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="hover:bg-red-200 dark:hover:bg-red-800/50 rounded-full p-1 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Teams Grid */}
            {selectedCountry ? (
              teamsByCountry.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {teamsByCountry.map((team) => (
                    <TeamCard
                      key={team.teamKey}
                      name={team.name}
                      teamKey={team.teamKey}
                      gradient={team.gradient}
                      drivers={team.drivers}
                      carImage={team.carImage}
                      logoImage={team.logoImage}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No teams found for {selectedCountry}
                  </p>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Please select a country to view teams
                </p>
              </div>
            )}
          </div>
        )}

        {/* Search View */}
        {activeTab === "search" && (
          <div>
            {/* Search Input */}
            <div className="mb-12 max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
              <div className="flex gap-2">`
                <input
                  type="text"
                  placeholder="Search teams by name, driver, or country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Search size={20} />
                  Search
                </button>
              </div>
            </div>

            {/* Search Results */}
            {searchQuery.trim() === "" ? (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Enter a search term to find teams
                </p>
              </div>
            ) : searchResults.length > 0 ? (
              <div>
                <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
                  Found {searchResults.length} team{searchResults.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {searchResults.map((team) => (
                    <TeamCard
                      key={team.teamKey}
                      name={team.name}
                      teamKey={team.teamKey}
                      gradient={team.gradient}
                      drivers={team.drivers}
                      carImage={team.carImage}
                      logoImage={team.logoImage}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No teams found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
