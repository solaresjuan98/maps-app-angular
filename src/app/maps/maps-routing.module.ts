import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'fullscreen', component: FullScreenComponent },
      { path: 'zoom-range', component: ZoomRangeComponent },
      { path: 'bookmarks', component: BookmarksComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: '**', redirectTo: 'fullscreen' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
