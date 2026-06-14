let container = document.getElementById("output");
let searchInput = document.getElementById ("searchInput");
let searchBtn = document.getElementById ("searchBtn");
let suggestionBox = document.getElementById ("suggestions");
function loadAnime(url){
  container.innerHTML = "";
  
  fetch(url)
    .then(response => response.json())
    .then (data =>{
      if(!data.data){
        container.innerHTML = "<p>No result found</p>";
      };
      for(let anime of data.data){
        let card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
          <img src ="${anime.images.jpg.image_url}"/>
          <h3>${anime.title}</h3>
          <p>${anime.synopsis}</p>
          `;
          
          container.appendChild(card);
      }
    });
}

loadAnime("https://api.jikan.moe/v4/seasons/now");

searchBtn.addEventListener("click" , function(){
  let query = searchInput.value;
  
  if(query === "") return;
  
  loadAnime(`https://api.jikan.moe/v4/anime?q=${query}&limit=9`);
});
  
searchInput.addEventListener("input" , function(){
  let query = searchInput.value;
  
  if(query ===""){
    suggestionBox.innerHTML = "";
    return;
  }
  fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=5`)
    .then(response => response.json())
    .then(data =>{
      suggestionBox.innerHTML = "";
    
      if(!data.data)return;
      
      for(let anime of data.data){
        let item = document.createElement("div");
        item.innerText = anime.title;
        
        
        item.addEventListener("click", function(){
          searchInput.value = anime.title;
          suggestionBox.innerHTML = "";
          loadAnime(`https://api.jikan.moe/v4/anime?q=${anime.title}&limit=9`);
        });
        
        suggestionBox.appendChild(item);
      }
    });
});