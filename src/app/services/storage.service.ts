import { Injectable } from '@angular/core';
import { ICatBreed } from '../interface/catbreed';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  catDetail: ICatBreed[] = [];

  constructor(
    private storage: Storage,
  ) { 
    this.init();
  }


  async init() {
    if (!this._storage) {
      const storage = await this.storage.create();
      this._storage = storage;
    }
  }

  async saveCat( cat: ICatBreed ) {  
    await this.storage.set('catDetail', cat );
  }


  async getCatDetail(): Promise<ICatBreed> {
  const detail = await this.storage.get('catDetail');
  return detail;
  }


  async clearStorage() {
    await this.storage.clear();
  }


}
