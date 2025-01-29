import {
  CultureLoadOption,
  EntityLoadConfiguration,
  PropertyLoadOption,
  RelationLoadOption,
} from '@sitecore/sc-contenthub-webclient-sdk'
import { ExternalContext } from '../useExternalContext'

/**
 * Creates a relationship between a block from a CMP entity and asset deliverables.
 *
 * This function loads a block entity using the target CMP ID in the context,
 * retrieves the 'BlockToAssetDeliverables' relation, and adds the given asset ID
 * to this relation. Finally, it saves the updated block entity.
 *
 * @param context - The external context containing client and options.
 * @param assetId - The ID of the asset to be related to the block.
 * @returns A promise that resolves when the relationship is created and the block is saved.
 */
async function createRelationshipBlockAssetDeliverablesCMP(
  context: ExternalContext,
  assetId: number
): Promise<void> {
  let confBriefContent: EntityLoadConfiguration = new EntityLoadConfiguration(
    new CultureLoadOption([context.options.culture]),
    PropertyLoadOption.None,
    new RelationLoadOption(['BlockToContentBrief'])
  )
  let contentCMP = await context.client.entities.getAsync(
    context.options.entityId,
    confBriefContent
  )
  let CMPtoBlock = await contentCMP?.getRelationAsync('BlockToContentBrief')

  let blockId = CMPtoBlock?.getIds()[0]
  console.log('Block ID: ' + blockId)

  let conf: EntityLoadConfiguration = new EntityLoadConfiguration(
    new CultureLoadOption([context.options.culture]),
    PropertyLoadOption.None,
    new RelationLoadOption(['BlockToAssetDeliverables'])
  )
  if (blockId !== undefined) {
    const block = await context.client.entities.getAsync(blockId, conf)
    if (block) {
      const relation = await block.getRelationAsync('BlockToAssetDeliverables')
      relation?.setIds(relation?.getIds().concat(assetId))
      await context.client.entities.saveAsync(block)
      console.log('BlockToAssetDeliverables relation set')
    }
  }
}

export default createRelationshipBlockAssetDeliverablesCMP
