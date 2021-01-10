import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Hero } from '../models/hero.model';
import { Logger } from './logger.service';

export const HERO_ENDPOINT: InjectionToken<string> = new InjectionToken<string>('HeroEndpoint');

@Injectable()
export class HeroService {

  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public constructor(
    private readonly logger: Logger,
    private readonly httpClient: HttpClient,
    @Inject(HERO_ENDPOINT) private readonly heroEndpoint: string
  ) { }

  public getHeroes(): Observable<Hero[]> {
    this.logDebug('Fetching heroes!');

    return this.httpClient.get<Hero[]>(this.heroEndpoint).pipe(
      tap(() => this.logDebug('Fetched heroes!')),
      catchError(this.createErrorHandler('getHeroes', []))
    );
  }

  public getHero(id: number): Observable<Hero> {
    this.logDebug(`Fetching hero with id ${id}!`);
    const url = `${this.heroEndpoint}/${id}`;

    return this.httpClient.get<Hero>(url).pipe(
      tap(() => this.logDebug(`Fetched hero with id ${id}!`)),
      catchError(this.createErrorHandler<Hero>(`getHero with id ${id}`))
    );
  }

  public addHero(hero: Hero): Observable<Hero> {
    this.logDebug('Adding a new hero!');

    return this.httpClient.post<Hero>(this.heroEndpoint, hero, this.httpOptions).pipe(
      tap(newHero => this.logDebug(`Added a new hero with id ${newHero.id}!`)),
      catchError(this.createErrorHandler<Hero>('addHero'))
    );
  }

  public updateHero(hero: Hero): Observable<any> {
    const id: number = hero.id;
    this.logDebug(`Updating hero with id ${id}!`);

    return this.httpClient.put(this.heroEndpoint, hero, this.httpOptions).pipe(
      tap(() => this.logDebug(`Updated hero with id ${id}!`)),
      catchError(this.createErrorHandler<any>('updateHero'))
    );
  }

  public deleteHero(hero: Hero | number): Observable<any> {
    const id: number = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroEndpoint}/${id}`;
    this.logDebug(`Deleting hero with id ${id}!`);

    return this.httpClient.delete<Hero>(url, this.httpOptions).pipe(
      tap(() => this.logDebug(`Deleted hero with id=${id}`)),
      catchError(this.createErrorHandler('deleteHero'))
    );
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();

    if (!term) {
      return of([]);
    }

    const url = `${this.heroEndpoint}/?name=${term}`;
    this.logDebug(`Finding heroes matching "${term}"!`);

    return this.httpClient.get<Hero[]>(url).pipe(
      tap(heroes => heroes.length
        ? this.logDebug(`Found ${heroes.length} heroes matching "${term}"!`)
        : this.logDebug(`Found no heroes matching "${term}"!`)),
      catchError(this.createErrorHandler<Hero[]>('searchHeroes'))
    );
  }

  private logDebug(message: string): void {
    this.logger.debug(`[HeroService] ${message}`);
  }

  private createErrorHandler<T>(operation: string, defaultResult?: T): (err: Error) => Observable<T> {
    return (err: Error): Observable<T> => {
      this.logger.error(`[HeroService] ${operation} failed: ${err}!`);
      return of(defaultResult);
    };
  }

}
