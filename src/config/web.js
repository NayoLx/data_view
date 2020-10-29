/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import { Loading, Message } from 'element-ui';

const getBaseUrl = (env) => {
    let base = {
        production: '/',
        development: 'http://localhost:3000',
        test: '',
    }[env];
    if (!base) {
        base = '/';
    }
    return;
}

class web {
    constructor() {
        this.baseUrl = getBaseUrl(process.env.NoDE_ENV);
        this.timeout = 10000;
        this.withCredentials = true;
    }

    setInterceotors = (instance, url) => {
        const loading = Loading.service({
            lock: true,
            text: '加载中...'
        });
        instance.interceptors.request.use((config) => {
            loading;
            config.headers.AuthorizationToken = localStorage.getItem('AuthorizationToken') || '';
            return config;
        }, err => Promise.reject(err));

        instance.interceptors.response.use((response) => {
            loading.close();
            return response;
        }, (err) => {
            if (err.response) { // 响应错误码处理
                switch (err.response.status) {
                    case '401':
                        Message({
                            type: 'error',
                            message: '令牌已过期，请重新登录',
                        });
                        setTimeout(function () {
                            location.replace('/'); //返回登录    
                        }, 1000)
                        break;
                    case '404':
                        Message({
                            type: 'error',
                            message: '请求页面不存在',
                        });
                        break;
                    default:
                        break;
                }
                return Promise.reject(err.response);
            }
            if (!window.navigator.online) {
                Message({
                    type: 'error',
                    message: '服务器连接错误，请重新登录',
                });
                setTimeout(function () {
                    location.replace('/'); //返回登录    
                }, 1000)
                return -1;
            }
            return Promise.reject(err);
        });
    }

    request(options) {
        const instance = axios.create();
        const config = {
            ...options,
            baseUrl: this.baseUrl,
            timeout: this.timeout,
            withCredentials: this.withCredentials,
        }
        this.setInterceotors(instance, options.url);
        return instance(config);
    }
}

export default new web();