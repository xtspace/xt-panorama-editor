import { request, AjaxResponse } from "@/utils/request";

interface LoginProps{
    username: string,
    password: string
}
export function login(data: LoginProps): AjaxResponse<{
    username: string
    token:string
}> {
    return request.post("/user/login", data);
}

export function register(data: LoginProps): AjaxResponse<any> {
    return request.post("/user/register", data);
}