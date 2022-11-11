import { atom } from "recoil";

export type DataId = string;

export type DataPoint = {
  name: string;
  truckRobot: number;
  muppetMan: number;
  pickupDelivery: number;
};

export const dataState = atom<Record<DataId, DataPoint>>({
  key: "data",
  default: {},
});
