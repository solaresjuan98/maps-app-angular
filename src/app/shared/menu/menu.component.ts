import { Component } from '@angular/core';

interface menuItem {
  route: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class MenuComponent {

  menuItems: menuItem[] = [
    {
      route: '/maps/fullscreen',
      name: 'Fullscreen'
    },
    {
      route: '/maps/bookmarks',
      name: 'Bookmarks'
    },
    {
      route: '/maps/zoom-range',
      name: 'Zoom Range'
    },
    {
      route: '/maps/properties',
      name: 'Properties'
    }
  ]

}
