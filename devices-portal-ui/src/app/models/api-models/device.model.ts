import {Type} from "./type.model"

export interface Device {
  id: string;
  deviceName: string;
  deviceStatus: string;
  deviceUsage: string;
  deviceTemp: string;
  type: Type;
}
