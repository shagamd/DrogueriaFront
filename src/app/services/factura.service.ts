import { Factura } from './../classes/factura';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app-settings';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { PaginationResponse } from '../classes/paginationResponse';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint: string = AppSettings.API_ENDPOINT + '/factura';

  constructor(private http: HttpClient) {}

  listarFacturasPorFecha(fechaFactura: Date, pagina: number): Observable<PaginationResponse> {
    return this.http.post<PaginationResponse>(this.urlEndPoint + '/listarFacturasXFecha', {fechaFactura, pagina}).pipe(
      map(el => {
        el.arDatos.forEach((factura) => factura.itemVisible = false);
        return el;
      }),
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  registrarFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.urlEndPoint + '/registrarFactura', factura).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
}
