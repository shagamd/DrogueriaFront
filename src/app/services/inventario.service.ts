import { GenericResponse } from './../classes/genericResponse.model';
import { Inventario, InventarioResumen } from './../classes/inventario';
import { PaginationResponse } from './../classes/paginationResponse';
import { AppSettings } from './../app-settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Producto } from '../classes/producto';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private urlEndPoint: string = AppSettings.API_ENDPOINT + '/inventario';

  constructor(private http: HttpClient) { }

  public get _urlEndPoint(): string {
    return this.urlEndPoint;
  }

  listarInventario(
    palabraBusqueda: string, vigentes: boolean, pagina: number
  ): Observable<PaginationResponse> {
    let request: any = { palabraBusqueda, vigentes, pagina };
    return this.http.post<PaginationResponse>(this.urlEndPoint + '/listar', request).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  obtenerInventarioResumen(productoId: number): Observable<InventarioResumen[]> {
    return this.http.post<InventarioResumen[]>(this.urlEndPoint + '/obtenerInventarioResumen', productoId).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarInventario(inventario: Inventario): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/administrarInventario', inventario).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  eliminarInventario(inventario: Inventario): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this._urlEndPoint}/eliminarInventario`, inventario).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  modificarInventario(inventario: Inventario): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.urlEndPoint + '/modificarInventario', inventario).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

}
