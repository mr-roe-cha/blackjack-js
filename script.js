/*************************
    
    Blackjack
    Github: mr-roe-cha

*************************/


/*************************
 
    Variable Declarations
  
    Data structure for a generic card? 
    Create an object that transforms value name to value number?
    How to update score on page? Convert string to num? 
    How to set value in HTML tag to a number type instead of a string?
    
    Place into separate file
  
    To do: 
    
    - add database to store all wins and losses (keeps records of all games played, keeps track of scores)
    - create local web server that allows playing on browser
    - add stay button
    - let player choose number of decks used
    - add a "purse", how much to bet on each game
    - add soft/hard hand feature, allows changing value of ace from 11 to 1
    - dealer's hidden card (?)
    - dealer must hit until the cards total 17 or more points, the dealer also hits on a "soft" 17
    - what happens when dealer and player both hit blackjack?
    - what happens when player hits 21? can player still hit? probably not, goes to dealer to start hitting
  
*************************/

// Card Variables

let suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
let values = [{ name: "Ace",    points: 1 }, 
              { name: "King",   points: 10 },
              { name: "Queen",  points: 10 },
              { name: "Jack",   points: 10 },
              { name: "Ten",    points: 10 },
              { name: "Nine",   points: 9 },
              { name: "Eight",  points: 8 }, 
              { name: "Seven",  points: 7 },
              { name: "Six",    points: 6 },
              { name: "Five",   points: 5 },
              { name: "Four",   points: 4 },
              { name: "Three",  points: 3 },
              { name: "Two",    points: 2 } ];

// DOM Variables

let gameText = document.getElementById('gameText');
let newGameBtn = document.getElementById('newGameBtn');
let hitBtn = document.getElementById('hitBtn');
let stayBtn = document.getElementById('stayBtn');

// Game Variables

let deck = [],
    numCardsDealt = 0;

let dealerHand = { cards: [], score: 0, 
                   displayCards: document.getElementById('dealerHand'),
                   displayScore: document.getElementById('dealerScore')};

let playerHand = { cards: [], score: 0,
                   displayCards: document.getElementById('playerHand'),
                   displayScore: document.getElementById('playerScore')};

newGameBtn.addEventListener('click', function(){
  
    newGame();
    
});

hitBtn.addEventListener('click', function(){
  
    dealCard(playerHand, 1);
        
});

stayBtn.addEventListener('click', function(){
  
    while (dealerHand.score < 17){
        
        dealCard(dealerHand, 1);
        
    }

    gameOver();

});

/*************************

  Function Declarations
  Place into separate file
  
*************************/

function createDeck(){
  
    // Test: confirm that all 52 cards are created every time
  
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++){
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++){
            
            let newCard = {
              
                suit: suits[suitIdx],
                valueStr: values[valueIdx].name,
                points: values[valueIdx].points
            };
            
            newCard.name = `${newCard.valueStr} of ${newCard.suit}`;
            
            deck.push(newCard);
            //console.log(newCard);
            
        }
    }
}

function getRandomCard(){
  
  // Test: check every card with an existing deck and confirm it's not duplicated
  
    let i = Math.trunc(Math.random() * deck.length);
    let card = deck.splice(i,1)[0];
    console.log(card.name, " ", numCardsDealt);
    return card;
    
}

function shuffleDeck(deck){
    // To do - change system to shuffle deck instead of pulling random card, clearer intent

}

function calcScore(hand, cardIndex){
    // When is a hand soft? When does the Ace change values from 11 to 1?
    hand.score += hand.cards[cardIndex].points;
    hand.displayScore.innerText = `Score: ${hand.score}`;

}

function dealCard(hand, numCards){
    
    // Deal two cards when game started, one card at a time afterwards

    for(let i = 0; i < numCards; i++){
        numCardsDealt++;
        hand.cards.push(getRandomCard());
        let cardIndex = hand.cards.length - 1;
        hand.displayCards.innerText += `${hand.cards[cardIndex].name} \n`;
        calcScore(hand, cardIndex);
    }
    
    console.log(hand.score);
    
    if(hand.score > 21 || numCardsDealt === 52) { gameOver(); }
    
}

function newGame(){
  
    console.log("Welcome to Blackjack!");
    console.log("Cards dealt: ");
  
    // Rebuild deck
    
    deck = [];
    numCardsDealt = 0;
    createDeck();
    
    // Set buttons and game text
    
    gameText.innerText = "Game Started:"
    newGameBtn.style.display = "none";
    hitBtn.style.display = "inline";
    stayBtn.style.display = "inline";

    // Reset dealer hand

    clearHand(dealerHand);
    dealCard(dealerHand, 2);

    // Reset player hand
    
    clearHand(playerHand);
    dealCard(playerHand, 2);
    
}

function gameOver(){
  
    // Set buttons and game text
    
    newGameBtn.style.display = "inline";
    hitBtn.style.display = "none";
    stayBtn.style.display = "none";

    if(playerHand.score <= 21){
        if(playerHand.score > dealerHand.score || dealerHand.score > 21){
            gameText.innerText = "PLAYER WINS!"
        }
    } else{
        gameText.innerText = "DEALER WINS"
    }
}

function clearHand(hand){
    
    hand.cards = [];
    hand.score = 0;
    hand.displayCards.innerText = "";
  
}

/*************************

  Start Program Logic
  Separate file
    
*************************/