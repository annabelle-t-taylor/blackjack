//Link HTML elements to JavaScript IDs
let newGame = document.getElementById('newGame');
let startOver = document.getElementById('startOver');
let hit = document.getElementById('hit');
let stay = document.getElementById('stay');
let playerHandText = document.getElementById('playerHandText');
let dealerHandText = document.getElementById('dealerHandText');
let playerScore = document.getElementById('playerScore');
let dealerScore = document.getElementById('dealerScore');
let gameResult = document.getElementById('gameResult');

//Generate deck
let suits = ['Diamonds','Hearts','Spades','Clubs'];
let ranks = ['Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King','Ace'];
let deck = [];
    
function generateDeck(){
  deck = [];
  for (suitIndex = 0; suitIndex < 4; suitIndex++){
    for(rankIndex = 0; rankIndex < 13; rankIndex++){
      let card = {
        suit: suits[suitIndex],
        rank: ranks[rankIndex],
        value: rankIndex+2,
      }
      if(card.rank==='King' || card.rank==='Queen' || card.rank==='Jack' )
        card.value=10;
      if(card.rank==='Ace')
        card.value=1;
      deck.push(card);
    }
  }
  shuffle(deck);
  return deck;
}

//Before anything happens, remove everything but "new game"
hit.style.display = "none";
stay.style.display = "none";
startOver.style.display="none";

//Start a first game   
newGame.addEventListener('click', function(){
  newGame.style.display = "none";
  hit.style.display = "inline";
  stay.style.display = "inline";
  
  generateDeck();
  
  playerHand = [getNextCard(),getNextCard()];
  dealerHand = [getNextCard(),getNextCard()];

  playerHandText.innerHTML = "<strong>You've been dealt:</strong> " + getCardString(playerHand[0]) + " and " + getCardString(playerHand[1]);
  playerScore.innerHTML = "<strong>Your points:</strong> " + getScore(playerHand);
  dealerHandText.innerHTML ="<strong>The dealer has:</strong> " + getCardString(dealerHand[0]);
  dealerScore.innerHTML="<strong>Dealer's points:</strong> " + dealerHand[0].value;
});

//Hit
hit.addEventListener('click', function(){
  hit.style.display = "none";
  stay.style.display = "none";

  let newCard = getNextCard();
  playerHand.push(newCard);

  playerHandText.innerHTML = "<strong>You've been dealt:</strong> " + getCardString(playerHand[0]) + ", " + getCardString(playerHand[1]) + ", and " + getCardString(playerHand[2]);
  playerScore.innerHTML = "<strong>Your points:</strong> " + getScore(playerHand);
  dealerHandText.innerHTML += ' and ' +getCardString(dealerHand[1]);
  dealerScore.innerHTML ="<strong>Dealer's points:</strong> " + getScore(dealerHand);

  let dealerFinalScore = getScore(dealerHand);
  let playerFinalScore = getScore(playerHand);
  
  gameResult.innerHTML = determineWinner(playerFinalScore, dealerFinalScore);
  startOver.style.display = "block";
});

//Stay
stay.addEventListener('click',function(){
  hit.style.display = "none";
  stay.style.display = "none";
  
  dealerHandText.innerHTML += ' and ' +getCardString(dealerHand[1]);
  dealerScore.innerHTML ="<strong>Dealer's points:</strong> " + getScore(dealerHand);
  startOver.style.display = "block";

  let dealerFinalScore = getScore(dealerHand);
  let playerFinalScore = getScore(playerHand);
  gameResult.innerHTML = determineWinner(playerFinalScore, dealerFinalScore);
});

//Start a new game
startOver.addEventListener('click',function(){
  startOver.style.display="none";
  hit.style.display = "inline";
  stay.style.display = "inline";
  
  generateDeck();
  
  playerHand = [getNextCard(),getNextCard()];
  dealerHand = [getNextCard(),getNextCard()];

  playerHandText.innerHTML = "<strong>You've been dealt:</strong> " + getCardString(playerHand[0]) + " and " + getCardString(playerHand[1]);
  playerScore.innerHTML = "<strong>Your points:</strong> " + getScore(playerHand);
  dealerHandText.innerHTML ="<strong>The dealer has:</strong> " + getCardString(dealerHand[0]);
  dealerScore.innerHTML="<strong>Dealer's points:</strong> " + dealerHand[0].value;
  gameResult.innerHTML = "";
});

function getScore(hand){
  let score = 0;
  for(i=0; i < hand.length; i++)
    score += hand[i].value;
  return score;
}

function getCardString(card){
  return card.rank + " of " + card.suit;
}

function getNextCard(){
  return deck.shift();
}

function determineWinner(yourPoints, dealerPoints){
  let result = "";
  if(yourPoints > 21)
    result = "You lost!";
  else if (yourPoints === 21)
    result = "You won!";
  else if (dealerPoints > yourPoints)
    result = "You lost!";
  else if (yourPoints > dealerPoints)
    result = "You won!";
  else if(yourPoints === dealerPoints)
    result = "Draw!";
  return result;
}

function shuffle(deck) {
  var m = deck.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = deck[m];
    deck[m] = deck[i];
    deck[i] = t;
  }
  return deck;
}
