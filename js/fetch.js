const BASE_URL = 'https://pokeapi.co/api/v2/';

// Este es un fetch NO asincrono
// fetch(BASE_URL + 'pokemon/ditto')
// .then(res => res.json())
// .then(data => console.log(data));

// fetch async

const fetchPokemon = async (pokemon) => {
    try{ //intenta esto
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse; //parsear es formatear

    } catch(err) { // si falla atrapa el error
        console.error(err);
    }
}

// Obtener el pokemon dando click en el boton
document.getElementById('get-btn')
.addEventListener('click', async () => {
    const text = document.getElementById('poke-name').value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    localStorage.setItem('currentPokeId', pokemon.id);
    console.log(pokemon.name);
    await createPokemonCard(pokemon);
})

//////////////////Crear Cartas para un Pokemon///////////////////

const CARD_SECTION = document.getElementById('profiles');

const createCard = () => {
    const card = document.createElement('div');
    card.classList.add('profile', 'container');
    return card;
}

const createDescription = () => {
    const pokemonElements = {
        namePoke: document.createElement('h2'),
        idPoke: document.createElement('h3'),
        weightPoke: document.createElement('p'),
        image: document.createElement("img"),
    }
    return pokemonElements;
}

const populatePokemon = (pokemon, pokemonElements) => {
    pokemonElements.namePoke.textContent = "Name pokemon: " + pokemon.name;
    pokemonElements.idPoke.textContent = "ID pokemon: " + pokemon.id;
    pokemonElements.weightPoke.textContent = "Wight pokemon: " + pokemon.weight;
    //Se agrega image.src con url para asignar la imagen dada.
    pokemonElements.image.src = pokemon.sprites.front_default;

    return pokemonElements;
}

const renderElements = (pokemon, pokemonElements) => {
    pokemon.append(pokemonElements.namePoke, pokemonElements.idPoke, pokemonElements.weightPoke, pokemonElements.image);
}

const createPokemonCard = (pokemon) => {
    //Limpia el contenido del div
    CARD_SECTION.innerHTML = ""; 
    const card = createCard(); 
    const pokemonElements = createDescription();

    const elementsWithData = populatePokemon(pokemon, pokemonElements);
    renderElements(card, elementsWithData);
    CARD_SECTION.append(card);
}

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    //parseInt para dar formato, el string se pasa a un entero
    const initialId = storedId ? parseInt(storedId) : 1; 
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
    await createPokemonCard(pokemon);
})

// Obtener el anterior 
//
//
// Obtener el siguiente

document.getElementById('previous-btn')
.addEventListener('click', async () => {
    const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = Math.max(1, currentPokeId - 1);
    const pokemon = await fetchPokemon(newId);
    localStorage.setItem('currentPokeId', pokemon.id);
    console.log(pokemon.name);
})

document.getElementById('next-btn')
.addEventListener('click', async () => {
    const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = currentPokeId + 1;
    const pokemon = await fetchPokemon(newId);
    localStorage.setItem('currentPokeId', pokemon.id);
    console.log(pokemon.name);
})

////////////////// POST /////////////////////////

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: 'title1',
//         body: 'Lorem ipsum dolor sit amet',
//         userId: 1,
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     }
// }).then(res => res.json())
//     .then(json => console.log(json))
