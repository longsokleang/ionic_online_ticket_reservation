

export class Util {

    public setSecureStorage( sKey: string, oValue: any ) {

        oValue = this.stringjson(oValue);

        window.localStorage.setItem(sKey, oValue);

    }

    public getSecureStorage( sKey: string ): any {

        let data = window.localStorage.getItem(sKey);

        data = this.parsejson(data);

        return data;

	}
	public removeSecureStorage(sKey: string) {

		window.localStorage.removeItem(sKey);
	}

    private stringjson(vValue) {

        let value =  vValue!=undefined && vValue!=null ? JSON.stringify(vValue) : '';
        return value;

    }

    private parsejson (vValue) {

        let retValue;

        if ( vValue != undefined && vValue.slice(0, 1) != '0' && vValue != '' ) {
            retValue = JSON.parse(vValue);
        } else {
            retValue = vValue;
        }

        return retValue;

    }

    public numberFormat(value: any, options: object)	{

		let defaultOptions = {
			'toNumber_digits' : undefined,
			'toNumber_default' : 0
		};

		for(var key in options) {
			if(options.hasOwnProperty(key)) defaultOptions['toNumber_' + key] = options[key];
		}

		let defaultNum = defaultOptions['toNumber_default'];

		if(value == undefined || value == '') return defaultNum;
		if(value.constructor!=String && value.constructor!=Number) console.log('type error. value type : ' + value.constructor);

		let num;
		switch(value.constructor) {
			case Number :
				num = value;
				break;
			case String :
				var sign='';
				var decimal='';
				var numSplit = value.split('.');
				if(numSplit.length == 2) {
					num = numSplit[0];
					decimal = numSplit[1];
				} else num = value;

				if(num.length>1) {
					sign = num.substring(0,1);
					if(sign!='-' && sign!='+') sign='';
					else num=num.substring(1,num.length);
				}

				num = num.replace(/[^0-9]/gi, '');
				if(decimal == undefined) decimal = '';
				decimal = decimal.replace(/[^0-9]/gi, '');

				if(decimal!='') num = [num, decimal].join('.');
				num = Number(sign+num);
				break;
			default :
				return defaultNum;
		}
		console.log(defaultOptions);
		console.log('num' + num);

		for(var key in defaultOptions) {
			if(defaultOptions.hasOwnProperty(key)) {
				switch(key) {
				case 'toNumber_digits' :
					var digits = defaultOptions[key];

					if (digits >= 0) num = parseFloat(num.toFixed(digits)); // 소수부 반올림
					else {
						var fixdigits = Math.pow(10, Math.abs(digits));
						digits = Math.pow(10, digits); // 정수부 반올림
						num = Number(Math.round(num * digits).toFixed(0))*fixdigits;
					}
					break;
				}
			}
		}
		return num;
	}

	public toNumber(value: any ,options?: object) {

		let defaultOptions = {
			'toNumber_digits' : undefined,
			'toNumber_default' : 0
		};

		for(var key in options) {
			if(options.hasOwnProperty(key)) defaultOptions['toNumber_' + key] = options[key];
		}

		let defaultNum = defaultOptions['toNumber_default'];

		if(value == undefined || value == '') return defaultNum;
		if(value.constructor!=String && value.constructor!=Number) console.log('bizMOBNumber - type error. value type : ' + value.constructor);

		let num;
		switch(value.constructor) {
			case Number :
				num = value;
				break;
			case String :
				var sign='';
				var decimal='';
				var numSplit = value.split('.');
				if(numSplit.length == 2) {
					num = numSplit[0];
					decimal = numSplit[1];
				} else num = value;

				if(num.length>1) {
					sign = num.substring(0,1);
					if(sign!='-' && sign!='+') sign='';
					else num=num.substring(1,num.length);
				}

				num = num.replace(/[^0-9]/gi, '');
				if(decimal == undefined) decimal = '';
				decimal = decimal.replace(/[^0-9]/gi, '');

				if(decimal!='') num = [num, decimal].join('.');
				num = Number(sign+num);
				break;
			default :
				return defaultNum;
		}

		for(key in options) {
			if(options.hasOwnProperty(key)) {
				switch(key) {
				case 'toNumber_digits' :
					var digits = options[key];

					if (digits >= 0) num = parseFloat(num.toFixed(digits)); // 소수부 반올림
					else {
						var fixdigits = Math.pow(10, Math.abs(digits));
						digits = Math.pow(10, digits); // 정수부 반올림
						num = Number(Math.round(num * digits).toFixed(0))*fixdigits;
					}
					break;
				}
			}
		}
		return num;
	}




	
	public searchSelectElement(search: string, arr: any[], field: string, listType?: any, splitBy?: string | RegExp): any[] {
		let searchResult = [];
		if (search !== '') {
			const newVal = [];
			for (const searchArr of  arr ) {
			if (searchArr[field]) {
				let searchIndex = -1;
				if (listType === 'WESTERN_UNION') {
					searchIndex = searchArr[field].split('-', 2)[0].replace(/<[^>]*>/g, '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase());
				} else {
					searchIndex = searchArr[field].replace(/<[^>]*>/g, '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase());
				}
				
				const tmp = {...searchArr};
				if ( searchIndex !== -1 ) {
				let em = '';
				const temp = tmp[field].replace(/<[^>]*>/g, '').substr(searchIndex, search.trim().length );
				if (search.trim() !== '') {
					em = `<em>${temp}</em>`;
				}
				tmp[field] = tmp[field].replace(temp, em );
				newVal.push(tmp);
				searchResult = newVal;
				}
			}
			}
			return searchResult;
		} else {
			searchResult = arr;
			return searchResult;
		}
	}
	
	
	public sortByTextField(list: any[], textField: string): any[] {
		if (list.length > 0 ) {
			list.sort((a: any, b: any) => (a[textField] > b[textField]) ? 1 : ((b[textField] > a[textField]) ? -1 : 0));
			return list;
		}
	}
	
	public sortByNumberField(list: any[], numberField: string, sortBy?: 'ASC' | 'DESC'): any[] {
		if (list.length > 0 ) {
			if (!sortBy || sortBy === 'ASC') {
				list.sort((a: any, b: any) => a[numberField] - b[numberField]);
				return list;
			} else if (sortBy === 'DESC') {
				list.sort((a: any, b: any) => b[numberField] - a[numberField]);
				return list;
			}
		}
	}
}
