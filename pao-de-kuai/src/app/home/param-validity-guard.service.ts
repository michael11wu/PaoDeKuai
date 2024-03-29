import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { GameService } from '../game.service';

@Injectable({
  providedIn: 'root'
})
export class ParamValidityGuardService {

  constructor(private gameService: GameService, private router: Router) { }

  canActivate(roomId: string): boolean {
    if (this.gameService.checkRoomIdExists()) {
      return true;
    };
    return this.gameService.joinRoom(roomId);
  }
}

export const canActivateRoom: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  if (inject(ParamValidityGuardService).canActivate(route.params['id'])) {
    return true;
  };
  var routing = new Router();
  routing.navigate(['/join']);
  return false;
};