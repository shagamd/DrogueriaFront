import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, catchError, concat, debounceTime, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';
import { ProductoResumen } from 'src/app/classes/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-select-productos-venta',
  templateUrl: './select-productos-venta.component.html',
  styleUrls: ['./select-productos-venta.component.scss']
})
export class SelectProductosVentaComponent implements OnInit {

  variable: ProductoResumen;
  @Output() variableCambiada: EventEmitter<ProductoResumen> = new EventEmitter<ProductoResumen>();

  products$: Observable<ProductoResumen[]>;
  productsLoading = false;
  filtroBusqueda$ = new Subject<string>();
  minLengthTerm = 3;

  constructor(public productoService: ProductoService) { }

  seleccionarProducto(productoSeleccionado: ProductoResumen): void {
    this.variable = null;
    this.loadProductos();
    this.variableCambiada.emit(productoSeleccionado);
  }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos() {
    this.products$ = concat(
      of([]), // default items
      this.filtroBusqueda$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.productsLoading = true),
        switchMap(term => {
          return this.productoService.getProductosVenta(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.productsLoading = false)
          )
        })
      )
    );

  }
}
