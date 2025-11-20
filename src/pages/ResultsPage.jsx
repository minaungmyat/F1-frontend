import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { useState, useEffect } from "react";
import { getRaceResults, getRacesByYear, getAvailableYears } from "@/lib/api";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export const ResultsPage = () => {
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [raceData, setRaceData] = useState([]);
  const [availableRaces, setAvailableRaces] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'pos', direction: 'asc' });

  // Fetch available years on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const years = await getAvailableYears();
        setAvailableYears(years);
        
        if (years.length > 0) {
          const defaultYear = years[0].toString();
          setSelectedYear(defaultYear);
          
          const races = await getRacesByYear(years[0]);
          setAvailableRaces(races);
          
          if (races.length > 0) {
            setSelectedRace(races[0].name);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching initial data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch races when year changes
  useEffect(() => {
    const fetchRacesForYear = async () => {
      if (!selectedYear) return;
      
      try {
        const races = await getRacesByYear(parseInt(selectedYear));
        setAvailableRaces(races);
        
        if (races.length > 0 && !races.find(r => r.name === selectedRace)) {
          setSelectedRace(races[0].name);
        }
      } catch (err) {
        console.error("Error fetching races:", err);
      }
    };

    fetchRacesForYear();
  }, [selectedYear]);

  // Fetch race results when race or year changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!selectedRace || !selectedYear) return;
      
      try {
        setLoading(true);
        setError(null);
        const results = await getRaceResults(selectedRace, parseInt(selectedYear));
        
        // Transform API data to match table structure
        const transformedData = results.map((result) => ({
          pos: result.position,
          no: result.driver.code || "-", // Using driver code as number placeholder
          driver: `${result.driver.first_name} ${result.driver.last_name}`,
          team: result.driver.team || "N/A",
          laps: "-", // Not available in API
          time: result.fastest_lap_time 
            ? `${result.fastest_lap_time.toFixed(3)}s` 
            : "-",
          points: result.points,
        }));
        
        setRaceData(transformedData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching race results:", err);
        setRaceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [selectedRace, selectedYear]);

  // Sort function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted data
  const sortedData = [...raceData].sort((a, b) => {
    if (sortConfig.key === 'pos' || sortConfig.key === 'points') {
      const aVal = parseInt(a[sortConfig.key]) || 0;
      const bVal = parseInt(b[sortConfig.key]) || 0;
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    } else {
      const aVal = a[sortConfig.key]?.toString().toLowerCase() || '';
      const bVal = b[sortConfig.key]?.toString().toLowerCase() || '';
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    }
  });

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ArrowUpDown size={16} className="inline ml-1 opacity-50" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp size={16} className="inline ml-1" />
      : <ArrowDown size={16} className="inline ml-1" />;
  };

  return (
    <>
      <ThemeToggle />
      <StarBackground />
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        
        {/* F1-style rounded dropdowns */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            id="yearFilter"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            disabled={loading || availableYears.length === 0}
            className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            id="raceFilter"
            value={selectedRace}
            onChange={e => setSelectedRace(e.target.value)}
            disabled={loading || availableRaces.length === 0}
            className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {availableRaces.map(race => (
              <option key={race.name} value={race.name}>{race.name}</option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
            <p className="font-semibold">Error loading data:</p>
            <p>{error}</p>
            <p className="text-sm mt-2">Make sure your Django backend is running on http://localhost:8000</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading race results...</p>
          </div>
        )}

        {/* Results Table */}
        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl shadow-lg bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
            {raceData.length === 0 ? (
              <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                <p>No race results found for the selected race and year.</p>
              </div>
            ) : (
              <table className="w-full table-auto border-collapse">
                {/* 🔴 Red header */}
                <thead className="bg-red-600 dark:bg-red-700 text-white">
                  <tr>
                    <th className="px-4 py-4 cursor-pointer hover:bg-red-700 dark:hover:bg-red-800 transition-colors" onClick={() => handleSort('pos')}>
                      POS. <SortIcon column="pos" />
                    </th>
                    <th className="px-4 py-4 cursor-pointer hover:bg-red-700 dark:hover:bg-red-800 transition-colors" onClick={() => handleSort('no')}>
                      CODE <SortIcon column="no" />
                    </th>
                    <th className="px-4 py-4 cursor-pointer hover:bg-red-700 dark:hover:bg-red-800 transition-colors" onClick={() => handleSort('driver')}>
                      DRIVER <SortIcon column="driver" />
                    </th>
                    <th className="px-4 py-4 cursor-pointer hover:bg-red-700 dark:hover:bg-red-800 transition-colors" onClick={() => handleSort('team')}>
                      TEAM <SortIcon column="team" />
                    </th>
                    <th className="px-4 py-4 cursor-pointer hover:bg-red-700 dark:hover:bg-red-800 transition-colors" onClick={() => handleSort('time')}>
                      FASTEST LAP <SortIcon column="time" />
                    </th>
                    <th className="px-4 py-4 cursor-pointer hover:bg-red-700 dark:hover:bg-red-800 transition-colors" onClick={() => handleSort('points')}>
                      PTS <SortIcon column="points" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map(row => (
                    <tr
                      key={row.pos}
                      className="border-t border-gray-300/30 dark:border-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors"
                    >
                      <td className="px-4 py-4 font-semibold">{row.pos}</td>
                      <td className="px-4 py-4">{row.no}</td>
                      <td className="px-4 py-4">{row.driver}</td>
                      <td className="px-4 py-4">{row.team}</td>
                      <td className="px-4 py-4">{row.time}</td>
                      <td className="px-4 py-4 font-semibold">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
};
