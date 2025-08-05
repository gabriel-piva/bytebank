import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Transfer {
  id: string;
  date: string;
  amount: number;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-container">
      <h1>Histórico de Transferências</h1>

      <div class="filters">
        <input
          type="text"
          placeholder="Buscar por destinatário..."
          class="search-input"
          (input)="filterTransfers($event)"
        />
        <select class="status-filter" (change)="filterByStatus($event)">
          <option value="">Todos os status</option>
          <option value="completed">Concluídas</option>
          <option value="pending">Pendentes</option>
          <option value="failed">Falharam</option>
        </select>
      </div>

      <div class="transfers-list">
        <div
          *ngFor="let transfer of filteredTransfers()"
          class="transfer-item"
          [class]="'status-' + transfer.status"
        >
          <div class="transfer-info">
            <div class="recipient">{{ transfer.recipient }}</div>
            <div class="description">{{ transfer.description }}</div>
            <div class="date">{{ formatDate(transfer.date) }}</div>
          </div>
          <div class="transfer-details">
            <div class="amount">{{ formatCurrency(transfer.amount) }}</div>
            <div class="status" [class]="'status-' + transfer.status">
              {{ getStatusLabel(transfer.status) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .history-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        color: #333;
        margin-bottom: 30px;
        font-size: 2rem;
      }

      .filters {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }

      .search-input,
      .status-filter {
        padding: 12px 16px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
      }

      .search-input {
        flex: 1;
        min-width: 250px;
      }

      .status-filter {
        min-width: 150px;
      }

      .transfers-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .transfer-item {
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-left: 4px solid #e5e5e5;
      }

      .transfer-item.status-completed {
        border-left-color: #059669;
      }

      .transfer-item.status-pending {
        border-left-color: #d97706;
      }

      .transfer-item.status-failed {
        border-left-color: #dc2626;
      }

      .transfer-info {
        flex: 1;
      }

      .recipient {
        font-weight: 600;
        color: #333;
        margin-bottom: 4px;
      }

      .description {
        color: #666;
        font-size: 14px;
        margin-bottom: 4px;
      }

      .date {
        color: #999;
        font-size: 12px;
      }

      .transfer-details {
        text-align: right;
      }

      .amount {
        font-weight: 700;
        color: #333;
        font-size: 18px;
        margin-bottom: 4px;
      }

      .status {
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 12px;
        font-weight: 500;
      }

      .status.status-completed {
        background: #dcfce7;
        color: #059669;
      }

      .status.status-pending {
        background: #fef3c7;
        color: #d97706;
      }

      .status.status-failed {
        background: #fee2e2;
        color: #dc2626;
      }

      @media (max-width: 768px) {
        .transfer-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .transfer-details {
          text-align: left;
        }
      }
    `,
  ],
})
export class HistoryComponent {
  private transfers = signal<Transfer[]>([
    {
      id: '1',
      date: '2024-01-20T10:30:00Z',
      amount: 2500.0,
      recipient: 'João Silva',
      status: 'completed',
      description: 'Transferência PIX para conta poupança',
    },
    {
      id: '2',
      date: '2024-01-19T15:45:00Z',
      amount: 850.5,
      recipient: 'Maria Santos',
      status: 'completed',
      description: 'Pagamento de fornecedor',
    },
    {
      id: '3',
      date: '2024-01-19T09:15:00Z',
      amount: 1200.0,
      recipient: 'Carlos Oliveira',
      status: 'pending',
      description: 'TED para conta corrente',
    },
    {
      id: '4',
      date: '2024-01-18T14:20:00Z',
      amount: 300.0,
      recipient: 'Ana Costa',
      status: 'failed',
      description: 'PIX - Chave não encontrada',
    },
    {
      id: '5',
      date: '2024-01-18T11:30:00Z',
      amount: 5000.0,
      recipient: 'Empresa XYZ Ltda',
      status: 'completed',
      description: 'Pagamento de nota fiscal',
    },
  ]);

  filteredTransfers = signal<Transfer[]>(this.transfers());

  filterTransfers(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();

    this.filteredTransfers.set(
      this.transfers().filter(
        (transfer) =>
          transfer.recipient.toLowerCase().includes(searchTerm) ||
          transfer.description.toLowerCase().includes(searchTerm),
      ),
    );
  }

  filterByStatus(event: Event) {
    const target = event.target as HTMLSelectElement;
    const status = target.value;

    if (!status) {
      this.filteredTransfers.set(this.transfers());
      return;
    }

    this.filteredTransfers.set(
      this.transfers().filter((transfer) => transfer.status === status),
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  }

  getStatusLabel(status: string): string {
    const labels = {
      completed: 'Concluída',
      pending: 'Pendente',
      failed: 'Falhou',
    };
    return labels[status as keyof typeof labels] || status;
  }
}
