import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styles: [
    `
      .app-container {
        min-height: 100vh;
        background: #f8fafc;
        font-family: Arial, sans-serif;
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
        justify-content: space-between;
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

      .header-right {
        display: flex;
        align-items: center;
        gap: 24px;
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

      .home-link {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }

      .home-link:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .home-link:active {
        transform: translateY(0);
      }

      .home-link span {
        font-size: 18px;
      }

      .header-user {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-shrink: 0;
      }

      .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
      }

      .user-name {
        font-size: 16px;
        font-weight: 600;
        color: white;
        margin: 0;
        line-height: 1.2;
      }

      .user-greeting {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
        line-height: 1.2;
      }

      .user-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
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
          flex-direction: row;
          text-align: left;
          gap: 20px;
          justify-content: space-between;
          align-items: center;
        }

        .header-text {
          flex: 1;
          margin: 0 20px;
          display: flex;
          justify-content: center;
        }

        .home-link {
          padding: 10px 16px;
          font-size: 14px;
        }

        .home-link span {
          font-size: 16px;
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

        .header-user {
          gap: 12px;
        }

        .user-info {
          display: none;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
        }

        .main-content {
          padding: 20px 16px;
        }
      }

      @media (max-width: 480px) {
        .bytebank-header {
          padding: 20px 16px;
        }

        .header-content {
          gap: 12px;
        }

        .header-text {
          margin: 0 12px;
          display: flex;
          justify-content: center;
        }

        .home-link {
          padding: 8px 12px;
          font-size: 12px;
          gap: 6px;
        }

        .home-link span {
          font-size: 14px;
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

        .user-avatar {
          width: 36px;
          height: 36px;
        }

        .main-content {
          padding: 16px 12px;
        }
      }
    `,
  ],
})
export class App implements OnInit {
  protected readonly title = signal('transfers-mf');
  user: User | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserFromLocalStorage();
  }

  private loadUserFromLocalStorage(): void {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      } else {
        // Definindo usuário padrão para teste

        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }

  onAvatarError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src =
      'https://via.placeholder.com/48x48/EC4640/FFFFFF?text=' +
      (this.user?.name?.charAt(0) || 'U');
  }

  navigateToHome(): void {
    // Redireciona para a aplicação Next.js principal
    window.location.href = '/';
  }
}
