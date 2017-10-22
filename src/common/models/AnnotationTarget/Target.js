/**
 *	Class template of annotation target.
 */
 class Target {

	///
 	///	Constructor
 	///

 	constructor() {

 		this._id = null;
 		this._type = null;
 		this._format = null;

 	}


	///
 	///	Getters and Setters
 	///
 	get id() { return this._id; }
 	set id(value) { this._id = value; }

 	get type() { return this._type; }
 	set type(value) { this._type = value; }

 	get format() { return this._format; }
 	set format(value) { this._format = value; }

 }


 export { Target };