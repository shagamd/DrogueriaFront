import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../app-settings';
import { Categoria } from '../classes/categoria';
import { GenericResponse } from '../classes/genericResponse.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private urlEndPoint = AppSettings.API_ENDPOINT + '/categoria';

  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndPoint + '/listar').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarCategoria(categoria: Categoria): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/administrarCategoria', categoria).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  eliminarCategoria(categoria: Categoria): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/eliminarCategoria', categoria).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
