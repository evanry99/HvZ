export function storageSave<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function storageRead<T>(key: string): T | null {
    const storedValue  = sessionStorage.getItem(key);
    try {
        if(storedValue) {
            return JSON.parse(storedValue) as T;
        }
        return null;
    }
    catch(error) {
        sessionStorage.removeItem(key);
        return null;
    }
}

export function storageClear<T>(): void {
    sessionStorage.clear();
}