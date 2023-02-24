import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdesaoService {

  constructor(public auth: AuthService) { }

    
}
