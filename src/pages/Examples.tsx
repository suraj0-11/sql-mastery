import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from '@mui/material';
import Editor from '@monaco-editor/react';

const industryExamples = [
  {
    industry: 'E-commerce',
    examples: [
      {
        title: 'Customer Purchase Analysis',
        description: 'Analyze customer purchasing patterns and generate sales reports.',
        query: `-- Get top 10 customers by total purchase amount
SELECT 
  c.customer_name,
  SUM(o.total_amount) as total_spent,
  COUNT(o.order_id) as total_orders,
  AVG(o.total_amount) as avg_order_value
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spent DESC
LIMIT 10;`
      },
      {
        title: 'Product Performance',
        description: 'Track product sales and inventory levels.',
        query: `-- Get product performance metrics
SELECT 
  p.product_name,
  p.category,
  COUNT(oi.order_id) as total_orders,
  SUM(oi.quantity) as total_units_sold,
  SUM(oi.quantity * oi.unit_price) as total_revenue,
  AVG(oi.unit_price) as avg_price
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTHS)
GROUP BY p.product_id, p.product_name, p.category
ORDER BY total_revenue DESC;`
      }
    ]
  },
  {
    industry: 'Healthcare',
    examples: [
      {
        title: 'Patient Appointment Analysis',
        description: 'Analyze patient appointment patterns and clinic efficiency.',
        query: `-- Get appointment statistics by department
SELECT 
  d.department_name,
  COUNT(a.appointment_id) as total_appointments,
  AVG(TIMESTAMPDIFF(MINUTE, a.start_time, a.end_time)) as avg_duration,
  COUNT(CASE WHEN a.status = 'completed' THEN 1 END) as completed_appointments,
  COUNT(CASE WHEN a.status = 'cancelled' THEN 1 END) as cancelled_appointments
FROM appointments a
JOIN departments d ON a.department_id = d.department_id
WHERE a.appointment_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)
GROUP BY d.department_id, d.department_name
ORDER BY total_appointments DESC;`
      },
      {
        title: 'Medication Inventory',
        description: 'Track medication inventory and reorder levels.',
        query: `-- Get medication inventory status
SELECT 
  m.medication_name,
  m.category,
  i.current_stock,
  i.reorder_level,
  i.last_restock_date,
  CASE 
    WHEN i.current_stock <= i.reorder_level THEN 'Reorder Needed'
    WHEN i.current_stock <= (i.reorder_level * 1.5) THEN 'Low Stock'
    ELSE 'In Stock'
  END as stock_status
FROM medications m
JOIN inventory i ON m.medication_id = i.medication_id
WHERE i.current_stock <= (i.reorder_level * 1.5)
ORDER BY stock_status, current_stock;`
      }
    ]
  },
  {
    industry: 'Banking',
    examples: [
      {
        title: 'Customer Transaction Analysis',
        description: 'Analyze customer transaction patterns and account activity.',
        query: `-- Get customer transaction statistics
SELECT 
  c.customer_name,
  a.account_type,
  COUNT(t.transaction_id) as total_transactions,
  SUM(CASE WHEN t.transaction_type = 'deposit' THEN t.amount ELSE 0 END) as total_deposits,
  SUM(CASE WHEN t.transaction_type = 'withdrawal' THEN t.amount ELSE 0 END) as total_withdrawals,
  AVG(t.amount) as avg_transaction_amount
FROM customers c
JOIN accounts a ON c.customer_id = a.customer_id
JOIN transactions t ON a.account_id = t.account_id
WHERE t.transaction_date >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTHS)
GROUP BY c.customer_id, c.customer_name, a.account_type
ORDER BY total_transactions DESC;`
      },
      {
        title: 'Loan Performance',
        description: 'Track loan performance and risk assessment.',
        query: `-- Get loan performance metrics
SELECT 
  l.loan_type,
  COUNT(l.loan_id) as total_loans,
  SUM(l.amount) as total_loan_amount,
  AVG(l.interest_rate) as avg_interest_rate,
  COUNT(CASE WHEN l.status = 'default' THEN 1 END) as defaulted_loans,
  (COUNT(CASE WHEN l.status = 'default' THEN 1 END) * 100.0 / COUNT(l.loan_id)) as default_rate
FROM loans l
WHERE l.issue_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
GROUP BY l.loan_type
ORDER BY total_loan_amount DESC;`
      }
    ]
  }
];

const Examples = () => {
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

      <Grid container spacing={4}>
        {industryExamples.map((industry, index) => (
          <Box sx={{ width: '100%', mb: 4 }} key={index}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                {industry.industry}
              </Typography>
              <Grid container spacing={3}>
                {industry.examples.map((example, exampleIndex) => (
                  <Box sx={{ width: { xs: '100%', md: '50%' }, p: 1.5 }} key={exampleIndex}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {example.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {example.description}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
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
                        <Button size="small">View Details</Button>
                      </CardActions>
                    </Card>
                  </Box>
                ))}
              </Grid>
            </Paper>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default Examples; 