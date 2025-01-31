import ReactDOM from 'react-dom/client'
import ExternalContent from '../MainComponents/ExternalComponent'
import { ExternalContext } from '../../useExternalContext'
import { Container, ThemeProvider, Typography } from '@mui/material'
import CollaboratorsCard from '../MainComponents/CollaboratorsCard'

export default function createExternalRoot(rootElement: HTMLElement) {
  const root = ReactDOM.createRoot(rootElement)

  return {
    async render(context: ExternalContext) {
      root.render(
        <>
          <ThemeProvider theme={context.theme}>
            <CollaboratorsCard context={context} />
          </ThemeProvider>
        </>
      )
    },
    unmount() {
      root.unmount()
    },
  }
}
