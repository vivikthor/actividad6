import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UserServiceService } from '../../services/user-service.service';
import { UserInvalidComponent } from '../../components/user-invalid/user-invalid.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [NavbarComponent, UserFormComponent, UserInvalidComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  userService = inject(UserServiceService);
  activatedRoute = inject(ActivatedRoute);
  activatedUser!: IUser;

  // checkUser(user : IUser): boolean {
  //   if(user === null){
  //     return false
  //   }else{
  //     return true
  //   }
  // }

  ngOnInit() {
    console.log(this.activatedUser);
    this.activatedRoute.params.subscribe(async (params) => {
      this.activatedUser = await this.userService.getById(params['id']);
    });
  }
}
