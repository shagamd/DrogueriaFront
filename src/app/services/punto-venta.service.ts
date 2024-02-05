import { GenericResponse } from './../classes/genericResponse.model';
import { PuntoVenta } from './../classes/puntoVenta';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app-settings';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntoVentaService {
  private urlEndPoint = AppSettings.API_ENDPOINT + '/puntoventa';

  constructor(private http: HttpClient) {}

  listarPuntosVenta(): Observable<PuntoVenta[]> {
    return this.http.get<PuntoVenta[]>(this.urlEndPoint + '/listar').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarPuntoVenta(puntoVenta: PuntoVenta): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/administrarPuntoVenta', puntoVenta).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  eliminarPuntoVenta(puntoVenta: PuntoVenta): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/eliminarPuntoVenta', puntoVenta).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
