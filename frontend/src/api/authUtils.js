export const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};

export const getAccessTokenExpiry = (token) => {
    if (!token) {
        return null;
    }

    try {
        const payloadPart = token.split(".")[1];
        if (!payloadPart) {
            return null;
        }

        const normalizedPayload = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(
            decodeURIComponent(
                atob(normalizedPayload)
                    .split("")
                    .map((character) => `%${(`00${character.charCodeAt(0).toString(16)}`).slice(-2)}`)
                    .join("")
            )
        );

        if (!payload.exp) {
            return null;
        }

        return payload.exp * 1000;
    } catch {
        return null;
    }
};

export const redirectToLogin = () => {
    logoutUser();
    window.location.replace("/login");
};