import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styles: [
    `
      .app-container {
        min-height: 100vh;
        background: #f8fafc;
      }

      .bytebank-header {
        background: linear-gradient(135deg, #ec4640 0%, #d63b36 100%);
        color: white;
        padding: 40px 32px;
        box-shadow: 0 4px 20px rgba(236, 70, 64, 0.3);
      }

      .header-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 32px;
      }

      .header-brand {
        flex-shrink: 0;
      }

      .header-logo {
        height: 50px;
        width: auto;
        max-width: 200px;
        object-fit: contain;
        filter: brightness(0) invert(1);
      }

      .header-text {
        flex: 1;
      }

      .header-text h1 {
        font-size: 32px;
        font-weight: 700;
        margin: 0 0 8px 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header-text p {
        font-size: 18px;
        margin: 0;
        opacity: 0.9;
        font-weight: 400;
      }

      .main-content {
        padding: 32px;
        max-width: 1200px;
        margin: 0 auto;
      }

      @media (max-width: 768px) {
        .bytebank-header {
          padding: 24px 20px;
        }

        .header-content {
          flex-direction: column;
          text-align: center;
          gap: 20px;
        }

        .header-text h1 {
          font-size: 24px;
        }

        .header-text p {
          font-size: 16px;
        }

        .header-logo {
          height: 40px;
          max-width: 150px;
        }

        .main-content {
          padding: 20px 16px;
        }
      }

      @media (max-width: 480px) {
        .bytebank-header {
          padding: 20px 16px;
        }

        .header-text h1 {
          font-size: 20px;
        }

        .header-text p {
          font-size: 14px;
        }

        .header-logo {
          height: 32px;
          max-width: 120px;
        }

        .main-content {
          padding: 16px 12px;
        }
      }
    `,
  ],
})
export class App {
  protected readonly title = signal('transfers-mf');
}
