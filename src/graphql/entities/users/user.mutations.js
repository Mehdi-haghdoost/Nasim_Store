import { gql } from '@apollo/client';

export const REGISTER_USER = `gql
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
`