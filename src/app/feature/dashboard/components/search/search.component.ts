import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { validateExists } from '../../../../shared/utils/validate-exists';
import { TracksItem } from '../../../../shared/interfaces/dashboard/api-spotity.interface';
import { ListItemsComponent } from '../list-items/list-items.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, ListItemsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  private _dashBoardService = inject(DashboardService);
  private _destroyRef = inject(DestroyRef);
  items = signal<TracksItem[]>([]);
  loading = signal(false);

  search = signal('');
  searchTerm = toObservable(this.search).pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  ngOnInit(): void {
    this.listeningChangesInTheSearch();
  }

  listeningChangesInTheSearch() {
    this.searchTerm
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((search) => {
        if (validateExists(search)) {
          this.items.set([]);
          this.loading.set(true);
          this.getItemsSpotify(search);
        }
      });
  }

  getItemsSpotify(search: string) {
    this._dashBoardService.searchItemSpotify(search).subscribe({
      next: (data) => {
        this.items.set(data.tracks.items);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        alert(
          'Courrio un error al consultar los registros, vuelve a iniciar sesión'
        );
      },
    });
  }
}
