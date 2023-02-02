import {Song} from './Song';

export class Album {
  public songs : Song;
  public name: string;


  constructor(songs: Song,name: string) {
    this.songs = songs;
    this.name = name;
  }
}
