export interface FormData {
  quarters: string;
  houseType: string;
}

export type HouseTypesResponse = {
  label: string;
  value: string;
}[];

export type QuartersListResponse = string[];