import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { from, map, switchMap } from 'rxjs';
import type { ContactsPage } from './contacts-page.schema';

const PAGE_SIZE = 5;

type Contact = ContactsPage['data'][number];

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly contacts = signal<Contact[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly page = signal(1);
  protected readonly totalItems = signal(0);
  protected readonly totalPages = signal(0);

  ngOnInit(): void {
    this.loadPage(1);
  }

  protected loadPage(page: number): void {
    this.loading.set(true);
    this.error.set('');

    const params = new HttpParams()
      .set('page', page)
      .set('limit', PAGE_SIZE);

    this.http
      .get<unknown>(`${BACKEND_URL}/v1/contacts`, { params })
      .pipe(
        switchMap((response) =>
          from(import('./contacts-page.schema')).pipe(
            map(({ contactsPageSchema }) => contactsPageSchema.parse(response)),
          ),
        ),
      )
      .subscribe({
        next: (result: ContactsPage) => {
          this.contacts.set(result.data);
          this.page.set(result.pagination.page);
          this.totalItems.set(result.pagination.totalItems);
          this.totalPages.set(result.pagination.totalPages);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Unable to load contacts. Please try again later.');
          this.loading.set(false);
        },
      });
  }
}
