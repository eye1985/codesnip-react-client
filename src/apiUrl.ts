const apiVer = "v1";
const domain = `http://localhost:3000/${apiVer}`;

export default {
    login : domain + "/login",
    logout : domain + "/logout",
    languages : domain + "/language",
    createCode (userId:string){
        return domain + `/user/${userId}/code`;
    }
}