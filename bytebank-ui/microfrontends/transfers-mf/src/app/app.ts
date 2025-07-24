import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransfersChartComponent } from './transfers-chart/transfers-chart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TransfersChartComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('transfers-mf');
}
