const apiVer = "v1";
const domain = `http://localhost:3000/${apiVer}`;

export default {
    login : domain + "/login",
    logout : domain + "/logout",
    languages : domain + "/language",
    codes : domain + "/codes",
    createCode (userId:string){
        return domain + `/user/${userId}/code`;
    },
    userCode (userId:string, codeId:string){
        return domain + `/user/${userId}/code/${codeId}`;
    },
    userCodes (userId:string){
        return domain + `/user/${userId}/code`;
    }
}