import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

export const itemResolver = (route: ActivatedRouteSnapshot) => {
  const trackId = route.paramMap.get('id');
  if (!trackId) {
    return of(undefined);
  }

  const track = inject(DashboardService).getTrackById(trackId);
  if (!track) {
    const router = inject(Router);
    return router.navigate(['dashboard']);
  }

  return track;
};
