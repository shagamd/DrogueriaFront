import { GrupoImpuesto } from './../classes/grupoImpuestos';
import { GenericResponse } from './../classes/genericResponse.model';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Impuesto } from '../classes/impuesto';

@Injectable({
  providedIn: 'root'
})
export class ImpuestosService {
  private urlEndPoint: string = AppSettings.API_ENDPOINT + '/impuestos';

  constructor(private http: HttpClient) {}

  listarImpuestos(): Observable<Impuesto[]> {
    return this.http.get<Impuesto[]>(this.urlEndPoint + '/listarImpuestos').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarImpuesto(impuesto: Impuesto): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/administrarImpuesto', impuesto).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  eliminarImpuesto(impuesto: Impuesto): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.urlEndPoint}/eliminarImpuesto`, impuesto).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  listarGrupoImpuestos(): Observable<GrupoImpuesto[]> {
    return this.http.get<[]>(this.urlEndPoint + '/listarGrupoImpuestos').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarGrupoImpuesto(grupoImpuesto: GrupoImpuesto): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/administrarGrupoImpuesto', grupoImpuesto).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  eliminarGrupoImpuesto(grupoImpuesto: GrupoImpuesto): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.urlEndPoint}/eliminarGrupoImpuesto`, grupoImpuesto).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
