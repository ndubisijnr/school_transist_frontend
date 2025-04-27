export type ReadByStoreFrontInventoryStoreFrontIdType={
    storefrontId:string | null,
    pageNumber: string | null,
    pageRows: string | null,
    productId: string | null,
    productCategoryId: string | null,
    productName: string | null,
    minProductPrice: string | null,
    maxProductPrice: string | null,
    productStatus: string | null,
    minInventoryCount: string | null,
    maxInventoryCount: string| null
  }

  export type ReadByStoreFrontByUserLocationRequestType={
    
      userLatitude:number | undefined,
      userLongitude: number | undefined,
      pageNumber: number | null,
      pageRows:number | null
    
  }


 export const ReadByStoreFrontInventoryStoreFrontId:ReadByStoreFrontInventoryStoreFrontIdType = {
        storefrontId: null,
        pageNumber: null,
        pageRows: null,
        productId: null,
        productCategoryId: null,
        productName: null,
        minProductPrice: null,
        maxProductPrice: null,
        productStatus: null,
        minInventoryCount: null,
        maxInventoryCount: null
  }


  export const ReadByStoreFrontByUserLocationRequest:ReadByStoreFrontByUserLocationRequestType ={
    
    userLatitude:undefined,
    userLongitude: undefined,
    pageNumber: null,
    pageRows:null
  
}
