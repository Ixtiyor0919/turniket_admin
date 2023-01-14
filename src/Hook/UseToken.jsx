import { useState } from "react";

export default function useToken() {
    const getToken = () => {
        const tokenStringSes = sessionStorage.getItem("socks-turnstile-token");
        const tokenStringLoc = localStorage.getItem("socks-turnstile-token");
        const userToken = JSON.parse(tokenStringSes || tokenStringLoc);
        return userToken;
    };
    const [token, setToken] = useState(getToken());
    const saveToken = (userToken, save) => {
        save
            ? localStorage.setItem("socks-turnstile-token", JSON.stringify(userToken))
            : sessionStorage.setItem("socks-turnstile-token", JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token,
    };
}
