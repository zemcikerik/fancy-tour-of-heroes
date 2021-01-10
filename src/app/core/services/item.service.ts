import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Item } from '../models/item.model';
import { Logger } from './logger.service';

export const ITEM_ENDPOINT: InjectionToken<string> = new InjectionToken<string>('ItemEndpoint');

@Injectable()
export class ItemService {

  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public constructor(
    private readonly logger: Logger,
    private readonly httpClient: HttpClient,
    @Inject(ITEM_ENDPOINT) private readonly itemEndpoint: string
  ) { }

  public getItems(): Observable<Item[]> {
    this.logDebug('Fetching items!');

    return this.httpClient.get<Item[]>(this.itemEndpoint).pipe(
      tap(() => this.logDebug('Fetched items!')),
      catchError(this.createErrorHandler('getItems', []))
    );
  }

  public getItem(id: number): Observable<Item> {
    this.logDebug(`Fetching item with id ${id}!`);
    const url = `${this.itemEndpoint}/${id}`;

    return this.httpClient.get<Item>(url).pipe(
      tap(() => this.logDebug(`Fetched item with id ${id}!`)),
      catchError(this.createErrorHandler<Item>(`getItem with id ${id}`))
    );
  }

  public addItem(item: Item): Observable<Item> {
    this.logDebug('Adding a new item!');

    return this.httpClient.post<Item>(this.itemEndpoint, item, this.httpOptions).pipe(
      tap(newItem => this.logDebug(`Added a new item with id ${newItem.id}!`)),
      catchError(this.createErrorHandler<Item>('addItem'))
    );
  }

  public updateItem(item: Item): Observable<any> {
    const id: number = item.id;
    this.logDebug(`Updating item with id ${id}!`);

    return this.httpClient.put(this.itemEndpoint, item, this.httpOptions).pipe(
      tap(() => this.logDebug(`Updated item with id ${id}!`)),
      catchError(this.createErrorHandler<any>('updateItem'))
    );
  }

  public deleteItem(item: Item | number): Observable<any> {
    const id: number = typeof item === 'number' ? item : item.id;
    const url = `${this.itemEndpoint}/${id}`;
    this.logDebug(`Deleting item with id ${id}!`);

    return this.httpClient.delete<any>(url, this.httpOptions).pipe(
      tap(() => this.logDebug(`Deleted item with id=${id}`)),
      catchError(this.createErrorHandler('deleteItem'))
    );
  }

  public searchItems(term: string): Observable<Item[]> {
    term = term.trim();

    if (!term) {
      return of([]);
    }

    const url = `${this.itemEndpoint}/?name=${term}`;
    this.logDebug(`Finding items matching "${term}"!`);

    return this.httpClient.get<Item[]>(url).pipe(
      tap(items => items.length
        ? this.logDebug(`Found ${items.length} items matching "${term}"!`)
        : this.logDebug(`Found no items matching "${term}"!`)),
      catchError(this.createErrorHandler<Item[]>('searchItems'))
    );
  }

  private logDebug(message: string): void {
    this.logger.debug(`[ItemService] ${message}`);
  }

  private createErrorHandler<T>(operation: string, defaultResult?: T): (err: Error) => Observable<T> {
    return (err: Error): Observable<T> => {
      this.logger.error(`[ItemService] ${operation} failed: ${err}!`);
      return of(defaultResult);
    };
  }

}
