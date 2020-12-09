import { DeepPartial } from './deep-partial';

export function deepPatch<T>(object: T, patch: DeepPartial<T>): T {
    if (typeof object !== 'object' || object === null || patch === null || Array.isArray(object)) {
        return patch as T;
    }

    const objectKeys = Object.keys(object as any);

    if (objectKeys.length === 0) {
        return object;
    }

    const patchKeys = Object.keys(patch);
    const patchedObject: DeepPartial<T> = {};

    for (const key of objectKeys) {
        if (patchKeys.includes(key)) {
            (patchedObject as any)[key] = deepPatch((object as any)[key], ((patch as any)[key]));
        } else {
            (patchedObject as any)[key] = (object as any)[key];
        }
    }

    return patchedObject as T;
}
