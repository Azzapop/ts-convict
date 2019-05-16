import { getMetaSchemaStorage } from '../';
import { SchemaObj } from 'convict';

/**
 * Anotate a config schema class property with this anotation. 
 * @param schemaObj The convict schema object. 
 */
export function Property(schemaObj: SchemaObj) {
    return (target: object, propertyName: string) => {
        
        let type: any;
        // if type is not given explicitly then try to guess it
        const reflectMetadataType = Reflect && (Reflect as any).getMetadata ? (Reflect as any).getMetadata("design:type", target, propertyName) : undefined;
        if (!type && reflectMetadataType) {
            type = reflectMetadataType;
        }
        const className: string = target.constructor.name;

        getMetaSchemaStorage().addSchemaProp(className,propertyName,schemaObj);

    };
}
