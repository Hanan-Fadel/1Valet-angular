import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailsComponent } from './devices/device-details/device-details.component';

const routes: Routes = [
  {
    path: '', component:DevicesComponent
  },
  {
    path: 'Devices', component:DevicesComponent
  },
  {
    path: 'Devices/:id', component:DeviceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
