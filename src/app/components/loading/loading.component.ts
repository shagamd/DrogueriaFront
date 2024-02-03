import { SpinnerService } from './../spinner/spinner.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  constructor(public loader: SpinnerService) { }

  ngOnInit(): void {
  }
}
