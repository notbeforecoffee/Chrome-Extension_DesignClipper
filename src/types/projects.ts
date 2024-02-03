export interface IProjectDetails {
    title: string;
    _id: string ;
    createdAt: any;
  }

  export interface IUnitDetails {
    name: string;
    uid: string ;
    rooms: string;
  }

  export interface IRoomDetails {
    name: string;
    uid: string ;
    drafts: any;
  }

  export interface IDraftDetails {
    name: string;
    _id: string ;
    canvases: string;
    
  }




  
  interface IFulhausCategory {
    _id: string;
    name: string;
    name_FR: string;
  }

  interface IVendor {
    _id: string;
    name: string;
    region: string;
  }

  export interface IProduct {
    _id: string;
    fulhausCategory: IFulhausCategory;
    fulhausColorName: string;
    fulhausDescription: string;
    fulhausMaterial: string;
    fulhausProductName: string;
    height: number;
    length: number;
    imageURLs: string[];
    lifeStyleImageURLs: string[];
    link: string;
    material: string;
    orderCurrency: string;
    rentalPrice: number;
    restockDate: string;
    retailPrice: number;
    sku: string;
    stockDate: string;
    stockQty: number;
    tags: string[];
    tradePrice: number;
    updatedAt: string;
    vendor: IVendor;
    weight: number;
    weightUnit: string;
    width: number;
    dimension: string;
    puid?: string
  }


  export type TItemProduct = Pick<
  IProduct,
  | 'fulhausProductName'
  | 'imageURLs'
  | 'retailPrice'
  | 'rentalPrice'
  | 'orderCurrency'
  | 'tradePrice'
> & {
  qty: number
  productID: string
  fulhausCategory: string
}

  export interface ICategory {
    uid: string
    name: string
    categoryID: string
    qty: number
    rentable: boolean
    budget: number //actual budget
    totalBudget: number
    amount: number //budget with tier applied
    totalAmount: number
    rentalPriceY1PerItem: number
    rentalPriceY2PerItem: number
    totalRentalPriceY1: number
    totalRentalPriceY2: number
    products?: TItemProduct[]
    locked?: boolean
  }