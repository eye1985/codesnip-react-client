export const getAuth = ():boolean => {
    return sessionStorage.getItem("codesnipIsAuthenticated") === "true";
};

export const getUserId = ():string|null => sessionStorage.getItem("codesnipUserId");

export const setUserId = (userId:string) => {
    sessionStorage.setItem("codesnipUserId",userId);
};

export const setAuth = (isLoggedIn:boolean) => {
    sessionStorage.setItem("codesnipIsAuthenticated", isLoggedIn.toString());
};

export const removeAuth = () => {
    sessionStorage.removeItem("codesnipIsAuthenticated");
};

export const removeUserId = () => {
    sessionStorage.removeItem("codesnipUserId");
};