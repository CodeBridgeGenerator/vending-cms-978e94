
import { faker } from "@faker-js/faker";
export default (count,RefIds,RefNoIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
RefNo: RefNoIds[i % RefNoIds.length],

        };
        data = [...data, fake];
    }
    return data;
};
