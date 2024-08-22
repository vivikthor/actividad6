import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserServiceService } from '../../services/user-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userService = inject(UserServiceService);
  activatedRoute = inject(ActivatedRoute);
  USER!: IUser;
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const res: IUser= await this.userService.getById(params.id);
      this.USER = res;
    });
  }
}
