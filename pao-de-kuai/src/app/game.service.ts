import { Injectable } from '@angular/core';
import { Client, Room } from 'colyseus.js';
import { Router } from '@angular/router';
import { MyRoomState} from '../../../paodekuai-server/src/rooms/schema/MyRoomState'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public client: Client;
  private room?: Room<MyRoomState>;

  constructor(private route: Router) { 
    this.client = new Client('tp://localhost:2567/');
  }

  public checkRoomIdExists(): boolean {
    if (this.room?.roomId) {
      return true;
    }
    return false;
  }

  public getClient() {
    return this.client;
  }

  public getRoom() {
    return this.room;
  }

  public createRoom() {
    this.client.create<MyRoomState>('my_room', {
      name:'Test'
    }).then((room) => {
      console.log(room.sessionId,"successfully created room: ", room.roomId);
      this.room = room; 
      var url = "/room/" + room.sessionId + room.roomId;
      this.route.navigateByUrl(url);
      this.room.onStateChange((state => {
        console.log("State changed", state);
     }))
      return true;
    }).catch(e => {console.log("CREATE ERROR", e)});
    return false;
  }

  public joinRoom(roomId: string) {
    roomId = roomId.toUpperCase();
    this.client.joinById<MyRoomState>(roomId).then((room) => { 
      console.log(room.sessionId,"successfully joined room: ", room.roomId);
      this.room = room;
      var url = "/room/" + room.sessionId + room.roomId;
      this.route.navigateByUrl(url);
      return true;
    }).catch(e => {
      console.log("JOIN ERROR", e);
    });
    return false;
  }    
}
