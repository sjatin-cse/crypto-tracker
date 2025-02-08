import React from "react";
import "./Filters.css";

const Filters = ({
    priceRange,
    setPriceRange,
    marketCapRange,
    setMarketCapRange,
    showGainers,
    setShowGainers,
}) => {
    return (
        <div className="filters-container">
            <h3>Advanced Filters 🎯</h3>

            {/* Price Range Filter */}
            <label>
                Price Range:
                <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                        setPriceRange([+e.target.value, priceRange[1]])
                    }
                />
                -
                <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                        setPriceRange([priceRange[0], +e.target.value])
                    }
                />
            </label>

            {/* Market Cap Range Filter */}
            <label>
                Market Cap:
                <input
                    type="number"
                    value={marketCapRange[0]}
                    onChange={(e) =>
                        setMarketCapRange([+e.target.value, marketCapRange[1]])
                    }
                />
                -
                <input
                    type="number"
                    value={marketCapRange[1]}
                    onChange={(e) =>
                        setMarketCapRange([marketCapRange[0], +e.target.value])
                    }
                />
            </label>

            {/* Show Only Gainers */}
            <label>
                Show Only Gainers:
                <input
                    type="checkbox"
                    checked={showGainers}
                    onChange={() => setShowGainers(!showGainers)}
                />
            </label>
        </div>
    );
};

export default Filters;
