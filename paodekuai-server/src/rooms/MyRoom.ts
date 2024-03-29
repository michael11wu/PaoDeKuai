import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export class MyRoom extends Room<MyRoomState> {
  // The channel where we register the room IDs.
  // This can be anything you want, it doesn't have to be `$mylobby`.
  LOBBY_CHANNEL = "$mylobby";
  maxClients = 4;

  // Generate a single 4 capital letter room ID.
  generateRoomIdSingle(): string {
    let result = "";
    for (var i = 0; i < 4; i++) {
      result += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
    }
    return result;
  }

  // 1. Get room IDs already registered with the Presence API.
  // 2. Generate room IDs until you generate one that is not already used.
  // 3. Register the new room ID with the Presence API.
  async generateRoomId(): Promise<string> {
    const currentIds = await this.presence.smembers(this.LOBBY_CHANNEL);
    let id;
    do {
      id = this.generateRoomIdSingle();
    } while (currentIds.includes(id));

    await this.presence.sadd(this.LOBBY_CHANNEL, id);
    return id;
  }

  async onCreate (options: any) {
    this.roomId = await this.generateRoomId();
    this.setState(new MyRoomState());
    console.log("New room created");
    
    this.onMessage("skip", (client, message) => {
      // 
      // handle "type" message
      //
    });

    this.onMessage("start", (client, message) => {
      // 
      // handle "type" message
      this.state.dealCards();
      //
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!")
    this.state.createPlayer(client.sessionId);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.removePlayer(client.sessionId);
  }

  async onDispose() {
    console.log("Room disposed");
    this.presence.srem(this.LOBBY_CHANNEL, this.roomId);
  }

  public getState(): MyRoomState {
    return this.state;
  }
}
