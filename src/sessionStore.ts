export const getAuth = ():boolean => {
    return sessionStorage.getItem("codesnipIsAuthenticated") === "true";
};

export const setAuth = (isLoggedIn:boolean) => {
    sessionStorage.setItem("codesnipIsAuthenticated", isLoggedIn.toString());
};

export const removeAuth = () => {
    sessionStorage.removeItem("codesnipIsAuthenticated");
};