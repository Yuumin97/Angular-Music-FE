import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Category} from '../../../model/Category';
import {CategoryService} from '../../../service/category-service/category.service';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song-service/song.service';
import {SingerService} from '../../../service/singer-service/singer.service';
import {Singer} from '../../../model/Singer';
import {Band} from '../../../model/Band';
import {BandService} from '../../../service/band-service/band.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})

export class CreateSongComponent implements OnInit {
  //TEST SINGER
  singers = new FormControl();
  bands = new FormControl();

  form: any = {}
  categoryControl = new FormControl('', Validators.required);
  // selectFormControl = new FormControl('', Validators.required);
  listCTGS: Category[] = [];
  listSinger: Singer[] = [];
  listBand: Band[] = [];
  song: Song;
  success: any = {
    message: "yes"
  }
  error1: any = {
    message: "no_avatar"
  }
  error3: any = {
    message: "no_category"
  }
  error2: any = {
    message: "no_mp3Url"
  }
  error4: any = {
    message: "no_singer_band"
  }
  status = 'Please fill in the form to create Song'
  constructor(private categoryService: CategoryService,
              private songService: SongService,
              private singerService: SingerService,
              private bandService: BandService) { }

  ngOnInit(): void {
    this.singerService.listSinger().subscribe(listSinger=>{
      this.listSinger = listSinger;
      console.log('listSinger =>', this.listSinger);
    })
     this.categoryService.getListCategory().subscribe(listCTG =>{
       this.listCTGS = listCTG;
       console.log('listCTG -> ',this.listCTGS);
     })

    this.bandService.getListBand().subscribe(listBand =>{
      this.listBand = listBand;
      console.log('listBand', this.listBand);
    })
  }
  onSubmit(){
    console.log('this.form.bandList == ', this.form.bandList);
    this.song = new Song(
      this.form.nameSong,
      this.form.lyrics,
      this.form.avatarSong,
      this.form.mp3Url,
      this.form.category,
      this.form.singerList,
      this.form.bandList
    )
    console.log('this.song => ', this.song);
    this.songService.createSong(this.song).subscribe(data =>{
      console.log('data === ',data);
      if(JSON.stringify(data)==JSON.stringify(this.error1)){
        this.status = 'Please upload Avatar';
      }
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'Please upload File Mp3';
      }
      if(JSON.stringify(data)==JSON.stringify(this.error3)){
        this.status = 'Please select Category';
      }
      if(JSON.stringify(data)==JSON.stringify(this.error4)){
        this.status = 'Please select Singer or Band';
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Create Song success!'
      }

    })
  }
  onChangeAvatar($event){
    this.form.avatarSong = $event;
    console.log('this.form.avatarSong === ', this.form.avatarSong);
  }
  onChangeFileMp3($event){
    this.form.mp3Url = $event;
  }
}

