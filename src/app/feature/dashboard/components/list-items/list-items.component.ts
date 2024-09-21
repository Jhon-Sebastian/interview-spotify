import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TracksItem } from '../../../../shared/interfaces/dashboard/api-spotity.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemsComponent {
  readonly item = input.required<TracksItem>();
}
