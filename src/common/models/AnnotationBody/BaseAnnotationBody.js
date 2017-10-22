import { AnnotationBodyTypes, AnnotationBodyFormats } from '@enums';

/**
 *	Base class for annotation bodies.
 */
 class BaseAnnotationBody {

 	///
 	///	Constructor
 	///

 	constructor() {

 		// Initialize repository with default values.
 		this._propertyRepository = new Map();
 		this._propertyRepository.set('type', AnnotationBodyTypes.TextualBody);
 		this._propertyRepository.set('value', null);
 		this._propertyRepository.set('format', AnnotationBodyFormats.TextHTML);
 	}

 	///
 	///	Getters and Setters
 	///
 	get type() { return this.getProperty('type'); }
 	set type(value) { this.setProperty('type', value); }

 	get value() { return this.getProperty('value'); }
 	set value(value) { this.setProperty('value', value); }

 	get format() { return this.getProperty('format'); }
 	set format(value) { this.setProperty('format', value); }


	///
 	///	Methods
 	///

 	/**
 	 *	Initializes object with given values and return object.
 	 */
 	build(properties) {

 		for(let [key, value] of Object.entries(properties))
 			this.setProperty(key, value);

 		return this;
 	}

 	/**
 	 * Adds given property to repository if it did not exist. Otherwise, updates with new value.
 	 * Returns this to create a chain.
 	 */
 	setProperty(propertyName, value) {

 		this._propertyRepository.set(propertyName, value);

 		return this;
 	}

 	/**
 	 *	Gets value of given property.
 	 */
 	getProperty(propertyName) {

 		return this._propertyRepository.get(propertyName);
 	}

 	/**
 	 *	Gets object representation of annotation.
 	 */
 	getObjectRepresentation() {

 		retVal = {};

 		for(let [property, value] of this._propertyRepository.entries())
 			retVal[property] = value;


 		return retVal;
 	} 	

 }


 export { BaseAnnotationBody };