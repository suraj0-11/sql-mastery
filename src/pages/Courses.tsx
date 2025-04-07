import { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { PlayArrow, AccessTime, School, MenuBook } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'SQL Fundamentals',
    description: 'Learn the basics of SQL, from SELECT statements to basic queries.',
    duration: '2 hours',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    lessons: [
      { 
        id: 1, 
        title: 'Introduction to SQL', 
        duration: '15 min', 
        completed: true, 
        description: 'Learn the basics of SQL and its importance in database management.',
        content: `-- Basic SELECT statement
SELECT * FROM employees;

-- Filtering with WHERE
SELECT * FROM employees WHERE department = 'IT';

-- Sorting with ORDER BY
SELECT * FROM employees ORDER BY salary DESC;` 
      },
      { 
        id: 2, 
        title: 'Basic SELECT Statements', 
        duration: '20 min', 
        completed: false,
        description: 'Understanding the core SELECT statement to retrieve data.',
        content: `SELECT column1, column2 FROM your_table_name;`
      },
      { 
        id: 3, 
        title: 'Filtering Data with WHERE', 
        duration: '25 min', 
        completed: false,
        description: 'Using the WHERE clause to filter rows based on conditions.',
        content: `SELECT product_name, price FROM products WHERE price > 100;`
      },
      { 
        id: 4, 
        title: 'Sorting Results', 
        duration: '15 min', 
        completed: false,
        description: 'Ordering your query results using ORDER BY.',
        content: `SELECT customer_name, signup_date FROM customers ORDER BY signup_date DESC;`
      },
      { 
        id: 5, 
        title: 'Joining Tables (INNER JOIN)', 
        duration: '30 min', 
        completed: false,
        description: 'Combining rows from two tables based on a related column.',
        content: `SELECT orders.order_id, customers.customer_name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id;` 
      },
      { 
        id: 6, 
        title: 'Joining Tables (LEFT JOIN)', 
        duration: '20 min', 
        completed: false,
        description: 'Retrieving all rows from the left table and matched rows from the right.',
        content: `SELECT employees.name, departments.department_name
FROM employees
LEFT JOIN departments ON employees.department_id = departments.id;`
      },
      { 
        id: 7, 
        title: 'Basic Aggregate Functions', 
        duration: '25 min', 
        completed: false,
        description: 'Using functions like COUNT, SUM, AVG, MIN, MAX.',
        content: `SELECT COUNT(*) AS total_orders FROM orders;
SELECT AVG(order_total) AS average_order_value FROM orders;`
      },
      { 
        id: 8, 
        title: 'Grouping Data', 
        duration: '20 min', 
        completed: false,
        description: 'Grouping rows that have the same values using GROUP BY.',
        content: `SELECT department, COUNT(*) AS num_employees
FROM employees
GROUP BY department;`
      },
      { 
        id: 9, 
        title: 'Subqueries (Basic)', 
        duration: '25 min', 
        completed: false,
        description: 'Nesting a query inside another query.',
        content: `SELECT product_name
FROM products
WHERE price > (SELECT AVG(price) FROM products);`
      },
      { 
        id: 10, 
        title: 'Data Types', 
        duration: '15 min', 
        completed: false,
        description: 'Understanding common SQL data types (INT, VARCHAR, DATE, etc.).',
        content: `-- No specific code example, conceptual lesson.`
      },
      { 
        id: 11, 
        title: 'Creating Tables', 
        duration: '20 min', 
        completed: false,
        description: 'Using CREATE TABLE to define new tables.',
        content: `CREATE TABLE new_employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    hire_date DATE
);`
      },
      { 
        id: 12, 
        title: 'Final Quiz', 
        duration: '15 min', 
        completed: false,
        description: 'Test your knowledge of SQL fundamentals.',
        content: `-- Quiz content (not code).`
      },
    ]
  },
  {
    id: 2,
    title: 'Advanced SQL Queries',
    description: 'Master complex joins, subqueries, and advanced SQL techniques.',
    duration: '3 hours',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    lessons: [
      { id: 1, title: 'Advanced Joins (OUTER, CROSS)', duration: '25 min', completed: false, description: 'Explore different types of joins beyond INNER and LEFT.', content: `SELECT c.name, o.order_date\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nUNION\nSELECT c.name, o.order_date\nFROM customers c\nRIGHT JOIN orders o ON c.id = o.customer_id;` },
      { id: 2, title: 'Correlated Subqueries', duration: '30 min', completed: false, description: 'Subqueries that reference columns from the outer query.', content: `SELECT e1.name, e1.salary\nFROM employees e1\nWHERE e1.salary > (\n    SELECT AVG(e2.salary)\n    FROM employees e2\n    WHERE e1.department = e2.department\n);` },
      { id: 3, title: 'Window Functions (Basic)', duration: '35 min', completed: false, description: 'Functions like ROW_NUMBER, RANK, DENSE_RANK that operate on a set of rows.', content: `SELECT name, salary, department,\n       RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_department\nFROM employees;` },
      { id: 4, title: 'Window Functions (Advanced)', duration: '30 min', completed: false, description: 'Using LAG, LEAD, and aggregate window functions.', content: `SELECT order_date, order_total,\n       LAG(order_total, 1, 0) OVER (ORDER BY order_date) as previous_day_total\nFROM daily_sales;` },
      { id: 5, title: 'Common Table Expressions (CTEs)', duration: '25 min', completed: false, description: 'Creating temporary, named result sets for cleaner queries.', content: `WITH DepartmentAverages AS (\n    SELECT department, AVG(salary) as avg_salary\n    FROM employees\n    GROUP BY department\n)\nSELECT e.name, e.salary, da.avg_salary\nFROM employees e\nJOIN DepartmentAverages da ON e.department = da.department\nWHERE e.salary > da.avg_salary;` },
      { id: 6, title: 'Recursive CTEs', duration: '30 min', completed: false, description: 'CTEs that reference themselves to query hierarchical data.', content: `WITH RECURSIVE EmployeeHierarchy AS (\n    SELECT id, name, manager_id, 1 as level\n    FROM employees\n    WHERE manager_id IS NULL\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, eh.level + 1\n    FROM employees e\n    INNER JOIN EmployeeHierarchy eh ON e.manager_id = eh.id\n)\nSELECT * FROM EmployeeHierarchy;` },
      { id: 7, title: 'PIVOT and UNPIVOT', duration: '25 min', completed: false, description: 'Rotating rows into columns (PIVOT) and columns into rows (UNPIVOT). (Syntax varies by DB)', content: `-- PIVOT Example (SQL Server Syntax)\nSELECT SalesPerson, [2022], [2023]\nFROM (SELECT SalesPerson, YEAR(OrderDate) as OrderYear, OrderAmount FROM Sales)\nAS SourceTable\nPIVOT (SUM(OrderAmount) FOR OrderYear IN ([2022], [2023])) AS PivotTable;` },
      { id: 8, title: 'Temporal Tables', duration: '20 min', completed: false, description: 'Tracking the history of data changes automatically (Feature varies by DB).', content: `-- Example (SQL Server System-Versioned Temporal Table)\n-- ALTER TABLE Employees ADD PERIOD FOR SYSTEM_TIME (ValidFrom, ValidTo);\n-- ALTER TABLE Employees SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.EmployeesHistory));` },
      { id: 9, title: 'JSON Functions', duration: '25 min', completed: false, description: 'Querying and manipulating JSON data stored in database columns (Syntax varies by DB).', content: `-- Example (PostgreSQL Syntax)\nSELECT data ->> 'name' as customer_name\nFROM orders\nWHERE data ->> 'status' = 'shipped';` },
      { id: 10, title: 'Advanced Aggregation', duration: '25 min', completed: false, description: 'Using ROLLUP, CUBE, and GROUPING SETS for multi-level aggregation.', content: `SELECT department, job_title, SUM(salary) as total_salary\nFROM employees\nGROUP BY ROLLUP(department, job_title);` },
      { id: 11, title: 'Transactions and Locking', duration: '30 min', completed: false, description: 'Ensuring atomicity and consistency with BEGIN, COMMIT, ROLLBACK, and understanding locking mechanisms.', content: `BEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE account_id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE account_id = 2;\nCOMMIT;` },
      { id: 12, title: 'Error Handling', duration: '20 min', completed: false, description: 'Using TRY...CATCH or equivalent mechanisms to handle errors gracefully in SQL batches or procedures.', content: `-- Example (SQL Server Syntax)\nBEGIN TRY\n    -- Risky operation\n    INSERT INTO ... VALUES (...);\nEND TRY\nBEGIN CATCH\n    PRINT 'An error occurred: ' + ERROR_MESSAGE();\nEND CATCH;` },
      { id: 13, title: 'Dynamic SQL', duration: '25 min', completed: false, description: 'Building and executing SQL statements dynamically, often used in stored procedures. Use with caution due to injection risks.', content: `DECLARE @TableName NVARCHAR(128) = 'employees';\nDECLARE @SQL NVARCHAR(MAX);\nSET @SQL = N'SELECT COUNT(*) FROM ' + QUOTENAME(@TableName);\nEXEC sp_executesql @SQL;` },
      { id: 14, title: 'Practice Exercise', duration: '45 min', completed: false, description: 'Combine multiple advanced techniques to solve a complex problem.', content: '-- Exercise description and requirements would go here.' },
      { id: 15, title: 'Final Assessment', duration: '30 min', completed: false, description: 'Comprehensive quiz covering advanced SQL topics.', content: '-- Assessment questions.' },
    ]
  },
  {
    id: 3,
    title: 'Database Design',
    description: 'Learn how to design efficient and scalable databases.',
    duration: '2.5 hours',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib.rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    lessons: [
      { id: 1, title: 'Database Fundamentals Review', duration: '20 min', completed: false, description: 'Recap of basic database concepts like tables, keys, relationships, and data types.', content: '-- Conceptual Overview --\n-- Review of core concepts: What is a database? Relational model. Tables (Entities), Columns (Attributes), Rows (Records). Primary Keys, Foreign Keys. Basic data types (INT, VARCHAR, DATE, etc.).' },
      { id: 2, title: 'Normalization (1NF, 2NF, 3NF)', duration: '30 min', completed: false, description: 'Understanding and applying the first three normal forms to reduce data redundancy and improve data integrity.', content: '-- 1NF: Eliminate repeating groups. Ensure each column contains atomic values.\n-- 2NF: Be in 1NF + Remove partial dependencies (non-key attributes must depend on the whole primary key).\n-- 3NF: Be in 2NF + Remove transitive dependencies (non-key attributes cannot depend on other non-key attributes).\n\n-- Example (Simplified):\n-- Unnormalized: Order(OrderID, CustomerName, CustomerAddr, {Product, Qty}, OrderDate)\n-- 1NF: Order(OrderID, CustomerName, CustomerAddr, Product, Qty, OrderDate)\n-- 2NF: Order(OrderID, CustomerID, OrderDate), Customer(CustomerID, CustomerName, CustomerAddr), OrderItem(OrderID, ProductID, Qty), Product(ProductID, ProductName)\n-- 3NF: Check for transitive dependencies (e.g., if City depended on ZipCode which depended on OrderID).' },
      { id: 3, title: 'Normalization (BCNF, 4NF)', duration: '25 min', completed: false, description: 'Exploring higher normal forms like Boyce-Codd Normal Form (stronger 3NF) and Fourth Normal Form (multi-valued dependencies).', content: '-- BCNF (Boyce-Codd Normal Form): A stricter version of 3NF. Every determinant must be a candidate key.\n-- Example violation: Student_Course_Professor(StudentID, CourseID, Professor). If one professor teaches only one course, then Professor -> CourseID, but Professor is not a candidate key.\n\n-- 4NF: Be in BCNF + Eliminate multi-valued dependencies. Deals with tables storing multiple independent facts about an entity.\n-- Example violation: Employee_Skill_Language(EmpID, Skill, Language). If skills and languages are independent for an employee, this violates 4NF.' },
      { id: 4, title: 'Entity Relationship Diagrams (ERD)', duration: '30 min', completed: false, description: 'Using ERDs (specifically Crow\'s Foot notation) to visually model entities, attributes, and relationships (one-to-one, one-to-many, many-to-many).', content: `-- Entities: Rectangles (e.g., Customer, Order, Product).\n-- Attributes: Listed within entity rectangles (e.g., CustomerID, Name, Email).\n-- Relationships: Lines connecting entities.\n-- Cardinality (Crow's Foot Notation):\n--   -| : One\n--   -O : Zero\n--   -<- : Many\n-- Example: Customer -|<- Order (One Customer can have Zero or Many Orders)` },
      { id: 5, title: 'Indexing Strategies', duration: '25 min', completed: false, description: 'Choosing appropriate indexes (clustered, non-clustered, composite, covering) to optimize query performance based on workload.', content: '-- Purpose: Speed up data retrieval (SELECT) at the cost of slower writes (INSERT, UPDATE, DELETE) and storage space.\n-- Clustered Index: Defines physical table order (usually on Primary Key). Only one per table.\n-- Non-Clustered Index: Separate structure pointing back to table rows. Can have many.\n-- Composite Index: Index on multiple columns. Order matters!\n-- Covering Index: Includes all columns needed for a query, avoiding table access.\n\n-- Example:\nCREATE INDEX idx_customer_lastname ON Customers (LastName);\nCREATE INDEX idx_order_customer_date ON Orders (CustomerID, OrderDate); -- Composite' },
      { id: 6, title: 'Data Warehousing Concepts', duration: '20 min', completed: false, description: 'Introduction to data warehousing for analytics. Dimensional modeling concepts: facts and dimensions. Star vs. Snowflake schemas.', content: '-- Data Warehouse: Central repository for analytical data, optimized for querying and reporting.\n-- Fact Table: Stores business metrics (facts). Contains foreign keys to dimension tables (e.g., SalesAmount, QuantitySold).\n-- Dimension Tables: Store descriptive attributes (dimensions) about the facts (e.g., Time, Product, Customer, Location).\n-- Star Schema: Central fact table connected directly to multiple dimension tables.\n-- Snowflake Schema: Normalized dimension tables (dimensions branch off into sub-dimensions).' },
      { id: 7, title: 'OLAP vs OLTP', duration: '15 min', completed: false, description: 'Comparing Online Transaction Processing (OLTP) systems (operational databases) and Online Analytical Processing (OLAP) systems (data warehouses).', content: '-- OLTP (Online Transaction Processing):\n--   Purpose: Day-to-day operations (e.g., order entry, banking).\n--   Design: Normalized, optimized for fast INSERT/UPDATE/DELETE.\n--   Queries: Simple, small data volume per query.\n-- OLAP (Online Analytical Processing):\n--   Purpose: Analysis, reporting, business intelligence.\n--   Design: Denormalized (often), optimized for complex SELECT queries.\n--   Queries: Complex, large data volume, aggregations.' },
      { id: 8, title: 'Database Security Basics', duration: '20 min', completed: false, description: 'Fundamental security concepts: Authentication (verifying identity), Authorization (granting permissions), Roles, Principle of Least Privilege.', content: '-- Authentication: Verifying who the user is (e.g., username/password, certificates).\n-- Authorization: Defining what an authenticated user can do.\n--   GRANT SELECT ON products TO reporting_user;\n--   GRANT INSERT, UPDATE ON orders TO order_entry_role;\n--   REVOKE DELETE ON customers FROM public;\n-- Roles: Groups of permissions assigned to users.\n-- Least Privilege: Grant only the minimum permissions necessary.' },
      { id: 9, title: 'Design Patterns', duration: '25 min', completed: false, description: 'Common database design solutions for recurring problems, such as handling hierarchical data (Adjacency List, Nested Set) or tracking changes (Audit Trails).', content: '-- Hierarchical Data:\n--   Adjacency List: `Employees(EmpID, Name, ManagerID)` (ManagerID FK to EmpID). Simple, but recursive queries can be slow.\n--   Nested Set Model: Uses `lft` and `rgt` values to represent tree structure. Faster reads for subtrees, complex writes.\n-- Audit Trail: Tracking changes to data.\n--   Simple: Add `CreatedAt`, `CreatedBy`, `ModifiedAt`, `ModifiedBy` columns.\n--   Advanced: Use triggers to log changes to a separate audit table.' },
      { id: 10, title: 'Case Study: E-commerce DB Design', duration: '40 min', completed: false, description: 'Applying design principles (ERD, normalization) to outline a database schema for a basic e-commerce platform (Customers, Products, Orders, OrderItems).', content: '-- Entities: Customers, Products, Orders, OrderItems, Categories, Addresses.\n-- Relationships:\n--   Customer -> Orders (One-to-Many)\n--   Order -> OrderItems (One-to-Many)\n--   Product -> OrderItems (One-to-Many)\n--   Category -> Products (One-to-Many)\n--   Customer -> Addresses (One-to-Many)\n-- Key Attributes & Normalization considerations for each entity.' },
    ]
  },
  {
    id: 4,
    title: 'SQL Performance Tuning',
    description: 'Optimize your SQL queries for better performance.',
    duration: '2 hours',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib.rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    lessons: [
      { id: 1, title: 'Understanding Query Execution Plans', duration: '30 min', completed: false, description: 'Learning how the database optimizer translates your SQL query into a step-by-step execution plan.', content: '-- Purpose: Visualize how the database intends to fetch the data (joins, scans, seeks, sorts, etc.).\n-- Viewing Plans (Syntax varies):\n--   PostgreSQL/MySQL: `EXPLAIN SELECT ...;` or `EXPLAIN ANALYZE SELECT ...;` (shows actual execution stats)\n--   SQL Server: Use SSMS graphical plan viewer (Ctrl+L or Ctrl+M) or `SET SHOWPLAN_TEXT ON; SELECT ...; SET SHOWPLAN_TEXT OFF;`\n-- Key things to look for: Expensive operators (Table Scan, Hash Match), high estimated costs/rows.' },
      { id: 2, title: 'Analyzing Execution Plans', duration: '25 min', completed: false, description: 'Identifying common performance bottlenecks within execution plans: table scans vs. index seeks, join types (nested loops, hash, merge), costly sorting.', content: '-- Table Scan: Reading the entire table. Often bad for large tables unless selecting most rows. Look for missing indexes or non-SARGable WHERE clauses.\n-- Index Seek: Using an index to directly locate specific rows. Generally good.\n-- Index Scan: Reading all or a large part of an index. Better than a table scan if the index is smaller.\n-- Join Types: Nested Loops (good for small inner sets), Hash Match (good for large, unsorted sets), Merge Join (good for large, sorted sets).\n-- Look for Key Lookups/RID Lookups (SQL Server): Index seek retrieves key, then separate lookup fetches other columns. Consider covering indexes.' },
      { id: 3, title: 'Index Tuning (Clustered vs Non-Clustered)', duration: '30 min', completed: false, description: 'Choosing the right indexes based on query patterns. Understanding index selectivity, column order in composite indexes, and covering indexes.', content: '-- Selectivity: How unique values are in a column. High selectivity (many unique values, like a PK) is good for indexes.\n-- Composite Index Column Order: Place columns used most frequently in WHERE clauses (especially equality checks) first. `INDEX(colA, colB)` is useful for `WHERE colA = ?` and `WHERE colA = ? AND colB = ?`, less so for `WHERE colB = ?`.\n-- Covering Index: An index containing all columns needed by a query (in SELECT, WHERE, JOIN, ORDER BY). Avoids accessing the base table.\n\n-- Example Scenario: Find orders for a specific customer after a certain date.\n-- Query: `SELECT OrderID, OrderTotal FROM Orders WHERE CustomerID = ? AND OrderDate > ?`\n-- Good Index: `CREATE INDEX idx_orders_cust_date ON Orders (CustomerID, OrderDate);` (Maybe include OrderTotal for covering)' },
      { id: 4, title: 'Index Maintenance', duration: '20 min', completed: false, description: 'Understanding index fragmentation (internal/external) caused by DML operations and the need for periodic rebuilding or reorganizing.', content: '-- Fragmentation: When index pages are not full (internal) or logical order doesn\'t match physical order (external). Can slow down index scans.\n-- Causes: INSERTs, UPDATEs, DELETEs.\n-- Checking Fragmentation (Syntax varies by DB): Use system views or functions (e.g., `sys.dm_db_index_physical_stats` in SQL Server).\n-- Fixing Fragmentation:\n--   REORGANIZE: Defrags leaf level pages, often online.\n--   REBUILD: Creates a new index structure, often offline (but online options exist). Reduces both types of fragmentation. Updates statistics by default.\n-- Maintenance Strategy: Schedule regular checks and maintenance based on fragmentation levels.' },
      { id: 5, title: 'Statistics and Cardinality Estimation', duration: '25 min', completed: false, description: 'How the query optimizer uses statistics (histograms about data distribution) to estimate the number of rows (cardinality) returned by operators, crucial for choosing the right plan.', content: '-- Statistics: Histograms describing the distribution of values in indexed columns (or manually created stats).\n-- Cardinality Estimation: Optimizer\'s guess of how many rows will be processed/returned by each step in the plan.\n-- Problem: Outdated or inaccurate statistics lead to poor cardinality estimates and potentially bad execution plans.\n-- Solution: Ensure statistics are updated regularly (often automatic, but manual updates might be needed after large data changes).\n-- Commands (Syntax varies): `UPDATE STATISTICS TableName;`, `sp_updatestats` (SQL Server).' },
      { id: 6, title: 'Query Rewriting Techniques', duration: '30 min', completed: false, description: 'Improving query performance by restructuring the SQL itself: avoiding `SELECT *`, making WHERE clauses SARGable, using appropriate JOIN types, simplifying logic.', content: '-- Avoid `SELECT *`: Only select columns you need. Reduces I/O and network traffic. Helps with covering indexes.\n-- SARGable WHERE clauses: Allow the optimizer to use indexes effectively. Avoid functions on indexed columns.\n--   BAD: `WHERE YEAR(OrderDate) = 2023` (Function on column)\n--   GOOD: `WHERE OrderDate >= \'2023-01-01\' AND OrderDate < \'2024-01-01\'`\n--   BAD: `WHERE Substring(LastName, 1, 1) = \'S\'`\n--   GOOD: `WHERE LastName LIKE \'S%\'`\n-- Use `EXISTS` vs `IN` vs `JOIN`: Performance can vary. `EXISTS` is often good for simple existence checks.\n-- Simplify Logic: Break down complex queries, use CTEs, remove redundant conditions.' },
      { id: 7, title: 'Parameter Sniffing', duration: '20 min', completed: false, description: 'Understanding the phenomenon where a stored procedure or parameterized query optimizes based on the *first* parameter value used, potentially creating a suboptimal plan for subsequent, different values.', content: '-- Problem: Occurs with stored procedures/parameterized queries. Plan is cached based on initial parameter(s). If data distribution is skewed, this plan might be bad for other parameter values.\n-- Example: Procedure searches `Orders` by `CustomerID`. First run is for a customer with few orders (index seek plan cached). Next run is for a customer with many orders, where a table scan might have been better, but the cached seek plan is reused.\n-- Mitigation Techniques (Varies by DB):\n--   Use local variables inside procedure.\n--   `OPTIMIZE FOR UNKNOWN` hint (SQL Server).\n--   `RECOMPILE` hint (Forces new plan each time - use sparingly).\n--   Dynamic SQL (Use with caution).\n--   Plan freezing/guides.' },
      { id: 8, title: 'Monitoring and Profiling Tools', duration: '25 min', completed: false, description: 'Using database-specific tools and techniques (e.g., Extended Events, SQL Trace/Profiler, pg_stat_statements, slow query logs) to identify resource-intensive or frequently executed slow queries.', content: '-- Purpose: Identify which queries are consuming the most resources (CPU, I/O, duration) or running too slowly.\n-- Common Tools/Techniques:\n--   Slow Query Logs: Log queries exceeding a time threshold (MySQL, PostgreSQL).\n--   SQL Server: Extended Events (preferred), SQL Trace/Profiler (legacy).\n--   PostgreSQL: `pg_stat_statements` extension (tracks execution stats for all queries).\n--   MySQL: Performance Schema, `sys` schema.\n--   Monitoring Software: Many third-party tools offer detailed performance analysis (e.g., SolarWinds DPA, Datadog, New Relic).\n-- Focus on: High duration, high CPU, high I/O reads, high execution count.' },
    ]
  },
];

// Export courses to be used in other components
export { courses };

const Courses = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 }
      }}
    >
      <Typography 
        variant="h2" 
        sx={{ 
          mb: { xs: 3, md: 4 }, 
          textAlign: 'center',
          color: 'primary.main',
          fontWeight: 'bold',
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
        }}
      >
        SQL Courses
      </Typography>

      {/* Level Filter */}
      <Box 
        sx={{ 
          mb: { xs: 3, md: 4 }, 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 3,
          flexWrap: 'wrap',
          px: { xs: 1, sm: 0 }
        }}
      >
        {levels.map((level) => (
          <Chip
            key={level}
            label={level}
            onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
            color={selectedLevel === level ? 'primary' : 'default'}
            sx={{ 
              px: 3,
              py: 2,
              height: 'auto',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              minWidth: '120px',
              borderRadius: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
              }
            }}
          />
        ))}
      </Box>

      {/* Courses Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3,
          width: '100%'
        }}
      >
        {courses
          .filter((course) => !selectedLevel || course.level === selectedLevel)
          .map((course) => (
            <Card
              key={course.id}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                transition: 'transform 0.3s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={course.image}
                alt={course.title}
                sx={{ 
                  objectFit: 'cover',
                  height: '160px'
                }}
              />
              <CardContent 
                sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  p: { xs: 2, md: 3 },
                  gap: { xs: 1, md: 2 }
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'text.primary',
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  {course.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    flexGrow: 1,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  {course.description}
                </Typography>
                <Box 
                  sx={{ 
                    mt: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 1, md: 2 }
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      gap: 1,
                      flexWrap: 'wrap'
                    }}
                  >
                    <Chip
                      icon={<AccessTime />}
                      label={course.duration}
                      size="small"
                      sx={{ 
                        flex: 1,
                        minWidth: '120px',
                        bgcolor: 'rgba(0,0,0,0.05)',
                        fontSize: { xs: '0.8rem', md: '0.9rem' }
                      }}
                    />
                    <Chip
                      icon={<School />}
                      label={course.level}
                      size="small"
                      color="primary"
                      sx={{ 
                        flex: 1,
                        minWidth: '120px',
                        fontSize: { xs: '0.8rem', md: '0.9rem' }
                      }}
                    />
                    <Chip
                      icon={<MenuBook />}
                      label={`${course.lessons.length} Lessons`}
                      size="small"
                      sx={{ 
                        flex: 1,
                        minWidth: '120px',
                        bgcolor: 'rgba(0,0,0,0.05)',
                        fontSize: { xs: '0.8rem', md: '0.9rem' }
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    fullWidth
                    onClick={() => navigate(`/courses/${course.id}`)}
                    sx={{ 
                      mt: 1,
                      py: 1.5,
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      fontWeight: 'bold'
                    }}
                  >
                    Start Course
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Container>
  );
};

export default Courses; 