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

export const CONFIRM_OTP_AND_REGISTER = gql`
mutation ConfirmOtpAndRegister($phone : String!, $code : String!) {
  confirmOtpAndRegister(phone : $phone , code : $code) {
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

// export const LOGIN_USER = gql`
// mutation LoginUser($phoneOrEmail : String! , $password : String!) {
//   loginUser(phoneOrEmail : $phoneOrEmail , password : $password) {
//     token
//     refreshToken
//     user {
//       _id
//       username
//       email
//       phone
//       role
//       addresses {
//         _id
//         fullAddress
//         city
//         province
//         isDefault
//       }
//       wishlist
//       cart
//       orderHistory
//       orders
//       discountCoupons
//       dateOfBirth
//       createdAt
//       updatedAt
//     }
//   }
// }
// `;

export const LOGIN_USER = gql`
mutation LoginUser($phoneOrEmail : String! , $password : String!) {
  loginUser(phoneOrEmail : $phoneOrEmail , password : $password) {
    token
    refreshToken
    user {
      _id
      username
      email
      phone
      role
      addresses {
        _id
        fullAddress
        city
        province
        isDefault
      }
      wishlist
      cart {
        totalPrice
        totalDiscount
        finalPrice
        items {
          _id
          quantity
          color
          size
          addedAt
          product {
            _id
            title
            price
            discountedPrice
            hasDiscount
            image
            brandIcon
            rating
            stock
             category {
    _id
    name
    icon
  }
            customerSatisfaction
          }
          selectedSeller {
            _id
            name
            address
            contactNumber
            logo
            rating
            performance
            satisfaction
            performanceStatus
          }
        }
      }
      orderHistory
      orders
      discountCoupons
      dateOfBirth
      createdAt
      updatedAt
    }
  }
}
`;




// export const VERIFY_OTP_AND_LOGIN = gql`
// mutation VerifyOtpAndLogin($phone : String!, $code : String !) {
//   verifyOtpAndLogin(phone : $phone , code : $code) {
//     token
//     refreshToken
//     user {
//       _id
//       username
//       email
//       phone
//       role
//       addresses {
//         _id
//         fullAddress
//         city
//         province
//         isDefault
//       }
//       wishlist
//       cart
//       orderHistory
//       orders
//       discountCoupons
//       dateOfBirth
//       createdAt
//       updatedAt
//     }
//   }
// }
// `;

export const VERIFY_OTP_AND_LOGIN = gql`
mutation VerifyOtpAndLogin($phone : String!, $code : String!) {
  verifyOtpAndLogin(phone : $phone , code : $code) {
    token
    refreshToken
    user {
      _id
      username
      email
      phone
      role
      addresses {
        _id
        fullAddress
        city
        province
        isDefault
      }
      wishlist
      cart {
        totalPrice
        totalDiscount
        finalPrice
        items {
          _id
          quantity
          color
          size
          addedAt
          product {
            _id
            title
            price
            discountedPrice
            hasDiscount
            image
            brandIcon
            rating
            stock
             category {
    _id
    name
    icon
  }
            customerSatisfaction
          }
          selectedSeller {
            _id
            name
            address
            contactNumber
            logo
            rating
            performance
            satisfaction
            performanceStatus
          }
        }
      }
      orderHistory
      orders
      discountCoupons
      dateOfBirth
      createdAt
      updatedAt
    }
  }
}
`;




export const REFRESH_TOKEN = gql`
mutation RefreshToken {
  refreshTokenMutation {
    token
    refreshToken
    user {
      _id
      username
      email
      phone
      role
      nationalId
      postalCode
      addresses {
        _id
        fullAddress
        city
        province
        isDefault
      }
      comments {
        _id
      }
      wishlist
      orders
      createdAt
      updatedAt
    }
  }
}
`;

export const UPDATE_USER_PROFILE = gql`
mutation UpdateUserProfile($input: UserProfileInput!) {
  updateUserProfile(input: $input) {
    _id
    username
    email
    phone
    role
    nationalId
    postalCode
    bio
    addresses {
      _id
      fullAddress
      city
      province
      isDefault
    }
    dateOfBirth
    createdAt
    updatedAt
  }
}
`;

export const LOGOUT = gql`
mutation Logout {
  logout
}
`;
