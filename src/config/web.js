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
        instance.interceptors.request.use((config) => {
            config.headers.AuthorizationToken = localStorage.getItem('AuthorizationToken') || '';
            return config;
        }, err => Promise.reject(err));

        instance.interceptors.response.use((response) => {
            
            // todo: 想根据业务需要，对响应结果预先处理的，都放在这里
            return response;
        }, (err) => {
            if (err.response) { // 响应错误码处理
                switch (err.response.status) {
                    case '403':
                        // todo: handler server forbidden error
                        break;
                    // todo: handler other status code
                    default:
                        break;
                }
                return Promise.reject(err.response);
            }
            if (!window.navigator.online) { // 断网处理
                // todo: jump to offline page
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