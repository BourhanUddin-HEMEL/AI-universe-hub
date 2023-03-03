// load data 
const loadData = async () =>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
     const res= await fetch(url);
     const data = await res.json();
     displayCards(data.data);
     //get sort-by-date and add addEventListener 
     const sortButton = document.getElementById('sort-by-date');
    sortButton.addEventListener('click', () => sortCardsByDate(data.data.tools));
    //  displayCards(data.data.tools[0].name);
}
const displayCards = cards =>{
    // console.log(cards);
    const cardsContainer = document.getElementById('card-container')
    cards.tools.forEach(card =>{
        // console.log(card);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card h-100">
            <img src="${card.image}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h4 class="card-title">Features</h4>
            <ol>
            ${card.features.map(feature => `<li>${feature}</li>`).join('')}
            </ol>
            </div>

            <div class="card-footer d-lg-flex justify-content-lg-between align-items-lg-center">
                <div class="">
                    <h5 class="card-title">${card.name}</h5>
                    <small class="text-muted">${card.published_in}</small>
                </div>
                <div>
                    <i 
                        class="fa-solid fa-arrow-right bg-danger p-lg-3 rounded-5 bg-opacity-50 text-dark" data-toggle="modal"
                        data-target="#myModal">
                    </i>
                </div>
            </div>
        `
        cardsContainer.appendChild(cardDiv);
    })
    
}

//sort by date function goes here
const sortCardsByDate = cards => {
    const cardsContainer = document.getElementById('card-container');
    cards.sort((a, b) => {
      const dateA = new Date(a.published_in);
      const dateB = new Date(b.published_in);
      return dateA - dateB;
    });
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
    displayCards({ tools: cards });
  }
  var modalTitle = `${card.name}`;
$("#modalTitle").text(modalTitle);
//  loadData();
