import { AfterViewInit, Component, input } from '@angular/core';
import { TracksItem } from '../../../../shared/interfaces/dashboard/api-spotity.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-item',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './detail-item.component.html',
  styleUrl: './detail-item.component.scss',
})
export class DetailItemComponent implements AfterViewInit {
  item = input.required<TracksItem>();

  ngAfterViewInit(): void {
    this.validateIfExistsItem();
  }

  async validateIfExistsItem() {
    if (this.item()) {
      this.createElementIframe();
    }
  }

  createElementIframe() {
    const div: HTMLElement | null = document.getElementById('iframe');
    if (div) {
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '300px';
      iframe.style.border = '0px';
      iframe.allow =
        'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
      iframe.loading = 'lazy';
      iframe.src = `https://open.spotify.com/embed/track/${this.item().id
        }?utm_source=generator`;
      iframe.style.borderRadius = '12px';
      div.appendChild(iframe);
    }
  }
}
