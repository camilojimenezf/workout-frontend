import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { infoUser } from '../../models/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public infoUser: infoUser;
  public role: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.infoUser = this.userService.getInfoUser();
    this.role = this.userService.getRole();
    console.log(this.role);
  }

}
