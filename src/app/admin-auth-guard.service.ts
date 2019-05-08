import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userSerice: UserService) { }


  canActivate(): Observable<boolean> {
    return this.auth.user$
      .pipe(
        switchMap(user => this.userSerice.get(user.uid).valueChanges()),
        map(appUser => appUser.isAdmin)
      );
  }

}