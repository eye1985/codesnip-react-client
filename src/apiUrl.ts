const apiVer = "v1";
const domain = `http://localhost:3000/${apiVer}`;

export default {
    login : domain + "/login",
    logout : domain + "/logout"
}