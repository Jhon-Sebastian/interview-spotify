import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { SpotifyAuthService } from '../../../../core/services/spotify-auth.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class HomeComponent {
  private _activateRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _authService = inject(SpotifyAuthService);
  private _router = inject(Router);
  private _localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.finishConfigurationToken();
  }

  finishConfigurationToken() {
    this._activateRoute.queryParams
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params: Params) => {
        if (!this.existsAuthenticationCode()) {
          this._authService.configurateTokenRequest(params);
          this._router.navigateByUrl('/dashboard');
        }
      });
  }

  existsAuthenticationCode() {
    return this._localStorageService.getCode();
  }
}
