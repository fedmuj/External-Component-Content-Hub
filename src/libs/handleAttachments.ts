'use server'

import { PDFDocument, StandardFonts } from 'pdf-lib'

export async function handleAttachment(formData: FormData) {
  const briefText = formData.get('briefText') as string
  const file = formData.get('file') as File

  let attachment

  if (briefText) {
    // Convert brief text to PDF attachment
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const fontSize = 12
    const margin = 50
    const lineHeight = fontSize * 1.2

    page.setFont(font)
    page.setFontSize(fontSize)

    const lines = briefText.split('\n')
    lines.forEach((line, index) => {
      page.drawText(line, {
        x: margin,
        y: page.getHeight() - margin - lineHeight * index,
        size: fontSize,
      })
    })

    const pdfBytes = await pdfDoc.save()

    // Extract a snippet of the PDF content (first 100 characters)
    const snippet =
      briefText.length > 100 ? briefText.slice(0, 100) + '...' : briefText

    attachment = {
      name: 'brief-text.pdf',
      content: pdfBytes,
      type: 'application/pdf',
      size: pdfBytes.length,
      snippet,
    }
  } else if (file && file.name !== '') {
    // Process the uploaded file
    const arrayBuffer = await file.arrayBuffer()
    attachment = {
      name: file.name,
      content: arrayBuffer,
      type: file.type,
      size: file.size,
    }
  }

  if (attachment) {
    console.log('Processed attachment:', attachment.name)
    // Here you would typically save the attachment to a database or storage service
    // For this example, we'll just log the details
    console.log('Attachment size:', attachment.size, 'bytes')
    console.log('Attachment type:', attachment.type)
  }

  return {
    success: true,
    attachment: attachment
      ? {
          name: attachment.name,
          type: attachment.type,
          size: attachment.size,
          snippet: 'snippet' in attachment ? attachment.snippet : null,
        }
      : null,
  }
}
