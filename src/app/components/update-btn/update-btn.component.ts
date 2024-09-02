import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-update-btn',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './update-btn.component.html',
  styleUrl: './update-btn.component.css',
})
export class UpdateBtnComponent {
  @Input() updateThis! : IUser
}
