import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookieItem = (
    key: string,
    value: string,
    expiryInHours?: number
): void => {
    const options: { path: string; expires?: Date } = { path: '/' };
    if (expiryInHours) {
        const expires = new Date();
        expires.setHours(expires.getHours() + expiryInHours);
        options.expires = expires;
    }
    cookies.set(key, value, options);
};

export const getCookieItem = (key: string): string | null => {
    return cookies.get(key);
};

export const removeCookieItem = (key: string) => {
    cookies.remove(key);
};
