import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service'

@Component({
  selector: 'app-picture-foro',
  templateUrl: './picture-foro.component.html',
  styleUrls: ['./picture-foro.component.scss']
})
export class PictureForoComponent implements OnInit {

  fileToUpload = null;
  imageUrl=null;
  file:any;

  handleFileInput(file: FileList) {
    console.log(file);
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload)

    var reader = new FileReader();
    reader.onloadend = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log(reader.result);
  }

  onUpload(){
   this.wave.uploadPicture(this.fileToUpload).subscribe(res=>{
     console.log(res)
   })
  }

  constructor(private wave:WaveServiceService) { }

  ngOnInit(): void {
  }

}
