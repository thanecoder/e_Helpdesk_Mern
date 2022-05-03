const constants = {
    SUCCESS:"Success",
    FAIL:"Fail",
    DB_CONNECTION_SUCCESS:"DB Connection Established Successfully",
    DB_CONNECTION_FAILED:"Error occurred while connecting to DB",
    REGISTRATION_SUCCESSFUL:"User Registration Successful",
    LOGIN_SUCCESSFUL:"User Logged In",
    INVALID_CREDENTIALS:"Invalid Credentials",
    UNAUTHORIZED:"Unauthorized Access",
    TICKET_FETCH_SUCCESS:"Ticket Fetched Successfully",
    TICKET_FETCH_FAILED:"Ticket Fetching Failed",
    TICKET_CREATE_SUCCESS:"Ticket Created Successfully",
    TICKET_CREATE_FAILED:"Ticket Creation Failed",
    TICKET_UPDATE_SUCCESS:"Ticket Updated Successfully",
    TICKET_UPDATE_FAILED:"Ticket Updating Failed",
    TICKET_DELETE_SUCCESS:"Ticket Deleted Successfully",
    TICKET_DELETE_FAILED:"Ticket Deletion Failed",
    NOT_FOUND_TICKET:"Ticket Not Found",
    USER_FETCH_SUCCESS:"User Fetched Successfully",
    USER_FETCH_FAILED:"User Fetching Failed",
    USER_CREATE_SUCCESS:"User Created Successfully",
    USER_CREATE_FAILED:"User Creation Failed",
    USER_UPDATE_SUCCESS:"User Updated Successfully",
    USER_UPDATE_FAILED:"User Updating Failed",
    NOT_FOUND_USER:"User Not Found",
    INCOMPLETE_TICKET_DETAILS:"Please add Product and Description",
    TICKET_STATUS:{
        NEW:'new',
        CLOSED:'closed',
        IN_PROGRESS:'in_progress'
    }
}

module.exports = {
    constants
}