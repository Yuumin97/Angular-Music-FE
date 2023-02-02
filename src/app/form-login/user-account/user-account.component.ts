import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  name: string
  roles: string[]

  avatar: string;
  admin: any = ["ADMIN"];
  isCheckAdmin = false;
  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
      this.roles = this.tokenService.getRoles();

      if(JSON.stringify(this.tokenService.getRoles())==JSON.stringify(this.admin)){
        this.isCheckAdmin = true;
      }
    }
  }

  logOut() {
    this.tokenService.logOut();
  }
}
