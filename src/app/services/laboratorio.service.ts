import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Laboratorio } from '../classes/laboratorio';
import { GenericResponse } from '../classes/genericResponse.model';
import { PaginationResponse } from '../classes/paginationResponse';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  private urlEndPoint = AppSettings.API_ENDPOINT + '/laboratorio';

  constructor(private http: HttpClient) {}

  listarLaboratorios(palabraBusqueda: string, pagina: number): Observable<PaginationResponse> {
    let request: any = { palabraBusqueda, pagina };
    return this.http.post<PaginationResponse>(this.urlEndPoint + '/listar', request).pipe(
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
