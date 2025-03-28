# Duo Backend

Placeholder for screenshot/logo

## Description

Duo is a platform for exploring and learning about traditional Chinese calligraphy and paintings. This MVP backend provides the API for browsing artworks, artists, masterclasses, and services along with simple enquiry functionality and AI artwork generation.

## MVP Features

- User Authentication: Simple JWT-based authentication
- Artist Display: Browse artist profiles and their works
- Artwork Showcase: Browse artworks
- Educational Content: View masterclasses, editorial content, AI playground
- Professional Services: View available art services
- AI Art Generation: Create custom AI-generated artworks in traditional Chinese styles
- Enquiry System: Submit enquiries about artworks, services or masterclasses

## API Endpoints

### Authentication
- `POST /auth/sign-up`: Register a new user
- `POST /auth/sign-in`: Authenticate a user and receive JWT token

### Artists
- `GET /artists`: Get all artists
- `GET /artists/featured`: Get featured artists
- `GET /artists/:id`: Get a specific artist details

### Artworks
- `GET /artworks`: Get all artworks 
- `GET /artworks/:id`: Get a specific artwork details

### Masterclasses
- `GET /masterclasses`: Get all masterclasses
- `GET /masterclasses/:id`: Get a specific masterclass details

### Services
- `GET /services`: Get all services
- `GET /services/:id`: Get a specific service details

### Editorials
- `GET /editorials`: Get all editorials with optional filtering
- `GET /editorials/:id`: Get a specific editorial

### Enquiries (Protected Routes)
- `POST /enquiries`: Create a new enquiry

### AI Artwork Generation (Protected Routes)
- `POST /playground/generate`: Generate new AI artwork

## Project Planning 

- [Project planning link] : 

## Github Repo 

- [Front-end GitHub repo link] : 
- [Back-end GitHub repo link] : 

## Deployed App Link

- [Deployed front-end project link] : 
- [Deployed back-end project link] : 

## Attributions

## Technologies Used

- **Node.js & Express**: API framework
- PostgreSQL & Supabase: Database
- Prisma ORM: Type-safe database access
- Hugging Face API: AI art generation
- Cloudinary: Media storage for artwork images

## Stretch Goals

- Admin dashboard and routes for content management to post,put,delete 
- User dashboard to view past enquiries and saved artworks
- Payment processing integration i.e. Stripe
- Multi-language support
- Search functionality
- Real-time notifications for enquires to admin

## Reflections

### Favourite Code

### Can do better