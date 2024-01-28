import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TipoObservacion } from '../classes/tipoObservacion';
import { GenericResponse } from '../classes/genericResponse.model';

@Injectable({
  providedIn: 'root',
})
export class TipoObservacionService {
  private urlEndPoint: string = AppSettings.API_ENDPOINT + '/tipoObservacion';

  constructor(private http: HttpClient) {}

  listarTipoObservacion(): Observable<TipoObservacion[]> {
    return this.http.get<TipoObservacion[]>(this.urlEndPoint + '/listarTipoObservacion').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarTipoObservacion(tipoObservacion: TipoObservacion): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/gestionarTipoObservacion', tipoObservacion).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  eliminarTipoObservacion(tipoObservacion: TipoObservacion): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.urlEndPoint}/eliminarTipoObservacion`, tipoObservacion).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
