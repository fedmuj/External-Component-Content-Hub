import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  CircularProgress,
  IconButton,
  Chip,
  Checkbox,
} from '@mui/material'
import SparklesIcon from '@mui/icons-material/AutoAwesome'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const SimilarCampaigns = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<number[]>([])
  const [addedCampaigns, setAddedCampaigns] = useState<
    { id: number; name: string; status: string; fit: string; image: string }[]
  >([])

  const allCampaigns = [
    {
      id: 1,
      name: 'Fuel Up, Thrive On',
      status: 'DONE',
      fit: '91%',
      image:
        'https://almu-unilever.sitecoresandbox.cloud/api/public/content/3489d95fe1df4ae1a1d0c09ae836f178?v=74069067',
    },
    {
      id: 2,
      name: 'Because Every Bite Matters',
      status: 'DONE',
      fit: '84%',
      image:
        'https://almu-unilever.sitecoresandbox.cloud/api/public/content/8493cdeeb0164185a6b1785b81d295f9?v=bf6aa484',
    },
    {
      id: 3,
      name: 'Start Strong, Finish Stronger',
      status: 'DONE',
      fit: '82%',
      image:
        'https://almu-unilever.sitecoresandbox.cloud/api/public/content/d18776655f564245b46c68d51b24379e?v=392f0d5e',
    },
    {
      id: 4,
      name: 'Own Your Energy',
      status: 'IN PROGRESS',
      fit: '82%',
      image:
        'https://almu-unilever.sitecoresandbox.cloud/api/public/content/13225f63c5e84db3b4a92c18ce07ddd2?v=a3e78612',
    },
    {
      id: 5,
      name: 'Nourish Your Potential',
      status: 'DRAFT',
      fit: '74%',
      image:
        'https://almu-unilever.sitecoresandbox.cloud/api/public/content/ba4ab3c95ea946d3b47e5d23540e0874?v=1edda6dc',
    },
  ]

  const handleOpen = () => {
    setLoading(true)
    setOpen(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedCampaignIds([]) // Clear selections when closing the modal
  }

  const handleToggleSelect = (id: number) => {
    setSelectedCampaignIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    )
  }

  const handleAddSelectedCampaigns = () => {
    setLoading(true)
    setTimeout(() => {
      const selected = allCampaigns.filter((campaign) =>
        selectedCampaignIds.includes(campaign.id)
      )
      setAddedCampaigns((prev) => [...prev, ...selected])
      handleClose()
      setLoading(false)
    }, 2000)
  }

  return (
    <>
      <Card sx={{ maxWidth: 1000, p: 2, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          {/* Header */}
          <Box display="flex" alignItems="center" mb={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#f3e5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                mr: 2,
              }}
            >
              <SparklesIcon sx={{ color: '#9c27b0' }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                Similar campaigns
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Past campaigns that worked well, which can be used as
                inspiration.
              </Typography>
            </Box>
          </Box>

          {/* Added Campaigns */}
          {addedCampaigns.map((campaign) => (
            <Box
              key={campaign.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
              p={1}
              border="1px solid #e0e0e0"
              borderRadius={1}
            >
              <Box display="flex" alignItems="center">
                <Box
                  component="img"
                  src={campaign.image}
                  alt={campaign.name}
                  sx={{ width: 40, height: 40, borderRadius: 1, mr: 2 }}
                />
                <Typography variant="body1" fontWeight="bold">
                  {campaign.name}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip label={campaign.status} size="small" />
                <IconButton>
                  <OpenInNewIcon />
                </IconButton>
              </Box>
            </Box>
          ))}

          {/* Campaign Options */}
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                startIcon={<SparklesIcon />}
                fullWidth
                sx={{ height: 60, justifyContent: 'flex-start', maxWidth: 200 }}
                onClick={handleOpen}
              >
                Add with AI
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                fullWidth
                sx={{
                  height: 60,
                  justifyContent: 'flex-start',
                  maxWidth: 200,
                  marginLeft: 'auto',
                }}
              >
                Add campaign
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Paper sx={{ maxWidth: 800, margin: '5% auto', p: 3, borderRadius: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              Similar campaigns
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {loading ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={5}
            >
              <CircularProgress sx={{ mb: 2 }} />
            </Box>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Select the campaigns you want to add:
              </Typography>

              {allCampaigns.map((campaign) => (
                <Box
                  key={campaign.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                  p={1}
                  borderBottom="1px solid #e0e0e0"
                >
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={selectedCampaignIds.includes(campaign.id)}
                      onChange={() => handleToggleSelect(campaign.id)}
                    />
                    <Box
                      component="img"
                      src={campaign.image}
                      alt={campaign.name}
                      sx={{ width: 40, height: 40, borderRadius: 1, mr: 2 }}
                    />
                    <Typography variant="body1">{campaign.name}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                      label={`${campaign.fit} fit`}
                      size="small"
                      sx={{ bgcolor: '#e8f5e9', color: '#388e3c' }}
                    />
                    <Chip
                      label={campaign.status}
                      size="small"
                      sx={{
                        bgcolor:
                          campaign.status === 'DONE'
                            ? '#e8f5e9'
                            : campaign.status === 'IN PROGRESS'
                            ? '#fff3e0'
                            : '#e3f2fd',
                        color:
                          campaign.status === 'DONE'
                            ? '#388e3c'
                            : campaign.status === 'IN PROGRESS'
                            ? '#f57c00'
                            : '#0288d1',
                      }}
                    />
                  </Box>
                </Box>
              ))}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleAddSelectedCampaigns}
              >
                + Add campaigns
              </Button>
            </>
          )}
        </Paper>
      </Modal>
    </>
  )
}

export default SimilarCampaigns
