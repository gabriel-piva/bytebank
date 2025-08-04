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
  TransactionsResponse,
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
  @ViewChild('chartCanvas', { static: false })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  transferStats: TransferStats | null = null;
  isLoading = true;
  error: string | null = null;
  hasData = false;
  userId: string = '';

  private initializeUserId(): void {
    try {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.userId = storedUserId;
      } else {
        console.warn(
          'ID do usuário não encontrado no localStorage, usando valor padrão "2"',
        );
        this.userId = '2'; // Valor padrão
      }
    } catch (error) {
      console.error('Erro ao acessar localStorage:', error);
      this.userId = '2'; // Fallback
    }
  }

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.initializeUserId();
    this.loadTransferData();
  }

  loadTransferData() {
    this.isLoading = true;
    this.error = null;

    // Carregando dados usando getUserAccounts
    this.accountsService.getUserAccounts(this.userId).subscribe({
      next: (response: TransactionsResponse) => {
        // Processar as transações para criar as estatísticas do gráfico
        const transferStats = this.calculateTransferStatsFromTransactions(
          response.transactions,
        );
        this.transferStats = transferStats;
        this.hasData = this.checkHasData(transferStats);
        this.isLoading = false;

        if (this.hasData) {
          // Aguardar o DOM ser renderizado antes de inicializar o chart
          setTimeout(() => {
            this.initChart();
          }, 500);
        }
      },
      error: (err: any) => {
        console.error('Erro ao carregar transferências:', err);
        this.error = 'Erro ao carregar dados das transferências';
        this.isLoading = false;
        this.hasData = false;
      },
    });
  }

  private initChart() {
    if (!this.transferStats) {
      return;
    }

    if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (!ctx) {
      return;
    }

    const transfersData: ChartData<'bar'> = {
      labels: this.transferStats.monthlyData.labels,
      datasets: [
        {
          label: 'Saídas (R$)',
          data: this.transferStats.monthlyData.sent,
          backgroundColor: 'rgba(236, 70, 64, 0.8)',
          borderColor: 'rgba(236, 70, 64, 1)',
          borderWidth: 2,
          borderRadius: 8,
        },
        {
          label: 'Entradas (R$)',
          data: this.transferStats.monthlyData.received,
          backgroundColor: 'rgba(52, 168, 83, 0.8)',
          borderColor: 'rgba(52, 168, 83, 1)',
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

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, config);
  }

  private checkHasData(stats: TransferStats | null): boolean {
    if (!stats || !stats.monthlyData) {
      return false;
    }

    // Verifica se há dados nos arrays de sent e received
    const hasSentData = stats.monthlyData.sent.some(
      (value: number) => value > 0,
    );
    const hasReceivedData = stats.monthlyData.received.some(
      (value: number) => value > 0,
    );
    const hasLabels = stats.monthlyData.labels.length > 0;

    return hasLabels && (hasSentData || hasReceivedData);
  }

  private calculateTransferStatsFromTransactions(
    transactions: Transaction[],
  ): TransferStats {
    // Agrupar transações por mês/ano
    const monthlyData = new Map<string, { sent: number; received: number }>();

    let totalSent = 0;
    let totalReceived = 0;

    transactions.forEach((transaction) => {
      const date = new Date(transaction.transaction_date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const amount = parseFloat(transaction.amount);

      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, { sent: 0, received: 0 });
      }

      const monthData = monthlyData.get(monthKey)!;

      if (transaction.category === 'saida') {
        monthData.sent += amount;
        totalSent += amount;
      } else if (transaction.category === 'entrada') {
        monthData.received += amount;
        totalReceived += amount;
      }
    });

    // Ordenar os meses e criar arrays para o gráfico
    const sortedMonths = Array.from(monthlyData.keys()).sort();

    const labels: string[] = [];
    const sentData: number[] = [];
    const receivedData: number[] = [];

    // Mapear números dos meses para nomes em português
    const monthNames = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];

    sortedMonths.forEach((monthKey) => {
      const [year, month] = monthKey.split('-');
      const monthName = monthNames[parseInt(month) - 1];
      const yearShort = year.slice(-2);

      labels.push(`${monthName}/${yearShort}`);

      const data = monthlyData.get(monthKey)!;
      sentData.push(data.sent);
      receivedData.push(data.received);
    });

    // Calcular melhor e pior mês e média mensal
    let bestMonth: { month: string; balance: number } | null = null;
    let worstMonth: { month: string; balance: number } | null = null;
    let totalMonthlyBalance = 0;

    sortedMonths.forEach((monthKey, index) => {
      const data = monthlyData.get(monthKey)!;
      const monthBalance = data.received - data.sent;
      const monthLabel = labels[index];

      totalMonthlyBalance += monthBalance;

      if (bestMonth === null || monthBalance > bestMonth.balance) {
        bestMonth = { month: monthLabel, balance: monthBalance };
      }

      if (worstMonth === null || monthBalance < worstMonth.balance) {
        worstMonth = { month: monthLabel, balance: monthBalance };
      }
    });

    const averageBalance =
      sortedMonths.length > 0 ? totalMonthlyBalance / sortedMonths.length : 0;

    return {
      totalSent,
      totalReceived,
      netBalance: totalReceived - totalSent,
      averageBalance,
      bestMonth,
      worstMonth,
      monthlyData: {
        labels,
        sent: sentData,
        received: receivedData,
      },
    };
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
