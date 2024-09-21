import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpotifyAuthService } from '../../services/spotify-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  providers: [SpotifyAuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authSpotify = inject(SpotifyAuthService);

  async loginWithSpotify() {
    await this.authSpotify.login();
  }
}
