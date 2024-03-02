import { Cliente } from './../classes/cliente';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app-settings';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private urlEndPoint: string = AppSettings.API_ENDPOINT + '/clientes';

  constructor(private http: HttpClient) {}

  obtenerClienteGenerico(): Observable<Cliente> {
    return this.http.get<Cliente>(this.urlEndPoint + '/cargarClienteGenerico').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
