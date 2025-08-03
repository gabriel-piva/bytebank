import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Account {
  id: string;
  user_id: string;
  account_type: string;
  card_number: string;
  expiration_date: string;
  balance: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  account_id: string;
  amount: string;
  description: string;
  transaction_date: string;
  category: 'entrada' | 'saida';
}

export interface TransactionsResponse {
  transactions: Transaction[];
  totalTransactions: number;
}

export interface TransferStats {
  totalSent: number;
  totalReceived: number;
  netBalance: number;
  monthlyData: {
    labels: string[];
    sent: number[];
    received: number[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private readonly API_BASE_URL = 'http://localhost:3003';

  constructor(private http: HttpClient) {}

  getUserAccounts(userId: string): Observable<Account> {
    // Criar token de autenticação simulado (em produção, isso viria do sistema de auth)
    const token = btoa(`${userId}-bytebank`);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Account>(`${this.API_BASE_URL}/transactions/all`, {
      headers,
    });
  }

  getTransactions(userId: string): Observable<Transaction[]> {
    // Criar token de autenticação simulado (em produção, isso viria do sistema de auth)
    const token = btoa(`${userId}-bytebank`);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<TransactionsResponse>(`${this.API_BASE_URL}/transactions/all`, {
        headers,
      })
      .pipe(map((response) => response.transactions));
  }

  getTransferStats(userId: string): Observable<TransferStats> {
    return this.getTransactions(userId).pipe(
      map((transactions) =>
        this.calculateTransferStatsFromTransactions(transactions),
      ),
    );
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

    const result = {
      totalSent,
      totalReceived,
      netBalance: totalReceived - totalSent,
      monthlyData: {
        labels,
        sent: sentData,
        received: receivedData,
      },
    };

    return result;
  }
}
