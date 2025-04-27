  export type businessLookupRequestType = {
    amount: string | null,
    business_identification_name: string | null,
    remarks:string | null
  }

  export type initialisePaymentType = {
    amount: string | null,
    business_identification_name: string | null,
    remarks: string | null
  }

  export const businessLookupRequest:businessLookupRequestType = {
    amount:  null,
    business_identification_name: null,
    remarks: null

  }

  export const initialisePayment:initialisePaymentType = {
    amount: null,
    business_identification_name: null,
    remarks: null
  }


