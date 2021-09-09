export const isEmpty = (value) => {
    if (
        value === null ||
        value === undefined ||
        (typeof value === 'object' &&
            Array.isArray(value) &&
            value.length === 0) ||
        (typeof value === 'object' && Object.values(value).length === 0)
    ) {
        return true;
    } else {
        return false;
    }
};
