import { Component, inject, Input } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { IUser } from '../../interfaces/iuser.interface';
  import Swal from 'sweetalert2';


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
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-outline-success',
            cancelButton: 'btn btn-outline-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: `¿Quieres eliminar a ${this.deleteThis?.first_name}?`,
            text: 'Si borras al usuario no habrá vuelta atrás',
            imageUrl: this.deleteThis?.image,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: `Foto de perfil de ${this.deleteThis?.image}`,
            showCancelButton: true,
            confirmButtonText: '¡Sí, borrar!',
            cancelButtonText: '¡No, no quiero!',
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: '¡Borrado!',
                text: 'El usuario ha sido eliminado',
                icon: 'success',
              });
              console.log(deleteRes);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
