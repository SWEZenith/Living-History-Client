import { BaseAnnotation } from '@models';
import { AnnotationTypes } from '@enums';

/**
 *	Class template of image annotation.
 */
 class ImageAnnotation extends BaseAnnotation {

 	///
 	///	Constructor
 	///

 	constructor() {

 		super();
 		this.annotationType = AnnotationTypes.ImageAnnotation;
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
 			throw "Properties of image annotation are not valid."; 
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

 		if(target.type != 'Image' || target.url == null || target.x == null || target.y == null ||
 			target.w == null || target.h == null || target.format != 'image/jpeg') {

 			return false;
 		}

 		return true;
 	}

 }


 export { ImageAnnotation };