// define the state and front end logic, import react and other components as necessary
import React, {useState, useEffect} from 'react';

const BACKEND_URL = 'https://pokemon-backend-d2ye.onrender.com' || 'http://localhost:3000';

export default function App () {
 // define the state: when the user enter their name the state is updated to the name; 

 const [username, setUsername] = useState('');
 const [month, setMonth] = useState('');
 const [color, setColor] = useState('');
 const [pokemonMatch, setPokemonMatch] = useState(null);
 const [allMatches, setAllMatches] = useState([]) ;
 const [isVisible, setIsVisible] = useState(false);


console.log("Current environment is: ", process.env.NODE_ENV);
console.log("Backend URL:", BACKEND_URL);

// define the event handler
const pokemonMatchHandler = async (e) => {
    e.preventDefault();
    
    if(username==='' || month ==='' || color===''){
        alert('Please enter all fields!');
        return;
    }

    fetch (`${BACKEND_URL}/pokemon/getPokemon`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, month, color})
  })
    .then((response)=>{
        if(!response.ok){throw new Error ('Response was not ok!')}
        return response.json()})
    .then((matchedPokemon)=>{setPokemonMatch(matchedPokemon)
    })
    .catch((error)=>{console.error('Error:', error);
        alert(error.message);
    })
};



const allMatchesHandler = async(e)=>{
    setIsVisible(!isVisible); // initially false, so upon click it changes to the opposite state
     
    if (!isVisible){
    fetch(`${BACKEND_URL}/pokemon/displayPokemon`,{
        method: 'GET'
    }).then((response) => {
    if(!response.ok)
        {throw new Error ('Response was not ok!')}
    return response.json()})
    .then((pokemons)=>{setAllMatches(pokemons)
    })
    .catch((error)=>{console.error('Error:', error);
        alert(error.message);
    });
}
};



//define new function to change initial character to uppercase
const toUpperCase = (string) => {
    const firstCharacter = string[0].toUpperCase();
    const newString = firstCharacter + string.slice(1);
    return newString
};

return (
    <div className = "container">    
     <header>
        <h1>What Pokémon Are You?</h1>
        <h2>Discover which Pokémon matches your personality!</h2>
    </header>
    
        <form className="fetchpokemon" onSubmit={pokemonMatchHandler}>
            <input 
                className="username"
                type="text"
                value={username} 
                onChange={(e)=> setUsername(e.target.value)}
                placeholder='Enter your full name here'
                aria-label="Name"
            />

            <input 
                className="color"
                type="text"
                value={color} 
                onChange={(e)=> setColor(e.target.value)}
                placeholder='Enter your favorite color here'
                aria-label="Color"
            />
            
            <select
                className="birthmonth"
                value={month||''} 
                onChange={(e)=> (setMonth(parseInt(e.target.value),10))}
                placeholder='Select your birth month here'
                aria-label="Birth Month"
            >

                <option value="" disabled>Select your birth month</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>

            <button type="submit">Find My Pokémon!</button>
        </form> 

    <div className="myPokemon">
        <h2>Your Pokémon Match</h2>
        {pokemonMatch?(
        <>
        <img src={pokemonMatch.image} alt='Character Image' />
        <h2> {toUpperCase(pokemonMatch.name)} </h2>
        <h3>Pokemon Type: {toUpperCase(pokemonMatch.type)}</h3>
        <h3>Secret Power: {pokemonMatch.abilities.map(toUpperCase).join(', ')}</h3>
        <h4>{pokemonMatch.description}</h4>
        </>)
        :
        (<h3>Find your Pokémon match!</h3>)
        }   
    </div>

    <div className="displayPokemon">
        <button onClick={allMatchesHandler}>
            {isVisible? 'Hide All Matches': 'Display All Pokémon Matches'}
        </button>

        <div className="displayGrid" style={{display: isVisible? 'grid':'none'}}>
            {
                allMatches.map(
                    (match)=>{
                        return(    
                            <div key={match.id}>
                            <img src={match.image} />
                            <h3><strong>{match.user_name}</strong></h3>
                            <h3>Pokemon: {toUpperCase(match.pokemon_name)}</h3>
                            <h3>Type: {toUpperCase(match.type)}</h3>
                            <h3>Abilities: {match.abilities.map(toUpperCase).join(', ')}</h3>
                            <h3>Favorite Color: {toUpperCase(match.favorite_color)}</h3>              
                            </div>
                        )
                        }
                    )
                }         
            </div>
        </div>
    </div>
 )
}