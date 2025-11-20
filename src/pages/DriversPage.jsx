import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// F1 2024 Drivers data (from formula1.com)
const driversData = [
  {
    id: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    nationality: "Netherlands",
    number: 1,
    championships: 3,
    podiums: 109,
    points: 2777.5,
    grandsPrixEntered: 199,
    worldChampionships: 3,
    highestRaceFinish: 1,
    highestGridPosition: 1,
    dateOfBirth: "30/09/1997",
    placeOfBirth: "Hasselt, Belgium",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png"
  },
  {
    id: 2,
    name: "Lewis Hamilton",
    team: "Mercedes",
    nationality: "United Kingdom",
    number: 44,
    championships: 7,
    podiums: 201,
    points: 4686.5,
    grandsPrixEntered: 351,
    worldChampionships: 7,
    highestRaceFinish: 1,
    highestGridPosition: 1,
    dateOfBirth: "07/01/1985",
    placeOfBirth: "Stevenage, England",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png"
  },
  {
    id: 3,
    name: "Charles Leclerc",
    team: "Ferrari",
    nationality: "Monaco",
    number: 16,
    championships: 0,
    podiums: 37,
    points: 1079,
    grandsPrixEntered: 146,
    worldChampionships: 0,
    highestRaceFinish: 1,
    highestGridPosition: 1,
    dateOfBirth: "16/10/1997",
    placeOfBirth: "Monte Carlo, Monaco",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png"
  },
  {
    id: 4,
    name: "Lando Norris",
    team: "McLaren",
    nationality: "United Kingdom",
    number: 4,
    championships: 0,
    podiums: 23,
    points: 784,
    grandsPrixEntered: 122,
    worldChampionships: 0,
    highestRaceFinish: 1,
    highestGridPosition: 1,
    dateOfBirth: "13/11/1999",
    placeOfBirth: "Bristol, England",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png"
  },
  {
    id: 5,
    name: "Oscar Piastri",
    team: "McLaren",
    nationality: "Australia",
    number: 81,
    championships: 0,
    podiums: 10,
    points: 247,
    grandsPrixEntered: 45,
    worldChampionships: 0,
    highestRaceFinish: 1,
    highestGridPosition: 2,
    dateOfBirth: "06/04/2001",
    placeOfBirth: "Melbourne, Victoria",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png"
  },
  {
    id: 6,
    name: "George Russell",
    team: "Mercedes",
    nationality: "United Kingdom",
    number: 63,
    championships: 0,
    podiums: 14,
    points: 542,
    grandsPrixEntered: 109,
    worldChampionships: 0,
    highestRaceFinish: 1,
    highestGridPosition: 1,
    dateOfBirth: "15/02/1998",
    placeOfBirth: "King's Lynn, England",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png"
  },
  {
    id: 7,
    name: "Carlos Sainz",
    team: "Ferrari",
    nationality: "Spain",
    number: 55,
    championships: 0,
    podiums: 25,
    points: 1155.5,
    grandsPrixEntered: 201,
    worldChampionships: 0,
    highestRaceFinish: 1,
    highestGridPosition: 1,
    dateOfBirth: "01/09/1994",
    placeOfBirth: "Madrid, Spain",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png"
  },
  {
    id: 8,
    name: "Sergio Pérez",
    team: "Red Bull Racing",
    nationality: "Mexico",
    number: 11,
    championships: 0,
    podiums: 39,
    points: 1587,
    grandsPrixEntered: 276,
    worldChampionships: 0,
    highestRaceFinish: 1,
    highestGridPosition: 1,
    dateOfBirth: "26/01/1990",
    placeOfBirth: "Guadalajara, Mexico",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png"
  },
  {
    id: 9,
    name: "Fernando Alonso",
    team: "Aston Martin",
    nationality: "Spain",
    number: 14,
    championships: 2,
    podiums: 106,
    points: 2314,
    grandsPrixEntered: 398,
    worldChampionships: 2,
    highestRaceFinish: 1,
    highestGridPosition: 1,
    dateOfBirth: "29/07/1981",
    placeOfBirth: "Oviedo, Spain",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png"
  },
  {
    id: 10,
    name: "Lance Stroll",
    team: "Aston Martin",
    nationality: "Canada",
    number: 18,
    championships: 0,
    podiums: 3,
    points: 281,
    grandsPrixEntered: 162,
    worldChampionships: 0,
    highestRaceFinish: 3,
    highestGridPosition: 2,
    dateOfBirth: "29/10/1998",
    placeOfBirth: "Montreal, Canada",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png"
  },
  {
    id: 11,
    name: "Pierre Gasly",
    team: "Alpine",
    nationality: "France",
    number: 10,
    championships: 0,
    podiums: 4,
    points: 400,
    grandsPrixEntered: 148,
    worldChampionships: 0,
    highestRaceFinish: 1,
    highestGridPosition: 2,
    dateOfBirth: "07/02/1996",
    placeOfBirth: "Rouen, France",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png"
  },
  {
    id: 12,
    name: "Esteban Ocon",
    team: "Alpine",
    nationality: "France",
    number: 31,
    championships: 0,
    podiums: 3,
    points: 430,
    grandsPrixEntered: 153,
    worldChampionships: 0,
    highestRaceFinish: 1,
    highestGridPosition: 3,
    dateOfBirth: "17/09/1996",
    placeOfBirth: "Évreux, Normandy",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png"
  },
  {
    id: 13,
    name: "Alexander Albon",
    team: "Williams",
    nationality: "Thailand",
    number: 23,
    championships: 0,
    podiums: 2,
    points: 246,
    grandsPrixEntered: 93,
    worldChampionships: 0,
    highestRaceFinish: 3,
    highestGridPosition: 4,
    dateOfBirth: "23/03/1996",
    placeOfBirth: "London, England",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png"
  },
  {
    id: 14,
    name: "Logan Sargeant",
    team: "Williams",
    nationality: "United States",
    number: 2,
    championships: 0,
    podiums: 0,
    points: 1,
    grandsPrixEntered: 36,
    worldChampionships: 0,
    highestRaceFinish: 10,
    highestGridPosition: 15,
    dateOfBirth: "31/12/2000",
    placeOfBirth: "Fort Lauderdale, Florida",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/L/LOGSAR01_Logan_Sargeant/logsar01.png"
  },
  {
    id: 15,
    name: "Valtteri Bottas",
    team: "Kick Sauber",
    nationality: "Finland",
    number: 77,
    championships: 0,
    podiums: 67,
    points: 1797,
    grandsPrixEntered: 237,
    worldChampionships: 0,
    highestRaceFinish: 1,
    highestGridPosition: 1,
    dateOfBirth: "28/08/1989",
    placeOfBirth: "Nastola, Finland",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png"
  },
  {
    id: 16,
    name: "Zhou Guanyu",
    team: "Kick Sauber",
    nationality: "China",
    number: 24,
    championships: 0,
    podiums: 0,
    points: 17,
    grandsPrixEntered: 67,
    worldChampionships: 0,
    highestRaceFinish: 8,
    highestGridPosition: 5,
    dateOfBirth: "30/05/1999",
    placeOfBirth: "Shanghai, China",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/Z/ZHOGUA01_Zhou_Guanyu/zhogua01.png"
  },
  {
    id: 17,
    name: "Kevin Magnussen",
    team: "Haas F1 Team",
    nationality: "Denmark",
    number: 20,
    championships: 0,
    podiums: 1,
    points: 185,
    grandsPrixEntered: 179,
    worldChampionships: 0,
    highestRaceFinish: 2,
    highestGridPosition: 4,
    dateOfBirth: "05/10/1992",
    placeOfBirth: "Roskilde, Denmark",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png"
  },
  {
    id: 18,
    name: "Nico Hulkenberg",
    team: "Haas F1 Team",
    nationality: "Germany",
    number: 27,
    championships: 0,
    podiums: 0,
    points: 547,
    grandsPrixEntered: 222,
    worldChampionships: 0,
    highestRaceFinish: 4,
    highestGridPosition: 1,
    dateOfBirth: "19/08/1987",
    placeOfBirth: "Emmerich am Rhein, Germany",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png"
  },
  {
    id: 19,
    name: "Yuki Tsunoda",
    team: "RB",
    nationality: "Japan",
    number: 22,
    championships: 0,
    podiums: 0,
    points: 78,
    grandsPrixEntered: 90,
    worldChampionships: 0,
    highestRaceFinish: 4,
    highestGridPosition: 7,
    dateOfBirth: "11/05/2000",
    placeOfBirth: "Sagamihara, Japan",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png"
  },
  {
    id: 20,
    name: "Daniel Ricciardo",
    team: "RB",
    nationality: "Australia",
    number: 3,
    championships: 0,
    podiums: 32,
    points: 1329,
    grandsPrixEntered: 257,
    worldChampionships: 0,
    highestRaceFinish: 1,
    highestGridPosition: 1,
    dateOfBirth: "01/07/1989",
    placeOfBirth: "Perth, Australia",
    photo: "https://www.formula1.com/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png"
  }
];

export const DriversPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedNationality, setSelectedNationality] = useState("All");
  const [activeTab, setActiveTab] = useState("teams"); // teams, nationality, search

  // Handle driver name from URL parameter
  useEffect(() => {
    const driverName = searchParams.get('name');
    if (driverName) {
      setActiveTab('search');
      setSearchQuery(driverName);
      // Clear the URL parameter after setting the search
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);
  const [teamSearchInput, setTeamSearchInput] = useState("");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [nationalitySearchInput, setNationalitySearchInput] = useState("");
  const [isNationalityDropdownOpen, setIsNationalityDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name"); // name, points, championships, podiums

  // Get unique teams and nationalities
  const teams = ["All", ...new Set(driversData.map(d => d.team))];
  const nationalities = ["All", ...new Set(driversData.map(d => d.nationality))];

  // Filter teams based on search input
  const filteredTeams = teams.filter(team =>
    team.toLowerCase().includes(teamSearchInput.toLowerCase())
  );

  // Filter nationalities based on search input
  const filteredNationalities = nationalities.filter(nationality =>
    nationality.toLowerCase().includes(nationalitySearchInput.toLowerCase())
  );

  // Filter drivers
  let filteredDrivers = driversData.filter(driver => {
    const matchesSearch = searchQuery.length > 0 && (
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.nationality.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesTeam = selectedTeam === "All" || driver.team === selectedTeam;
    const matchesNationality = selectedNationality === "All" || driver.nationality === selectedNationality;
    
    // For search tab, only show results if user has typed something
    if (activeTab === "search") {
      return searchQuery.length > 0 && matchesSearch;
    }
    
    return matchesTeam && matchesNationality;
  });

  // Sort drivers
  filteredDrivers = [...filteredDrivers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "points":
        return b.points - a.points;
      case "championships":
        return b.championships - a.championships;
      case "podiums":
        return b.podiums - a.podiums;
      default:
        return 0;
    }
  });

  return (
    <>
      <ThemeToggle />
      <StarBackground />
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              F1 <span className="text-primary">Drivers</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Browse profiles of top Formula 1 drivers
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 flex gap-2 border-b border-gray-300 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("teams")}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === "teams"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-red-600"
              }`}
            >
              Teams
            </button>
            <button
              onClick={() => setActiveTab("nationality")}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === "nationality"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-red-600"
              }`}
            >
              Nationality
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === "search"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-red-600"
              }`}
            >
              Search
            </button>
          </div>

          {/* Sort Dropdown */}
          {activeTab !== "search" && (
            <div className="mb-6 flex justify-end">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="points">Career Points (High-Low)</option>
                  <option value="championships">Championships (High-Low)</option>
                  <option value="podiums">Podiums (High-Low)</option>
                </select>
              </div>
            </div>
          )}

          {/* Filter Content */}
          <div className="mb-8">
            {activeTab === "teams" && (
              <div className="relative max-w-md">
                {/* Combobox Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search or select a team..."
                    value={teamSearchInput}
                    onChange={(e) => {
                      setTeamSearchInput(e.target.value);
                      setIsTeamDropdownOpen(true);
                    }}
                    onFocus={() => setIsTeamDropdownOpen(true)}
                    className="w-full px-5 py-3 pr-10 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Selected Team Display */}
                {selectedTeam !== "All" && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Selected:</span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-sm font-medium">
                      {selectedTeam}
                      <button
                        onClick={() => {
                          setSelectedTeam("All");
                          setTeamSearchInput("");
                        }}
                        className="hover:bg-red-700 rounded-full p-0.5 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                )}

                {/* Dropdown Options */}
                {isTeamDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsTeamDropdownOpen(false)}
                    />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl max-h-64 overflow-y-auto">
                      {filteredTeams.length > 0 ? (
                        filteredTeams.map((team) => (
                          <button
                            key={team}
                            onClick={() => {
                              setSelectedTeam(team);
                              setTeamSearchInput(team === "All" ? "" : team);
                              setIsTeamDropdownOpen(false);
                            }}
                            className={`w-full px-5 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${
                              selectedTeam === team
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "text-gray-900 dark:text-white"
                            } ${team !== filteredTeams[filteredTeams.length - 1] ? "border-b border-gray-200 dark:border-gray-800" : ""}`}
                          >
                            {team}
                          </button>
                        ))
                      ) : (
                        <div className="px-5 py-3 text-gray-500 dark:text-gray-400 text-center">
                          No teams found
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "nationality" && (
              <div className="relative max-w-md">
                {/* Combobox Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search or select a nationality..."
                    value={nationalitySearchInput}
                    onChange={(e) => {
                      setNationalitySearchInput(e.target.value);
                      setIsNationalityDropdownOpen(true);
                    }}
                    onFocus={() => setIsNationalityDropdownOpen(true)}
                    className="w-full px-5 py-3 pr-10 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Selected Nationality Display */}
                {selectedNationality !== "All" && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Selected:</span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-sm font-medium">
                      {selectedNationality}
                      <button
                        onClick={() => {
                          setSelectedNationality("All");
                          setNationalitySearchInput("");
                        }}
                        className="hover:bg-red-700 rounded-full p-0.5 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                )}

                {/* Dropdown Options */}
                {isNationalityDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsNationalityDropdownOpen(false)}
                    />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl max-h-64 overflow-y-auto">
                      {filteredNationalities.length > 0 ? (
                        filteredNationalities.map((nationality) => (
                          <button
                            key={nationality}
                            onClick={() => {
                              setSelectedNationality(nationality);
                              setNationalitySearchInput(nationality === "All" ? "" : nationality);
                              setIsNationalityDropdownOpen(false);
                            }}
                            className={`w-full px-5 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${
                              selectedNationality === nationality
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "text-gray-900 dark:text-white"
                            } ${nationality !== filteredNationalities[filteredNationalities.length - 1] ? "border-b border-gray-200 dark:border-gray-800" : ""}`}
                          >
                            {nationality}
                          </button>
                        ))
                      ) : (
                        <div className="px-5 py-3 text-gray-500 dark:text-gray-400 text-center">
                          No nationalities found
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "search" && (
              <input
                type="text"
                placeholder="Search drivers by name, team, or nationality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            )}
          </div>

          {/* Drivers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeTab === "search" && searchQuery.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
                Start typing to search for drivers...
              </div>
            ) : filteredDrivers.length > 0 ? (
              filteredDrivers.map(driver => (
                <div
                  key={driver.id}
                  className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-red-500 transition-all duration-300 cursor-pointer"
                >
                  {/* Driver Image */}
                  <div className="aspect-square bg-gradient-to-br from-red-500/10 to-gray-500/10 flex items-center justify-center overflow-hidden relative">
                    <img 
                      src={driver.photo} 
                      alt={driver.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 hidden items-center justify-center text-6xl font-bold text-gray-300 dark:text-gray-700">
                      #{driver.number}
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{driver.name}</h3>
                    <p className="text-sm text-primary mb-2">{driver.team}</p>
                    
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Nationality:</span>
                        <span className="font-semibold">{driver.nationality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Number:</span>
                        <span className="font-semibold">#{driver.number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Championships:</span>
                        <span className="font-semibold">{driver.championships}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Podiums:</span>
                        <span className="font-semibold">{driver.podiums}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Career Points:</span>
                        <span className="font-semibold">{driver.points}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
                No drivers found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
