import findKiosk, { Kiosk } from './dbfunctions/read/findKiosk';

export default async function (id: string, key: string): Promise<boolean> {
    try {
        const result: Kiosk = await findKiosk(id);
        if (result.apiKey.toString() == key) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
