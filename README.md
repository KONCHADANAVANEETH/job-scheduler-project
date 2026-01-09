# Job Scheduler & Automation System

A mini full-stack job scheduling and automation system built as part of the **Dotix Technologies – Full Stack Developer Skill Test**.

This application allows users to create background jobs, run them manually, track their status, and trigger a webhook automatically when a job completes.

---

## Features

- Create background jobs with:
  - Task name
  - Priority (Low / Medium / High)
  - JSON payload
- View all jobs in a dashboard table
- Filter jobs by status and priority
- Run jobs manually
- Track job lifecycle:
  - `pending → running → completed`
- Job detail view with formatted payload
- Automatic webhook trigger on job completion

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- SQLite

### Tools
- Postman (API testing)
- webhook.site (webhook testing)

---

## Project Architecture

```

Frontend (React)
↓ REST API
Backend (Node.js + Express)
↓
SQLite Database
↓
Webhook Trigger (webhook.site)

```

---

## Project Structure

```

root-project/
│
├── frontend/
│   ├── pages/
│   ├── components/
│   └── services/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── database/
│   └── app.js
│
└── README.md

```

---

## Database Schema

**Table: `jobs`**

| Column        | Type      | Description |
|--------------|-----------|-------------|
| id           | INTEGER   | Primary Key |
| taskName     | TEXT      | Job name |
| payload      | JSON      | Job data |
| priority     | TEXT      | Low / Medium / High |
| status       | TEXT      | pending / running / completed |
| createdAt    | TIMESTAMP | Created time |
| updatedAt    | TIMESTAMP | Updated time |
| completedAt  | TIMESTAMP | Completion time |

---

## API Endpoints

### Create Job
```

POST /jobs

```

### Get All Jobs (with filters)
```

GET /jobs
GET /jobs?status=pending
GET /jobs?priority=High

```

### Get Job by ID
```

GET /jobs/:id

```

### Run Job
```

POST /jobs/run-job/:id

````

---

## Job Execution Flow

1. User creates a job → status = `pending`
2. User clicks **Run**
3. Backend updates status → `running`
4. Simulates background work (3 seconds)
5. Status updates → `completed`
6. Webhook is triggered automatically

---

## Webhook Integration

- Webhook is triggered **only when a job is completed**
- Uses **webhook.site** for testing
- Payload sent includes:
  - jobId
  - taskName
  - priority
  - payload
  - completedAt

Example payload:
```json
{
  "jobId": 1,
  "taskName": "Send Welcome Email",
  "priority": "Medium",
  "payload": {
    "email": "user@example.com"
  },
  "completedAt": "2026-01-09T10:45:12.000Z"
}
````

---

## How to Run Locally

### Backend

```bash
cd backend
npm install
node app.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Testing

* APIs tested using **Postman**
* UI tested through browser
* Webhook tested using **webhook.site**
* End-to-end flow verified:

  ```
  Create → Pending → Run → Running → Completed → Webhook
  ```

---

## AI Usage Policy (Disclosure)

AI tools were used **responsibly** during development for learning and debugging.

### AI Tool Used

* ChatGPT

### Model

* ### Model
* GPT-4.1

### Where AI Helped

* Understanding backend job execution logic
* Debugging async issues in Node.js
* Structuring React components
* Clarifying webhook integration

## AI Prompts Used

### Prompt 1 – Backend Logic Understanding
Explain how to implement a job scheduler in Node.js
where job status changes from pending to running to completed.

### Prompt 2 – Debugging Async Errors
I am getting 'await is only valid in async functions' error in Node.js.
Explain why this happens and how to fix it.

### Prompt 3 – React UI State Handling
How can I optimistically update UI in React
when an API call triggers a background process?

### Prompt 4 – Webhook Testing
What is webhook.site and how can I test outbound webhooks from a Node.js backend?


### What Was NOT Auto-Generated

* Final architecture decisions
* Core business logic
* UI behavior and state handling

All AI-assisted code was reviewed, understood, and modified manually.

---

## Author

**Navaneeth Konchada**
2024 Graduate
Aspiring Full Stack Developer

---

## Final Notes

This project focuses on:

* Clean architecture
* Clear job lifecycle handling
* Real-world automation concepts
* Simple and readable code

Thank you for reviewing this assignment.


---
