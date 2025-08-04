import { Component } from '@angular/core';
import { TransfersChartComponent } from '../../transfers-chart/transfers-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TransfersChartComponent],
  template: `
    <div class="dashboard-container">
      <div class="chart-section">
        <app-transfers-chart></app-transfers-chart>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        color: #333;
        margin-bottom: 30px;
        font-size: 2rem;
      }

      .chart-section {
        margin-bottom: 30px;
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .summary-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }

      .summary-card {
        background: white;
        border-radius: 8px;
        padding: 24px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .summary-card h3 {
        color: #666;
        font-size: 1rem;
        margin-bottom: 16px;
        font-weight: 500;
      }

      .amount {
        color: #2563eb;
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
      }

      .count {
        color: #059669;
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
      }
    `,
  ],
})
export class DashboardComponent {}
