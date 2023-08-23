import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-raiox',
  templateUrl: './home-raiox.component.html',
  styleUrls: ['./home-raiox.component.scss']
})
export class HomeRaioxComponent {
  logoInicial:string;

  constructor(private router:Router, private auth:AuthService) { 
    this.logoInicial="../../../../assets/images/logo-raio-x-1.png";
  } 
}
