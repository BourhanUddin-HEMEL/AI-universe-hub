 //load data 
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
                    <h4 class="card-title">${card.name}</h4>
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
//   const arrowIcons = document.querySelectorAll('[id$="card-"][id$="-arrow"]');
// arrowIcons.forEach(arrowIcon => {
//   arrowIcon.addEventListener('click', () => {
//     const cardId = arrowIcon.id.split('-')[1];
//     const card = cards.find(card => card.id === cardId);
//     const modalTitle = document.getElementById('modal-cardde-scription');
//     const modalImage = document.querySelector('.modal-body img');
//     const modalImageAlt = document.querySelector('.modal-body p');
//     const modalBox1 = document.querySelector('.modal-body .box:nth-of-type(1)');
//     const modalBox2 = document.querySelector('.modal-body .box:nth-of-type(2)');
//     const modalBox3 = document.querySelector('.modal-body .box:nth-of-type(3)');
//     const modalItem1 = document.querySelector('.modal-body ol:nth-of-type(1) li:nth-of-type(1)');
//     const modalItem2 = document.querySelector('.modal-body ol:nth-of-type(1) li:nth-of-type(2)');
//     const modalItem3 = document.querySelector('.modal-body ol:nth-of-type(1) li:nth-of-type(3)');
//     const modalItem4 = document.querySelector('.modal-body ol:nth-of-type(2) li:nth-of-type(1)');
//     const modalItem5 = document.querySelector('.modal-body ol:nth-of-type(2) li:nth-of-type(2)');
//     const modalItem6 = document.querySelector('.modal-body ol:nth-of-type(2) li:nth-of-type(3)');
//     modalTitle.textContent = card.name;
//     modalImage.src = card.image;
//     modalImageAlt.textContent = card.description;
//     modalBox1.textContent = card.box1;
//     modalBox2.textContent = card.box2;
//     modalBox3.textContent = card.box3;
//     modalItem1.textContent = card.item1;
//     modalItem2.textContent = card.item2;
//     modalItem3.textContent = card.item3;
//     modalItem4.textContent = card.item4;
//     modalItem5.textContent = card.item5;
//     modalItem6.textContent = card.item6;
//   });
// });
//  loadData();
