export type TokenProvider = () => string | null | Promise<string | null>;

let tokenProvider: TokenProvider = () => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("pulse.access_token");
};

export function setTokenProvider(provider: TokenProvider) {
    tokenProvider = provider;
}

export async function getAccessToken(): Promise<string | null> {
    return await tokenProvider();
}

export function setAccessToken(token: string) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("pulse.access_token", token);
}

export function clearAccessToken() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem("pulse.access_token");
}
