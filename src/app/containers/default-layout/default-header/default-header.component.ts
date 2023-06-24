import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  public usuarioSesion: Usuario;

  constructor(private classToggler: ClassToggleService, private authService: AuthService, private router: Router) {
    super();
    this.usuarioSesion = this.authService.usuario;
  }

  cerrarSesion(): void {
    // let usuario = this.authService.usuario;
    this.authService.logout();
    Swal.fire('', `Sesion finalzada con exito.`, 'success');
    this.router.navigate(['/login']);
  }
}
