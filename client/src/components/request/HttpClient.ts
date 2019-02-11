import Axios from 'axios';

export interface HttpRequestOptions {
    headers?: any;
}

export interface HttpResponse<T> {
    data: T;
}

export interface HttpClient {
    get<T>(path: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
    post<T>(path: string, data?: any, config?: HttpRequestOptions): Promise<HttpResponse<T>>;
}

export default class DefaultHttpClient implements HttpClient {
    static default() {
        return new DefaultHttpClient();
    }

    get<T>(path: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
        return Axios.get(path, options);
    }

    post<T>(path: string, data?: any, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
        return Axios.post(path, data, options);
    }
}