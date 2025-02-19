import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSearchbar } from '@ionic/angular';
import { ICatBreed } from 'src/app/interface/catbreed';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll!: IonInfiniteScroll;
  @ViewChild(IonSearchbar, {static: true}) searchbar!: IonSearchbar;
  
  public cats: ICatBreed[] = [];
  public searchTerm: string = '' ;
  loading: boolean = true;

  constructor(
    private catsService: AnimalsService,

  ) {}

  ngOnInit(): void {
    this.getDefaultData();
  }
  
  getDefaultData() {
    this.catsService.getTopCatsBreed().subscribe( cats => {
      this.cats.push(...cats)
      this.loading = false;
    });
  }

  loadData() {
    this.catsService.getCatBreedsScroll(true).subscribe( cats => {
      this.cats = cats;
      this.infiniteScroll.complete();
    })    
  }


  filterCats() {
    this.searchTerm = this.searchbar.value ?? '';

    if(!this.searchTerm) return this.getDefaultData();
    
    this.catsService.searchCats(this.searchTerm).subscribe( cats => this.cats = cats);
  }

}
