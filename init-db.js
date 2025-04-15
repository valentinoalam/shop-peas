
import { execSync } from 'child_process';

try {
  console.log('Initializing Prisma...');
  
  // Generate Prisma client
  execSync('npx prisma generate');
  
  // Create SQLite database and run migrations
  execSync('npx prisma migrate dev --name init');
  
  // Seed database with initial data
  execSync('npx prisma db seed');
  
  console.log('Database initialized successfully!');
} catch (error) {
  console.error('Error initializing database:', error.message);
  process.exit(1);
}