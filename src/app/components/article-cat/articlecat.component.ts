import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICatBreed } from 'src/app/interface/catbreed';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-articlecat',
  templateUrl: './articlecat.component.html',
  styleUrls: ['./articlecat.component.scss'],
  standalone: false
})
export class ArticlecatComponent  implements OnInit {

  //@Input() cat = {} as ICatBreed;
  @Input() cat: ICatBreed[] = [];

  constructor(
    private router: Router,
    private storage: StorageService,

  ) {

  }

  ngOnInit() {
    console.log(this.cat, 'article cat');
  }


  async navigateToDetails(cat: ICatBreed) {
    await this.storage.saveCat(cat);
    this.router.navigate(['/details/'+cat.id]);
  }

}
