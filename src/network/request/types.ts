import type {AxiosInstance, AxiosRequestConfig,AxiosResponse} from 'axios';

// 用于添加拦截器的接口
interface requestInterceptor<T=AxiosResponse>{
  requestinterceptor?:(config:AxiosRequestConfig)=>AxiosRequestConfig,
  requestinterceptorCatch?:(err:any)=>any,
  responseinterceptor?: (res:T)=>T,
  responseinterceptorCatch?:(err:any)=>any,
}

// requestConfig接口 用于扩展axios的config参数 扩展一个interceptors属性 里面放拦截器回调函数
interface requestConfig<T=AxiosResponse> extends AxiosRequestConfig{
    interceptors?:requestInterceptor<T>
    needLoading?:boolean
}

export {requestConfig,requestInterceptor }
