export type CreateStudentRequestType = {
    user_id: string,
    uni_id: string,
    school_id: string,
    full_name: string
}
export type CreateHubRequestType = {
    uni_id: string,
    user_id: string,
    driver_fullname: string,
    driver_gender: string,
    driver_vehicle_type: string,
    driver_vehicle_name: string,
    driver_vehicle_color: string,
    driver_vehicle_capacity: string
}

export type CreateRideRequestType = {
    where_from: string,
    where_to: string
}

export type ReadLocationsRequestType = {
    id: number,
}


export const ReadLocationsRequest:ReadLocationsRequestType = {
    id: 0,
}

export const CreateStudentRequest:CreateStudentRequestType = {
    user_id: "",
    uni_id: "",
    school_id: "",
    full_name: ""
}

export const CreateHubRequest:CreateHubRequestType = {
    uni_id: "",
    user_id: "",
    driver_fullname: "",
    driver_gender: "",
    driver_vehicle_type: "",
    driver_vehicle_name: "",
    driver_vehicle_color: "",
    driver_vehicle_capacity: ""
}

export const CreateRideRequest:CreateRideRequestType = {
    where_from: "",
    where_to: ""
}