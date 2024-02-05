import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-parametros',
  templateUrl: './administrar-parametros.component.html',
  styleUrls: ['./administrar-parametros.component.scss'],
})
export class AdministrarParametrosComponent implements OnInit {
  public panes = [{ name: 'Laboratorios' }, { name: 'Categorias' }, { name: 'Tipo Observacion' },{name: 'Unidades Medida'}, {name: "Impuestos"}, {name: "Puntos Venta"}];

  activePane = 0;

  onTabChange($event: number) {
    this.activePane = $event;
  }

  constructor() {}

  ngOnInit(): void {}
}
