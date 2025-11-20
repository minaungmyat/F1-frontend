import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// F1 2024 Teams data
const teamsData = [
  {
    id: 1,
    name: "Red Bull Racing",
    fullName: "Oracle Red Bull Racing",
    base: "Milton Keynes, United Kingdom",
    teamChief: "Christian Horner",
    technicalChief: "Pierre Waché",
    chassis: "RB20",
    powerUnit: "Honda RBPT",
    firstEntry: 2005,
    worldChampionships: 6,
    polePositions: 95,
    fastestLaps: 94,
    color: "#3671C6",
    logo: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/red%20bull.jpg",
    drivers: ["Max Verstappen", "Sergio Pérez"]
  },
  {
    id: 2,
    name: "Mercedes",
    fullName: "Mercedes-AMG Petronas F1 Team",
    base: "Brackley, United Kingdom",
    teamChief: "Toto Wolff",
    technicalChief: "James Allison",
    chassis: "W15",
    powerUnit: "Mercedes",
    firstEntry: 1970,
    worldChampionships: 8,
    polePositions: 139,
    fastestLaps: 94,
    color: "#27F4D2",
    logo: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/mercedes.jpg",
    drivers: ["Lewis Hamilton", "George Russell"]
  },
  {
    id: 3,
    name: "Ferrari",
    fullName: "Scuderia Ferrari",
    base: "Maranello, Italy",
    teamChief: "Frédéric Vasseur",
    technicalChief: "Enrico Cardile",
    chassis: "SF-24",
    powerUnit: "Ferrari",
    firstEntry: 1950,
    worldChampionships: 16,
    polePositions: 249,
    fastestLaps: 263,
    color: "#E8002D",
    logo: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/ferrari.jpg",
    drivers: ["Charles Leclerc", "Carlos Sainz"]
  },
  {
    id: 4,
    name: "McLaren",
    fullName: "McLaren F1 Team",
    base: "Woking, United Kingdom",
    teamChief: "Andrea Stella",
    technicalChief: "Peter Prodromou",
    chassis: "MCL38",
    powerUnit: "Mercedes",
    firstEntry: 1966,
    worldChampionships: 8,
    polePositions: 156,
    fastestLaps: 163,
    color: "#FF8000",
    logo: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/mclaren.jpg",
    drivers: ["Lando Norris", "Oscar Piastri"]
  },
  {
    id: 5,
    name: "Aston Martin",
    fullName: "Aston Martin Aramco F1 Team",
    base: "Silverstone, United Kingdom",
    teamChief: "Mike Krack",
    technicalChief: "Dan Fallows",
    chassis: "AMR24",
    powerUnit: "Mercedes",
    firstEntry: 1959,
    worldChampionships: 0,
    polePositions: 1,
    fastestLaps: 1,
    color: "#229971",
    logo: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/aston%20martin.jpg",
    drivers: ["Fernando Alonso", "Lance Stroll"]
  },
  {
    id: 6,
    name: "Alpine",
    fullName: "BWT Alpine F1 Team",
    base: "Enstone, United Kingdom",
    teamChief: "Bruno Famin",
    technicalChief: "Matt Harman",
    chassis: "A524",
    powerUnit: "Renault",
    firstEntry: 1986,
    worldChampionships: 2,
    polePositions: 20,
    fastestLaps: 15,
    color: "#FF87BC",
    logo: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/alpine.jpg",
    drivers: ["Pierre Gasly", "Esteban Ocon"]
  },
  {
    id: 7,
    name: "Williams",
    fullName: "Williams Racing",
    base: "Grove, United Kingdom",
    teamChief: "James Vowles",
    technicalChief: "Pat Fry",
    chassis: "FW46",
    powerUnit: "Mercedes",
    firstEntry: 1978,
    worldChampionships: 9,
    polePositions: 128,
    fastestLaps: 133,
    color: "#64C4FF",
    logo: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/williams.jpg",
    drivers: ["Alexander Albon", "Logan Sargeant"]
  },
  {
    id: 8,
    name: "Kick Sauber",
    fullName: "Stake F1 Team Kick Sauber",
    base: "Hinwil, Switzerland",
    teamChief: "Alessandro Alunni Bravi",
    technicalChief: "James Key",
    chassis: "C44",
    powerUnit: "Ferrari",
    firstEntry: 1993,
    worldChampionships: 0,
    polePositions: 1,
    fastestLaps: 7,
    color: "#52E252",
    logo: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/kick%20sauber.jpg",
    drivers: ["Valtteri Bottas", "Zhou Guanyu"]
  },
  {
    id: 9,
    name: "Haas",
    fullName: "MoneyGram Haas F1 Team",
    base: "Kannapolis, United States",
    teamChief: "Ayao Komatsu",
    technicalChief: "Andrea De Zordo",
    chassis: "VF-24",
    powerUnit: "Ferrari",
    firstEntry: 2016,
    worldChampionships: 0,
    polePositions: 1,
    fastestLaps: 2,
    color: "#B6BABD",
    logo: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/haas.jpg",
    drivers: ["Kevin Magnussen", "Nico Hülkenberg"]
  },
  {
    id: 10,
    name: "RB",
    fullName: "Visa Cash App RB F1 Team",
    base: "Faenza, Italy",
    teamChief: "Laurent Mekies",
    technicalChief: "Jody Egginton",
    chassis: "VCARB 01",
    powerUnit: "Honda RBPT",
    firstEntry: 1985,
    worldChampionships: 0,
    polePositions: 1,
    fastestLaps: 1,
    color: "#6692FF",
    logo: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/rb.jpg",
    drivers: ["Yuki Tsunoda", "Daniel Ricciardo"]
  }
];

export const TeamsPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("championships");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter teams based on search
  const filteredTeams = teamsData.filter(team => {
    const query = searchQuery.toLowerCase();
    return (
      team.name.toLowerCase().includes(query) ||
      team.fullName.toLowerCase().includes(query) ||
      team.base.toLowerCase().includes(query) ||
      team.teamChief.toLowerCase().includes(query) ||
      team.powerUnit.toLowerCase().includes(query)
    );
  });

  // Sort teams
  const sortedTeams = [...filteredTeams].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "championships":
        return b.worldChampionships - a.worldChampionships;
      case "poles":
        return b.polePositions - a.polePositions;
      case "year":
        return a.firstEntry - b.firstEntry;
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Background Effects */}
        <StarBackground />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold mb-4">
              F1 <span className="text-primary">Teams</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Explore all Formula 1 constructor teams competing in 2024
            </p>
          </div>

          {/* Controls */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search teams by name, base, chief, or power unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-96 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="name">Name</option>
                <option value="championships">Championships</option>
                <option value="poles">Pole Positions</option>
                <option value="year">First Entry</option>
              </select>
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedTeams.length > 0 ? (
              sortedTeams.map(team => (
                <div
                  key={team.id}
                  className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-red-500 transition-all duration-300"
                >
                  {/* Team Header with Color */}
                  <div 
                    className="h-2"
                    style={{ backgroundColor: team.color }}
                  />
                  
                  <div className="p-6">
                    {/* Team Logo and Name */}
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={team.logo} 
                        alt={`${team.name} logo`}
                        className="w-20 h-20 object-contain bg-white rounded-lg p-2"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-1">{team.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{team.fullName}</p>
                      </div>
                    </div>

                    {/* Team Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">World Championships</div>
                        <div className="text-2xl font-bold text-primary">{team.worldChampionships}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pole Positions</div>
                        <div className="text-2xl font-bold text-primary">{team.polePositions}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fastest Laps</div>
                        <div className="text-2xl font-bold text-primary">{team.fastestLaps}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">First Entry</div>
                        <div className="text-2xl font-bold text-primary">{team.firstEntry}</div>
                      </div>
                    </div>

                    {/* Team Details */}
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Base:</span>
                        <span className="text-right">{team.base}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Team Chief:</span>
                        <span className="text-right">{team.teamChief}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Technical Chief:</span>
                        <span className="text-right">{team.technicalChief}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Chassis:</span>
                        <span className="text-right">{team.chassis}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Power Unit:</span>
                        <span className="text-right">{team.powerUnit}</span>
                      </div>
                    </div>

                    {/* Drivers */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">2024 DRIVERS</div>
                      <div className="flex flex-wrap gap-2">
                        {team.drivers.map((driver, idx) => (
                          <button
                            key={idx}
                            onClick={() => navigate(`/drivers?name=${encodeURIComponent(driver)}`)}
                            className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors cursor-pointer"
                          >
                            {driver}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
                No teams found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
