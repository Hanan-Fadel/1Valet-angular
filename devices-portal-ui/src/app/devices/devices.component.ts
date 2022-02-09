import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from './device.service';
import { Device } from '../models/ui-models/device.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  devices: Device[]=[];
  displayedColumns: string[] = ['DeviceIcon', 'DeviceName', 'symbol'];
  dataSource: MatTableDataSource<Device>= new MatTableDataSource<Device>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString='';



  //we need to inject the devices service into the component to be able to retrieve devices
  constructor(private deviceService: DeviceService) {

   }

  //Fetch the devices from the service
  //Because the getDevices function returns an observable we have to subscribe to the observable
  //to initiate the http calls or nothing will happen
  ngOnInit(): void {
    this.deviceService.getDevices().subscribe(
      (success) => {
        this.devices = success;
        this.dataSource = new MatTableDataSource<Device>(this.devices);

        if(this.matPaginator) {
          this.dataSource.paginator= this.matPaginator;
        }

         if (this.matSort) {
            this.dataSource.sort = this.matSort;
          }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterDevices() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
