import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-picture-foro',
  templateUrl: './picture-foro.component.html',
  styleUrls: ['./picture-foro.component.scss'],
})
export class PictureForoComponent implements OnInit {
  fileToUpload = null;
  imageUrl = null;
  file: any;
  id: number;
  im= false;

  handleFileInput(file: FileList) {
    
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload);
    this.im = true;
    var reader = new FileReader();
    reader.onloadend = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log(reader.result);
  }

  constructor(
    private spinner: NgxSpinnerService,
    private wave: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  onUpload() {
    if (this.fileToUpload != null) {
      this.spinner.show();
      this.wave
        .uploadPictureForo(this.fileToUpload, this.id)
        .subscribe((res) => {
          if (res) {
            console.log(res);
            this.router.navigate([`/foro/${this.id}`]);
            this.spinner.hide();
          }
        });
    } else {
      alert('¡Primero debes cargar una imagen!, busca en la nube');
    }
  }

  aja() {
    this.router.navigate([`/foro/${this.id}`]);
  }
}
