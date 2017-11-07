import { AnnotationTargetTypes } from '@enums';
import { ImageTarget, TextTarget } from '@models';


/**
 *	Factory to create annotation target.
 */
class AnnotationTargetFactory {

	/**
	 *	Creates an annotation with specified type.
	 */
	static createTarget(annotationTargetType){

		switch(annotationTargetType) {

			case AnnotationTargetTypes.ImageTarget:
				return new ImageTarget();

			case AnnotationTargetTypes.TextTarget:
				return new TextTarget();
		}
	}
}

export { AnnotationTargetFactory };