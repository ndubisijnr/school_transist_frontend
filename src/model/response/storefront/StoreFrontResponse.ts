export type ReadByStoreFrontInventoryIdResponseType = {
    data: {
      currentPage: 0,
      pageSize: 0,
      productDetails: [
        {
          productCount: 0,
          productCreatedAt: string,
          productDescription: string,
          productId: 0,
          productName: string,
          productPrice: string,
          productProductCategory: {
            productCategoryCreatedAt: string,
            productCategoryDescription: string,
            productCategoryId: 0,
            productCategoryName: string,
            productCategoryStatus: string,
            productCategoryUpdatedAt: string
          },
          productProductCategoryId: 0,
          productProductImage: {
            productImageCreatedAt: string,
            productImageDescription: string,
            productImageId: 0,
            productImageLink: string,
            productImageProductId: 0,
            productImageStatus: string,
            productImageUpdatedAt: string
          },
          productSpecifications: string,
          productStatus: string,
          productUpdatedAt: string
        }
      ],
      storefrontId: 0,
      storefrontInventoryStatus: string,
      storefrontInventoryUpdatedAt: string,
      totalPages: 0,
      totalRecords: 0
    },
    responseCode: string,
    responseMessage: string
  }


export type ReadStoreFrontByUserLocationResponseType = {
  data: [
    {
      storefrontAddress: string,
      storefrontCreatedAt: string,
      storefrontCreatedBy: string,
      storefrontDescription: string,
      storefrontId: 0,
      storefrontLatitude: string,
      storefrontLongitude: string,
      storefrontName: string,
      storefrontStatus: string,
      storefrontUpdatedAt: string,
      storefrontUpdatedBy: string
    }
  ],
  responseCode: string,
  responseMessage: string
}

export type ReadStoreFrontInventoryProductCategoriesType ={
  responseCode: string,
  responseMessage: string,
  data: [
    {
      productCategoryId: string,
      productCategoryName: string,
      productCategoryDescription: string,
      productCategoryImageLink: string,
      productCategoryCreatedAt: string,
      productCategoryUpdatedAt: string,
      productCategoryStatus: string
    }
  ]
}

export const ReadByStoreFrontInventoryIdResponse = {
  data: {
    currentPage: "",
    pageSize: "",
    productDetails: [
      {
        productCount: "",
        productCreatedAt: "",
        productDescription: "",
        productId: "",
        productName: "",
        productPrice: "",
        productProductCategory: {
          productCategoryCreatedAt: "",
          productCategoryDescription: "",
          productCategoryId: "",
          productCategoryName: "",
          productCategoryStatus: "",
          productCategoryUpdatedAt: ""
        },
        productProductCategoryId: "",
        productProductImage: {
          productImageCreatedAt: "",
          productImageDescription: "",
          productImageId: "",
          productImageLink: "",
          productImageProductId: "",
          productImageStatus: "",
          productImageUpdatedAt: ""
        },
        productSpecifications: "",
        productStatus: "",
        productUpdatedAt: ""
      }
    ],
    storefrontId: "",
    storefrontInventoryStatus: "",
    storefrontInventoryUpdatedAt: "",
    totalPages: "",
    totalRecords: ""
  },
  responseCode: "",
  responseMessage: ""
}

export const ReadStoreFrontByUserLocationResponse = {
  data: [
    {
      storefrontAddress: "",
      storefrontCreatedAt: "",
      storefrontCreatedBy: "",
      storefrontDescription: "",
      storefrontId: "",
      storefrontLatitude: "",
      storefrontLongitude: "",
      storefrontName: "",
      storefrontStatus: "",
      storefrontUpdatedAt: "",
      storefrontUpdatedBy: ""
    }
  ],
  responseCode: "",
  responseMessage: ""
}


export const ReadStoreFrontInventoryProductCategories ={
  responseCode: "",
  responseMessage: "",
  data: [
    {
      productCategoryId: "",
      productCategoryName: "",
      productCategoryDescription: "",
      productCategoryImageLink: "",
      productCategoryCreatedAt: "",
      productCategoryUpdatedAt: "",
      productCategoryStatus: ""
    }
  ]
}
