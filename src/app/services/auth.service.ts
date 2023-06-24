import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { AuthRequest, AuthResponse } from '../classes/authModels';
import { GenericResponse } from '../classes/genericResponse.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario: Usuario;
  private _token: string | null;

  constructor(private http: HttpClient) {}

  // Metodo Get del Usuario
  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      localStorage.getItem('usuario') != null
      // sessionStorage.getItem('usuario') != null
    ) {
      this._usuario = JSON.parse(localStorage.getItem('usuario') || "") as Usuario;
      // this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  // Metodo Get del Token
  public get token(): string | null{
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem('token') != null) {
      // } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = localStorage.getItem('token')  || "";
      // this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: AuthRequest): Observable<AuthResponse> {
    const urlEndPoint = AppSettings.API_AUTH + '/login';

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(urlEndPoint, usuario, {
      headers: httpHeaders,
    });
  }

  guardarUsuario(accessToken: string, nombre: string): void {
    // console.log(payload);
    let payload = this.obtenerDatosToken(accessToken);
    if (nombre) {
      payload.usuario.nombre = nombre;
    }
    this._usuario = payload.usuario;
    this.actualizarStorageUsuario();
  }

  asignarRoles(opciones: any) {
    this._usuario.roles = opciones;
    this.actualizarStorageUsuario();
  }

  protected actualizarStorageUsuario(): void {
    localStorage.setItem('usuario', JSON.stringify(this._usuario));
    // sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem('token', accessToken);
    // sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string | null): any {
    if (accessToken != null) {
      let base64Data = accessToken.split('.')[1];

      return JSON.parse(Buffer.from(base64Data, 'base64').toString('binary'));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.sub && payload.sub.length > 0) {
      return true;
    }
    return false;
  }

  isTokenExpired(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    let now = new Date().getTime() / 1000;

    if (payload.exp < now) {
      return true;
    }
    return false;
  }

  getRefreshToken(): string {
    return 'Aca va en teoria el refresh Token';
  }

  refreshToken(token: string) {
    const urlEndPoint = AppSettings.API_AUTH + '/acaVaRefresh';

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(urlEndPoint, token, {
      headers: httpHeaders,
    });
  }

  hasRole(role: string): boolean {
    return this.usuario.roles.includes(role);
  }

  logout(): void {
    this._token = null;
    this._usuario = new Usuario();
    localStorage.clear();
    // sessionStorage.clear();
    //El clear limpia todo
    //el removeItem solo uno
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    // sessionStorage.removeItem('token');
    // sessionStorage.removeItem('usuario');

    const urlEndPoint = AppSettings.API_AUTH + '/logout';

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // this.http.post<any>(urlEndPoint, usuario, {
    //   headers: httpHeaders,
    // });
  }

  // obtenerCodigoRecuperacion(cedula: string): Observable<GenericResponse> {
  //   const urlEndPoint = AppSettings.API_AUTH + '/obtenerCodigo';

  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });
  //   return this.http.post<any>(urlEndPoint, cedula, {
  //     headers: httpHeaders,
  //   });
  // }

  // validarCodigoRecuperacion(
  //   documento: string,
  //   codigoVerificacion: string
  // ): Observable<GenericResponse> {
  //   const urlEndPoint = AppSettings.API_AUTH + '/validarCodigoRecuperacion';

  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });
  //   return this.http.post<any>(
  //     urlEndPoint,
  //     { documento, codigoVerificacion },
  //     {
  //       headers: httpHeaders,
  //     }
  //   );
  // }

  cambiarClave(
    documento: string,
    codigoVerificacion: string
  ): Observable<GenericResponse> {
    const urlEndPoint = AppSettings.API_AUTH + '/cambiarClave';

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      urlEndPoint,
      { documento, codigoVerificacion },
      {
        headers: httpHeaders,
      }
    );
  }
}
