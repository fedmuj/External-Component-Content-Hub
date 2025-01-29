import {
  CultureLoadOption,
  IChildToManyParentsRelation,
  IChildToOneParentRelation,
  IEntity,
  Nullable,
} from '@sitecore/sc-contenthub-webclient-sdk'
import { ExternalContext } from '../useExternalContext'
interface CampaignResponse {
  name: string
  type: string
  overview: string
  campaignBudget: string
  objectiveStrategy: string
  goal: string
  audiences: string
  message: string
  marketEnviorment: string
  projectoverview: string
  resourcesFound: string[]
  deliverables: Deliverable[]
}

interface Deliverable {
  name: string
  description: string
  type: string
  dueDate: string
}
export async function createBriefFromDraft(
  context: ExternalContext,
  formDate: FormData
): Promise<void> {
  console.log('createBriefFromDraft called')
  console.log('context:', context)
  console.log('formData:', formDate)
  for (const [key, value] of formDate.entries()) {
    console.log(`${key}: ${value}`)
  }

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    context:
      'Generate a creative and high-impact marketing campaign for Hellmann’s Vegan Product Line, focusing on appealing to health-conscious consumers, plant-based food lovers, and flexitarians. The campaign should position Hellmann’s Vegan Mayo and other plant-based condiments as the delicious, creamy, and ethical alternative to traditional options, without compromising on taste',
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow' as RequestRedirect,
  }

  try {
    const response = await fetch(
      'https://sitecore-brandbrief.vercel.app/api/brief-gen',
      requestOptions
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data: CampaignResponse = await response.json()
    console.log('API response mapped to CampaignResponse:', data)
    await mapApiResponseToEntity(data, context)
  } catch (error) {
    console.error('Error during API call:', error)
    const defaultData: CampaignResponse = {
      name: 'Grill & Thrill with Hellmann’s',
      type: 'Default Type',
      overview: 'Default Overview',
      campaignBudget: `15,000, allocated as follows:
Digital and Social Media Campaign: €6,000
Live Events (BBQ Festivals and Competitions): €2,000
Influencer Collaborations: €2,000
In-store Promotions: €2,000
Content Creation (Recipes, Videos, Photography): €3,000`,
      objectiveStrategy: 'Default Strategy',
      goal: 'To position Hellmann’s as the ultimate companion for barbecue lovers by showcasing its versatility in enhancing grilled dishes and sides, while boosting brand awareness and increasing summer product sales.',
      audiences: `Primary: Families and friends hosting summer barbecues who value delicious, hassle-free meal preparation.
Secondary: Grilling enthusiasts and home cooks looking to elevate their barbecue flavors.`,
      message: `Take your barbecue to the next level with Hellmann’s! From marinades to dips and spreads, our products add creamy, mouthwatering perfection to every dish you grill and serve.`,
      marketEnviorment:
        'Barbecues are a staple of summer gatherings, but consumers are constantly seeking new, exciting ways to enhance their grilling experience. Hellmann’s products can stand out by highlighting versatility and ease of use.',
      projectoverview:
        'The campaign will focus on the summer barbecue season with vibrant, food-centric content across digital and physical platforms. Key elements will include partnerships with grillmasters and chefs, in-store activations, and recipe inspiration.',
      resourcesFound: [],
      deliverables: [],
    }

    await mapApiResponseToEntity(defaultData, context)
  }
}

async function mapApiResponseToEntity(
  data: CampaignResponse,
  context: ExternalContext
): Promise<void> {
  const locale = 'en-US'
  const startDate: Date = new Date()

  var block: IEntity = await context.client.entityFactory.createAsync(
    'M.Project.Block',
    new CultureLoadOption([locale])
  )

  // Set the properties of the block
  block.setPropertyValue('BlockName', data.name)
  block.setPropertyValue('BlockDescription', data.overview)
  block.setPropertyValue('BriefContent', data.overview)
  block.setPropertyValue('Duration', 15)
  block.setPropertyValue('IsRoot', true)
  block.setPropertyValue('IsTemplate', false)
  block.setPropertyValue('StartDateOffset', startDate)

  setRelation(block, 'BriefTypeToProject', 44687)
  setRelation(block, 'BlockLifecycleStatusToBlock', 1268)
  setRelation(block, 'BlockTypeToBlock', 8839)
  setRelation(block, 'ProjectPhaseToProject', 47311)
  setRelation(block, 'LocalizationToBlock', 29156)
  setRelation(block, 'BrandToProject', 47992)
  setRelation(block, 'ProjectCategoryToProject', 33425)
  setRelation(block, 'UserToProjectRequestor', 33722)

  //  var relation: Nullable<IChildToManyParentsRelation> = block.getRelation(
  //    'BlockToContentBrief'
  //  ) as IChildToManyParentsRelation
  //  if (relation) {
  //    relation.setIds([51724])
  //  }

  var relation: Nullable<IChildToManyParentsRelation> = block.getRelation(
    'MProjectBlockToStateMachine'
  ) as IChildToManyParentsRelation
  if (relation) {
    relation.setIds([45248])
  }

  let blockID = await context.client.entities.saveAsync(block)

  // ***************** Create Brief Content *****************
  var briefContent: IEntity = await context.client.entityFactory.createAsync(
    'M.Content',
    new CultureLoadOption([locale])
  )

  briefContent.setPropertyValue('Content.Name', data.name)
  setRelation(briefContent, 'ContentTypeToContent', 49244)
  setRelation(briefContent, 'ContentLifeCycleToContent', 9795)
  setRelation(briefContent, 'DeliverablesLifecycleStatusToContent', 1273)
  //setRelation(briefContent, 'ContentVersionHistory', 51725)
  briefContent.setPropertyValue('Brief_Audience', data.audiences)
  briefContent.setPropertyValue('Brief_Budget', data.campaignBudget)
  briefContent.setPropertyValue('Brief_Goal', data.goal)
  briefContent.setPropertyValue(
    'Brief_Market_Environment',
    data.marketEnviorment
  )
  briefContent.setPropertyValue(
    'Brief_ObjectivesStrategy',
    data.objectiveStrategy
  )
  briefContent.setPropertyValue('Brief_ProjectOverview', data.projectoverview)
  briefContent.setPropertyValue('Brief_message', data.message)

  var relation: Nullable<IChildToManyParentsRelation> =
    briefContent.getRelation(
      'ContentRepositoryToContent'
    ) as IChildToManyParentsRelation
  if (relation) {
    relation.setIds([9799, 1277])
  }

  var relation: Nullable<IChildToManyParentsRelation> =
    briefContent.getRelation(
      'BlockToContentBrief'
    ) as IChildToManyParentsRelation
  if (relation) {
    relation.setIds([blockID])
  }

  await context.client.entities.saveAsync(briefContent)
  debugger
}
function setRelation(entity: IEntity, relationName: string, id: number): void {
  const relation = entity.getRelation(
    relationName
  ) as Nullable<IChildToOneParentRelation>
  if (relation) {
    console.log(`Setting relation ${relationName} to ${id}`)
    relation.setId(id)
  } else {
    throw new Error(`Relation ${relationName} not found on entity`)
  }
}
