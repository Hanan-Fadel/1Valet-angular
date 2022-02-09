import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/app/models/ui-models/device.model';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css'],
   template: `
	<div class="Paper md-whiteframe-z1" ng-transclude>
  </div>
	`
})

export class DeviceDetailsComponent implements OnInit {
  imageUrl: string | undefined | null;
  deviceId: string | null | undefined;
  selectedDevice!: Device;
  devices: Device[] = [];
  relatedDevices: Device[] = [];

  displayedColumns: string[] = ['DeviceIcon', 'DeviceName', 'symbol'];
  dataSource: MatTableDataSource<Device>= new MatTableDataSource<Device>();
  dataSourceDevices: MatTableDataSource<Device>= new MatTableDataSource<Device>();
  filterString='';

  constructor(private readonly deviceService: DeviceService,
    private readonly route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params) => {
        this.deviceId = params.get('id');

        if (this.deviceId) {
          this.deviceService.getDevice(this.deviceId)
          .subscribe(
            (success) => {
                   this.selectedDevice = success;
                   this.imageUrl =  `assets/${this.selectedDevice.deviceUsage}`;

            },
            error => {
                console.log(error);
            }
          )
        }
      });


     this.deviceService.getDevices().subscribe(
      (success) => {
        this.devices = success;

      this.devices.forEach(relatedDevice => {
        if (relatedDevice.type.name === this.selectedDevice.type.name) {
        this.relatedDevices.push(relatedDevice);

        }});

        this.dataSourceDevices = new MatTableDataSource<Device>(this.relatedDevices);
        console.log("Devices: ", this.dataSourceDevices);
      },
      (error) => {
        console.log(error);
      }
    );


  }
    filterDevices() {
    this.dataSourceDevices.filter = this.filterString.trim().toLowerCase();
  }

}

