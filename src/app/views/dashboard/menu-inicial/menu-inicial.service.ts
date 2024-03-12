import { TotalFacturaModel } from './../../../classes/factura';
import { FacturaService } from './../../../services/factura.service';
import { getStyle, hexToRgba } from '@coreui/utils';
import { IChartProps } from './../dashboard-charts-data';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuInicialService {

  private urlFacturas: string = AppSettings.API_ENDPOINT + '/factura';
  private mainChart: IChartProps = {};

  constructor(private http: HttpClient) {
  }

  public obtenerMainChart(): Observable<IChartProps> {
    return this.ventasUltimos30Dias().pipe(
      map(data => {
        this.generarMainChart(data);
        return this.mainChart;
      })
    )
  }

  private generarMainChart(data: TotalFacturaModel[]): void {
    console.log("la data es: ", data)
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(brandInfo, 10);
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    this.mainChart['elements'] = data.length;
    this.mainChart['data'] = data.map(el => el.total);

    let labels: string[] = data.map(el => el.fechaFactura);

    const datasets = [
      {
        data: this.mainChart['data'],
        label: 'Total Facturas',
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function (context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }

  private ventasUltimos30Dias(): Observable<TotalFacturaModel[]> {
    return this.http.get<TotalFacturaModel[]>(this.urlFacturas + '/ventasUltimos30Dias').pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    )
  }
}
