import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./CryptoChart.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CryptoChart = ({ selectedCoin }) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedCoin) return;

        setLoading(true);
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=30`
            )
            .then((res) => {
                const prices = res.data.prices.map((entry) => entry[1]);
                const dates = res.data.prices.map((entry) =>
                    new Date(entry[0]).toLocaleDateString()
                );

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: `${selectedCoin.toUpperCase()} Price (Last 30 Days)`,
                            data: prices,
                            borderColor: "rgb(75, 192, 192)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderWidth: 2,
                        },
                    ],
                });

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching chart data:", error);
                setLoading(false);
            });
    }, [selectedCoin]);

    return (
        <div className="crypto-chart">
            {loading ? <p>Loading Chart...</p> : <Line data={chartData} />}
        </div>
    );
};

export default CryptoChart;
