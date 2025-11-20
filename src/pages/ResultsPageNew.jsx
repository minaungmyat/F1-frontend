import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:8000/api";

export const ResultsPageNew = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedRace, setSelectedRace] = useState("");
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all races
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch(`${API_BASE}/races/`);
        if (!response.ok) throw new Error("Failed to fetch races");
        const data = await response.json();
        setRaces(data);
        
        // Set first race of selected year as default
        const yearRaces = data.filter(r => r.year === parseInt(selectedYear));
        if (yearRaces.length > 0) {
          setSelectedRace(yearRaces[0].name);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching races:", err);
      }
    };

    fetchRaces();
  }, [selectedYear]);

  // Fetch results when race changes
  useEffect(() => {
    if (!selectedRace) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE}/results/`);
        if (!response.ok) throw new Error("Failed to fetch results");
        
        const data = await response.json();
        
        // Filter results by selected race and year
        const filtered = data.filter(
          r => r.race.name === selectedRace && r.race.year === parseInt(selectedYear)
        );
        
        // Sort by position
        filtered.sort((a, b) => a.position - b.position);
        
        setResults(filtered);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [selectedRace, selectedYear]);

  // Get unique years from races
  const availableYears = [...new Set(races.map(r => r.year))].sort((a, b) => b - a);
  
  // Get races for selected year
  const racesForYear = races.filter(r => r.year === parseInt(selectedYear));

  return (
    <>
      <ThemeToggle />
      <StarBackground />
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Race Results
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={selectedRace}
            onChange={e => setSelectedRace(e.target.value)}
            disabled={racesForYear.length === 0}
            className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer disabled:opacity-50"
          >
            {racesForYear.map(race => (
              <option key={race.id} value={race.name}>
                {race.name} - Round {race.round}
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
            <p className="font-semibold">Error: {error}</p>
            <p className="text-sm mt-2">Make sure Django backend is running on http://localhost:8000</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading results...</p>
          </div>
        )}

        {/* Results Table */}
        {!loading && !error && results.length > 0 && (
          <div className="overflow-hidden rounded-2xl shadow-lg bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-red-600 dark:bg-red-700 text-white">
                <tr>
                  <th className="px-4 py-4 text-left">POS</th>
                  <th className="px-4 py-4 text-left">DRIVER</th>
                  <th className="px-4 py-4 text-left">CODE</th>
                  <th className="px-4 py-4 text-left">TEAM</th>
                  <th className="px-4 py-4 text-left">FASTEST LAP</th>
                  <th className="px-4 py-4 text-left">POINTS</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr
                    key={result.id}
                    className="border-t border-gray-300/30 dark:border-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <td className="px-4 py-4 font-semibold">{result.position}</td>
                    <td className="px-4 py-4">
                      {result.driver.first_name} {result.driver.last_name}
                    </td>
                    <td className="px-4 py-4 font-mono text-sm">{result.driver.code}</td>
                    <td className="px-4 py-4 text-sm">{result.driver.team || 'N/A'}</td>
                    <td className="px-4 py-4 font-mono text-sm">
                      {result.fastest_lap_time ? `${result.fastest_lap_time.toFixed(3)}s` : '-'}
                    </td>
                    <td className="px-4 py-4 font-semibold text-red-600 dark:text-red-400">
                      {result.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && results.length === 0 && selectedRace && (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            <p>No results found for this race.</p>
          </div>
        )}
      </div>
    </>
  );
};
