import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          SQL Mastery
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/courses')}>
            Courses
          </Button>
          <Button color="inherit" onClick={() => navigate('/practice')}>
            Practice
          </Button>
          <Button color="inherit" onClick={() => navigate('/examples')}>
            Examples
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 