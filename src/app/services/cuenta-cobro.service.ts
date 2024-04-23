import { Cliente, ClienteResumen } from 'src/app/classes/cliente';
import { PaginationResponse } from './../classes/paginationResponse';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app-settings';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CuentaCobro } from '../classes/cuentaCobro';

@Injectable({
  providedIn: 'root'
})
export class CuentaCobroService {

  private urlEndPoint = AppSettings.API_ENDPOINT + '/cuentascobro';

  constructor(private http: HttpClient) { }

  listarCuentasCobro(cliente: ClienteResumen | Cliente, estado: boolean, pagina: number): Observable<PaginationResponse> {
    let request: any = { cliente, estado, pagina };
    return this.http.post<PaginationResponse>(this.urlEndPoint + '/cargarCuentasCobro', request).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  actualizarCuentaCobro(cuentaCobro: CuentaCobro):Observable<CuentaCobro> {
    return this.http.post<CuentaCobro>(this.urlEndPoint + '/actualizarCuentaCobro', cuentaCobro).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
