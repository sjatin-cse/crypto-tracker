import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import CryptoTable from "./CryptoTable";
import CryptoChart from "./CryptoChart";
import Pagination from "./Pagination";
import Filters from "./Filters"; // ✅ Import Filters Component
import "./App.css";

function App() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );
    const [showFavorites, setShowFavorites] = useState(false);
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    );

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 10;

    // Sorting
    const [sortBy, setSortBy] = useState("market_cap");
    const [sortOrder, setSortOrder] = useState("desc");

    // Filtering
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [marketCapRange, setMarketCapRange] = useState([0, 1000000000000]);
    const [showGainers, setShowGainers] = useState(false);

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            )
            .then((res) => {
                setCoins(res.data);
            })
            .catch((error) => {
                console.error("API Error:", error);
            });
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // ✅ Reset to first page when searching
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    const toggleFavorite = (coinId) => {
        let updatedFavorites = [...favorites];

        if (updatedFavorites.includes(coinId)) {
            updatedFavorites = updatedFavorites.filter((id) => id !== coinId);
        } else {
            updatedFavorites.push(coinId);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const sortedCoins = [...coins].sort((a, b) => {
        return sortOrder === "asc"
            ? a[sortBy] - b[sortBy]
            : b[sortBy] - a[sortBy];
    });

    const filteredCoins = sortedCoins.filter((coin) => {
        return (
            coin.name.toLowerCase().includes(search.toLowerCase()) &&
            coin.current_price >= priceRange[0] &&
            coin.current_price <= priceRange[1] &&
            coin.market_cap >= marketCapRange[0] &&
            coin.market_cap <= marketCapRange[1] &&
            (!showGainers || coin.price_change_percentage_24h > 0)
        );
    });

    const displayedCoins = showFavorites
        ? filteredCoins.filter((coin) => favorites.includes(coin.id))
        : filteredCoins;

    // ✅ Reset pagination when filtering changes
    useEffect(() => {
        setCurrentPage(1);
    }, [priceRange, marketCapRange, showGainers, search]);

    // ✅ Correct Pagination Calculation
    const totalPages = Math.ceil(displayedCoins.length / coinsPerPage);
    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = displayedCoins.slice(indexOfFirstCoin, indexOfLastCoin);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className={`App ${darkMode ? "dark-mode" : ""}`}>
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

            {/* Search and Watchlist */}
            <div className="search-watchlist">
                <input
                    type="text"
                    placeholder="🔍 Search Cryptocurrency..."
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button className="watchlist-toggle" onClick={() => setShowFavorites(!showFavorites)}>
                    {showFavorites ? "Show All Coins" : "View Watchlist ⭐"}
                </button>
            </div>

            {/* Filters Section */}
            <Filters
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                marketCapRange={marketCapRange}
                setMarketCapRange={setMarketCapRange}
                showGainers={showGainers}
                setShowGainers={setShowGainers}
            />

            {/* Coin Selection for Chart */}
            <div className="chart-container">
                <select onChange={(e) => setSelectedCoin(e.target.value)} className="chart-dropdown">
                    <option value="">Select a coin for chart</option>
                    {coins.map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedCoin && <CryptoChart selectedCoin={selectedCoin} />}

            <CryptoTable
                coins={currentCoins}
                handleSort={handleSort}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
            />

            {/* ✅ Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default App;
