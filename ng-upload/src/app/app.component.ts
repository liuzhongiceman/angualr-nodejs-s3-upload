import { Component } from '@angular/core';
import { ImageUploadService } from './image-upload.service';
import { resolve } from 'url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imageObj: File;
  audioObj: File;
  imageUrl: string;
  audioUrl: string;
  data: any = {};

  constructor(private imageUploadService: ImageUploadService) {}

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
  }
  
  onAudioPicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.audioObj = FILE;
  }

  onUpload() {
      this.uploadFiles();
      const title = "hi there";
      this.data.title = title;
      console.log('data', this.data);
  }
  
  uploadFiles() {
    this.onImageUpload()
      .then(data => {
        this.imageUrl = data;
        this.data.image = data
      });
    this.onAudioUpload()
      .then(data => {
        this.audioUrl = data;
        this.data.audio = data
        console.log('audio url data', this.data.audio);
      });  }
  
  onImageUpload(): Promise<string> {
    const imageForm = new FormData();
    imageForm.append('file', this.imageObj);
    return new Promise((resolve, reject) => {
      this.imageUploadService.imageUpload(imageForm).subscribe(res => {
        resolve(res['file']);
      });
    })
  }
  
  onAudioUpload(): Promise<string> {
    const audioForm = new FormData();
    audioForm.append('file', this.audioObj);
    return new Promise((resolve, reject) => {
      this.imageUploadService.imageUpload(audioForm).subscribe(res => {
        resolve(res['file']);
      });
    })
  }
}
