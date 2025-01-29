import { Grid, Typography, IconButton } from '@mui/material'
import { ExternalContext } from '../useExternalContext'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export type GridImageType = {
  assetID: number
  imageUrl: string
  prompt: string
}

export default function ImageGrid({
  context,
  images,
  clickHandler: addToBrief,
}: {
  context: ExternalContext
  images: GridImageType[]
  clickHandler: (gridImage: GridImageType) => void
}) {
  function handleSaveImage(imageUrl: any): void {
    throw new Error('Function not implemented.')
  }

  return (
    <Grid container spacing={1} style={{ marginTop: '1rem' }}>
      {images.map((image, index) => (
        <Grid item columns={2} key={index}>
          <img
            src={image.imageUrl}
            alt={`Title ${image.prompt}`}
            style={{
              width: '300px',
              height: 'auto',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
            }}
          />
          <Typography
            variant="caption"
            display="block"
            gutterBottom
          ></Typography>
          <IconButton onClick={() => addToBrief(image)} title="Add to Brief">
            <AddCircleIcon />
          </IconButton>
        </Grid>
      ))}
    </Grid>
  )
}
