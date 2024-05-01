
import { faker } from "@faker-js/faker";
export default (count,RefIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
Ref: RefIds[i % RefIds.length],

        };
        data = [...data, fake];
    }
    return data;
};
