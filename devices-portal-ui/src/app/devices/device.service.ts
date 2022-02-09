import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/api-models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private baseApiUrl = 'https://localhost:44385';

  //To be able to make angular http calls we need a componented called HttpClient
  constructor(private httpClient: HttpClient) { }

  getDevices() : Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.baseApiUrl + '/Devices');
  }

  getDevice(deviceId: string) : Observable<Device> {
    return this.httpClient.get<Device>(this.baseApiUrl + '/Devices/' + deviceId);
  }

}
