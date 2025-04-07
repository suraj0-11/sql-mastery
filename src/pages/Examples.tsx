import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ShoppingCart, People } from '@mui/icons-material';
import Editor from '@monaco-editor/react';

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

const examples = [
  {
    category: 'E-commerce',
    icon: <ShoppingCart />,
    examples: [
      {
        title: 'Customer Purchase Analysis',
        description: 'Analyze customer purchasing patterns and generate sales reports.',
        query: `-- Get top 10 customers by total purchase amount
SELECT 
  c.customer_name,
  SUM(o.total_amount) as total_spent,
  COUNT(o.order_id) as total_orders
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spent DESC
LIMIT 10;`,
      },
      {
        title: 'Product Performance',
        description: 'Track product sales and inventory levels.',
        query: `-- Get product performance metrics
SELECT 
  p.product_name,
  COUNT(oi.order_id) as total_orders,
  SUM(oi.quantity) as total_units_sold,
  SUM(oi.quantity * oi.unit_price) as total_revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
ORDER BY total_revenue DESC;`,
      },
    ],
  },
  {
    category: 'HR Management',
    icon: <People />,
    examples: [
      {
        title: 'Employee Department Analysis',
        description: 'Analyze employee distribution across departments.',
        query: `-- Get department employee counts and average salaries
SELECT 
  d.department_name,
  COUNT(e.employee_id) as employee_count,
  AVG(e.salary) as avg_salary,
  MAX(e.salary) as max_salary,
  MIN(e.salary) as min_salary
FROM departments d
JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
ORDER BY employee_count DESC;`,
      },
      {
        title: 'Employee Performance',
        description: 'Track employee performance metrics.',
        query: `-- Get employee performance metrics
SELECT 
  e.employee_name,
  p.rating,
  p.review_date,
  d.department_name
FROM employees e
JOIN performance_reviews p ON e.employee_id = p.employee_id
JOIN departments d ON e.department_id = d.department_id
WHERE p.review_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
ORDER BY p.rating DESC;`,
      },
    ],
  },
];

const Examples = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ py: 8 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Real-world SQL Examples
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explore practical SQL examples from different industries and use cases.
        </Typography>
      </Paper>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {examples.map((category, index) => (
            <Tab
              key={index}
              label={category.category}
              icon={category.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>

        {examples.map((category, index) => (
          <TabPanel key={index} value={value} index={index}>
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {category.examples.map((example, exampleIndex) => (
                <Box key={exampleIndex} sx={{ width: { xs: 12, sm: 6, md: 4 }, p: 2 }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" gutterBottom>
                        {example.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {example.description}
                      </Typography>
                      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Editor
                          height="200px"
                          defaultLanguage="sql"
                          value={example.query}
                          theme="vs-dark"
                          options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            readOnly: true,
                          }}
                        />
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </Grid>
          </TabPanel>
        ))}
      </Paper>
    </Container>
  );
};

export default Examples; 