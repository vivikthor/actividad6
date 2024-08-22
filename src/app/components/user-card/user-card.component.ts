import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() myUser!: IUser;
  userService = inject(UserServiceService);

  async deleteUser(_id: string | undefined) {
    if (_id) {
      try {
        const deleteRes : IUser[] = await this.userService.delete(_id);
        console.log(deleteRes)
      } catch (error) {
        console.log(error);
      }
    }
  }
}
