
//names must match those used in the db

export type TNameInformation =
'sku' | 'name' | 'lifeStyleImageURLs' | 'imageURLs' | 'stockQty' | 'casePackQty'| 'tradePrice' | 'height' | 'width' | 'length' |'dimensionUnit' | 'gtin' | 'warrantyInfo' | 'materials' | 'careInfo' | 'variants' | 'colorName' | 'weight' | 'weightUnit' | 'tradePrice' | 'map' | 'msrp' | 'currency' | 'category' | 'stockQty' | 'casePackQty' | 'description' | 'clipped' 


export interface IFormInformation { 
    tag: string;
    name: TNameInformation;
    type: string;
  }
  
  export interface IVendorDetails {
    name: string;
    _id: string ;
  }
  
  export interface ICategoryDetails {
    name: string;
    _id: string;
    uid: string
  }


  
  // export interface IProductDetails {
  //   name?: string;
  //   _id?: string;
  //   sku?: number | string;
  //   lifeStyleImageURLs?: any;
  //   imageURLs?: any;
  //   stockQty?: number;
  //   casePackQty?: number | string;
  //   tradePrice?: number;
  //   height?: number;
  //   width?: number;
  //   length?: number;
  //   dimensionUnit?: string;
  //   weight?: number;
  //   weightUnit?: string;
  //   currency?: string;
  //   category?: string;
  //   description?: string;
  //   clipped: boolean;
  //   map?: string;
  //   msrp?: string
  //   gtin?: number | string;
  //   warrantyInfo?: string;
  //   materials?: string;
  //   careInfo?: string;
  //   variants?: string;
  //   colorName?: string; 
  // }