import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
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

  onUpload() {
    if (this.fileToUpload != null) {
      this.wave.uploadPicture(this.fileToUpload).subscribe(res => {
        console.log(res)
      })
    } else {
      alert('¡Primero debes cargar una imagen!, busca en la nube');
    }
  }

  constructor(private wave:WaveServiceService) { }

  ngOnInit(): void {
  }

}
