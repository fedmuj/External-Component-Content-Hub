
import { EntityLoadConfiguration, IEntityLoadConfiguration } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/entity-load-configuration";
import { ExternalContext } from "../useExternalContext";
import { EntityOverride, createVariant } from "./Variant";
import { LoadOption } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/load-options";
import { openAITranslation } from "./OpenAIServices";
import { Nullable } from "@sitecore/sc-contenthub-webclient-sdk";
import { RealtimeRequestById } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/notifications/realtime-request-by-id";
import { RealtimeRequestByUsername } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/notifications/realtime-request-by-username";

export async function createTranslatedVariant(localizationCode: string, localizationId: string, context: ExternalContext): Promise<number> {
    console.log("localizationCode ->" + localizationCode)
    console.log("localizationId ->" + localizationId)
    const locCode: number = Number(localizationId);
    const contentName = context.entity?.properties["Content.Name"]?.Invariant;

    if (typeof contentName !== 'string') {
        throw new Error(context.entity ? "Invalid entity attribute type Content.Name" : "Empty entity in context");
    }

    let entityVariantConfig: EntityOverride = {
        source_entity_id: context.options.entityId,
        copy_profile_identifier: "M.EntityCopyProfile.M.Content.Localizations",
        culture: context.options.culture,
        page_entity_id: context.options.entityId,
        properties_overrides: {
            "Content.Name": {
                required: true,
                value: contentName,
            },
        },
        relations_overrides: {
            LocalizationToContent: {
                required: true,
                links: [locCode],
            },
        },
    };

    let variantID = await createVariant(entityVariantConfig, context.client);
    let loadConfiguration: IEntityLoadConfiguration =
        EntityLoadConfiguration.Full;
    let loadConfiguration_ = loadConfiguration
        .builder()
        .withProperties(LoadOption.All)
        .inCulture(context.options.culture)
        .withRelations(LoadOption.All)
        .build();

    let justCreatedVariant = await context.client.entities.getAsync(variantID, loadConfiguration_)
    if (justCreatedVariant == null)
        throw new Error("Invalid entity attribute type Content.Name");

    let relation = await justCreatedVariant.getRelationAsync("ContentTypeToContent")

    
    
    let contentTypeId = relation?.getIds()?.[0] || 0;

    let contentTypeEntity = await context.client.entities.getAsync(contentTypeId,loadConfiguration)
    debugger
    console.log(contentTypeEntity?.id)



    // Now you can safely use relation.properties[contentTypeId]

    let contentType = relation?.properties[contentTypeId]["ContentType.Label"][context.options.culture] as string;


    let propertiesNeedsTranslation = justCreatedVariant.properties.filter((prop) => prop.dataType == "String" && prop.name.startsWith(contentType))
    console.log("Much : " + propertiesNeedsTranslation?.length);

    let translationValue: Nullable<string>;
    let valueToTranslate: Nullable<string> | undefined;


    for (const property of propertiesNeedsTranslation) {
        valueToTranslate = justCreatedVariant?.getPropertyValue<"String">(property.name)
        if (valueToTranslate) {
            translationValue = await openAITranslation(valueToTranslate, localizationCode,context);
            justCreatedVariant?.setPropertyValue<"String">(property.name, translationValue)
        }
    }

    debugger
    let contentItemId = await context.client.entities.saveAsync(justCreatedVariant);

    console.log("Variant ID : " + justCreatedVariant?.identifier);
    console.log("Variant ID : " + contentItemId);
    console.log("Variant ID : " + relation?.name);

    const finish = new RealtimeRequestByUsername();
    finish.recipients.push(context.user.userName)
    finish.setBody("The tranlsation was done successfully")
    finish.notificationLevel = 2
    
    context.client.notifications.sendRealTimeNotificationAsync(finish)
    window.location.href = "/"+context.options.culture+"/content/detail/"+variantID

    return 0

}

