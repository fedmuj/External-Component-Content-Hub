import ReactDOM from 'react-dom/client'
import { ExternalContext } from '../../useExternalContext'
import { ThemeProvider } from '@mui/material'
import SimilarCampaigns from '../MainComponents/SimilarCampaigns'

export default function createExternalRoot(rootElement: HTMLElement) {
  const root = ReactDOM.createRoot(rootElement)

  return {
    async render(context: ExternalContext) {
      root.render(
        <>
          <ThemeProvider theme={context.theme}>
            <SimilarCampaigns />
          </ThemeProvider>
        </>
      )
    },
    unmount() {
      root.unmount()
    },
  }
}
