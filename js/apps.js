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

            <div class="card-footer  d-sm-flex flex-sm-col-reverse justify-content-sm-evenly d-lg-flex justify-content-lg-between align-items-lg-center">
                <div class="">
                    <h4 class="card-title">${card.name}</h4>
                    <i class="fa-solid fa-calendar-days"></i>  <small class="text-muted">${card.published_in}</small>
                </div>
                <div>
                    <i 
                        class="fa-solid fa-arrow-right bg-danger p-sm-4  p-lg-3 rounded-5 bg-opacity-50 text-dark" data-toggle="modal" onclick=cardId('${card.id}')
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
loadData();

const cardId = async (id) =>{
    const URL =`https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res= await fetch(URL);
    const data = await res.json();
    showModalDetails(data.data);
}

const showModalDetails = (detail) =>{
 console.log(detail);

const ModalDiv =document.getElementById('modal-body');
ModalDiv.innerHTML = `
<div class="row">
<div class="col-md-6 bg-danger-subtle ps-2 rounded-2">
  <h4>${detail?.description
  ? detail.description
  : "Not Found"
}</h4>
  <div class="row">
    <div class="col-md-4 my-4 ">
      <div class="box mx-3 py-4 text-center mx-auto fw-bold px-3 bg-body-secondary fs-4 rounded-3 ">
       ${
        detail?.pricing[1]
          ? detail.pricing[1].price
          : "Free of cost"
        }
      </div>
    </div>
    <div class="col-md-4 my-4">
      <div class="box mx-3 py-4 text-center mx-auto fw-bold px-3 bg-body-secondary fs-4 rounded-3 ">
      ${
        detail?.pricing[1]
          ? detail.pricing[1].price
          : "Free of cost"
        }
      </div>
    </div>
    <div class="col-md-4 my-4">
      <div class="box mx-3 text-center mx-auto fw-bold py-3 bg-body-secondary fs-4 rounded-3 ">
      ${
        detail?.pricing[2]
          ? detail.pricing[2].price
          : "Free of cost"
        }
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 ">
    <h4>Features</h4>
      <ol>
        <li>
        ${
            detail.features["1"]
              ? detail.features["1"].feature_name
              : "Data not found"
        }
          </li>
        <li>
        ${
            detail.features["2"]
              ? detail.features["2"].feature_name
              : "Data not found"
        }
        </li>
        <li>
        ${
            detail.features["3"]
              ? detail.features["3"].feature_name
              : "Data not found"
        }
        </li>
      </ol>
    </div>
    <div class="col-md-6">
    <h4>Integrations</h4>
      <ol>
        <li>
        ${
            detail?.integrations[0]
            ? detail.integrations[0]
            : "Data not found"
            }
        </li>
        <li>
        ${
            detail?.integrations[1]
            ? detail.integrations[1]
             : "Data not found"
         }
        </li>
        <li>
        ${
            detail?.integrations[2]
            ? detail.integrations[2]
            : "Data not found"
        }
        </li>
      </ol>
    </div>
  </div>
</div>
<div class="col-md-6 rounded-2">
  <img src="${detail?.image_link[0]}" alt="Image" class="img-responsive "><h6 style="position: absolute; top: 0; right: 0; id="none" class="bg-danger me-2 accuracy-text text-white p-3 rounded-2 mb-5">${
    detail?.accuracy?.score
      ? Math.round(detail.accuracy.score * 100)
      : "No "
  } accuracy</h6>
  <h3 class="card-title text-center my-3">
  ${
    detail?.input_output_examples[0]?.input
  }
  </h3>
  <p>
  ${
    detail?.input_output_examples[0]
      ? detail.input_output_examples[0].output
      : "No! Not yet! Take a break!!!"
  }
  </p>
</div>
</div>
  `;

   
};  


