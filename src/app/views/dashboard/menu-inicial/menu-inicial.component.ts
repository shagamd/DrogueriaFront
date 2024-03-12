import { IChartProps } from '../dashboard-charts-data';
import { MenuInicialService } from './menu-inicial.service';
import { Component, OnInit } from '@angular/core';
import Chart, { ChartData } from 'chart.js/auto'

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.scss']
})
export class MenuInicialComponent implements OnInit {

  public mainChart: IChartProps;
  public data: ChartData;

  constructor(private menuInicialService: MenuInicialService) {
  }

  ngOnInit(): void {
    this.initChart();
  }


  initChart(): void {
    this.menuInicialService.obtenerMainChart().subscribe(el => {
      console.log(el);
      this.mainChart = el;
      // console.log(el.data)
    });
    //   this.mainChart = {
    //     "elements": 3,
    //     "data": {
    //       "datasets": [
    //         {
    //           "data": [
    //             94800,
    //             214200,
    //             142400
    //           ],
    //           "label": "Current",
    //           "backgroundColor": "rgba(3, 9, 15, 0.1)",
    //           "borderColor": "#39f",
    //           "pointHoverBackgroundColor": "#39f",
    //           "borderWidth": 2,
    //           "fill": true
    //         }
    //       ],
    //       "labels": [
    //         "2024-03-02",
    //         "2024-03-04",
    //         "2024-03-05"
    //       ]
    //     },
    //     "type": "line",
    //     "options": {
    //       "maintainAspectRatio": false,
    //       "plugins": {
    //         "legend": {
    //           "display": false
    //         },
    //         "tooltip": {
    //           "callbacks": {}
    //         }
    //       },
    //       "scales": {
    //         "x": {
    //           "grid": {
    //             "drawOnChartArea": false
    //           }
    //         },
    //         "y": {
    //           "beginAtZero": true,
    //         }
    //       },
    //       "elements": {
    //         "line": {
    //           "tension": 0.4
    //         },
    //         "point": {
    //           "radius": 0,
    //           "hitRadius": 10,
    //           "hoverRadius": 4,
    //           "hoverBorderWidth": 3
    //         }
    //       }
    //     }
    //   }
  }

}
