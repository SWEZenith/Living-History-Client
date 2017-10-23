import { Target } from '@models';

/**
 *	Class template of image target.
 */
 class ImageTarget extends Target {

	///
 	///	Constructor
 	///

 	constructor() {

 		super();
 		this.type = 'Image';
 		this.format = 'image/jpeg';
 		this._x = null;
 		this._y = null;
 		this._w = null;
 		this._h = null;
 		this._url = null;
 	}


	///
 	///	Getters and Setters
 	///
 	get x(){ return this._x ; }
 	set x(value){ this._x  = value; }


 	get y(){ return this._y ; }
 	set y(value){ this._y = value; }

	get w(){ return this._w ; }
	set w(value){ this._w  = value; }

	get h(){ return this._h ; }
	set h(value){ this._h  = value; }

	get url(){ return this._url ; }
	set url(value){ this._url  = value; }

	get id(){ return `${this.url}#xywh=${this.x},${this.y},${this.w},${this.h}`; }
	set id(value) { 

		let values = value.split('=')[1].split(',');
		this.x = values[0];
		this.y = values[1];
		this.w = values[2];
		this.h = values[3];
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
 		retVal['type'] = this.type;
 		retVal['format'] = this.format;

 		return retVal;
 	}

 }


 export { ImageTarget };