"use server";

import { cookies } from "next/headers";

const REMEMBER_ME_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

export async function setTokenCookies(accessToken: string, refreshToken: string, expiresIn: number, refreshExpiresIn: number, rememberMe?: boolean) {
    const cookieStore = await cookies();

    const isSecure = process.env.NODE_ENV === "production";

    // Remember Me preference: explicit on login, read from cookie on refresh
    let isRememberMe = false;
    if (rememberMe !== undefined) {
        isRememberMe = rememberMe;
        if (rememberMe) {
            cookieStore.set("pulse.remember_me", "1", { httpOnly: true, secure: isSecure, sameSite: "lax", maxAge: REMEMBER_ME_MAX_AGE, path: "/" });
        } else {
            cookieStore.delete("pulse.remember_me");
        }
    } else {
        isRememberMe = cookieStore.has("pulse.remember_me");
    }

    // Remember Me = true  → persistent cookie with maxAge from backend
    // Remember Me = false → no maxAge → session cookie (deleted when browser closes)
    const accessTokenOptions: Parameters<typeof cookieStore.set>[2] = {
        httpOnly: true,
        secure: isSecure,
        sameSite: "lax",
        path: "/",
        ...(isRememberMe ? { maxAge: expiresIn } : {}),
    };

    const refreshTokenOptions: Parameters<typeof cookieStore.set>[2] = {
        httpOnly: true,
        secure: isSecure,
        sameSite: "lax",
        path: "/",
        ...(isRememberMe ? { maxAge: refreshExpiresIn } : {}),
    };

    cookieStore.set("pulse.access_token", accessToken, accessTokenOptions);
    cookieStore.set("pulse.refresh_token", refreshToken, refreshTokenOptions);
}

export async function clearTokenCookies() {
    const cookieStore = await cookies();
    cookieStore.delete("pulse.access_token");
    cookieStore.delete("pulse.refresh_token");
    cookieStore.delete("pulse.remember_me");
}

export async function getTokensFromCookies() {
    const cookieStore = await cookies();
    return {
        accessToken: cookieStore.get("pulse.access_token")?.value,
        refreshToken: cookieStore.get("pulse.refresh_token")?.value
    };
}
