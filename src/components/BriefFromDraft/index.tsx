import ReactDOM from 'react-dom/client'
import ExternalContent from '../MainComponents/ExternalComponent'
import { ExternalContext } from '../../useExternalContext'
import { Container, ThemeProvider, Typography } from '@mui/material'
import { AttachmentForm } from '../MainComponents/BriefDraftForm'

export default function createExternalRoot(rootElement: HTMLElement) {
  const root = ReactDOM.createRoot(rootElement)

  return {
    async render(context: ExternalContext) {
      root.render(
        <>
          <ThemeProvider theme={context.theme}>
            <AttachmentForm context={context} />
          </ThemeProvider>
        </>
      )
    },
    unmount() {
      root.unmount()
    },
  }
}
