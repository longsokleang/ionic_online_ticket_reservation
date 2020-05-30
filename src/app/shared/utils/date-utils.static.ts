import { PeriodDateOptionValue } from '../constants/common.const';
import { DateFormat, SegmentPeriodOptionValue } from '../constants/common.type';

export abstract class DateUtils {

    private static dateRegExpListInstance: Map<DateFormat, RegExp>;

    private static get dateRegExpList(): Map<DateFormat, RegExp> {
        if (this.dateRegExpListInstance === undefined) {
            this.dateRegExpListInstance = new Map();
            this.dateRegExpListInstance.set('hhmm'          , /^([0-2]{1}\d{1})(\d{2})$/);
            this.dateRegExpListInstance.set('hhmmss'        , /^([0-2]{1}\d{1})(\d{2})(\d{2})$/);
            this.dateRegExpListInstance.set('hhmmssSSS'     , /^([0-2]{1}\d{1})(\d{2})(\d{2})(\d{3})$/);
            this.dateRegExpListInstance.set('yyyymmdd'      , /^([1-2]{1}\d{3})(\d{2})(\d{2})$/);
            this.dateRegExpListInstance.set('yyyy-mm-dd'    , /^([1-2]{1}\d{3})-(\d{2})-(\d{2})$/);
            this.dateRegExpListInstance.set('yyyymmddhhmm'  , /^([1-2]{1}\d{3})(\d{2})(\d{2})(\d{2})(\d{2})$/);
            this.dateRegExpListInstance.set('yyyymmddhhmmss', /^([1-2]{1}\d{3})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
            this.dateRegExpListInstance.set('yyyymmddhhmmssSSS', /^([1-2]{1}\d{3})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        }
        return this.dateRegExpListInstance;
    }

    public static getDateFromTodayAsString(value: number, type: 'weeks'|'months'): string {
        const date = new Date();
        switch (type) {
            case 'weeks' : date.setDate(date.getDate() - 7 * value); break;
            case 'months': date.setMonth(date.getMonth() - value);   break;
        }
        return this.toString(date);
    }
    public static getNextDateFromTodayAsString(value: number, type: 'weeks'|'months'): string {
        const date = new Date();
        switch (type) {
            case 'weeks' : date.setDate(date.getDate() + 7 * value); break;
            case 'months': date.setMonth(date.getMonth() + value);   break;
        }
        return this.toString(date);
    }

    public static getCurrentDateYYYYMMDD( symbol: string): string {
        const date = new Date();
        const month = date.getMonth() + 1;
        
        const nYear = date.getFullYear();
        const nMonth = (date.getMonth() < 10) ? '0' + month : month;
        const nDay = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        return String(nYear) + String(symbol) + String(nMonth)  + String(symbol) + String(nDay);
    }

    public static getStartDatePeriodAsString(period: SegmentPeriodOptionValue): string {
        let date: string; // 2019-10-08
        switch (period) {
            case PeriodDateOptionValue.ONE_WEEK:
                date = this.getDateFromTodayAsString(1, 'weeks');
                break;
            case PeriodDateOptionValue.ONE_MONTH:
                date = this.getDateFromTodayAsString(1, 'months');
                break;
            case PeriodDateOptionValue.THREE_MONTH:
                date = this.getDateFromTodayAsString(3, 'months');
                break;
            case PeriodDateOptionValue.SIX_MONTH:
                date = this.getDateFromTodayAsString(6, 'months');
                break;
        }
        return date;
    }

    public static getDateAsServerFormat(date?: string | Date): string {
        let dateObj: Date;
        if (typeof date === 'string') {
            dateObj = new Date(date);
        } else if (typeof date === 'object') {
            dateObj = date;
        } else {
            dateObj = new Date();
        }
        return this.toString(dateObj, 'date', 'server');
    }

    public static getTimeFormat(val: string): Return {
        let text;
        let value;
        const val1 = val.replace(/\D/g, '');
        console.log(val1.length, val1);

        if ( val1.length === 4) {
            text = val1.substr(0, 2);
            value = val1.substr(2, 4);
        } else {
            console.log('out of foramte');
        }
        return {
            text: String(text + ':' + value),
            value: text + value
        };
    }

    public static getCurrentDateTime(type?: 'date'|'time', format?: 'default'|'server'): string {
        return this.toString(new Date(), type, format);
    }

    public static getDateAsString(str: string, isIncludeTime?: boolean, isIncludeSecond?: boolean): string {
        const previousMode = this.getDateFormat(str);
        let replacePattern: string;
        switch (previousMode) {
            case 'yyyymmdd'         : break;
            case 'yyyy-mm-dd'       : replacePattern = '$1-$2-$3'; break;
            case 'yyyymmddhhmm'     : break;
            case 'yyyymmddhhmmss'   : break;
            case 'yyyymmddhhmmssSSS': break;
            default                 : console.log('Date string not macth with format !', str); return '';
        }
        const regexp = this.dateRegExpList.get(previousMode);
        let result = str.replace(regexp, '$1-$2-$3');
        if (isIncludeTime) {
            const time = this.getTimeAsString(str, isIncludeSecond)
            if (time !== '') {
                result += 'T' + time;
            }
        }
        return result;
    }

    public static getTimeAsString(str: string, isIncludeSecond?: boolean): string {
        const previousMode = this.getDateFormat(str);
        let replacePattern: string;
        switch (previousMode) {
            case 'hhmm'  : replacePattern = '$1:$2' + (isIncludeSecond ? ':00' : '');           break;
            case 'hhmmss'  : replacePattern = '$1:$2' + (isIncludeSecond ? ':$3' : '');         break;
            case 'hhmmssSSS'  : replacePattern = '$1:$2' + (isIncludeSecond ? ':$3' : '');      break;
            case 'yyyymmddhhmm' : replacePattern = '$4:$5' + (isIncludeSecond ? ':00' : '');    break;
            case 'yyyymmddhhmmss' : replacePattern = '$4:$5' + (isIncludeSecond ? ':$6' : '');  break;
            case 'yyyymmddhhmmssSSS' : replacePattern = '$4:$5' + (isIncludeSecond ? ':$6' : '');  break;
            default             :  console.error('Date string not macth with format !');        return '';
        }
        const regexp = this.dateRegExpList.get(previousMode);
        const result = str.replace(regexp, replacePattern);
        return result;
    }

    public static getDateFormat(str: string): DateFormat {
        for (const [format] of this.dateRegExpList) {
            if ( this.isValid(str, format) ) {
                return format;
            }
        }
        return undefined;
        // without add "target": "es5", "downlevelIteration": true, use:
        // let format: DateFormat;
        // this.dateRegExpList.forEach( (v, k) => {
        //     if (format) {
        //         return; // continue foreach
        //     }
        //     if (this.isValid(str, k)) {
        //         format = k;
        //     }
        // });
        // return format;
    }

    public static getDaysBetweenDates(fromDate: Date|string, toDate?: Date|string): number {
        return Math.abs( this.compares(fromDate, toDate) );
    }

    public static getMonthsBetweenDates(fromDate: Date|string, toDate?: Date|string, includeDay?: boolean): number {
        return Math.abs( this.comparesAsMonth(fromDate, toDate, includeDay) );
    }

    public static compares(fromDate: Date|string, toDate?: Date|string): number {
        let date1: Date, date2: Date;
        if (fromDate instanceof Date) {
            date1 = fromDate;
        } else {
            date1 = fromDate ? new Date(this.getDateAsString(fromDate)) : new Date();
        }
        if (toDate instanceof Date) {
            date2 = toDate;
        } else {
            date2 = toDate ? new Date(this.getDateAsString(toDate)) : new Date();
        }
        date1.setHours(1);
        date2.setHours(1);
        const totalMs = date2.getTime() - date1.getTime();
        const totalDays = totalMs / (1000 * 60 * 60 * 24); // -> ss -> mn -> hh -> dd
        return Math.round(totalDays);
    }

    public static comparesAsMonth(fromDate: Date|string, toDate?: Date|string, includeDay?: boolean): number {
        let date1: Date, date2: Date;
        if (fromDate instanceof Date) {
            date1 = fromDate;
        } else {
            date1 = fromDate ? new Date(this.getDateAsString(fromDate)) : new Date();
        }
        if (toDate instanceof Date) {
            date2 = toDate;
        } else {
            date2 = toDate ? new Date(this.getDateAsString(toDate)) : new Date();
        }
        // date1.setHours(1);
        // date2.setHours(1);
        const years = date2.getFullYear() - date1.getFullYear();
        let months = date2.getMonth() - date1.getMonth();
        const days = date2.getDate() - date1.getDate();
        console.log(months, years, days);
        months += years * 12;
        if (includeDay && days < 0) {
            months -= 1;
        }
        return months;
    }

    public static isValid(str: string, mode: DateFormat): boolean {
        return this.dateRegExpList.get(mode).test(str);
    }

    public static toDate(str: string): Date {
        let dateObj: Date;
        if (this.isValid(str, 'yyyy-mm-dd')) {
            dateObj = new Date(str);
        } else {
            dateObj = new Date();
        }
        return dateObj;
    }

    public static toString(date: Date, type?: 'date'|'time', format?: 'default'|'server') {
        let str: string, regexp: RegExp;
        let replacePattern: string;
        if (type === 'time') {
            str = date.toTimeString();
            regexp = /^(\d{2}):(\d{2}):(\d{2})$/;
            replacePattern = (format === 'server') ? '$1$2$3' : '$1:$2:$3';
        } else {
            str = date.toISOString().substr(0, 10);
            regexp = /^(\d{4})-(\d{2})-(\d{2})$/;
            replacePattern = (format === 'server') ? '$1$2$3' : '$1-$2-$3';
        }
        return str.replace(regexp, replacePattern);
    }
    public static getDateAsPipe(date: string) {
        // date = "20191211"
      return  String(date).replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1-$2-$3');
    }
    public static getCurrentTimeTranscation() {
        let m = new Date().getMinutes();
        let h = new Date().getHours();
        if (m !== 0) {
          h++;
        }
        return ('0' + h).slice(-2) + '00';
      }

}

export interface Return {
    text: string,
    value: string
}