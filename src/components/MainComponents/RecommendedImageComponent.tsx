import { ExternalContext } from '../../useExternalContext'

import { assetsVisualSearch } from '../../libs/VisualSearch'
import { useEffect, useState } from 'react'
import ImageGrid, {
  GridImageType as GridImageType,
} from '../ImageGridComponent'
import { EntityResource } from '@sitecore/sc-contenthub-webclient-sdk'
import { visualSearchTermGenerator } from '../../libs/OpenAIServices'
import createRelationshipBlockAssetDeliverablesCMP from '../../libs/RecommendedImagesCMP'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function RecommendedImageComponent({
  context,
}: {
  context: ExternalContext
}) {
  const [images, setImages] = useState<GridImageType[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    debugger
    search()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function addToBrief(image: GridImageType) {
    setLoading(true)
    await createRelationshipBlockAssetDeliverablesCMP(context, image.assetID)
    console.log('Add to Brief  ' + image.assetID)
    search()
  }

  async function search() {
    setLoading(true)

    let marketingBrief: {
      Brief_Title?: string
      Brief_Audience?: string
      Brief_Goal?: string
      Brief_Message?: string
    } = {}
    marketingBrief['Brief_Title'] =
      (
        context.entity?.properties['Content.Name']?.Invariant as string
      )?.replace(/<\/?[^>]+(>|$)/g, '') || ''

    debugger
    marketingBrief['Brief_Audience'] =
      (
        context.entity?.properties['Brief_Audience']?.Invariant as string
      )?.replace(/<\/?[^>]+(>|$)/g, '') || ''
    marketingBrief['Brief_Goal'] =
      (context.entity?.properties['Brief_Goal']?.Invariant as string)?.replace(
        /<\/?[^>]+(>|$)/g,
        ''
      ) || ''
    marketingBrief['Brief_Message'] =
      (
        context.entity?.properties['Brief_message']?.Invariant as string
      )?.replace(/<\/?[^>]+(>|$)/g, '') || ''
    const searchTerm = await visualSearchTermGenerator(
      JSON.stringify(marketingBrief)
    )
    const l = await assetsVisualSearch(context, searchTerm)
    let images = transformEntitiesReources(l)
    setImages(images)
    setLoading(false)
  }

  return (
    <>
      <button onClick={search} disabled={loading}></button>
      <ImageGrid images={images} onAdd={addToBrief}></ImageGrid>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
function transformEntitiesReources(l: EntityResource[]): GridImageType[] {
  return l.map((entity) => {
    const renditions = entity.renditions as {
      [key: string]: { href: string }[]
    }
    const thumbnail = renditions.thumbnail?.[0]?.href || ''
    return {
      imageUrl: thumbnail,
      prompt: entity.properties['Title'] as string,
      assetID: entity.id,
      fileName: entity.properties['FileName'] as string,
    }
  })
}
