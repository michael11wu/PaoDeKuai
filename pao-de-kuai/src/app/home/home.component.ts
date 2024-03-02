import { Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Client } from 'colyseus.js';
import { Room } from '../room.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  room: Room = {
    id: '',
    join_disabled: true,
    name: ''
  };

  public createRoom() {
    var client = new Client('tp://localhost:2567/');
    client.joinOrCreate('my_room', {
      // your join options here...
      name:'test'
    }).then((room) => { 
      console.log(room.sessionId,"joined successfully!", room.name);
    }).catch(e => {console.log("JOIN ERROR", e)});
  }

  public onChange(event: Event): void {
    this.room.id = (<HTMLInputElement>event.target).value;
    if (this.room.id.length == 4) {
      this.room.join_disabled = false;
    }
    else {
      this.room.join_disabled = true;
    }
  }

}
