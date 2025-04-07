import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import { PlayArrow, CheckCircle, Check } from '@mui/icons-material';
import Editor from '@monaco-editor/react';

const exercises = [
  {
    id: 1,
    title: 'Basic SELECT Queries',
    description: 'Write a query to select all employees from the IT department.',
    difficulty: 'Easy',
    hint: 'Use the WHERE clause to filter by department.',
    solution: `SELECT * FROM employees WHERE department = 'IT';`,
    testData: `CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(50),
  salary DECIMAL(10,2)
);

INSERT INTO employees VALUES
(1, 'John Doe', 'IT', 75000),
(2, 'Jane Smith', 'HR', 65000),
(3, 'Mike Johnson', 'IT', 80000),
(4, 'Sarah Williams', 'Marketing', 70000);`,
  },
  {
    id: 2,
    title: 'Joins Practice',
    description: 'Write a query to get all employees with their department names.',
    difficulty: 'Medium',
    hint: 'Use INNER JOIN to combine employees and departments tables.',
    solution: `SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;`,
    testData: `CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department_id INT
);

CREATE TABLE departments (
  id INT PRIMARY KEY,
  department_name VARCHAR(50)
);

INSERT INTO employees VALUES
(1, 'John Doe', 1),
(2, 'Jane Smith', 2),
(3, 'Mike Johnson', 1);

INSERT INTO departments VALUES
(1, 'IT'),
(2, 'HR'),
(3, 'Marketing');`,
  },
];

const Practice = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userQuery, setUserQuery] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [queryResult, setQueryResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentExercise = exercises[currentExerciseIndex];

  const handleRunQuery = async () => {
    setIsLoading(true);
    setQueryResult(null);
    // Simulate API call or query execution
    console.log('Running query:', userQuery);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    // Simulate result - replace with actual logic
    if (userQuery.toLowerCase().includes('select * from products')) {
      setQueryResult('Success! Query returned expected results.');
    } else {
      setQueryResult('Incorrect query or no results found.');
    }
    setIsLoading(false);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserQuery('');
      setShowSolution(false);
      setQueryResult(null);
    }
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        SQL Practice Exercises
      </Typography>

      <Grid container spacing={4}>
        {/* Exercise Details */}
        <Box sx={{ width: { xs: '100%', md: '60%' }, p: 2 }}>
          <Paper sx={{ p: 3, mb: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              {currentExercise.title}
            </Typography>
            <Chip label={currentExercise.difficulty} color="primary" size="small" sx={{ mb: 2 }} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              {currentExercise.description}
            </Typography>
            {currentExercise.hint && (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Hint: {currentExercise.hint}
              </Typography>
            )}
            {currentExercise.testData && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Test Data (Example Table)</Typography>
                <Editor
                  height="150px"
                  defaultLanguage="markdown"
                  value={currentExercise.testData}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    readOnly: true,
                    lineNumbers: 'off',
                  }}
                />
              </Box>
            )}
          </Paper>
        </Box>

        {/* Query Editor and Results */}
        <Box sx={{ width: { xs: '100%', md: '40%' }, p: 2 }}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Your Query
            </Typography>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 2, flexGrow: 1, minHeight: '200px' }}>
              <Editor
                height="100%"
                defaultLanguage="sql"
                value={userQuery}
                onChange={(value) => setUserQuery(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </Box>

            {/* Action Buttons - Keep gap */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                onClick={() => setShowSolution(!showSolution)}
                sx={{ mr: 'auto' }}
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </Button>
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={handleRunQuery}
                  disabled={!userQuery.trim()}
                >
                  Run Query
                </Button>
              )}
              <Button
                variant="contained"
                endIcon={<Check />}
                onClick={handleNextExercise}
                disabled={currentExerciseIndex === exercises.length - 1}
              >
                Next Exercise
              </Button>
            </Box>

            {/* Solution Display */}
            {showSolution && (
              <Box sx={{ mt: 3, border: '1px dashed', borderColor: 'warning.main', borderRadius: 1, p: 2, bgcolor: 'action.hover' }}>
                <Typography variant="subtitle2" gutterBottom color="warning.dark">
                  Solution
                </Typography>
                <Editor
                  height="100px"
                  defaultLanguage="sql"
                  value={currentExercise.solution}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    readOnly: true,
                  }}
                />
              </Box>
            )}

            {/* Query Result Display */}
            {queryResult && (
              <Box sx={{ mt: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Result
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {queryResult}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Grid>
    </Container>
  );
};

export default Practice; 