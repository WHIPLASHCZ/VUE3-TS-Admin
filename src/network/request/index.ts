import axios from "axios";
import type {AxiosInstance, AxiosRequestConfig,AxiosResponse} from 'axios';
import {requestConfig,requestInterceptor} from './types';
import { ElLoading } from "element-plus";
import type {ILoadingInstance} from 'element-plus';

let original_isLoading = false;

export interface response{
  code?:number|string
  data?:any
}

interface rootResponse{
  list?:any
}

type ARS = AxiosResponse | response ;

// 网络请求对象构造器
class $Send {
    instance:AxiosInstance
    config: requestConfig
    interceptors:requestInterceptor | undefined
    loading?:ILoadingInstance
    needLoading?:boolean=false
    constructor(config:requestConfig){
      this.config = config;
      this.instance = axios.create(this.config);
      this.interceptors = this.config.interceptors;
      this.needLoading = this.config.needLoading;
      this.instance.interceptors.request.use(this.interceptors?.requestinterceptor,this.interceptors?.requestinterceptorCatch);
      this.instance.interceptors.response.use(this.interceptors?.responseinterceptor,this.interceptors?.responseinterceptorCatch);
      original_isLoading = this.needLoading || false;
      this.instance.interceptors.request.use((config:any)=>{
        if(this.needLoading) this.loading = ElLoading.service({
          text:'加载中...'
        });
        return config;
      },(err:any)=>{
        console.log('请求失败！');
        return err;
      });

      this.instance.interceptors.response.use((res:any)=>{
          let data = res.data;
          this.loading?.close();
          return res.data;
        },(err:any)=>{
          this.loading?.close();
        console.log('响应失败！',err);
        return err.response.status;
      });
    }
    get<T=ARS>(config:requestConfig<T>):Promise<T> {
      return this.request<T>({...config,method:'GET'});
    }
    post<T=ARS>(config:requestConfig<T>) :Promise<T>{
      return this.request<T>({...config,method:'POST'});
    }
    delete<T=ARS>(config:requestConfig<T>) :Promise<T>{
      return this.request<T>({...config,method:'DELETE'});
    }
    patch<T=ARS>(config:requestConfig<T>) :Promise<T>{
      return this.request<T>({...config,method:'patch'});
    }
    options<T=ARS>(config:requestConfig<T>) :Promise<T>{
      return this.request<T>({...config,method:'OPTIONS'});
    }
    request<T=ARS>(config:requestConfig<T>):Promise<T>{
      // 执行单个请求的拦截器
      config = this.requestStoper(config);
      return this.instance.request(config).then((res:any)=>{
        res = this.responseStoper(config,res);
        return res;
      },err=>{
        this.needLoading = original_isLoading;
        return err;
      })
    }
    requestStoper<T=ARS>(config:requestConfig<T>){
      original_isLoading = this.needLoading || false;
      if(config.needLoading!=original_isLoading) this.needLoading = config.needLoading;
      if(config.interceptors?.requestinterceptor){

        config = config.interceptors.requestinterceptor(config);
      }
      return config;
    }
    responseStoper<T=ARS>(config:requestConfig<T>,res:any){
      if(config.interceptors?.responseinterceptor){
        res = config.interceptors.responseinterceptor(res);
      }
      this.needLoading = original_isLoading;
      return res;
    }
}

export default $Send;
