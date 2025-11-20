import { Navbar } from "@/components/Navbar";
import DriverCard from "@/components/DriverCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

// Import flags
import nlFlag from "@/assets/flags/nl.png";
import jpFlag from "@/assets/flags/jp.png";
import gbFlag from "@/assets/flags/gb.png";
import itFlag from "@/assets/flags/it.png";
import frFlag from "@/assets/flags/fr.png";
import esFlag from "@/assets/flags/es.png";
import deFlag from "@/assets/flags/de.png";
import auFlag from "@/assets/flags/au.png";
import arFlag from "@/assets/flags/ar.png";
import brFlag from "@/assets/flags/br.png";
import mcFlag from "@/assets/flags/mc.png";
import caFlag from "@/assets/flags/ca.png";
import thFlag from "@/assets/flags/th.png";
import nzFlag from "@/assets/flags/nz.png"; 

// Drivers data with all information
const driversData = [
  { firstName: "Max", lastName: "Verstappen", team: "Red Bull Racing", number: "1", driverKey: "verstappen", flagImage: nlFlag, gradient: "linear-gradient(135deg, #001F70 0%, #0045A0 100%)", nationality: "Netherlands" },
  { firstName: "Yuki", lastName: "Tsunoda", team: "Red Bull Racing", number: "22", driverKey: "tsunoda", flagImage: jpFlag, gradient: "linear-gradient(135deg, #001F70 0%, #0045A0 100%)", nationality: "Japan" },
  { firstName: "George", lastName: "Russell", team: "Mercedes", number: "63", driverKey: "russell", flagImage: gbFlag, gradient: "linear-gradient(135deg, #00A19B 0%, #006E6B 100%)", nationality: "United Kingdom" },
  { firstName: "Kimi", lastName: "Antonelli", team: "Mercedes", number: "24", driverKey: "antonelli", flagImage: itFlag, gradient: "linear-gradient(135deg, #00A19B 0%, #006E6B 100%)", nationality: "Italy" },
  { firstName: "Charles", lastName: "Leclerc", team: "Ferrari", number: "16", driverKey: "leclerc", flagImage: mcFlag, gradient: "linear-gradient(135deg, #C80000 0%, #7A0000 100%)", nationality: "Monaco" },
  { firstName: "Lewis", lastName: "Hamilton", team: "Ferrari", number: "44", driverKey: "hamilton", flagImage: gbFlag, gradient: "linear-gradient(135deg, #C80000 0%, #7A0000 100%)", nationality: "United Kingdom" },
  { firstName: "Lando", lastName: "Norris", team: "McLaren", number: "4", driverKey: "norris", flagImage: gbFlag, gradient: "linear-gradient(135deg, #F37224 0%, #D45A00 100%)", nationality: "United Kingdom" },
  { firstName: "Oscar", lastName: "Piastri", team: "McLaren", number: "81", driverKey: "piastri", flagImage: auFlag, gradient: "linear-gradient(135deg, #F37224 0%, #D45A00 100%)", nationality: "Australia" },
  { firstName: "Fernando", lastName: "Alonso", team: "Aston Martin", number: "14", driverKey: "alonso", flagImage: esFlag, gradient: "linear-gradient(135deg, #005F4A 0%, #003A2D 100%)", nationality: "Spain" },
  { firstName: "Lance", lastName: "Stroll", team: "Aston Martin", number: "18", driverKey: "stroll", flagImage: caFlag, gradient: "linear-gradient(135deg, #005F4A 0%, #003A2D 100%)", nationality: "Canada" },
  { firstName: "Pierre", lastName: "Gasly", team: "Alpine", number: "10", driverKey: "gasly", flagImage: frFlag, gradient: "linear-gradient(135deg, #0021FF 0%, #0015A5 100%)", nationality: "France" },
  { firstName: "Franco", lastName: "Colapinto", team: "Alpine", number: "29", driverKey: "colapinto", flagImage: arFlag, gradient: "linear-gradient(135deg, #0021FF 0%, #0015A5 100%)", nationality: "Argentina" },
  { firstName: "Alex", lastName: "Albon", team: "Williams", number: "23", driverKey: "albon", flagImage: thFlag, gradient: "linear-gradient(135deg, #005BBB 0%, #003B75 100%)", nationality: "Thailand" },
  { firstName: "Carlos", lastName: "Sainz", team: "Williams", number: "55", driverKey: "sainz", flagImage: esFlag, gradient: "linear-gradient(135deg, #005BBB 0%, #003B75 100%)", nationality: "Spain" },
  { firstName: "Isaac", lastName: "Hadjar", team: "RB (Visa Cash App RB)", number: "30", driverKey: "hadjar", flagImage: frFlag, gradient: "linear-gradient(135deg, #0B1A34 0%, #12345A 100%)", nationality: "France" },
  { firstName: "Liam", lastName: "Lawson", team: "RB (Visa Cash App RB)", number: "22", driverKey: "lawson", flagImage: nzFlag, gradient: "linear-gradient(135deg, #0B1A34 0%, #12345A 100%)", nationality: "New Zealand" },
  { firstName: "Nico", lastName: "Hulkenberg", team: "Stake F1 Team (Sauber)", number: "27", driverKey: "hulkenberg", flagImage: deFlag, gradient: "linear-gradient(135deg, #00B36B 0%, #008A53 100%)", nationality: "Germany" },
  { firstName: "Gabriel", lastName: "Bortoleto", team: "Stake F1 Team (Sauber)", number: "35", driverKey: "bortoleto", flagImage: brFlag, gradient: "linear-gradient(135deg, #00B36B 0%, #008A53 100%)", nationality: "Brazil" },
  { firstName: "Oliver", lastName: "Bearman", team: "Haas", number: "17", driverKey: "bearman", flagImage: gbFlag, gradient: "linear-gradient(135deg, #C8C8C8 0%, #8A8A8A 100%)", nationality: "United Kingdom" },
  { firstName: "Esteban", lastName: "Ocon", team: "Haas", number: "31", driverKey: "ocon", flagImage: frFlag, gradient: "linear-gradient(135deg, #C8C8C8 0%, #8A8A8A 100%)", nationality: "France" },
];

export default function Drivers() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedNationality, setSelectedNationality] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [teamSearchInput, setTeamSearchInput] = useState("");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [nationalitySearchInput, setNationalitySearchInput] = useState("");
  const [isNationalityDropdownOpen, setIsNationalityDropdownOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to driver when navigating from Teams page
  useEffect(() => {
    if (location.state?.driverKey) {
      setTimeout(() => {
        const element = document.getElementById(location.state.driverKey);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a brief highlight effect
          element.classList.add('ring-4', 'ring-red-500');
          setTimeout(() => element.classList.remove('ring-4', 'ring-red-500'), 2000);
        }
      }, 100);
    }
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      `${driver.firstName} ${driver.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.nationality.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesTeam = selectedTeam === "All" || driver.team === selectedTeam;
    const matchesNationality = selectedNationality === "All" || driver.nationality === selectedNationality;
    
    if (activeTab === "search") {
      return searchQuery.length > 0 && matchesSearch;
    }
    
    return matchesTeam && matchesNationality;
  });

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Navbar />

      <div className="container pt-32 pb-16">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">F1 Drivers</h1>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-2 border-b border-gray-300 dark:border-gray-700">
          <button
            onClick={() => { setActiveTab("all"); setSelectedTeam("All"); setSelectedNationality("All"); }}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "all"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-600 dark:text-gray-400 hover:text-red-600"
            }`}
          >
            All Drivers
          </button>
          <button
            onClick={() => { setActiveTab("teams"); setSelectedNationality("All"); }}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "teams"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-600 dark:text-gray-400 hover:text-red-600"
            }`}
          >
            By Team
          </button>
          <button
            onClick={() => { setActiveTab("nationality"); setSelectedTeam("All"); }}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "nationality"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-600 dark:text-gray-400 hover:text-red-600"
            }`}
          >
            By Nationality
          </button>
          <button
            onClick={() => { setActiveTab("search"); setSelectedTeam("All"); setSelectedNationality("All"); }}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "search"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-600 dark:text-gray-400 hover:text-red-600"
            }`}
          >
            Search
          </button>
        </div>

        {/* Filter Content */}
        <div className="mb-12 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
          {activeTab === "teams" && (
            <div className="relative max-w-md mx-auto flex gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search or select a team..."
                  value={teamSearchInput}
                  onChange={(e) => {
                    setTeamSearchInput(e.target.value);
                    setIsTeamDropdownOpen(true);
                  }}
                  onFocus={() => setIsTeamDropdownOpen(true)}
                  className="w-full px-5 py-3 pr-10 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

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
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                </div>
              )}

              {isTeamDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsTeamDropdownOpen(false)} />
                  {/* Solid blocking panel */}
                  <div className="absolute z-[19] left-full ml-4 top-0 w-80 h-96 bg-gray-50 dark:bg-gray-950" />
                  <div className="absolute z-20 left-full ml-4 top-0 w-80">
                    <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-2xl shadow-2xl max-h-96 overflow-y-auto">
                      {filteredTeams.length > 0 ? (
                        filteredTeams.map((team) => (
                        <button
                          key={team}
                          onClick={() => {
                            setSelectedTeam(team);
                            setTeamSearchInput(team === "All" ? "" : team);
                            setIsTeamDropdownOpen(false);
                          }}
                          className={`w-full px-5 py-3 text-left hover:bg-red-100 dark:hover:bg-red-900 transition-colors ${
                            selectedTeam === team ? "bg-red-600 text-white hover:bg-red-700" : "text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                          } ${team !== filteredTeams[filteredTeams.length - 1] ? "border-b border-gray-200 dark:border-gray-700" : ""}`}
                        >
                          {team}
                        </button>
                      ))
                    ) : (
                      <div className="px-5 py-3 text-gray-500 dark:text-gray-400 text-center">No teams found</div>
                    )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "nationality" && (
            <div className="relative max-w-md mx-auto flex gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search or select a nationality..."
                  value={nationalitySearchInput}
                  onChange={(e) => {
                    setNationalitySearchInput(e.target.value);
                    setIsNationalityDropdownOpen(true);
                  }}
                  onFocus={() => setIsNationalityDropdownOpen(true)}
                  className="w-full px-5 py-3 pr-10 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

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
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                </div>
              )}

              {isNationalityDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsNationalityDropdownOpen(false)} />
                  {/* Solid blocking panel */}
                  <div className="absolute z-[19] left-full ml-4 top-0 w-80 h-96 bg-gray-50 dark:bg-gray-950" />
                  <div className="absolute z-20 left-full ml-4 top-0 w-80">
                    <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-2xl shadow-2xl max-h-96 overflow-y-auto">
                      {filteredNationalities.length > 0 ? (
                        filteredNationalities.map((nationality) => (
                        <button
                          key={nationality}
                          onClick={() => {
                            setSelectedNationality(nationality);
                            setNationalitySearchInput(nationality === "All" ? "" : nationality);
                            setIsNationalityDropdownOpen(false);
                          }}
                          className={`w-full px-5 py-3 text-left hover:bg-red-100 dark:hover:bg-red-900 transition-colors ${
                            selectedNationality === nationality ? "bg-red-600 text-white hover:bg-red-700" : "text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                          } ${nationality !== filteredNationalities[filteredNationalities.length - 1] ? "border-b border-gray-200 dark:border-gray-700" : ""}`}
                        >
                          {nationality}
                        </button>
                      ))
                    ) : (
                      <div className="px-5 py-3 text-gray-500 dark:text-gray-400 text-center">No nationalities found</div>
                    )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "search" && (
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search drivers by name, team, or nationality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeTab === "search" && searchQuery.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
              Start typing to search for drivers...
            </div>
          ) : filteredDrivers.length > 0 ? (
            filteredDrivers.map((driver) => (
              <div key={driver.driverKey} id={driver.driverKey} className="transition-all duration-300">
                <DriverCard
                  firstName={driver.firstName}
                  lastName={driver.lastName}
                  team={driver.team}
                  number={driver.number}
                  driverKey={driver.driverKey}
                  flagImage={driver.flagImage}
                  gradient={driver.gradient}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
              No drivers found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
