import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

constructor(private authService:AuthService){}

isLoggedIn$:Observable<boolean>;
isLoggedOut$:Observable<boolean>;

ngOnInit(){

  this.isLoggedIn$ = this.authService.isLoggedIn$;
  this.isLoggedOut$ = this.authService.isLoggedOut$;
    
}





}
