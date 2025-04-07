import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import { PlayArrow, Code, CheckCircle, Lock } from '@mui/icons-material';
import Editor from '@monaco-editor/react';

// Import the shared courses data
import { courses } from './Courses'; // Assuming Courses.tsx is in the same directory

interface Lesson {
  id: number;
  title: string;
  description?: string; // Make optional as not all lessons might have it
  duration: string;
  completed: boolean;
  content?: string; // Make optional as not all lessons might have code content
}

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
  lessons: Lesson[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Remove the hardcoded lessons array
// const lessons = [...]; 

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);

  // Find the current course based on the ID from the URL
  const course = courses.find((c) => c.id === courseId);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  // const [value, setValue] = useState(0); // Remove if Tabs are not used here
  // const [sqlQuery, setSqlQuery] = useState(''); // Remove if query execution is not implemented here

  // Handle case where course is not found
  if (!course) {
    return <Navigate to="/courses" replace />; // Or show a 404 component
  }

  const currentLesson = course.lessons[currentLessonIndex];

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  // const handleRunQuery = () => {
  //   // Here you would typically send the query to a backend service
  //   console.log('Running query:', sqlQuery);
  // };

  const handleNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const handleLessonClick = (index: number) => {
      // For now, allow clicking any lesson
      // Later, you might add logic to only allow clicking completed/unlocked lessons
      setCurrentLessonIndex(index);
  };

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Main Content Area */}
        <Grid item xs={12} md={8}>
          {/* Course Header */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {course.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Chip label={`${course.lessons.length} Lessons`} color="primary" />
              <Chip label={course.duration} icon={<PlayArrow />} />
            </Box>
          </Paper>

          {/* Current Lesson Content */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              {currentLesson.title}
            </Typography>
            {currentLesson.description && (
                 <Typography variant="body1" paragraph>
                    {currentLesson.description}
                 </Typography>
            )}
            
            {/* Display code editor only if content exists */}
            {currentLesson.content && (
                <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 3 }}>
                <Editor
                    height="300px"
                    defaultLanguage="sql"
                    value={currentLesson.content}
                    theme="vs-dark"
                    options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    readOnly: true, // Make the editor read-only for lesson display
                    }}
                />
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="outlined"
                disabled={currentLessonIndex === 0}
                onClick={handlePreviousLesson}
              >
                Previous Lesson
              </Button>
              <Button
                variant="contained"
                endIcon={currentLessonIndex === course.lessons.length - 1 ? <CheckCircle /> : <PlayArrow />}
                onClick={handleNextLesson}
                disabled={currentLessonIndex === course.lessons.length - 1}
              >
                {currentLessonIndex === course.lessons.length - 1 ? 'Complete Course' : 'Next Lesson'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar Navigation */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 80 }}> {/* Make sidebar sticky */}
            <Typography variant="h6" gutterBottom>
              Course Content
            </Typography>
            <Divider sx={{ my: 2 }} />
            {/* Use the lessons from the fetched course data */}
            {course.lessons.map((lesson, index) => (
              <Box
                key={lesson.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.2, // Increased padding
                  px: 1, // Added horizontal padding
                  cursor: 'pointer',
                  borderRadius: '4px', // Added border radius
                  mb: 0.5, // Add some margin between items
                  bgcolor: index === currentLessonIndex ? 'action.selected' : 'transparent',
                  color: index === currentLessonIndex ? 'primary.main' : 'text.primary',
                  '&:hover': {
                      bgcolor: index !== currentLessonIndex ? 'action.hover' : 'action.selected',
                  }
                }}
                onClick={() => handleLessonClick(index)}
              >
                {lesson.completed ? (
                  <CheckCircle sx={{ mr: 1.5, color: 'success.main' }} />
                ) : (
                  <Lock sx={{ mr: 1.5, color: 'text.disabled' }} /> // Use disabled color for lock
                )}
                <Typography 
                  variant="body2" 
                  sx={{ fontWeight: index === currentLessonIndex ? 'bold' : 'normal'}} // Bold active lesson
                >
                  {lesson.title}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetail;