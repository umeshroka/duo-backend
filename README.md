# Duo Backend

## Description

Duo is a platform for exploring and learning about traditional Chinese calligraphy and paintings. This MVP backend provides the API for browsing artworks, artists, masterclasses, and professional services along with enquiry functionality and AI-powered artwork generation in traditional Chinese styles.

## API Endpoints

### Authentication
- `POST /auth/sign-up`: Register a new user
- `POST /auth/sign-in`: Authenticate a user and receive JWT token

### User Management
- `GET /users/profile`: Get the authenticated user's profile
- `PUT /users/profile`: Update the authenticated user's profile
- `DELETE /users/profile`: Delete the authenticated user's profile

### Artists
- `GET /artists`: Get all artists with their featured artwork
- `GET /artists/featured`: Get featured artists with their featured artwork
- `GET /artists/:id`: Get a specific artist with their artworks and media articles

### Artworks
- `GET /artworks`: Get all artworks 
- `GET /artworks/:id`: Get a specific artwork details

### Masterclasses
- `GET /masterclasses`: Get all masterclasses

### Services
- `GET /services`: Get all services

### Editorials
- `GET /editorials`: Get all editorials
- `GET /editorials/:id`: Get a specific editorial

### Enquiries (Protected Routes)
- `POST /artwork-enquiries`: Create a new enquiry about an artwork
- `POST /service-enquiries`: Create a new enquiry about a service
- `POST /masterclass-enquiries`: Create a new enquiry about a masterclass

### AI Artwork Generation (Protected Routes)
- `POST /playground/generate`: Generate new AI artwork based on specified parameters

## Front-end Github Repo 

- Front-end GitHub repo link : https://github.com/umeshroka/duo-frontend

## Deployed App Link

- Deployed back-end project link : https://duo-backend-production.up.railway.app/

## Database Schema

- Users
- Artists
- Artworks
- Masterclasses
- Services
- Editorials
- Enquiries (Artwork, Service, Masterclass)
- AI-generated Artworks





