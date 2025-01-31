import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Avatar,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CampaignIcon from '@mui/icons-material/Campaign'
import FolderIcon from '@mui/icons-material/Folder'
import BarChartIcon from '@mui/icons-material/BarChart'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LinkIcon from '@mui/icons-material/Link'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf'
import CloseIcon from '@mui/icons-material/Close'
import PeopleIcon from '@mui/icons-material/People'

const OverviewDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tabs = [
    { label: 'Overview', icon: <NotificationsIcon /> },
    { label: 'Briefs', icon: <AssignmentIcon /> },
    { label: 'To Do', icon: <CheckCircleIcon /> },
    { label: 'Campaigns', icon: <CampaignIcon /> },
    { label: 'Projects', icon: <FolderIcon /> },
    { label: 'Report', icon: <BarChartIcon /> },
  ]

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  return (
    <Box display="flex" gap={2} p={2} height="100vh">
      {/* Sidebar */}
      <Box width={240}>
        <List>
          {tabs.map((tab) => (
            <ListItem
              button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              sx={{
                bgcolor:
                  activeTab === tab.label ? 'primary.light' : 'transparent',
                color: activeTab === tab.label ? 'primary.main' : 'inherit',
                borderRadius: 2,
                mb: 1,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor:
                      activeTab === tab.label ? 'primary.main' : 'grey.300',
                    color: activeTab === tab.label ? 'white' : 'inherit',
                  }}
                >
                  {tab.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={tab.label} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box flex={1}>
        <Grid container spacing={2}>
          {/* Recent Briefs Section */}
          <Grid item xs={8}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <LightbulbIcon color="primary" />
                    <Typography variant="h6">Recent briefs</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenModal}
                  >
                    Create brief
                  </Button>
                </Box>

                <Grid container spacing={2} mt={2}>
                  {[
                    {
                      title: "Real Care for Women's - Dove",
                      status: 'IN PROGRESS',
                      url: 'https://almu-unilever.sitecoresandbox.cloud/en-us/content/BriefDetail/51950',
                      brand:
                        'https://assets.unileversolutions.com/v1/116206019.png?im=AspectCrop=(252,60);Resize=(100,60)',
                    },
                    {
                      title: "Hellmann's Vegan Mayo Campaign",
                      status: 'IN PROGRESS',
                      url: 'https://almu-unilever.sitecoresandbox.cloud/en-us/content/BriefDetail/50999',
                      brand:
                        'https://assets.unileversolutions.com/v1/1630561.png',
                    },
                    {
                      title: 'Grill & Thrill with Hellmann’s',
                      status: 'NEW',
                      url: 'https://almu-unilever.sitecoresandbox.cloud/en-us/content/BriefDetail/52076',
                      brand:
                        'https://assets.unileversolutions.com/v1/1630561.png',
                    },
                    {
                      title: 'Strength in Care - Dove',
                      status: 'NEW',
                      url: 'https://almu-unilever.sitecoresandbox.cloud/en-us/content/BriefDetail/51945',
                      brand:
                        'https://assets.unileversolutions.com/v1/116206019.png?im=AspectCrop=(252,60);Resize=(100,60)',
                    },
                  ].map((brief, index) => (
                    <Grid item xs={6} key={index}>
                      <Card
                        variant="outlined"
                        sx={{
                          position: 'relative',
                          paddingBottom: '40px',
                          cursor: 'pointer',
                        }}
                        onClick={() => window.open(brief.url, '_blank')}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="center" gap={1}>
                            <LightbulbIcon fontSize="small" color="primary" />
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              gutterBottom
                            >
                              {brief.title}
                            </Typography>
                          </Box>
                          <Chip
                            label={brief.status}
                            size="small"
                            sx={{
                              position: 'absolute',
                              bottom: 8,
                              left: 8,
                              bgcolor:
                                brief.status === 'READY'
                                  ? 'success.light'
                                  : brief.status === 'IN PROGRESS'
                                  ? 'secondary.light'
                                  : 'grey.300',
                              color: brief.status === 'NEW' ? 'black' : 'white',
                              fontWeight: 'bold',
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 8,
                              right: 8,
                              display: 'flex',
                              gap: 1,
                            }}
                          >
                            <IconButton>
                              <PersonAddIcon fontSize="small" />
                            </IconButton>
                            <IconButton>
                              <LinkIcon fontSize="small" />
                            </IconButton>
                            <Avatar
                              src={brief.brand}
                              alt="User"
                              sx={{
                                width: 50,
                                height: 50,
                                img: { objectFit: 'contain' },
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Notifications Section */}
          <Grid item xs={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <NotificationsIcon fontSize="small" />
                  <Typography variant="h6" fontWeight="bold">
                    Notifications
                  </Typography>
                </Box>
                {[
                  {
                    user: 'Steve Little',
                    avatar:
                      'https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a751a180c6edec28086e13_Loki%20Bright-p-500.png',
                    message: 'assigned an item to you',
                    time: '3h',
                    brief: 'Create a social media content',
                    status: 'NEW',
                    url: 'https://almu-unilever.sitecoresandbox.cloud/en-us/content/BriefDetail/50999',
                  },
                  {
                    user: 'Steve Little',
                    avatar:
                      'https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a751a180c6edec28086e13_Loki%20Bright-p-500.png',
                    message: 'mentioned you',
                    time: '3h',
                    brief: 'Identify Audiences',
                    status: 'IN PROGRESS',
                    url: 'https://almu-unilever.sitecoresandbox.cloud/en-us/content/BriefDetail/50999',
                  },
                  {
                    user: 'Drew Cano',
                    avatar:
                      'https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a74f4afec11d8c4c9a3dc5_Drew%20Cano-p-500.png',
                    message: 'mentioned you',
                    time: '3h',
                    brief: 'Strength in Care - Dove',
                    status: 'NEW',
                    url: 'https://almu-unilever.sitecoresandbox.cloud/en-us/content/BriefDetail/50999',
                  },
                ].map((notification, index) => (
                  <Box
                    key={index}
                    mt={2}
                    p={2}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    border={1}
                    borderColor="grey.300"
                    borderRadius={2}
                    boxShadow={1}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                    }}
                    onClick={() => window.open(notification.url, '_blank')}
                  >
                    <Avatar src={notification.avatar} alt={notification.user} />
                    <Box flexGrow={1}>
                      <Typography variant="body2">
                        <strong>{notification.user}</strong>{' '}
                        {notification.message}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <Chip
                          icon={<LightbulbIcon fontSize="small" />}
                          label={notification.brief}
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 'bold' }}
                        />
                        <Chip
                          label={notification.status}
                          size="small"
                          sx={{
                            fontWeight: 'bold',
                            bgcolor:
                              notification.status === 'NEW'
                                ? 'primary.main'
                                : 'success.light',
                            color:
                              notification.status === 'NEW' ? 'white' : 'black',
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      alignSelf="flex-start"
                    >
                      {notification.time}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* To Do Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">To Do</Typography>
                <Table>
                  <TableBody>
                    {[
                      {
                        task: 'Develop key messaging for the Dove Real Care campaign.',
                        assignee: '@Alexander Münd',
                        brief: "Real Care for Women's - Dove",
                      },
                      {
                        task: 'Create a social media content plan for Hellmann’s Vegan Mayo.',
                        assignee: '@Alexander Münd',
                        brief: "Hellmann's Vegan Mayo Campaign",
                      },
                      {
                        task: 'Identify Audiences for the Grill & Thrill campaign.',
                        assignee: '@Alexander Münd',
                        brief: 'Grill & Thrill with Hellmann’s',
                      },
                      {
                        task: 'List 5 benefits of the product to emphasize in the campaign',
                        assignee: '@Alexander Münd',
                        brief: 'Strength in Care - Dove',
                      },
                    ].map((todo, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox />
                          {todo.task}
                        </TableCell>
                        <TableCell>{todo.assignee}</TableCell>
                        <TableCell>{todo.brief}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {/* Create Brief Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <DialogTitle>Create Brief</DialogTitle>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <CampaignIcon fontSize="large" color="primary" />
                <Typography variant="subtitle1" mt={1}>
                  Campaign brief
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <PeopleIcon fontSize="large" color="info" />
                <Typography variant="subtitle1" mt={1}>
                  Influencer brief
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <BarChartIcon fontSize="large" color="warning" />
                <Typography variant="subtitle1" mt={1}>
                  Media brief
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <EnergySavingsLeafIcon fontSize="large" color="success" />
                <Typography variant="subtitle1" mt={1}>
                  Evergreen brief
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Box
            mt={2}
            textAlign="center"
            onClick={() =>
              window.open(
                'https://almu-unilever.sitecoresandbox.cloud/en-us/content/BriefDetail/52086',
                '_blank'
              )
            }
          >
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.300',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              <RocketLaunchIcon fontSize="large" color="action" />
              <Typography variant="subtitle1" mt={1}>
                Start with recordings, PDFs, or other media
              </Typography>
            </Card>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default OverviewDashboard
