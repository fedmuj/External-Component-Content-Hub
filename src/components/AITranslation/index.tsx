import ReactDOM from "react-dom/client";
import ExternalContent from "../ExternalComponent";
import { ExternalContext } from "../../useExternalContext";
import { Container, Typography } from "@mui/material";

export default function createExternalRoot(rootElement: HTMLElement) {
  const root = ReactDOM.createRoot(rootElement);

  return {
    async render(context: ExternalContext) {
      root.render(
        <>
          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
              Automatic Translation with AI
            </Typography>
            <ExternalContent context={context} />
          </Container>
        </>
      );
    },
    unmount() {
      root.unmount();
    },
  };
}
