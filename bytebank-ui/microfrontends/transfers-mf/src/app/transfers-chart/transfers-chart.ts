import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-transfers-chart',
  standalone: true,
  templateUrl: './transfers-chart.html',
  styleUrl: './transfers-chart.scss',
})
export class TransfersChartComponent implements OnInit {
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  ngOnInit() {
    this.initChart();
  }

  private initChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Dados simulados de transferências por mês
    const transfersData: ChartData<'bar'> = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Transferências Enviadas (R$)',
          data: [1200, 1900, 3000, 2500, 2800, 3200],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          borderRadius: 8,
        },
        {
          label: 'Transferências Recebidas (R$)',
          data: [2100, 1600, 2300, 3100, 2400, 2900],
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: transfersData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Histórico de Transferências - 2024',
            font: {
              size: 18,
              weight: 'bold',
            },
            color: '#1f2937',
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#374151',
              font: {
                size: 12,
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#6b7280',
              callback: function (value) {
                return 'R$ ' + Number(value).toLocaleString('pt-BR');
              },
            },
            grid: {
              color: '#e5e7eb',
            },
          },
          x: {
            ticks: {
              color: '#6b7280',
            },
            grid: {
              color: '#e5e7eb',
            },
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
