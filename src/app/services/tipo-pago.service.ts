import { GenericResponse } from './../classes/genericResponse.model';
import { TipoPago } from './../classes/tipoPago';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app-settings';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  private urlEndPoint = AppSettings.API_ENDPOINT + '/tipoPago';

  constructor(private http: HttpClient) {}

  listarTiposPago(): Observable<TipoPago[]> {
    return this.http.get<TipoPago[]>(this.urlEndPoint + '/listarTiposPago').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarTipoPago(tipoPago: TipoPago): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/administrarTipoPago', tipoPago).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  eliminarLaboratorio(tipoPago: TipoPago): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/eliminarTipoPago', tipoPago).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
