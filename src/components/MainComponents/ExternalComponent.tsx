import { ExternalContext } from '../../useExternalContext'

import { createTranslatedVariant } from '../../libs/Translation'
import { getLocalizations, localizationOption } from '../../libs/Utils'
import { CSSProperties, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
const submitButtonStyle: CSSProperties = {
  textAlign: 'left',
  maxWidth: '200px',
  margin: '0 auto',
}

const inputContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
}
interface FormElements extends HTMLFormControlsCollection {
  localization: HTMLOptionElement
}
interface LocalizationFormElement extends HTMLFormElement {
  readonly elements: FormElements
}
export default function ExternalContent({
  context,
}: {
  context: ExternalContext
}) {
  const [localizations, setLocalizations] = useState<localizationOption[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getContextLocalizations()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function getContextLocalizations() {
    const l = await getLocalizations(context)
    setLocalizations(l)
  }

  return (
    <>
      <form
        onSubmit={(e: React.FormEvent<LocalizationFormElement>) => {
          setLoading(true)
          e.preventDefault()
          let localization = e.currentTarget.elements.localization.value
          const [localizationID, localizationCode] = localization.split('|')
          console.log(localization)
          createTranslatedVariant(localizationCode, localizationID, context)
        }}
      >
        <div style={inputContainerStyle}>
          <FormControl>
            <InputLabel id="localization" htmlFor="localization">
              Select a language
            </InputLabel>
            <Select id="localization" name="localization">
              <MenuItem value=""></MenuItem>
              {localizations.map((item: localizationOption) => (
                <MenuItem key={item.value} value={item.value || ''}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box style={submitButtonStyle}>
            <Button type="submit" variant="contained" color="primary">
              Translate
            </Button>
          </Box>
        </div>
      </form>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
