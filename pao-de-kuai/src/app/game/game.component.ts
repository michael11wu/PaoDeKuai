import { Component } from '@angular/core';
import { ArraySchema } from '@colyseus/schema';
import { GameService } from '../game.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Card } from '../../../../paodekuai-server/src/rooms/schema/MyRoomState';
import { NgFor } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatButtonModule, NgFor, CardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})



export class GameComponent {

    public room = this.gameService.getRoom();
    public hand = new ArraySchema<Card>();
    public otherPlayers: ArraySchema<Card>[] = [];

    constructor(private gameService: GameService, private route: Router) {
      this.room!.onStateChange((state => {
        this.hand = state.players.get(this.room!.sessionId)?.hand!;
        this.otherPlayers = [];
        state.players.forEach((value,key) => {
          console.log("for each", value)
          if (this.room?.sessionId != key) {
            this.otherPlayers.push(value.hand)
          }
        })
        console.log("Other playres", this.otherPlayers.length)
     }))
    };

    public leaveRoom() {
      this.gameService.getRoom()?.leave();
      this.route.navigateByUrl('');
    }

    public isRoomAdmin(): boolean {
      return this.room?.state.players.get(this.room.sessionId!)?.admin!;
    }

    public startGame(): void {
      this.room?.send("start");
    }
}
