import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICatBreed } from 'src/app/interface/catbreed';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: false,
})
export class DetailsPage implements OnInit, OnDestroy {

  routerSubdcription: Subscription = new Subscription();
  cat: ICatBreed = {} as ICatBreed;


  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: StorageService

  ) { 
    this.getParam();

  }

  ngOnInit() {
    this.getDetail();

  }

  async getDetail() {
    const valor =  await this.storage.getCatDetail();
    this.cat = valor;
    console.log(this.cat, 'detalle page cat');
  }

  ngOnDestroy(): void {
    if(this.routerSubdcription) {
      this.routerSubdcription.unsubscribe();
    }
  }


  getParam() {
    this.routerSubdcription = this.activatedRoute.params.subscribe( (params: any) => { 
      console.log(params.id);
    });
  }






}
