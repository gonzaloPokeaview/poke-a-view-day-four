const css = (element, style) => {
  for (const property in style)
      element.style[property] = style[property];
}

const body = document.body;
const header = document.createElement('header');
const main = document.createElement('section');
main.id = 'main';
const logo = document.createElement('img');
logo.src = `logo.png`
logo.className = 'logoImage'
const siteInfo = document.createElement('article');
const siteInfoText = document.createElement('h2');
siteInfoText.textContent = 'Come and find out which of the Nintendo Pokémon games your favorite Pokémon was featured in!'
siteInfo.append(siteInfoText);
header.append(logo, siteInfo);
body.append(header, main);
const getAllPokemon = async () => {
  try {
    const allResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const allData = await allResponse.json();
    

    const fetchPokeData = async (item , i) => {
      const pokeDataResponse = await fetch(item);
      const pokeData = await pokeDataResponse.json();
      const pokeBox = document.createElement('div');
      const name = document.createElement('h3');
      const sprite = document.createElement('img');
      const button = document.createElement('input');
      name.textContent =`${pokeData.name} #${i+1}`;
      sprite.src = `${pokeData.sprites.other['official-artwork']['front_default']}`;
      sprite.alt = `picture of ${name}`;
      button.value = `More info`;
      button.type = 'submit'
      button.id= `${pokeData.name}Button`
      pokeBox.append(name, sprite, button );
      const card = document.createElement('div');
      const gameInfo = document.createElement('div');
      gameInfo.id = `${pokeData.name}GameInfo`;
      gameInfo.className = `gameInfo`;
      card.className = `${pokeData.name}Card`;
      card.textContent = `${pokeData.name} is a pokemon that can be found in the Following version of the Pokemon games:`;
      card.style.display = 'none'; 
      card.append(gameInfo);
      main.append(card);

      button.addEventListener('click', e => {
        e.preventDefault();
        if(e.target.id === `${pokeData.name}Button`){
          
          // e.target.clicked = false;
          console.log(e);
          if (card.style.display === 'none') {
            card.style.display = 'block';
            css (card, {
              'color': 'blue',
              'background-color': '#F0F8FF',
              'padding': '1em',
              'margin': '1em',
              // 'width': '80%',
              'border-radius': '1em'
            })            
            button.value = `Close`;
            console.log(gameInfo)
            if (!e.target.checked){
              pokeData.game_indices.forEach(async (item) => {
                const game = document.createElement('p')
                game.className = `gameText`;
                game.textContent = item.version.name;
                gameInfo.append(game);
              })
              e.target.checked = true;
            }
            
          
            
            // console.log(pokeData.game_indices);
            card.append(button, name, sprite);
          } else {
            card.style.display = 'none';
            button.value = `More info`;
            // gameInfo.remove();
            pokeBox.append(name, sprite, button );
          };
        };
      });
      main.appendChild(pokeBox);
      css (pokeBox, {
        'color': 'blue',
        'background-color': 'coral',
        'padding': '10px',
        'margin': '1em',
        // 'width': '10rem',
        'border-radius': '1em'
      })
      css(sprite,{
        'width':'300px'
      })
    }
    allData.results.forEach(async (item, i) => {
      await fetchPokeData(item.url, i);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}




getAllPokemon();