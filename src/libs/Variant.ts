import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";


export type CopyProfile = 'none' | 'M.EntityCopyProfile.M.Content.Localizations'
export interface EntityOverride {
    source_entity_id: number;
    copy_profile_identifier: CopyProfile;
    culture: string;
    properties_overrides: PropertiesOverride;
    relations_overrides: RelationOverride;
    page_entity_id: number;
}

export interface PropertiesOverride {
    [key: string]: {
        required: boolean;
        value: string;
    }
}

export interface RelationOverride {
    [key: string]: {
        required: boolean;
        links: number[];
    }
}

interface ResponseTypeCommand {
    failed_properties: Record<string, unknown>;
    failed_relations: Record<string, unknown>;
    success: boolean;
    failure: string | null;
    derivative_ids: number[];
}

function isResponseTypeCommand(response: unknown): response is ResponseTypeCommand {
    return (response as ResponseTypeCommand).success !== undefined;
}

export async function createVariant(entity: EntityOverride, client: ContentHubClient): Promise<number> {
    try {
        const response = await client.commands.executeCommandAsync("derivatives", "create.variant", entity);

        if (!isResponseTypeCommand(response)) {
            throw new Error("Invalid response format");
        }

        if (response.success) {
            return response.derivative_ids[0];
        } else {
            throw new Error(response.failure || "Failed to create variant due to unknown reasons");
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating variant: ${error.message}`);
        } else throw new Error(`Error creating variant: unknow Error type`);
    }
}