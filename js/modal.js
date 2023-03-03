// load data 
const loadData = async () =>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    const res= await fetch(url);
    const data = await res.json();
    displayCards(data.data);
  }
  
  const displayCards = cards =>{
    const cardsContainer = document.getElementById('card-container')
    cards.tools.forEach(card =>{
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
              <h4 class="card-title">${card.name}</h4>
              <small class="text-muted">${card.published_in}</small>
            </div>
            <div>
              <i 
                class="fa-solid fa-arrow-right bg-danger p-lg-3 rounded-5 bg-opacity-50 text-dark" 
                data-toggle="modal"
                data-target="#myModal"
                data-cardname="${card.name}"
                data-cardimage="${card.image}"
                data-cardfeatures="${card.features.join(',')}"
                data-cardpublishedin="${card.published_in}"
              ></i>
            </div>
          </div>
        </div>
      `
      cardsContainer.appendChild(cardDiv);
    });
  
    // Add event listener to modal button
    const modalButton = document.querySelector('#myModal button.btn-primary');
    modalButton.addEventListener('click', () => {
      const modalCardDescription = document.querySelector('#modal-cardde-scription');
      const modalCardFeatures = document.querySelector('#modal-card-features');
      const modalCardImage = document.querySelector('#modal-card-image');
      const modalCardPublishedIn = document.querySelector('#modal-card-published-in');
      
      // Get data from button's data attributes
      const cardName = modalButton.getAttribute('data-cardname');
      const cardFeatures = modalButton.getAttribute('data-cardfeatures').split(',');
      const cardImage = modalButton.getAttribute('data-cardimage');
      const cardPublishedIn = modalButton.getAttribute('data-cardpublishedin');
  
      // Update modal with data
      modalCardDescription.textContent = cardName;
      modalCardFeatures.innerHTML = cardFeatures.map(feature => `<li>${feature}</li>`).join('');
      modalCardImage.setAttribute('src', cardImage);
      modalCardPublishedIn.textContent = cardPublishedIn;
    });
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
  
  // Load data on page load
  //loadData();
  
  // Get sort button and add event listener
  const sortButton = document.getElementById('sort-by-date');
  sortButton.addEventListener('click', () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
      .then(res => res.json())
      .then(data => sortCardsByDate(data.data.tools));
  });
  