import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  CircularProgress,
  Backdrop,
  TextField,
} from '@mui/material'
import SparklesIcon from '@mui/icons-material/AutoAwesome'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const ToDoListCard = () => {
  const [toDoItems, setToDoItems] = useState<
    { id: number; name: string; task: string; completed: boolean }[]
  >([])
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [loading, setLoading] = useState(false)
  const [newTask, setNewTask] = useState('')

  const randomTasks = [
    {
      id: 1,
      name: '@Drew Cano',
      task: 'Add target audience',
      completed: false,
    },
    {
      id: 2,
      name: '@Steve Little',
      task: 'Specify timeline',
      completed: false,
    },
    { id: 3, name: '@Lana Steiner', task: 'Add budget', completed: false },
    {
      id: 4,
      name: '@Federico Mujica',
      task: 'Finalize messaging',
      completed: false,
    },
  ]

  const addRandomTask = () => {
    const available = randomTasks.filter(
      (task) => !toDoItems.some((existing) => existing.id === task.id)
    )
    if (available.length > 0) {
      setLoading(true)
      setTimeout(() => {
        const random = available[Math.floor(Math.random() * available.length)]
        setToDoItems((prev) => [...prev, random])
        setLoading(false)
      }, 2000) // Simulate a delay of 2 seconds
    }
  }

  const handleAddTask = () => {
    if (newTask.trim()) {
      setToDoItems((prev) => [
        ...prev,
        { id: Date.now(), name: '@New User', task: newTask, completed: false },
      ])
      setNewTask('')
    }
  }

  const suggestTasksForBrief = () => {
    const briefSuggestedTasks = [
      {
        id: 5,
        name: '@Lana Steiner',
        task: 'Validate target audience',
        completed: false,
      },
      {
        id: 6,
        name: '@Drew Cano',
        task: 'Identify key messaging points',
        completed: false,
      },
      {
        id: 7,
        name: '@Federico Mujica',
        task: 'Create visual mockups',
        completed: false,
      },
      {
        id: 8,
        name: '@Steve Little',
        task: 'Validate Goals',
        completed: false,
      },
    ]
    setLoading(true)
    setTimeout(() => {
      setToDoItems((prev) => [
        ...prev,
        ...briefSuggestedTasks.filter(
          (task) => !prev.some((existing) => existing.id === task.id)
        ),
      ])
      setLoading(false)
    }, 2000) // Simulate a delay of 2 seconds
  }

  const handleToggle = (id: number) => {
    setToDoItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  return (
    <Card sx={{ maxWidth: 400, p: 2, borderRadius: 4, boxShadow: 5 }}>
      <Backdrop
        open={loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" fontWeight="bold">
            TO DO
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={suggestTasksForBrief}
              color="primary"
              disabled={loading}
            >
              <SparklesIcon />
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
          <List>
            {toDoItems.map((item) => (
              <ListItem key={item.id} disableGutters>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={item.completed}
                    onChange={() => handleToggle(item.id)}
                    color="primary"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box>
                      <Typography
                        variant="body1"
                        component="span"
                        color="primary"
                      >
                        {item.name}
                      </Typography>{' '}
                      {item.task}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>

          {/* Add New To-Do Item */}
          <Box display="flex" alignItems="center" mt={2}>
            <Checkbox disabled sx={{ color: 'grey.400', mr: 1 }} />
            <TextField
              variant="standard"
              placeholder="Add to-do item"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              fullWidth
            />
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default ToDoListCard
