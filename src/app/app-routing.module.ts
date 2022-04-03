import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { WorkComponent } from './components/work/work.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about-me' },
  { path: 'about-me', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'testimonials', component: TestimonialComponent },
  { path: 'works', component: WorkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
