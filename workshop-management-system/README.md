# Workshop/Seminar Management System (MERN Stack)

A full-stack MERN application for managing educational workshops, user registrations, role-based authorization, and attendance tracking.

## 1. Project Setup
**Prerequisites:** Node.js v18.x or higher and MongoDB Atlas or local MongoDB.

**Backend Setup (`/server`):**
```bash
cd server
```

## 2. API Documentation

### Authentication Routes (`/api/auth`)

**1. Register User — `POST /api/auth/register`**

Header: `Content-Type: application/json`

Request Body:
```json
{"name":"Jane Doe","email":"jane@example.com","password":"securepassword123","role":"attendee"}
```

Response (201 Created):
```json
{"message":"User registered successfully","token":"<jwt_token>","user":{"id":"653b1a2f4f1a2c0012345678","name":"Jane Doe","email":"jane@example.com","role":"attendee"}}
```

**2. Login User — `POST /api/auth/login`**

Header: `Content-Type: application/json`

Request Body:
```json
{"email":"jane@example.com","password":"securepassword123"}
```

Response (200 OK):
```json
{"token":"<jwt_token>","user":{"id":"653b1a2f4f1a2c0012345678","name":"Jane Doe","email":"jane@example.com","role":"attendee"}}
```

### Workshop Routes (`/api/workshops`)

**3. Get All Workshops — `GET /api/workshops`**

Header: `Authorization: Bearer <your_jwt_token>`

Response (200 OK):
```json
[{"_id":"653b1b3f4f1a2c0087654321","title":"Full-Stack MERN Development","description":"Learn to build modern web applications using MongoDB, Express, React, and Node.","date":"2026-11-15T10:00:00.000Z","capacity":30,"createdBy":"653b1a2f4f1a2c0012345678","attendees":[]}]
```

**4. Create Workshop (Admin Only) — `POST /api/workshops`**

Headers: `Content-Type: application/json`, `Authorization: Bearer <your_jwt_token>`

Request Body:
```json
{"title":"Full-Stack MERN Development","description":"Learn to build modern web applications using MongoDB, Express, React, and Node.","date":"2026-11-15T10:00:00.000Z","capacity":30}
```

Response (201 Created):
```json
{"message":"Workshop created successfully","workshop":{"_id":"653b1b3f4f1a2c0087654321","title":"Full-Stack MERN Development","description":"Learn to build modern web applications using MongoDB, Express, React, and Node.","date":"2026-11-15T10:00:00.000Z","capacity":30,"createdBy":"653b1a2f4f1a2c0012345678","attendees":[]}}
```

**5. Enroll in Workshop — `PUT /api/workshops/:id/enroll`**

Header: `Authorization: Bearer <your_jwt_token>`

Response (200 OK):
```json
{"message":"Enrolled in workshop successfully","workshopId":"653b1b3f4f1a2c0087654321"}
```

## 3. Database Schema Diagram (Mongoose Models)

```text
USERS                                      WORKSHOPS
_id: ObjectId (PK)                         _id: ObjectId (PK)
name: String                               title: String
email: String (Unique)                     description: String
password: String (Hashed)                  date: Date
role: String (admin/attendee)              capacity: Number
createdAt: Date                            createdBy: ObjectId (Ref: User)
                                           attendees: [ObjectId (Ref: User)]
                                           createdAt: Date

Users 1:N Workshops (Created By)
Users N:M Workshops (Attendees)
```

### Schema Definitions
**User Model (`server/models/User.js`):** Stores name, email, hashed password using `bcryptjs`, and role (`admin` or `attendee`).

**Workshop Model (`server/models/Workshop.js`):** Stores workshop details (title, description, date, capacity), creator reference (`createdBy`), enrolled participants (`attendees`), and creation date (`createdAt`).