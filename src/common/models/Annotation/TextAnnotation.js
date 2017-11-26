import { BaseAnnotation } from '@models';
import { AnnotationTypes } from '@enums';

/**
 *	Class template of text annotation.
 */
 class TextAnnotation extends BaseAnnotation {

 	///
 	///	Constructor
 	///

 	constructor() {

 		super();
 		this.annotationType = AnnotationTypes.TextAnnotation;
 	}

	///
 	///	Methods
 	///

 	/**
 	 *	Gets object representation of annotation.
 	 */
 	getObjectRepresentation() {

 		if(this.validateProperties())
 			return super.getObjectRepresentation();
 		else
 			throw "Properties of text annotation are not valid."; 
 	}

 	/**
 	 *	Returns true if properties are in valid format; otherwise, false.
 	 */
 	validateProperties() {

 		let retVal = super.validateProperties();
 		retVal = retVal ? this.validateTarget() : retVal;

 		return retVal;
 	}

 	/**
 	 *	Validates target of image annotation.
 	 */
 	validateTarget() {

 		let target = this.getProperty('target');

 		if(target.url == null || target.start == null || target.end == null) {

 			return false;
 		}

 		return true;
 	} 	 	 	 	

 }


 export { TextAnnotation };