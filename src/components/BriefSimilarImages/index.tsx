import ReactDOM from 'react-dom/client'
import { ExternalContext } from '../../useExternalContext'
import { Container, Typography } from '@mui/material'
import RecommendedImageComponent from '../MainComponents/RecommendedImageComponent'

export default function createExternalRoot(rootElement: HTMLElement) {
  const root = ReactDOM.createRoot(rootElement)

  return {
    async render(context: ExternalContext) {
      root.render(
        <>
          <Typography variant="h5" gutterBottom>
            Recommended Images for Brief
          </Typography>
          <RecommendedImageComponent context={context} />
        </>
      )
    },
    unmount() {
      root.unmount()
    },
  }
}
