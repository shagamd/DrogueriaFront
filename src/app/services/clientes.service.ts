import { Cliente } from './../classes/cliente';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app-settings';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { PaginationResponse } from '../classes/paginationResponse';
import { GenericResponse } from '../classes/genericResponse.model';

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

  listarClientes(
    palabraBusqueda: string, pagina: number
  ): Observable<PaginationResponse> {
    let request: any = { palabraBusqueda, pagina };
    return this.http.post<PaginationResponse>(this.urlEndPoint + '/listarClientes', request).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarCliente(cliente:Cliente): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/administrarCliente', cliente).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
