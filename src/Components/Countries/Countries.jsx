import React, { useState, useEffect } from 'react';
import Country from '../Country/Country';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [search, setSearch] = useState('');
  

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://api.sampleapis.com/countries/countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  const handleVisitedCountries = (country) => {
    setVisitedCountries(prev => {
      const exists = prev.some(c => c.name === country.name);
      if (exists) {
        return prev.filter(c => c.name !== country.name);
      } else {
        return [...prev, country];
      }
    });
  };

  // 🔥 FILTER LOGIC
  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name?.toLowerCase().includes(search.toLowerCase());

    

    return matchesSearch ;
  });

  const completePct = countries.length > 0
    ? Math.round((visitedCountries.length / countries.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0eee8]">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(124,109,235,0.1), transparent)' }}
      />

      <div className="relative z-10">

        {/* HERO */}
        <div className="text-center px-6 pt-16 pb-10 flex flex-col items-center">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#e8c96d] mb-4 opacity-90">
            World Explorer
          </p>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Every <em className="text-[#e8c96d] not-italic">Country</em><br />
            on Earth
          </h1>

          <p className="text-[15px] text-[rgba(240,238,232,0.45)] max-w-md mx-auto">
            Discover nations, mark your journeys, and build your personal travel map.
          </p>
        </div>

        {/*  SEARCH + FILTER */}
        <div className="px-6 mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">

          <input
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-full bg-[#13131e] border border-white/[0.1] text-sm outline-none w-64"
          />

          
        </div>

        {/* STATS */}
        <div className="flex justify-center flex-wrap gap-2 px-6 mb-9">

          <div className="flex items-center gap-3 bg-[#13131e] rounded-full px-6 py-2.5">
            <span className="text-[21px] font-bold text-[#e8c96d]">
              {countries.length}
            </span>
            <span className="text-[12px] opacity-60">Countries</span>
          </div>

          <div className="flex items-center gap-3 bg-[#13131e] rounded-full px-6 py-2.5">
            <span className="text-[21px] font-bold text-[#4ade80]">
              {visitedCountries.length}
            </span>
            <span className="text-[12px] opacity-60">Visited</span>
          </div>

          <div className="flex items-center gap-3 bg-[#13131e] rounded-full px-6 py-2.5">
            <span className="text-[21px] font-bold text-[#7c6deb]">
              {completePct}%
            </span>
            <span className="text-[12px] opacity-60">Complete</span>
          </div>
        </div>

        {/* GRID */}
        <div className="px-6 pb-20">
          {loading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <p className="text-sm opacity-50">Loading...</p>
            </div>
          ) : (
            <>
              {filteredCountries.length === 0 ? (
                <p className="text-center opacity-50">
                  No countries found 
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredCountries.map((country) => (
                    <div key={country.name}>
                      <Country
                        country={country}
                        handleVisitedCountries={handleVisitedCountries}
                        isVisited={visitedCountries.some(c => c.name === country.name)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Countries;