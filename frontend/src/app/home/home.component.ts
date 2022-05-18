import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imgSelected= false;
  spinner = false;
  imageBlob: SafeUrl;

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) { }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

  ngOnInit(): void {}

  
 onSubmit(photoFile: any) { 
  this.spinner = true;

   this.dataService.sendForm(photoFile.files[0]).subscribe(
    (res: object) => {
      this.imageBlob =  this.sanitizeImageUrl(`data:image/png;base64, ${res["image_data"]}`);
      this.spinner = false;
    }
    );
  }
}
