// console.log("connected");
// load data 
const loadData = async () =>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
     const res= await fetch(url);
     const data = await res.json();
     displayCards(data.data);
     displayCards(data.data.tools[0].name);
     
}
const displayCards = cards =>{
    // console.log(cards);
    const cardsContainer = document.getElementById('card-container')
    cards.forEach(card =>{
        console.log(card);
        
    })
    
}
// loadData();