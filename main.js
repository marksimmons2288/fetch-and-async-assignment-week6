const baseUrl = 'https://pokeapi.co/api/v2';

const mainForm = document.getElementById('mainForm');
const content = document.getElementById('content');

// Inputs
const searchInput = document.getElementById('pokemonFinder');

// Using Axios (Async Await)

console.log('hello,world');

async function getPokemonApi(pokemonName) {
    const endpoint = `${baseUrl}/pokemon/${pokemonName}`;

    try{
        const response = await axios.get(endpoint);

        const data = await response.data;

        return {
            success: true,
            data: data
        };
    } catch (error) {

        return {
            success: false,
            error: error
        };

     }
        
}

function renderApiResponse(apiResponse) {
    if (apiResponse.success) {

    // Display the pokemon name
    const {data} = apiResponse;

    const typesArray = data.types;
// Array function to not place a coma after the last type in an array
    let typesString = ''; 
    console.log(typesArray);

    typesArray.forEach((type, index) => {
        console.log(type);
        
        typesString += type.type.name;
        if ( index < typesArray.length - 1) {
            typesString += ', ';
        }
        console.log(typesString);

    });

   
    content.innerHTML = `
      <div class="card">
        <img src="${data.sprites.front_default}" alt="Sprite image of ${data.name}">
        <div class="card-body">
        <h5 class="card-title">Name: ${data.name} - ${data.id}</h5>
     <ul class="list-group list-group-flush">
        <li class="list-group-item">Weight: ${data.weight}</li>
         <li class="list-group-item">Height: ${data.height}</li> 
         <li class="list-group-item"">Types: ${typesString}</li> 
     </ul>
    </div>
</div>`
   
} else {
    // Display the error message
    const {error} = apiResponse;
   content.innerHTML =` <h2>The API request failed</h2><p>${error.message}</p>`;
 }
}

// Main form event listner
mainForm.addEventListener('submit', async (e) =>{
    // Prevent default action from form
    e.preventDefault();
// Input Validation varible followed by fuction to check validation
    
   const searchValue = searchInput.value;

// If the characters in the search bar are greater than 0
    if (searchValue.length > 0) {
        content.innerHTML = `
        <div class="spinner-grow" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
    
    //    Ensures value is a string even if its a number
       const pokemonResponse = await getPokemonApi(String(searchValue));
       renderApiResponse(pokemonResponse);
       }else { 
       const error = 'Please enter 1 or more values';
       alert(error);
    }
});




