import { Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Room } from './room.js';
import { GameService } from '../game.service.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   
  constructor(private gameService: GameService) {};

  room: Room = {
    id: '',
    join_disabled: true,
    name: ''  
  };

  public createRoom() { 
    this.gameService.createRoom();
  }

  public joinRoom() {
    this.gameService.joinRoom(this.room.id);
  }  

  public onChange(event: Event): void {
    this.room.id = (<HTMLInputElement>event.target).value.toUpperCase();
    if (this.room.id.length == 4) {
      this.room.join_disabled = false;
    }
    else {
      this.room.join_disabled = true;
    }
  }

}
