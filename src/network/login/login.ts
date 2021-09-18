import $send from "../index";
// 登陆请求用户信息接口
interface account {
    name: string;
    password: string;
}
// 登陆后返回信息的data属性的接口
interface loginResultData{
  id:number,
  name:string,
  token:string
}
// 登陆成功返回对象接口
interface loginDataType<T = any>{
  code:number,
  data:loginResultData
}
// 获取用户具体信息接口
interface userInfo{
  code:number,
  data:any
}

enum LoginURL {
    login = "/login",
    userInfo = '/users/',
    menus = '/role/'
}

export function userLoginRequest(account: account) {
    return $send.post<loginDataType<loginResultData>>({
        url: LoginURL.login,
        data: account,
        needLoading:true
    });
}

export function getUserInfoById(id:number) {
  return $send.get<userInfo>({
      url: LoginURL.userInfo+id,
  });
}

export function getUserMenu(id:number){
  console.log(LoginURL.menus+id+"/menu");
    return $send.get({
      url:LoginURL.menus+id+"/menu"
    })
}


export type {account,loginDataType, loginResultData};
