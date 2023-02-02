import {Component, OnInit, ViewChild} from '@angular/core';
import {SongDetail} from '../../../model/SongDetail';
import {Track} from '../../../../../projects/ngx-audio-player/src/lib/model/track.model';
import {LikeSong} from '../../../model/LikeSong';
import {ActivatedRoute} from '@angular/router';
import {SongService} from '../../../service/song-service/song.service';
import {AudioPlayerComponent} from '../../../../../projects/ngx-audio-player/src/lib/component/ngx-audio-player/ngx-audio-player.component';
import {AlbumDetail} from '../../../model/AlbumDetail';
import {AlbumService} from '../../../service/album-service/album.service';
import {Song} from '../../../model/Song';

@Component({
  selector: 'app-detail-album',
  templateUrl: './detail-album.component.html',
  styleUrls: ['./detail-album.component.scss']
})
export class DetailAlbumComponent implements OnInit {

  albumDetail: AlbumDetail;
  multiple: Track[] = [
  ];
  newColor = false;
  id_album: number;
  song : Song;


  constructor(private atvRoute: ActivatedRoute,
              private albumService: AlbumService) {
  }

  ngOnInit(): void {
    this.atvRoute.paramMap.subscribe(albumId => {
      const id = +albumId.get('id');
      this.id_album = id;
      // @ts-ignore
      this.albumService.detailAlbum(id).subscribe(albumId => {
        this.albumDetail = albumId;
        // this.likeSong.song = this.songDetail.song;
        // this.likeSong.songId.song;
        console.log('albumId = ', this.albumDetail.album.songs);
        // @ts-ignore
        for (const song of this.albumDetail.album.songs) {
          console.log('cái gì ở đây ', song);
          let singer: any=
            {
              title: song.nameSong,
              link: song.mp3Url,
            };

          // @ts-ignore
          this.multiple.push(singer)
        }
      });
    });

  }

  @ViewChild('player', {static: false})
  advancedPlayer: AudioPlayerComponent;


  // Multiple
  msaapPlaylist: Track[] = this.multiple;

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  pageSizeOptions = [10];

  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;

  msaapTableHeader = 'My Playlist';
  msaapTitleHeader = 'My Title';
  msaapArtistHeader = 'My Artist';
  msaapDurationHeader = 'My Duration';


  // Start: Required for demo purpose
  currentTrack: Track = null;
  currentTime: any;

  // appendTracksToPlaylistDisable = false;
  // counter = 1;

  onEnded(event) {
    console.log(event);
    // your logic which needs to
    // be triggered once the
    // track ends goes here.

    // example
    this.currentTrack = null;
  }

  logCurrentTrack() {
    this.advancedPlayer.audioPlayerService.getCurrentTrack().subscribe(track => {
      this.currentTrack = track;
    });
  }

  logCurrentTime() {
    this.advancedPlayer.audioPlayerService.getCurrentTime().subscribe(time => {
      this.currentTime = time;
    });
  }

  consoleLogCurrentData() {
    this.logCurrentTrack();
    this.logCurrentTime();
    // Make sure to subscribe (by calling above methods)
    // before getting the data
    console.log(this.currentTrack.title + ' : ' + this.currentTime);
  }


  // toggleColor() {
  //   console.log('click');
  //   this.newColor = !this.newColor;
  //   console.log('song duoi ', this.albumDetail.song);
  //   this.likeSong = new LikeSong(
  //     this.songDetail.song
  //   );
  //   console.log('like song -> ', this.likeSong);
  //   this.songService.likeSong(this.id_song).subscribe(data => {
  //     console.log('data like --> ', data);
  //     this.songService.detailSong(this.id_song).subscribe(songId => {
  //       this.songDetail = songId;
  //       // this.likeSong.song = this.songDetail.song;
  //       // this.likeSong.songId.song;
  //       if (this.songDetail.checkLikeSong) {
  //         this.newColor = true;
  //       }
  //       console.log('songId = ', this.songDetail.song);
  //       // this.singerTrack = [
  //       //   {
  //       //     title: this.songDetail.song.lyrics,
  //       //     link: this.songDetail.song.mp3Url,
  //       //     duration: 227,
  //       //   }
  //       // ];
  //     });
  //   });
  // }


}
