import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RickmortyService {
  private BUrl = 'https://rickandmortyapi.com/';
  private ApiUrl = 'api/character/';
  private ApiUrlUbicacionGeneral = 'api/location/';
  private ApiUrlEpisodioGeneral = 'api/episode/';
  private ApiUrlNombre = 'api/character/?name=';
  private ApiUrlUbicacion = 'api/location/?name=';
  private ApiUrlEpisodio = 'api/episode/?episode=';
  constructor(private http: HttpClient) { }

  getListPersonajesGeneral(): Observable<any>{
    return this.http.get(this.BUrl + this.ApiUrl);
  }
  getListUbicacionGeneral(): Observable<any>{
    return this.http.get(this.BUrl + this.ApiUrlUbicacionGeneral);
  }
  getListEpisodioGeneral(): Observable<any>{
    return this.http.get(this.BUrl + this.ApiUrlEpisodioGeneral);
  }
  BuscarPersonajexNombre(nombre: string): Observable<any>{
    return this.http.get(this.BUrl + this.ApiUrlNombre + nombre);
  }
  BuscarPersonajexUbicacion(ubicacion: string): Observable<any>{
    return this.http.get(this.BUrl + this.ApiUrlUbicacion + ubicacion);
  }
  BuscarPersonajexEpisodio(episodio: string): Observable<any>{
    return this.http.get(this.BUrl + this.ApiUrlEpisodio + episodio);
  }
  BuscarEpisodioPersonaje(urlepisodio: string): Observable<any>{
    return this.http.get(urlepisodio);
  }
  BuscarPersonajeEpisodioDetalle(urlepisodiodetalle: string): Observable<any>{
    return this.http.get(urlepisodiodetalle);
  }
  BuscarPersonajeMultiple(ids: string): Observable<any>{
    return this.http.get(this.BUrl + this.ApiUrl + ids);
  }
  BuscarUbicacionMultiple(ids: string): Observable<any>{
    return this.http.get(this.BUrl + this.ApiUrlUbicacionGeneral + ids);
  }
  BuscarEpisodiosMultiple(ids: string): Observable<any>{
    return this.http.get(this.BUrl + this.ApiUrlEpisodioGeneral + ids);
  }
}
