import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Album} from '../../model/Album';
import {Observable} from 'rxjs';
import {SongDetail} from '../../model/SongDetail';
import {AlbumDetail} from '../../model/AlbumDetail';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
private API_ALBUM = environment.API_LOCAL +"album"
  constructor(private http: HttpClient) {
  }
  createAlbum(album: Album): Observable<Album>{
  return this.http.post<Album>(this.API_ALBUM,album);
  }
  pageAlbum(nextPage){
  const params =nextPage;
  return this.http.get(this.API_ALBUM,params)
  }
  detailAlbum(id: number): Observable<AlbumDetail>{
    return this.http.get<AlbumDetail>(this.API_ALBUM+'/'+id)
  }
}
