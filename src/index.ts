import PlatformTools from './PlatformTools';
import MetaSchemaStorage from "./MetaSchemaStorage";
import {ConvictModel} from './ConvictModel';

export * from './interfaces';
export * from './decorators/Property';
export * from './decorators/Config';
export * from './TSConvict';
export {
    ConvictModel
};
/**
 * Gets schema storage from the global
 */
export function getMetaSchemaStorage(): MetaSchemaStorage {

    const globalScope = PlatformTools.getGlobalVariable();
    if (!globalScope.convictMetaSchemaStorage) {
        globalScope.convictMetaSchemaStorage = new MetaSchemaStorage();
    }
    return globalScope.convictMetaSchemaStorage;
}

/**
 * Quickly get a convict model
 * @param entities
 */
export function getConvictModel(entities?: Array<((new ()=>{})|string)>): ConvictModel {
    return new ConvictModel(entities);
}

export interface SchemaRepoItem {
    name: string;
    schema: any;
    class: any;
}
