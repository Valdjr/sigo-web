import { useState, useEffect } from "react";

import api from "../../api";
import history from "../../history";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(username, password) {
        const {
            data: { token },
        } = await api.post("http://localhost:3001/", { username, password });
        localStorage.setItem("token", JSON.stringify(token));
        setAuthenticated(true);
        history.push("/normas");
    }

    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem("token");
        history.push("/login");
    }

    return { authenticated, loading, handleLogin, handleLogout };
}
