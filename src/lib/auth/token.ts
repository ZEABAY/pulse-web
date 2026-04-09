import { setTokenCookies, clearTokenCookies, getTokensFromCookies } from "./token-actions";

export async function setTokens(accessToken: string, refreshToken: string, expiresIn: number, refreshExpiresIn: number, rememberMe?: boolean) {
    await setTokenCookies(accessToken, refreshToken, expiresIn, refreshExpiresIn, rememberMe);
}

export async function clearTokens() {
    await clearTokenCookies();
}

export async function getAccessToken(): Promise<string | undefined> {
    const tokens = await getTokensFromCookies();
    return tokens.accessToken;
}

export async function getRefreshToken(): Promise<string | undefined> {
    const tokens = await getTokensFromCookies();
    return tokens.refreshToken;
}
