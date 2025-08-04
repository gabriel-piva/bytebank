import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <nav class="app-nav">
        <div class="nav-brand">
          <a href="/" class="brand-link">
            <img src="assets/logotipo.png" alt="ByteBank" class="brand-logo" />
          </a>
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
        padding: 0 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      }

      .nav-brand {
        display: flex;
        align-items: center;
      }

      .brand-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        transition: transform 0.2s ease;
      }

      .brand-link:hover {
        transform: scale(1.02);
      }

      .brand-logo {
        height: 40px;
        width: auto;
        max-width: 200px;
        object-fit: contain;
      }

      .nav-links {
        display: flex;
        gap: 24px;
      }

      .nav-link {
        text-decoration: none;
        color: #64748b;
        font-weight: 500;
        padding: 10px 20px;
        border-radius: 8px;
        transition: all 0.2s ease;
        font-size: 14px;
        border: 1px solid transparent;
      }

      .nav-link:hover {
        color: #2563eb;
        background: #f1f5f9;
        border-color: #e2e8f0;
      }

      .nav-link.active {
        color: #2563eb;
        background: #dbeafe;
        border-color: #bfdbfe;
        font-weight: 600;
      }

      .app-main {
        padding: 24px 32px;
        max-width: 1200px;
        margin: 0 auto;
      }

      @media (max-width: 768px) {
        .app-nav {
          flex-direction: column;
          height: auto;
          padding: 16px 20px;
          gap: 16px;
        }

        .nav-links {
          gap: 12px;
          width: 100%;
          justify-content: center;
          flex-wrap: wrap;
        }

        .nav-link {
          padding: 8px 16px;
          font-size: 13px;
        }

        .brand-logo {
          height: 32px;
          max-width: 150px;
        }

        .app-main {
          padding: 16px 20px;
        }
      }

      @media (max-width: 480px) {
        .nav-links {
          flex-direction: column;
          gap: 8px;
        }

        .nav-link {
          text-align: center;
          width: 100%;
        }
      }
    `,
  ],
})
export class App {
  protected readonly title = signal('transfers-mf');
}
