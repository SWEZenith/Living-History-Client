/**
 *	Base class for annotation types.
 */
 class BaseAnnotation {

 	static transientProperties = new Set(['annotationType']);

 	///
 	///	Constructor
 	///

 	constructor() {

 		// Initialize repository with default values.
 		this._propertyRepository = new Map();
 		this._propertyRepository.set('@context', 'http://www.w3.org/ns/anno.jsonld');
 		this._propertyRepository.set('type', 'Annotation');
 		this._propertyRepository.set('body', null);
 		this._propertyRepository.set('target', null);
 	}

 	///
 	///	Getters and Setters
 	///
 	get context() { return this.getProperty('@context'); }
 	set context(value) { this.setProperty('@context', value); }

 	get id() { return this.getProperty('id'); }
 	set id(value) { this.setProperty('id', value); }

 	get type() { return this.getProperty('type'); }
 	set type(value) { this.setProperty('type', value); }

	get body() { return this.getProperty('body'); }
 	set body(value) { this.setProperty('body', value); }

 	get target() { return this.getProperty('target'); }
 	set target(value) { this.setProperty('target', value); }

 	get annotationType() { return this.getProperty('annotationType'); }
 	set annotationType(value) { this.setProperty('annotationType', value); }


	///
 	///	Methods
 	///

 	/**
 	 *	Initializes object with given values and return object.
 	 */
 	build(properties) {

 		for(let [key, value] of Object.entries(properties)) {

 			if('body' == key)
 				this.setProperty(key, new BaseAnnotationBody().build(value));
			else
				this.setProperty(key, value);
 		}

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

 		let retVal = {};

 		for(let [property, value] of this._propertyRepository.entries()) {
 			
 			if(!BaseAnnotation.transientProperties.has(property)) {

 				if(typeof value == 'object' && typeof value['getObjectRepresentation'] == 'function')
 					retVal[property] = value.getObjectRepresentation();
 				else
 					retVal[property] = value;
 			}
 		}

 		return retVal;
 	}

 	/**
 	 *	Returns true if properties are in valid format; otherwise, false.
 	 */
 	validateProperties() {

 		let retVal = true;

		if(this.getProperty('@context') != 'http://www.w3.org/ns/anno.jsonld' ||
			this.getProperty('type') != 'Annotation' ||
			this.getProperty('target') == null) {

			retVal = false;
		}

 		return retVal;
 	} 	

 }


 export { BaseAnnotation };