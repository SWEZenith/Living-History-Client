import { AnnotationTypes } from '@enums';
import { ImageAnnotation, TextAnnotation } from '@models';


/**
 *	Factory to create annotation.
 */
class AnnotationFactory {

	/**
	 *	Creates an annotation with specified type.
	 */
	static createAnnotation(annotationType){

		switch(annotationType) {

			case AnnotationTypes.ImageAnnotation:
				return new ImageAnnotation();


			case AnnotationTypes.TextAnnotation:
				return new TextAnnotation();
		}
	}
}

export { AnnotationFactory };