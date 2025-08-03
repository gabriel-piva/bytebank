import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <nav class="app-nav">
        <div class="nav-brand">
          <h2>💰 ByteBank Transfers</h2>
        </div>
        <div class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
            📊 Dashboard
          </a>
          <a routerLink="/history" routerLinkActive="active" class="nav-link">
            📋 Histórico
          </a>
        </div>
      </nav>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        background: #f8fafc;
      }

      .app-nav {
        background: white;
        border-bottom: 1px solid #e2e8f0;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .nav-brand h2 {
        margin: 0;
        color: #1e293b;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .nav-links {
        display: flex;
        gap: 24px;
      }

      .nav-link {
        text-decoration: none;
        color: #64748b;
        font-weight: 500;
        padding: 8px 16px;
        border-radius: 6px;
        transition: all 0.2s;
      }

      .nav-link:hover {
        color: #2563eb;
        background: #eff6ff;
      }

      .nav-link.active {
        color: #2563eb;
        background: #dbeafe;
      }

      .app-main {
        padding: 0;
      }

      @media (max-width: 768px) {
        .app-nav {
          flex-direction: column;
          height: auto;
          padding: 16px 20px;
          gap: 16px;
        }

        .nav-links {
          gap: 16px;
        }
      }
    `,
  ],
})
export class App {
  protected readonly title = signal('transfers-mf');
}
