import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../model/user';


const ANONYMOUS:User ={id:undefined, email:""}

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(private http:HttpClient) { }

  private subject:BehaviorSubject<User> =  new BehaviorSubject<User>(ANONYMOUS)

  user$:Observable<User> = this.subject.asObservable()
  isLoggedIn$:Observable<boolean> = this.user$.pipe(map((val:User)=>{return !!val.id}));
  isLoggedOut$:Observable<boolean> = this.isLoggedIn$.pipe(map((val:boolean)=>{return !val}))


  signUp(email:string, password:string):Observable<User>
  {
    return this.http.post<User>("/api/signup",{email, password}).pipe(shareReplay(), tap((user:User)=>{
      this.subject.next(user)
    }))
  }



}
