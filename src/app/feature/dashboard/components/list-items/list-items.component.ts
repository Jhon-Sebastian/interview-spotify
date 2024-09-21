import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TracksItem } from '../../../../shared/interfaces/dashboard/api-spotity.interface';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [],
  templateUrl: './list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemsComponent {
  item = input<TracksItem>();
}
