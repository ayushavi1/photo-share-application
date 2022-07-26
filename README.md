
# Photo Sharing Portal

Share your photos with their location attached and view others' photos on the portal.

## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform


## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** MongoDB

**External API Used:** Google Maps API, Geocoding API


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd photo-share-application
```

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the backend server

```bash
  npm start
```

In a separate terminal, go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the frontend server

```bash
  npm start
```


## API Reference

### Places API

#### Get place by ID

```http
  GET /api/places/:pid
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `pid` | `string` | **Required**. ID of place to fetch |

#### Get places by User ID

```http
  GET /api/places/user/:uid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid`      | `string` | **Required**. ID of user whose places are to be fetched |

#### Create place

```http
  POST /api/places
```

#### Update place

```http
  PATCH /api/places/:pid
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `pid` | `string` | **Required**. ID of place to update |

#### Delete place

```http
  DELETE /api/places/:pid
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `pid` | `string` | **Required**. ID of place to delete |

### Users API

#### Get all users

```http
  GET /api/users
```

#### Sign up

```http
  POST /api/users/signup
```
#### Login

```http
  POST /api/users/login
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Client Side:

Google Maps API Key `REACT_APP_GOOGLE_MAPS_API_KEY`

#### Server Side:

Google Maps API Key `API_KEY`

MongoDB Database URL `MONGO_URI`

JSON Web Token Key `JWT_KEY`


