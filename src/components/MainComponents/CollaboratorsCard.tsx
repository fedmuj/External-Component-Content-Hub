import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Box,
  Button,
  Collapse,
  Backdrop,
  CircularProgress,
  Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SparklesIcon from '@mui/icons-material/AutoAwesome' // Placeholder for the sparkle icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { ExternalContext } from '../../useExternalContext'

const CollaboratorsCard = ({ context }: { context: ExternalContext }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [collaborators, setCollaborators] = useState<
    { id: number; name: string; avatar: string }[]
  >([])
  const [loading, setLoading] = useState(false)

  const randomCollaborators = [
    {
      id: 1,
      name: 'Drew Cano',
      avatar:
        'https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a74f4afec11d8c4c9a3dc5_Drew%20Cano-p-500.png',
    },
    {
      id: 2,
      name: 'Lana Steiner',
      avatar:
        'https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a75175a4689e5ab60d2f77_Lana%20Steiner-p-500.png',
    },
    {
      id: 3,
      name: 'Lori Bryson',
      avatar:
        'https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a751b29f14e2d659a0eadd_Lori%20Bryson-p-500.png',
    },
    { id: 4, name: 'Alex Brown', avatar: 'https://via.placeholder.com/40' },
    {
      id: 5,
      name: 'Federico Mujica',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 6,
      name: 'Steve Little',
      avatar:
        'https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a751a180c6edec28086e13_Loki%20Bright-p-500.png',
    },
  ]

  const addSpecificCollaborators = () => {
    const specificIds = [1, 2, 5, 6]
    const newCollaborators = randomCollaborators.filter(
      (collab) =>
        specificIds.includes(collab.id) &&
        !collaborators.some((existing) => existing.id === collab.id)
    )
    if (newCollaborators.length > 0) {
      setLoading(true)
      setTimeout(() => {
        setCollaborators((prev) => [...prev, ...newCollaborators])
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <Card sx={{ maxWidth: 400, p: 2, borderRadius: 4, boxShadow: 3 }}>
      <Backdrop
        open={loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" fontWeight="bold">
              COLLABORATORS
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" ml="auto">
            <IconButton
              onClick={addSpecificCollaborators}
              color="primary"
              disabled={loading}
            >
              <SparklesIcon sx={{ color: 'primary.main', mr: 1 }} />
            </IconButton>
            <IconButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              color="primary"
            >
              {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </Box>
        </Box>

        {/* Collapsible Content */}
        <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
          {/* Project Owner */}
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Avatar
                src="https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a753c71ddf78d3cc7ae17d_Zaid%20Schwartz-p-500.png"
                alt="Alexander Münd"
                sx={{ width: 40, height: 40, mr: 2 }}
              />
              <Box>
                <Typography variant="body1">Alexander Münd</Typography>
                <Typography variant="body2" color="text.secondary">
                  Project Owner
                </Typography>
              </Box>
            </Box>
            <Button variant="text" size="small">
              Change
            </Button>
          </Box>

          {/* Collaborators List */}
          {/* Collaborators List */}
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" gap={1.5} alignItems="center">
              {collaborators.map((collab) => (
                <Tooltip key={collab.id} title={collab.name} arrow>
                  <Avatar src={collab.avatar} alt={collab.name} />
                </Tooltip>
              ))}
            </Box>
            <Button
              variant="text"
              startIcon={<AddIcon />}
              onClick={addSpecificCollaborators}
              disabled={loading}
            >
              Add
            </Button>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default CollaboratorsCard
