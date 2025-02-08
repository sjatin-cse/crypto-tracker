import React from "react";
import "./CryptoTable.css";

const CryptoTable = ({ coins, handleSort, toggleFavorite, favorites = [] }) => {
    return (
        <div className="crypto-table-container">
            <table className="crypto-table">
                <thead>
                    <tr>
                        <th>⭐</th>
                        <th onClick={() => handleSort("name")}>Coin</th>
                        <th>Symbol</th>
                        <th onClick={() => handleSort("current_price")}>
                            Price ($)
                        </th>
                        <th onClick={() => handleSort("market_cap")}>
                            Market Cap ($)
                        </th>
                        <th
                            onClick={() =>
                                handleSort("price_change_percentage_24h")
                            }
                        >
                            24h Change (%)
                        </th>
                        <th>Volume ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin) => (
                        <tr key={coin.id}>
                            <td>
                                <button
                                    className={`favorite-btn ${
                                        favorites.includes(coin.id)
                                            ? "favorited"
                                            : ""
                                    }`}
                                    onClick={() => toggleFavorite(coin.id)}
                                >
                                    {favorites.includes(coin.id) ? "⭐" : "☆"}
                                </button>
                            </td>
                            <td>
                                <img
                                    src={coin.image}
                                    alt={coin.name}
                                    className="coin-img"
                                />
                                {coin.name}
                            </td>
                            <td>{coin.symbol.toUpperCase()}</td>
                            <td>${coin.current_price.toLocaleString()}</td>
                            <td>${coin.market_cap.toLocaleString()}</td>
                            <td
                                className={
                                    coin.price_change_percentage_24h > 0
                                        ? "green"
                                        : "red"
                                }
                            >
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </td>
                            <td>${coin.total_volume.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;
