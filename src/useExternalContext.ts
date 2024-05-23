import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";
import { IEntity } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/base/entity";
import CultureInfo from "@sitecore/sc-contenthub-webclient-sdk/dist/culture-info";
import { FieldFilterRequestResource } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/field-filter-request-resource";


export interface SearchApi {
    addListener: () => void;
    activate: (searchIdentifier: string) => void;
    updateQuery: (searchIdentifier: string, query: string) => void;
    addFilters: (searchIdentifier: string, filters: Array<FieldFilterRequestResource>) => void;
    updateFullTextFilter: (searchIdentifier: string, text: string) => void;
    clearFullTextFilter: (searchIdentifier: string) => void;
    getEventSearchIdentifier: (searchIdentifier: string) => string;
}

export interface SelectionApi {
    addToSelection: (ids: Array<number>, selectionPoolIdentifier: string, subPoolId?: number) => void;
    removeFromSelection: (ids: Array<number>, selectionPoolIdentifier: string, subPoolId?: number) => void;
    clearSelection: (selectionPoolIdentifier: string, subPoolId?: number, definitionNames?: Array<string>) => void;
}

export interface DetailsApi {
    setEntitySource: (identifier: string, entityId: number) => void;
}



export interface ExternalUser {
    id: number;
    userName: string;
    userGroups: Array<string>;
    privileges: Array<string>;
}


interface ExternalEntityPropetiy {
    Invariant: string | number | boolean | null
}
export interface ExternalEntity {
    properties: { [key: string]: ExternalEntityPropetiy };
    renditions: any[];
    relations: { [key: string]: number[] };


}

export interface ExternalOptions {
    properties: { [key: string]: ExternalEntityPropetiy };
    renditions: any[];
    relations: { [key: string]: number[] };
    entityId: number;
    culture: CultureInfo;
    editingMode: string;
    isEditing: boolean;
    isInModal: boolean;
    isInTab: boolean;
    isInSidebar: boolean;
    nestingLevel: number;
    modalPageName: string;
    modalEntityId: number;
    isDisabled: boolean;
}


export interface ExternalContext {
    name: string;
    theme: any; // TODO: create and use theme context instead
    options: ExternalOptions;
    user: Readonly<ExternalUser>;
    client: ContentHubClient;
    config: Readonly<Record<string, unknown>>;
    api: any;
    entity: ExternalEntity | null;
}





