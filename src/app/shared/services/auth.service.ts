import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return of(null);
      })
    );
  }
}
