import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userService = inject(UserServiceService);
  USERS: IUser[] = [];

  ngOnInit() {
    this.userService
      .getAll()
      .then((res: any) => {this.USERS = res.results})
      .catch((error) => { console.log(error)});
  }
}
