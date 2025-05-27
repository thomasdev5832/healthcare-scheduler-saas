# Healthcare Scheduler SaaS

Healthcare Scheduler SaaS is a web application for managing clinics, doctors, patients, and appointments. Built with Next.js, Drizzle ORM, PostgreSQL, and Tailwind CSS, it provides a modern and customizable scheduling platform for healthcare providers.

## Features

- Manage clinics, doctors, and patients
- Schedule and track appointments
- Relational database schema with Drizzle ORM
- Responsive UI with Tailwind CSS
- Environment-based configuration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/healthcare-scheduler-saas.git
   cd healthcare-scheduler-saas
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the project root and set your database URL:

   ```
   DATABASE_URL=
   ```

4. Run database migrations using Drizzle Kit:

   ```sh
   npx drizzle-kit push
   ```

### Running the Development Server

Start the Next.js development server:

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Database Schema

The schema is defined in [`src/db/schema.ts`](src/db/schema.ts). It includes tables for users, clinics, doctors, patients, and appointments, with appropriate relations.

## Configuration

- Environment variables are loaded from `.env` using `dotenv`.
- Database connection is configured in [`src/db/index.ts`](src/db/index.ts).
- Drizzle ORM configuration is in [`drizzle.config.ts`](drizzle.config.ts).

## Styling

- Tailwind CSS is configured in [`src/app/globals.css`](src/app/globals.css).
- Prettier and ESLint are set up for code formatting and linting.

## License

This project is licensed under the MIT License.