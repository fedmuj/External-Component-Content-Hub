import { useState } from 'react'

import { handleAttachment } from '../../libs/handleAttachments'
import { Button, Input, TextField, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { ExternalContext } from '../../useExternalContext'

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
    const result = await handleAttachment(formData)
    if (result.success) {
      setMessage({
        type: 'success',
        content: 'Attachment processed successfully!',
      })
      setAttachment(result.attachment)
      setBriefText('')
      setFile(null)
    } else {
      setMessage({
        type: 'error',
        content: 'Failed to process attachment. Please try again.',
      })
    }
    setPending(false)
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
      <div>
        <Typography>Brief Text (will be converted to PDF)</Typography>
        <TextField
          id="briefText"
          name="briefText"
          value={briefText}
          onChange={(e) => {
            setBriefText(e.target.value)
            setFile(null)
          }}
          placeholder="Enter brief text to convert to PDF attachment"
          className="w-full"
          multiline
          rows={4}
          variant="outlined"
        />
        <Button
          onClick={handleSubmitBrief}
          className="mt-2"
          disabled={!briefText}
        >
          Submit Brief
        </Button>
      </div>
      <div className="text-center">OR</div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(new FormData(e.currentTarget))
        }}
        className="space-y-4"
      >
        <div>
          <Typography>Upload File</Typography>
          <Input
            id="file"
            name="file"
            type="file"
            onChange={handleFileChange}
            className="mt-1"
          />
        </div>
        {file && (
          <p className="text-sm text-gray-500">Selected file: {file.name}</p>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? 'Processing...' : 'Submit File'}
        </Button>
      </form>
      {message && (
        <div
          className={`flex items-center ${
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message.type === 'success' ? <AddCircleIcon /> : <AddCircleIcon />}
          {message.content}
        </div>
      )}
      {attachment && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold mb-2">Processed Attachment</h3>
          <div className="flex items-center">
            <AddCircleIcon />
            <span>{attachment.name}</span>
          </div>
          <p className="text-sm text-gray-600">Type: {attachment.type}</p>
          <p className="text-sm text-gray-600">
            Size: {(attachment.size / 1024).toFixed(2)} KB
          </p>
          {attachment.snippet && (
            <div className="mt-2">
              <h4 className="font-semibold text-sm mb-1">Content Snippet:</h4>
              <div className="p-2 bg-white rounded border border-gray-200 text-sm">
                <AddCircleIcon />
                {attachment.snippet}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
