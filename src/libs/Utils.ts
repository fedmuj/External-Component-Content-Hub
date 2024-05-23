import { EntityLoadConfiguration, IEntityLoadConfiguration } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/entity-load-configuration";
import { ExternalContext } from "../useExternalContext";
import { LoadOption } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/load-options";


export type localizationOption = {
    name: string | null;
    value: string | null;
};


export async function getLocalizations(context: ExternalContext) {

    let loadConfiguration: IEntityLoadConfiguration =
        EntityLoadConfiguration.Full;
    let loadConfiguration_ = loadConfiguration
        .builder()
        .withProperty("DisplayName")
        .inCulture(context.options.culture)
        .withRelations(LoadOption.None)
        .build();
    let localizations = await context.client.entities.getByDefinitionAsync(
        "M.Localization",
        loadConfiguration_
    );
    let localizationsText = localizations.items.map<localizationOption>(
        (item) => {
            let langCod =
                item.getPropertyValue<"String">(
                    "DisplayName",
                    context.options.culture
                ) || null;
            return {
                name: langCod,
                value: item.id + "|" + langCod || null,
            };
        }
    );
    return localizationsText;
}
