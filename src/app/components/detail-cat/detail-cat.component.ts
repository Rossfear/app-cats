import { Component, Input, OnInit } from '@angular/core';
import { ICatBreed } from 'src/app/interface/catbreed';

@Component({
  selector: 'app-detail-cat',
  templateUrl: './detail-cat.component.html',
  styleUrls: ['./detail-cat.component.scss'],
  standalone: false
})
export class DetailCatComponent  implements OnInit {

  @Input() cat: ICatBreed = {} as ICatBreed;
  

  constructor() { }

  ngOnInit() {
    console.log(this.cat, 'detalle componente');
  }

}
