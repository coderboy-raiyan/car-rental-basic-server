export function UpdateQueryBuilder<T>(payload: T, keys: string[]) {
    const fields = [];
    const values = [];
    let variableCount = 1;

    const payloadObj = Object.keys(payload);

    keys.forEach(key => {
        if (payloadObj.includes(key)) {
            fields.push(`${key}=$${variableCount}`);
            values.push(payload[key]);
            variableCount++;
        }
    });

    return { fields, values, variableCount };
}
