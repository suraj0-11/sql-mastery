import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import { PlayArrow, CheckCircle, Lock } from '@mui/icons-material';
import Editor from '@monaco-editor/react';

// Import the shared courses data
import { courses } from './Courses'; // Assuming Courses.tsx is in the same directory

interface Lesson {
  id: number;
  title: string;
  description?: string;
  duration: string;
  completed: boolean;
  content?: string;
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

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);

  // Find the current course based on the ID from the URL
  const course = courses.find((c) => c.id === courseId);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Handle case where course is not found
  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const currentLesson = course.lessons[currentLessonIndex];

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
                    readOnly: true,
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
          <Paper sx={{ p: 3, position: 'sticky', top: 80 }}>
            <Typography variant="h6" gutterBottom>
              Course Content
            </Typography>
            <Divider sx={{ my: 2 }} />
            {course.lessons.map((lesson, index) => (
              <Box
                key={lesson.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.2,
                  px: 1,
                  cursor: 'pointer',
                  borderRadius: '4px',
                  mb: 0.5,
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
                  <Lock sx={{ mr: 1.5, color: 'text.disabled' }} />
                )}
                <Typography 
                  variant="body2" 
                  sx={{ fontWeight: index === currentLessonIndex ? 'bold' : 'normal'}}
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