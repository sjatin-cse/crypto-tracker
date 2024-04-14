import { React, useState, useEffect } from 'react';
import Coin from './Coin';
import './App.css';
import axios from 'axios';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch]= useState('');

  useEffect(()=>
  { 
    axios
    .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_pag100&page=1&sparkline=false")
    .then(res=>{
      // console.log(res.status);
      setCoins(res.data);
      console.log(res.data);
    })
    .catch(error=>console.log(error));
  

  })

  const handelChange = e =>{
    setSearch(e.target.value)
  }
  

  const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="App">
      <div className='coin-search'>
        <h1>Crypto <i>Tracker</i> </h1>

        
        <div className='text-search' style={{marginTop:"20px"}}>
          <h2>Search Ur Crypto</h2>
        </div>
        <form>
        <input type="text" placeholder="Search" className="coin-input" onChange={handelChange}/>  
        </form>
        </div>
        {filteredCoins.map(coin=>{
          return(
            <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol} 
            price={coin.current_price}
            marketcap={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
            
            />
            )
        })}
      </div>
  );
}

export default App;
