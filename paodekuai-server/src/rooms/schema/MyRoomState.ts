import { Schema, type, ArraySchema, MapSchema } from "@colyseus/schema";

//var Names = [ 'Player4', 'Player3', 'Player2', 'Player1'];

export const availableSuits = ['♠︎', '♥︎', '♣︎', '♦︎'];
export const availableValues = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

export class Card extends Schema {
  @type("string") suit: string =  "";
  @type("string") displayValue: string = "";
  @type("number") value: number = 0;

  constructor(suit: string, displayValue: string) {
    super();
    this.suit = suit;
    this.displayValue =  displayValue;
    if (isNaN(Number(displayValue)) || (displayValue == "2")) {
      switch(displayValue) {
        case "J":
          this.value = 11;
          break;
        case "Q":
          this.value = 12;
          break;
        case "K":
          this.value = 13;
          break;
        case "A":
          this.value = 14;
          break;
        case "2":
          this.value = 15;
          break;
        case "JB":
          this.value = 16;
          break;
        case "JR":
          this.value = 17;
          break;  
        default:
          this.value=1;
          console.log(displayValue);
          throw new Error("Invalid card value")
          //should never get here
      }
    } else {
      this.value = Number(displayValue);
    }
  } 

}

export class Players extends Schema {

    @type("string") id: string = "";
    @type("boolean") admin: boolean = false;
    @type([Card]) hand = new ArraySchema<Card>;

    constructor(id: string, admin: boolean) {
        super();
        this.id = id;
        this.admin = admin;
    }

}

export class CardDeck extends Schema {
  @type("number") card_count: number = 54;
  @type([Card]) cards = new ArraySchema<Card>; 

  constructor() {
    super();
    this.newDeck();
  }

  public newDeck(): void {
    for (var i = 0; i < availableSuits.length ; i++ ) {
      for (var j = 0; j < availableValues.length; j++) {
        this.cards.push(new Card(availableSuits[i],availableValues[j]))
      }
    }
    var joker: Card = new Card("🃟","JB");
    var bigjoker: Card = new Card("🃟","JR");
    this.cards.push(joker);
    this.cards.push(bigjoker);
  }
}

export class MyRoomState extends Schema {

  @type("number") playercount: number = 0;
  @type({map: Players}) players = new MapSchema<Players>;  

  createPlayer(sessionId: string) {
    this.playercount++;
    this.players.set(sessionId, new Players(sessionId,this.playercount==1));
  } 

  removePlayer(sessionId: string) {
    if (this.players.get(sessionId)!.admin && this.players.size > 1) {
      this.players.delete(sessionId);
      this.players.get(this.players.keys().next().value)!.admin = true;
    } else {
      this.players.delete(sessionId);
    }
      this.playercount--;
  }

  dealCards() {
    var cardDeck = new CardDeck();
    this.clearCards();
    while (cardDeck.card_count > 0 && cardDeck.card_count > this.playercount)  {
      this.players.forEach((value) => {
         var index = Math.floor(Math.random() * cardDeck.card_count);
         var card = cardDeck.cards.at(index);
         cardDeck.cards.deleteAt(index);
         value.hand.push(card);
         cardDeck.card_count--;
      });
    }
    this.players.forEach((value) => {
      value.hand.sort((a,b) => a.value - b.value) 
    })
  }

  clearCards() {
    this.players.forEach((value) => {
      value.hand.clear(); 
    })
  }
}