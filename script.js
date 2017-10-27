function Deck () {
this.cardpile = []


}

Deck.prototype.shuffle = function shuffle() {
  var currentIndex = this.cardpile.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = this.cardpile[currentIndex];
    this.cardpile[currentIndex] = this.cardpile[randomIndex];
    this.cardpile[randomIndex] = temporaryValue;
  }
  return this.cardpile;
}

Deck.prototype.organize = function (num) {
  this.openinghand = this.cardpile.slice(0,num)
  this.cardpile = this.cardpile.slice(num,this.cardpile.length)
  this.lands = this.openinghand.filter(function(x) {return x.type === "Land"})
  this.drawspells = this.openinghand.filter(function(x) {return x.type === "Draw Spell"})
  this.dredgers = this.openinghand.filter(function(x) {return x.type === "Dredger"})
  this.freeCreatures = this.openinghand.filter(function(x) {return x.type === "FC"})
}


function Card (name, cc,type,abilities) {

this.name = name;
this.cc = cc;
this.type = type;
this.abilities = abilities;

}





var dredgeDeckList = {
"stinkweedImp": new Card("Stinkweed Imp","2B","Dredger","Dredge 5"),
"gemstoneMine": new Card("GemStoneMine","","Land","R G B"),
"golgariThug": new Card("Golgari Thug","1B","Dredger","R G B"),
"insolentNeonate": new Card("Insolent Neonate","R","Draw Spell","Draw 2, Discard 2"),
"faithlessLooting": new Card("Faithless Looting","R","Draw Spell","Draw 1, Discard 1"),
"catharticReunion": new Card("Cathartic Reunion","1R","Draw Spell","Discard 2, Draw 3"),
"narcomoeba": new Card ("Narcomoeba","1U","FC","Returns when in GY"),
"prizedAmalgam": new Card ("Prized Amalgam", "1UB", "Fc", "Returns when other returns"),
"bloodGhast": new Card ("Bloodghast",'BB',"FC","Returns when land drop"),
"lifeFromLoam": new Card ("Life from the Loam","1G","Dredger","Dredge 3"),
"mountain": new Card ("Mountain","","Land","R"),
"fetchland": new Card ("Fetchland","","Land","R G B"),
"copperlineGorge": new Card ("Copperline Gorge","","Land","R G")
}



Deck.prototype.addCard = function (card) {

this.cardpile.push(card)
}

Deck.prototype.mulliganDecision = function () {

    if (this.lands.length > 1 && this.drawspells.length > 0 || this.lands.length === 1 && this.openinghand.includes("faithlessLooting")) {return "Keep"}
    else {return "Mull"}

}


Deck.prototype.deal = function () {
  this.cardpile = []

for (var j =0;j<4;j++) {
  for (var k in dredgeDeckList){
    if (dredgeDeckList.hasOwnProperty(k))
    {this.cardpile.push(dredgeDeckList[k])}

  }
}

this.shuffle() 
}


function Game(deck) {
  let num = 7; let mullcount = 0;
  this.mulls = [];
  this.graveyard = [];
  this.landsInPlay = [];
  this.deck = deck;

  // Resolve Mulligans
  while (num>4) {
  deck.deal()
  deck.organize(num)
  if (deck.mulliganDecision() === "Mull") mullcount++, this.mulls.push(deck.openinghand), num-- ;
  else break 
  }

}

Game.prototype.turnOne = function () {

var that = this

this.deck.openinghand.every (function (x,i) {
    if (x.type === 'Land') {
      
      that.landsInPlay.push(that.deck.openinghand[i]);
      that.deck.openinghand.splice(i,1);
      return;
    }
    return true
  }
  )
}






eetai = new Deck()
var thegame = new Game(eetai)
thegame.turnOne() 

console.log(thegame.deck.openinghand)
console.log(thegame.landsInPlay)
console.log(thegame.mulls)


$( "#newgame" ).click(function() {
  alert("hi")
});