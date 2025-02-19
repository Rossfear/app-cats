import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlecatComponent } from './article-cat/articlecat.component';
import { IonicModule } from '@ionic/angular';
import { DetailCatComponent } from './detail-cat/detail-cat.component';



@NgModule({
  declarations: [
    ArticlecatComponent,
    DetailCatComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticlecatComponent,
    DetailCatComponent
  ]
})
export class ComponentsModule { }
