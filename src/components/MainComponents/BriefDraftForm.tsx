import { useState } from 'react'

import { handleAttachment } from '../../libs/handleAttachments'
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Input,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { ExternalContext } from '../../useExternalContext'
import { createBriefFromDraft } from '../../libs/CreateBriefFromDraft'

export function AttachmentForm({ context }: { context: ExternalContext }) {
  const [briefText, setBriefText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    content: string
  } | null>(null)
  const [attachment, setAttachment] = useState<{
    name: string
    type: string
    size: number
    snippet?: string | null
  } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    setMessage(null)
    setAttachment(null)
    await createBriefFromDraft(context, formData)
    const result = await handleAttachment(formData)
    if (result.success) {
      setMessage({
        type: 'success',
        content: 'Attachment processed successfully!',
      })
      //setAttachment(result.attachment)
      //setBriefText('')
      //setFile(null)
    } else {
      setMessage({
        type: 'error',
        content: 'Failed to process attachment. Please try again.',
      })
    }
    setPending(false)
    window.location.reload()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setBriefText('')
    }
  }

  const handleSubmitBrief = async () => {
    const formData = new FormData()
    formData.append('briefText', briefText)
    await handleSubmit(formData)
  }

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Typography variant="h6">
          Brief Text (will be converted to PDF)
        </Typography>
        <TextField
          id="briefText"
          name="briefText"
          value={briefText}
          onChange={(e) => {
            setBriefText(e.target.value)
            setFile(null)
          }}
          placeholder="Enter brief text to convert to PDF attachment"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
      </Stack>
      <Stack spacing={3} alignItems="center">
        <Divider sx={{ width: '100%' }}>
          <Chip label="OR" />
        </Divider>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(new FormData(e.currentTarget))
          }}
        >
          <Stack
            spacing={2}
            alignItems="stretch"
            sx={{ width: '100%', maxWidth: 400 }}
          >
            <Typography variant="h6">Upload File</Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ textTransform: 'none' }}
            >
              Choose File
              <input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {file && (
              <Typography variant="caption" color="text.secondary">
                Selected file: {file.name}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={pending}
              sx={{ mt: 2 }}
            >
              {pending ? 'Processing...' : 'Create Brief'}
            </Button>
          </Stack>
        </form>

        {message && (
          <Alert
            severity={message.type === 'success' ? 'success' : 'error'}
            icon={
              message.type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />
            }
          >
            {message.content}
          </Alert>
        )}

        {attachment && (
          <Paper
            elevation={1}
            sx={{ p: 2, mt: 3, width: '100%', maxWidth: 400 }}
          >
            <Typography variant="h6" gutterBottom>
              Processed Attachment
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <AttachFileIcon sx={{ mr: 1 }} />
                <Typography>{attachment.name}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Type: {attachment.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {(attachment.size / 1024).toFixed(2)} KB
              </Typography>
              {attachment.snippet && (
                <Box mt={1}>
                  <Typography variant="subtitle2" gutterBottom>
                    Content Snippet:
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 1 }}>
                    <Typography variant="body2">
                      {attachment.snippet}
                    </Typography>
                  </Paper>
                </Box>
              )}
            </Stack>
          </Paper>
        )}
      </Stack>
      <Backdrop open={pending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
