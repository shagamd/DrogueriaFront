import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/classes/authModels';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  authRequest: AuthRequest = new AuthRequest();

  constructor(private authService: AuthService, public router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (
      this.authService.isAuthenticated() &&
      !this.authService.isTokenExpired()
    ) {
      // Swal.fire('', `Hola ${this.authService.usuario.nombre} ya estas autenticado!`, 'info');
      Swal.fire({
        title: '',
        html: `Hola ${this.authService.usuario.nombre} ya estas autenticado!`,
        icon: 'info',
      });
      this.router.navigate(['/dashboard']);
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  login(): void {
    if (
      this.authRequest.username == null ||
      this.authRequest.password == null
    ) {
      Swal.fire('Error Login', 'Cedula o contraseña vacios', 'warning');
      return;
    }
    this.authService.login(this.authRequest).subscribe({
      next: (response) => {
        this.authService.guardarUsuario(response.accessToken, response.nombre);
        this.authService.guardarToken(response.accessToken);

        let usuario: Usuario = this.authService.usuario;

        this.router.navigate(['/dashboard']);
        Swal.fire(
          '',
          'Hola ' + usuario.nombre + ' ha iniciado sesion con exito',
          'success'
        );
      },
      error: (err) => {
        if (err.status == 400) {
          if (err.error.mensaje) {
            Swal.fire('Error Login', err.error.mensaje, 'error');
          } else {
            Swal.fire(
              'Error Login',
              'Usuario o contraseña incorrectas!',
              'error'
            );
          }
        }
      },
    });
  }

  redigirRecuperarContrasena(): void {
    this.router.navigate(['/recuperar_password']);
  }
}
