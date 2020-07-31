import { findKiosk } from './dbfunctions/read/findKiosk';

export default async function (id: string, key: string): Promise<boolean> {
    if (id == 'undefined' || key == 'undefined') {
        return false;
    } else {
        const result = await findKiosk(id);

        if (result.apiKey == key) {
            return true;
        } else {
            return false;
        }
    }
}
