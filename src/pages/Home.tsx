import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          backgroundImage: 'url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)', // Example background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          p: { xs: 3, md: 6 },
          position: 'relative',
          '&::before': { // Add overlay for better text readability
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
            }}
          >
            SQL Mastery
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 4,
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' }
            }}
          >
            Your journey to becoming an SQL expert starts here. Interactive lessons, real-world examples, and hands-on practice.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/courses')}
              sx={{ 
                py: 1.5, 
                px: 4,
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              Explore Courses
            </Button>
            {/* Added Portfolio Button */}
            <Button
              variant="outlined"
              size="large"
              href="https://suraj-s.vercel.app"
              target="_blank" // Open in new tab
              rel="noopener noreferrer" // Security best practice
              sx={{ 
                py: 1.5, 
                px: 4,
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: 'white', // Ensure text is visible on dark overlay
                borderColor: 'white', // Ensure border is visible
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle hover effect
                  borderColor: 'white',
                }
              }}
            >
              Visit My Portfolio
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Features Section (Optional) */}
      {/* You can add more sections here about features, testimonials, etc. */}
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 4 }}>
          Why Choose SQL Mastery?
        </Typography>
        {/* Add feature descriptions or cards here */}
      </Container>

    </Box>
  );
};

export default Home; 