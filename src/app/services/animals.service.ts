import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CatsBreedsLimitPage, ICatBreed } from '../interface/catbreed';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  private articlesByCategoryAndPage: CatsBreedsLimitPage = {};
  
  private apiUrl: string = '';
  private apiKey: string = '';

  private category: string = 'cats';
  private limite: number = 10;

  constructor(
    private http: HttpClient

  ) {

    this.getBasic();
   }

  getBasic() {
    this.apiKey = environment.apiKey;
    this.apiUrl = environment.apiUrl;
  }


  private executeQuery<T>( endpoint: string ) {
    return this.http.get<T>(`${ this.apiUrl }${ endpoint }`, {
      headers: { 
        'x-api-key': this.apiKey,      
      }
    })
  }


  getTopCatsBreed(): Observable<ICatBreed[]> {
    return this.getCatBreeds();
  }

  getCatBreedsScroll(more: boolean = false) : Observable<ICatBreed[]> {

    if(more) {
      return this.getCatBreeds();
    }

    return this.getCatBreeds();
  }


  searchCats( term: string ): Observable<ICatBreed[]> {    
    const page = this.articlesByCategoryAndPage[this.category]?.page + 1 || 0;

    return this.executeQuery<ICatBreed[]>(`/v1/breeds/search?q=${ term }`)
    .pipe(
      map( (cats) => {
        if ( cats.length === 0 ) return this.articlesByCategoryAndPage[this.category].cats;

        if (!this.articlesByCategoryAndPage[this.category]) {
          this.articlesByCategoryAndPage[this.category] = { page: 0, cats: [] };
        }

        this.articlesByCategoryAndPage[this.category] = {
          page: page,
          cats: [ ...cats ]
        }

        return this.articlesByCategoryAndPage[this.category].cats;
      })
    )
  }


  getDatailCat( id: string): Observable<ICatBreed> {
    return this.executeQuery<ICatBreed>(`/v1/breeds/${id}`);
  }

  getCatBreeds(): Observable<Array<ICatBreed>> {

    const page = this.articlesByCategoryAndPage[this.category]?.page + 1 || 0;

    return this.executeQuery<Array<ICatBreed>>(`/v1/breeds?limit=${ this.limite }&page=${page}`)
    .pipe(
      map( ( cats ) => {

        if ( cats.length === 0 ) return this.articlesByCategoryAndPage[this.category].cats;

        if (!this.articlesByCategoryAndPage[this.category]) {
          this.articlesByCategoryAndPage[this.category] = { page: 0, cats: [] };
        }

        this.articlesByCategoryAndPage[this.category] = {
          page: page,
          cats: [ ...this.articlesByCategoryAndPage[this.category].cats, ...cats ]
        }

        return this.articlesByCategoryAndPage[this.category].cats;
      })
    );
  }
  
  
}
