import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
mutation RegisterUser($username : String!,$email : String!, $phone :String , $password : String!) {
    registerUser(username : $username, email : $email, phone : $phone, password : $password) {
        token
        refreshToken 
        user {
             _id
            username
            email
            phone
            role
        }
    }
}
`;

export const SEND_OTP = gql`
mutation SendOtp($phone : String!) {
sendOtp(phone: $phone) {
    message
    }
}
`;

export const SEND_OTP_FOR_LOGIN = gql`
    mutation SendOtpForLogin($phone : String!) {
        sendOtpForLogin(phone : $phone) {
            message
        }
    }
`;
