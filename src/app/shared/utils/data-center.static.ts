import { Util } from 'src/app/shared/util';
import { LOCAL_STORAGE } from '../constants/common.const';
import { environment } from '../../../environments/environment';

export abstract class DataCenter {

    private static dataCenter: Map<string, Map<string, any>>;
    private static readonlyKeys: Map<string, string[]>;

    public static set(screenId: string, key: string, value: any, readonly?: boolean): boolean {
        if (this.dataCenter === undefined) {
            this.dataCenter = new Map();
            this.readonlyKeys = new Map();
        }
        if (this.dataCenter.has(screenId) === false) {
            this.dataCenter.set(screenId, new Map());
            this.readonlyKeys.set(screenId, []);
        }
        const screenData = this.dataCenter.get(screenId);
        const isNotExist = !screenData.has(key);
        const isNotReadonly = this.isNotReadonlyKey(screenId, key);
        const setAble = isNotExist || isNotReadonly;
        if (setAble) {
            screenData.set(key, value);
            console.log('Data center set', screenId, key, 'has been', isNotExist ? 'set.' : 'overrided!');
            if (readonly) {
                const screenReadonlyKeys = this.readonlyKeys.get(screenId);
                screenReadonlyKeys.push(key);
            }
        } else {
            console.log('Data center set', screenId, key, 'cannot override readonly data!!');
        }
        return setAble;
    }

    public static get(screenId: string, key: string, clear?: boolean): any {
        /////////////////////////////////////////////////////////////////////////////////////////
        // TODO:
        if (!environment.production && screenId === 'login' && key === LOCAL_STORAGE.USER_INFO) {
            return this.tmp();
        }
        /////////////////////////////////////////////////////////////////////////////////////////
        if (this.dataCenter === undefined) {
            console.log('Data center get', 'No data!!');
            return undefined;
        }
        const screenData = this.dataCenter.get(screenId);
        if (screenData === undefined) {
            console.log('Data center get', screenId, 'have no prop!!');
            return undefined;
        }
        const data = screenData.get(key);
        if (data === undefined) {
            console.log('Data center get', screenId, key, 'no data found!!');
            return undefined;
        }
        if (clear !== false) {
            this.clear(screenId, key);
        }
        return data;
    }

    public static clear(screenId: string, key?: string): void {
        if (this.dataCenter === undefined) {
            console.log('Data center clear', 'No data to clear!!');
            return;
        }
        if (key) {
            const screenData = this.dataCenter.get(screenId);
            if (screenData === undefined) {
                console.log('Data center clear', screenId, 'not exist!');
            } else if (this.isNotReadonlyKey(screenId, key)) {
                const delKeyResult = screenData.delete(key);
                console.log('Data center clear', screenId, key, delKeyResult ? 'has been clear.' : 'not exist!');
                if (screenData.size === 0) {
                    this.dataCenter.delete(screenId);
                }
            } else {
                console.log('Data center clear', screenId, key, 'is readonly prop.');
            }
            return;
        }
        const delResult = this.dataCenter.delete(screenId);
        console.log('Data center clear', screenId, delResult ? 'has been clear.' : 'is already empty!!');
    }

    public static printLog(screenId?: string): void {
        if (this.dataCenter === undefined) {
            console.log('Data center printLog', 'No data!!');
            return;
        }
        if (screenId) {
            console.log('Data center printLog', screenId, this.dataCenter.get(screenId));
        } else {
            console.log('Data center printLog', this.dataCenter);
        }
    }

    public static reset(confirm?: boolean): void {
        if (confirm) {
            this.dataCenter = undefined;
            console.log('Data center has been reset.');
        }
    }

    private static isNotReadonlyKey(screenId: string, key: string): boolean {
        const screenReadonlyKeys = this.readonlyKeys.get(screenId);
        if (screenReadonlyKeys === undefined) {
            return true;
        }
        return !screenReadonlyKeys.includes(key);
    }

    private static tmp() {
        const util = new Util();
        return util.getSecureStorage( LOCAL_STORAGE.USER_INFO );
    }

}
