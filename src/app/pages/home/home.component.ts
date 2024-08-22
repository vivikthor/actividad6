import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userService = inject(UserServiceService);
  USERS: IUser[] = [];
  PAGES : any[] = []

  ngOnInit() {
    this.userService
      .getAll()
      .then((res: any) => {
        this.USERS = res.results;

        for(let i : number = 1; i <= res.total_pages; i++){
          this.PAGES.push(i);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  moveToPage(page:number){this.userService
      .getAll(page)
      .then((res: any) => {
        this.USERS = res.results;
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
