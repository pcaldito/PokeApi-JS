// Array para almacenar la colección de Pokémon
const coleccionPokemon = [];

/**
 * Función principal para buscar el Pokémon
 */
document.getElementById('search-btn').addEventListener('click', buscarPokemon);

async function buscarPokemon() {
  const mostrar = document.getElementById('pokemon-data');
  const resultSection = document.getElementById('result-section');
  const searchSection = document.getElementById('search-section');
  
  let pokemonName = document.getElementById('pokemon-input').value.trim();

  try {
    // Hacer la solicitud a la PokeAPI para buscar el Pokémon
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    
    if (!pokemonResponse.ok) {
      throw new Error(`Pokémon "${pokemonName}" no encontrado.`);
    }
    
    const pokemonData = await pokemonResponse.json();
    
    mostrar.innerHTML = `
      <h2>${pokemonData.name}</h2>
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
      <img src="${pokemonData.sprites.back_default}" alt="${pokemonData.name}"><br/>
      <img src="${pokemonData.sprites.front_shiny}" alt="${pokemonData.name}">
      <img src="${pokemonData.sprites.back_shiny}" alt="${pokemonData.name}">
      <hr>
      <p>Tipo:</p>
      <ul>
        ${pokemonData.types.map(type => `<li>${type.type.name}</li>`).join('')}
      </ul>
      <hr>
      <p>Altura: ${pokemonData.height}</p>
      <p>Peso: ${pokemonData.weight}</p>
      <hr>
      <p>Habilidades:</p>
      <ul>
        ${pokemonData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
      </ul>
      <hr>
      <button id="add-to-collection">Agregar a la colección</button>
    `;

    // Añadir el evento de clic para agregar el Pokémon a la colección
    document.getElementById('add-to-collection').addEventListener('click', () => {
      agregarAColeccion(pokemonData);
    });

    searchSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Función para agregar un Pokémon a la colección
 */
function agregarAColeccion(pokemonData) {
  // Verifica si el Pokémon ya está en la colección
  if (!coleccionPokemon.some(pokemon => pokemon.name === pokemonData.name)) {
    coleccionPokemon.push({
      name: pokemonData.name,
      sprite: pokemonData.sprites.front_default
    });
    alert(`${pokemonData.name} ha sido añadido a tu colección.`);
  } else {
    alert(`${pokemonData.name} ya está en tu colección.`);
  }
}

/**
 * Función para ver la colección de Pokémon
 */
function verColeccion() {
  const coleccionSection = document.getElementById('collection-section');
  const coleccionList = document.getElementById('collection-list');
  
  coleccionSection.classList.remove('hidden');
  coleccionList.innerHTML = ""; // Limpiar la lista antes de añadir los Pokémon

  if (coleccionPokemon.length === 0) {
    coleccionList.innerHTML = "<p>No tienes ningún Pokémon en tu colección.</p>";
  } else {
    // Mostrar cada Pokémon de la colección
    coleccionPokemon.forEach(pokemon => {
      coleccionList.innerHTML += `
        <div>
          <h4>${pokemon.name}</h4>
          <img src="${pokemon.sprite}" alt="${pokemon.name}">
        </div>
      `;
    });
  }
}

// Añadir el evento para ver la colección de Pokémon
document.getElementById('view-collection-btn').addEventListener('click', verColeccion);
