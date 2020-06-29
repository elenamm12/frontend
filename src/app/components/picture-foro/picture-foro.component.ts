import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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

  handleFileInput(file: FileList) {
    console.log(file);
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload);

    var reader = new FileReader();
    reader.onloadend = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log(reader.result);
  }

  constructor(
    private wave: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  onUpload() {
    this.wave.uploadPictureForo(this.fileToUpload, this.id).subscribe((res) => {
      console.log(res);
      this.router.navigate([`/foro/${this.id}`]);
      
    })
   }

   aja(){
    this.router.navigate([`/foro/${this.id}`]);
   }

}
