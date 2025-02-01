import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export type GridImageType = {
  assetID: number
  imageUrl: string
  fileName: string
  score?: number
}

interface ImageGridProps {
  images: GridImageType[]
  onAdd?: (image: GridImageType) => void
}

export default function ImageGrid({ images, onAdd }: ImageGridProps) {
  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: 2, width: 'calc(100% - 19rem)' }}
    >
      {images.map((img) => (
        <Grid item xs={6} sm={4} md={3} key={img.assetID}>
          <Card
            sx={{
              width: 220, // Narrower width
              position: 'relative', // We'll place icons with absolute positioning
            }}
          >
            {/* Image Preview (smaller height) */}
            <CardMedia
              component="img"
              height="120"
              image={img.imageUrl}
              alt={img.fileName}
              sx={{ objectFit: 'cover' }}
            />

            <CardContent sx={{ padding: '8px 16px' }}>
              {/* File Name */}
              <Typography
                variant="subtitle2"
                noWrap
                title={img.fileName}
                sx={{ lineHeight: 1.2 }}
              >
                {img.fileName}
              </Typography>

              {/* Score (if any) */}
              {img.score !== undefined && (
                <Typography variant="caption" color="text.secondary">
                  {img.score.toFixed(2)}
                </Typography>
              )}
            </CardContent>

            {/* Icon row at bottom */}
            <CardActions
              sx={{ justifyContent: 'space-between', padding: '4px 8px' }}
            >
              <Box>
                <IconButton
                  size="small"
                  onClick={() => onAdd?.(img)}
                  title="Add"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
