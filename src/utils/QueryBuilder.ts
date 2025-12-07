export function UpdateQueryBuilder<T>(
    table: string,
    searchParam: string | number,
    payload: T,
    keys: string[]
) {
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
    values.push(searchParam);
    const query = `
            UPDATE ${table} SET ${fields.join(', ')} WHERE id=$${variableCount} RETURNING *
            `;

    return { query, values };
}
