import { Component, inject, Input } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-delete-btn',
  standalone: true,
  imports: [],
  templateUrl: './delete-btn.component.html',
  styleUrl: './delete-btn.component.css',
})
export class DeleteBtnComponent {
  userService = inject(UserServiceService);
  @Input() deleteThis! : IUser;


  async deleteUser(_id: string | undefined) {
    
    if (_id) {
      try {
        const deleteRes: IUser = await this.userService.delete(_id);
        console.log(deleteRes);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
