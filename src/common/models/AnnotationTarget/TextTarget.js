import { Target } from '@models';

/**
 *	Class template of text target.
 */
 class TextTarget extends Target {

	///
 	///	Constructor
 	///

 	constructor() {

 		super();
 		this._start = null;
 		this._end = null;
 		this._url = null;
 	}


	///
 	///	Getters and Setters
 	///
 	get start(){ return this._start ; }
 	set start(value){ this._start  = value; }


 	get end(){ return this._end ; }
 	set end(value){ this._end = value; }

	get url(){ return this._url ; }
	set url(value){ this._url  = value; }

	get id(){ return `${this.url}#char=${this.start},${this.end}`; }
	set id(value) { 

		let values = value.split('=')[1].split(',');
		this.start = values[0];
		this.end = values[1];
		this.url = value.split('#')[0];
	}



	///
 	///	Methods
 	///

 	/**
 	 *	Gets object representation of annotation.
 	 */
 	getObjectRepresentation() {

 		let retVal = {};

 		retVal['id'] = this.id;

 		return retVal;
 	}

 }


 export { TextTarget };