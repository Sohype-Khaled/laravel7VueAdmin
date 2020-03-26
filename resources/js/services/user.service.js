import ApiService from '@/js/services/api.service';
import {TokenService} from '@/js/services/storage.service';

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errorCode = errorCode;
    }
}

const UserService = {
    login: async function (email, password) {
        const requestData = {
            method: 'post',
            url: "/oauth/token",
            data: {
                grant_type: 'password',
                client_id: 2,
                client_secret: 'OiKJFWB4HfJKLZ0vEgJsTJ0m5wwYl8Y7pAYGJ5h0',
                username: email,
                password: password,
                scope: ''
            },
        };

        try {
            const response = await ApiService.customRequest(requestData);

            TokenService.saveToken(response.data.access_token);
            TokenService.saveRefreshToken(response.data.refresh_token);
            ApiService.setHeader();

            ApiService.mount401Interceptor();
            return response.data.access_token;
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },
    refreshToken: async function () {
        const refreshToken = TokenService.getRefreshToken();

        const requestData = {
            method: 'post',
            url: "/o/token/",
            data: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            }
        };

        try {
            const response = await ApiService.customRequest(requestData);

            TokenService.saveToken(response.data.access_token);
            TokenService.saveRefreshToken(response.data.refresh_token);
            // Update the header in ApiService
            ApiService.setHeader();

            return response.data.access_token;
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail);
        }

    },
    logout() {
        TokenService.removeToken();
        TokenService.removeRefreshToken();
        ApiService.removeHeader();
        ApiService.unmount401Interceptor();
    },
    sendResetEmail: async function (email) {
        const requestData = {
            method: 'post',
            url: "/password/email",
            data: {
                email: email,
            },
        };

        try {
            const response = await ApiService.customRequest(requestData);
            console.log(response)
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },
    getPermissions: async function () {
        return await ApiService.get('/api/v1/admin/me/get-perms');
    },
    getUserData: function () {
        return ApiService.get('/api/v1/admin/me');
    }
};

export default UserService

export {UserService, AuthenticationError}
