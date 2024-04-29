import { request, AjaxResponse } from "@/utils/request";

export interface UserProps{
  keyword:string
  size:number
  current:number
  roleId:string
}

export interface UserData{
  records:Array<{
          id:string
          password:string
          username:string,
          createTime:string,
          roleKeyList:string[]
  }>
  total:number
}

export interface RoleData{
  result: Array<{
    id: string
    roleKey: string
    roleName: string
  }>
}

export function getUserListApi(params: Partial<UserProps>): AjaxResponse<UserData> {
    return request.get("/user/page", { params });
}

export function getUserInfoApi(): AjaxResponse<any> {
  return request.get("/user/current");
}

export function deleteUserApi(id: string): AjaxResponse<any> {
  return request.delete(`/user/${id}`);
}

export function getRoleListApi(): AjaxResponse<RoleData["result"]> {
  return request.get(`/role/list`);
}

export function setUserInfoApi(data: any): AjaxResponse<any> {
  return request.post(`/user/update`, data);
}

export function addUserInfoApi(data: any): AjaxResponse<any> {
  return request.post(`/user/insert`, data);
}