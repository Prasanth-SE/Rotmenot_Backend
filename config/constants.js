'use strict';

const constants = Object.freeze({

    error: {
        auth: {
            emailTaken: 'Email has already been taken',
            userAlreadyRegisteredEmail: 'Email is already registered',
            verificationFailed: 'Verification failed',
            invalidToken: 'Invalid Token',
            invalidCredentials: 'Invalid user credentials',
            invalidUser: 'Invalid user',
            userNotFound: 'User not found',
            userNotVerified: 'User not verified',
            userProfileNotFound: 'User Profile not found',
            deckNotFound: 'Deck Not Found',
            unauthorized: 'Unauthorized',
            noAuthToken: 'No auth token',
            profileNotFound: 'Profile not found',
            invalidAuthToken: 'Invalid auth token',
            deckServiceCheck: 'All ready DeckService Exit',
            passwordNotMatch: 'Confirm Password does not match.',
            passwordWrong: 'Current Password is wrong.',
            invalidPasswordToken: 'This link is invalidated. Please use the link from the most recent reset password email.'
        },
        user: {
            userNotFound: 'User not found',
            invalidUser: 'Invalid user'
        },
        bodyEmpty: 'Request body empty or malformed',
        accessDenied: 'Access Denied!'
    },
    userRole: {
        user: 'user',
        admin: 'admin'
    }
    
});

module.exports = constants;