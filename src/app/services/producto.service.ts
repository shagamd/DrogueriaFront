import { PaginationResponse } from './../classes/paginationResponse';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../classes/producto';
import { GenericResponse } from '../classes/genericResponse.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TipoObservacion } from '../classes/tipoObservacion';
import { Laboratorio } from '../classes/laboratorio';
import { Categoria } from '../classes/categoria';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private urlEndPoint: string = AppSettings.API_ENDPOINT + '/producto';

  constructor(private http: HttpClient) { }

  public get _urlEndPoint(): string {
    return this.urlEndPoint;
  }

  cargarCombos(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.urlEndPoint + '/cargarCombos').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  listarProductos(
    categoria: Categoria, laboratorio: Laboratorio, palabraBusqueda: string, pagina: number
  ): Observable<PaginationResponse> {
    let request: any = { palabraBusqueda, pagina, ...(categoria !== undefined && { categoria }), ...(laboratorio !== undefined && { laboratorio }) };
    return this.http.post<PaginationResponse>(this.urlEndPoint + '/listarProductos', request).pipe(
      map((response: PaginationResponse) => {
        response.arDatos.map((el: Producto) => {
          el.grupoImpuestos = el.grupoImpuestos == null ? undefined : el.grupoImpuestos;
        });
        return response;
      }),
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  administrarProducto(producto: Producto, file: File | undefined = undefined): Observable<GenericResponse> {
    var formData: any = new FormData();
    formData.append('producto', new Blob([JSON.stringify(producto)], { type: 'application/json' }));
    formData.append('file', file);
    return this.http.post<GenericResponse>(this.urlEndPoint + '/gestionarProducto', formData).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  eliminarProducto(producto: Producto): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this._urlEndPoint}/eliminarProducto`, producto).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  cargarTiposObservacion(): Observable<TipoObservacion[]> {
    return this.http.get<TipoObservacion[]>(`${this._urlEndPoint}/cargarTiposObservacion`).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
