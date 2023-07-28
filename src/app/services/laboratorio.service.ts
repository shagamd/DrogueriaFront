import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Laboratorio } from '../classes/laboratorio';
import { GenericResponse } from '../classes/genericResponse.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  private urlEndPoint = AppSettings.API_ENDPOINT + '/laboratorio';

  constructor(private http: HttpClient) {}

  listarLaboratorios(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.urlEndPoint + '/listar').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarLaboratorio(laboratorio: Laboratorio): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/administrarLaboratorio', laboratorio).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  eliminarLaboratorio(laboratorio: Laboratorio): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/eliminarLaboratorio', laboratorio).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
