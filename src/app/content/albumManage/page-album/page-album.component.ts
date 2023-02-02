import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song-service/song.service';
import {PageEvent} from '@angular/material/paginator';
import {Album} from '../../../model/Album';
import {AlbumService} from '../../../service/album-service/album.service';

@Component({
  selector: 'app-page-album',
  templateUrl: './page-album.component.html',
  styleUrls: ['./page-album.component.scss']
})
export class PageAlbumComponent implements OnInit {

  totalElements: number = 0;
  album: Album[];
  // loading: boolean;
  searchText;
  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getListResquest({page: 0, size: 90})

  }
  private getListResquest(nextPage) {
    console.log('Goi ham page Album');
    // this.loading = true;
    this.albumService.pageAlbum(nextPage)
      .subscribe(data => {
          console.log('album tren == ', data);
          this.album = data['content'];
          console.log('album duoi == ', data);
          this.totalElements = data['totalElements'];
          // this.loading = false;
        }
        // , error => {
        //   // this.loading = false;
        // }
      );
  }
  nextPage(event: PageEvent) {
    const nextPage = {};
    nextPage['page'] = event.pageIndex.toString();
    nextPage['size'] = event.pageSize.toString();
    this.getListResquest(nextPage);
  }

}
