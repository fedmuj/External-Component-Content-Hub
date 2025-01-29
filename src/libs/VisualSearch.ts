import { EntityLoadConfiguration } from '@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/entity-load-configuration'
import { ExternalContext } from '../useExternalContext'
import {
  CultureLoadOption,
  EntityResource,
  PropertyLoadOption,
  RelationLoadOption,
  SearchRequest,
} from '@sitecore/sc-contenthub-webclient-sdk'

export type localizationOption = {
  name: string | null
  value: string | null
}

export async function assetsVisualSearch(
  context: ExternalContext,
  searchTerm: string
): Promise<EntityResource[]> {
  let searchRequest: SearchRequest = new SearchRequest()
  console.log('Search Tearms :' + searchTerm)
  searchRequest.fields = [
    'AssetsMediaToAsset',
    'Title',
    'FileSize',
    'BlockToAssetDeliverables',
  ]
  searchRequest.visualSearch = { type: 'vector', text: searchTerm }
  searchRequest.take = 12
  let values = []

  searchRequest.fieldFilters = [
    {
      fieldName: 'relations.BlockToAssetDeliverables.parents',
      operator: 15,
      values: [49443],
      hidden: true,
      filterType: 4,
      role: 'Parent',
      visible: false,
      nestedValues: [],
      multiSelect: false,
    },
  ]
  debugger
  let response = await context.client.search.searchAsync(searchRequest)

  let confBriefContent: EntityLoadConfiguration = new EntityLoadConfiguration(
    new CultureLoadOption([context.options.culture]),
    PropertyLoadOption.None,
    new RelationLoadOption(['BlockToContentBrief'])
  )
  let briefContent = await context.client.entities.getAsync(
    context.options.entityId,
    confBriefContent
  )
  let block = await briefContent?.getRelationAsync('BlockToContentBrief')
  console.log(block?.getIds())
  let blockID = block?.getIds()[0]

  let conf: EntityLoadConfiguration = new EntityLoadConfiguration(
    new CultureLoadOption([context.options.culture]),
    PropertyLoadOption.None,
    new RelationLoadOption(['BlockToAssetDeliverables'])
  )
  let final: EntityResource[] =
    (await Promise.all(
      response.items.map(async (item) => {
        let ent = await context.client.entities.getAsync(item.id, conf)
        debugger
        let relation = await ent?.getRelationAsync('BlockToAssetDeliverables')

        if (relation) {
          let ids = relation.getIds()
          if (blockID !== undefined && ids.includes(blockID)) {
            return null
          }
        }
        return item
      })
    ).then((results) =>
      results.filter((item): item is EntityResource => item !== null)
    )) || []

  return final.slice(0, 6)
}
