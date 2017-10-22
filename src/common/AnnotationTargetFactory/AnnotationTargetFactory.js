import { AnnotationTargetTypes } from '@enums';
import { AnnotationTarget } from '@models';


/**
 *	Factory to create annotation target.
 */
class AnnotationTargetFactory {

	/**
	 *	Creates an annotation with specified type.
	 */
	static createAnnotation(annotationTargetType){

		switch(annotationTargetType) {

			case AnnotationTargetTypes.ImageTarget:
			default:
				return new AnnotationTarget();		
				
		}
	}
}

export { AnnotationTargetFactory };