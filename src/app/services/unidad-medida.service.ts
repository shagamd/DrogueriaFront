import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UnidadMedida } from '../classes/unidadMedida';
import { GenericResponse } from '../classes/genericResponse.model';

@Injectable({
  providedIn: 'root',
})
export class UnidadMedidaService {
  private urlEndPoint: string = AppSettings.API_ENDPOINT + '/unidadMedida';

  constructor(private http: HttpClient) {}

  listarUnidadesMedida(): Observable<UnidadMedida[]> {
    return this.http.get<UnidadMedida[]>(this.urlEndPoint + '/listarUnidadesMedida').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarUnidadMedida(unidadMedida: UnidadMedida): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/administrarUnidadMedida', unidadMedida).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  eliminarUnidadMedida(unidadMedida: UnidadMedida): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.urlEndPoint}/eliminarUnidadMedida`, unidadMedida).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
