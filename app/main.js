const css = (element, style) => {
  for (const property in style)
      element.style[property] = style[property];
}

const body = document.body;
const logo = document.createElement('img');
logo.src = `logo.png`
logo.className = 'logoImage'

css (logo, {
  // 'width': '100%',
  'display': 'flex',
  'justify-content': 'center'
})
body.append(logo);
const getAllPokemon = async () => {
  try {
    // Step 1: Perform the initial fetch to get an array of data
    const allResponse = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const allData = await allResponse.json();
    

    const fetchPokeData = async (item) => {
      const pokeDataResponse = await fetch(item);
      const pokeData = await pokeDataResponse.json();
      console.log(pokeData);
      const pokeBox = document.createElement('div');
      const name = document.createElement('h2');
      const sprite = document.createElement('img');
      const button = document.createElement('input');
      name.innerText = pokeData.name;
      sprite.src = `${pokeData.sprites.other['official-artwork']['front_default']}`;
      sprite.alt = `picture of ${name}`;
      button.value = `More info`;
      button.type = 'submit'
      button.id= `${pokeData.name}Button`
      pokeBox.append(name, sprite, button );
      // const moreInfo = body.querySelector(`#${pokeData.name}Button`)
      
      
      const card = document.createElement('div');
      card.className = `${pokeData.name}Card`;
      card.textContent = `${pokeData.name} is a pokemon that can be found in the Following version of the Pokemon games:`;

      card.style.display = 'none'; // Initially hide the card
      
      body.append(card)
      button.addEventListener('click', e => {
        e.preventDefault()
        const cardClass = document.getElementsByClassName(`${pokeData.name}Card`)
        if(e.target.id === `${pokeData.name}Button`){
          if (card.style.display === 'none') {
            card.style.display = 'block';
            css (card, {
              'color': 'blue',
              'background-color': '#F0F8FF',
              'padding': '10px',
              'margin': '1em',
              'width': '80%',
              'border-radius': '1em'
            })
            pokeData.game_indices.forEach(async (item) => {
              console.log(item.version.name);
              const game = document.createElement('p')
              game.textContent = item.version.name;
              card.append(game);
            })
            console.log(pokeData.game_indices);
            card.append(name, button, sprite);
            
            
            
          } else {
            card.style.display = 'none';
            pokeBox.append(name, sprite, button );
          };
        };
      });
      body.appendChild(pokeBox);
      css (pokeBox, {
        'color': 'blue',
        'background-color': 'coral',
        'padding': '10px',
        'margin': '1em',
        'width': '10rem',
        'border-radius': '1em'
      })
      css(sprite,{
        'width':'300px'
      })
    }
    allData.results.forEach(async (item) => {
      await fetchPokeData(item.url);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}




getAllPokemon();