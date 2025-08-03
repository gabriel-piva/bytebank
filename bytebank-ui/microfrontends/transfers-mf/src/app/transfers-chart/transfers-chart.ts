import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import {
  AccountsService,
  TransferStats,
  Transaction,
} from '../services/accounts.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-transfers-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transfers-chart.html',
  styleUrl: './transfers-chart.scss',
})
export class TransfersChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  transferStats: TransferStats | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.loadTransferData();
  }

  loadTransferData() {
    this.isLoading = true;
    this.error = null;

    // Assumindo que estamos carregando dados para o usuário com ID 2
    this.accountsService.getTransferStats('2').subscribe({
      next: (stats) => {
        this.transferStats = stats;
        this.isLoading = false;
        this.initChart();
      },
      error: (err) => {
        console.error('Erro ao carregar transferências:', err);
        this.error = 'Erro ao carregar dados das transferências';
        this.isLoading = false;
      },
    });
  }

  private initChart() {
    if (!this.transferStats) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const transfersData: ChartData<'bar'> = {
      labels: this.transferStats.monthlyData.labels,
      datasets: [
        {
          label: 'Saídas (R$)',
          data: this.transferStats.monthlyData.sent,
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2,
          borderRadius: 8,
        },
        {
          label: 'Entradas (R$)',
          data: this.transferStats.monthlyData.received,
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
            text: 'Histórico de Transferências',
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

    // Destruir gráfico anterior se existir
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, config);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
