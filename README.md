# UKK Kereta API 2025

Welcome to the final project test for 2025 at SMK Telkom Malang! This project serves as a comprehensive API for railway systems. Enjoy exploring, and don’t hesitate to give feedback if something feels off.

![Lily](https://fadhilkholaf.my.id/images/main/gif.gif)

> **Warning:**  
> Some APIs on this site might not work perfectly when parsing cookies. For the best experience, we recommend testing the endpoints using tools like Postman or Apidog.

---

## Table of Contents

- [UKK Kereta API 2025](#ukk-kereta-api-2025)
  - [Table of Contents](#table-of-contents)
  - [Base URLs](#base-urls)
  - [Source Code](#source-code)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Cloning the Repository](#cloning-the-repository)
    - [Setting Up the Environment](#setting-up-the-environment)
    - [Installing Dependencies](#installing-dependencies)
    - [Running the Project](#running-the-project)
      - [Development Server](#development-server)
      - [Building the Project](#building-the-project)
      - [Production Server](#production-server)

---

## Base URLs

- **API:** [https://kereta.api.fadhilkholaf.my.id](https://kereta.api.fadhilkholaf.my.id)
- **Docs:** [https://kereta.apidog.fadhilkholaf.my.id](https://kereta.apidog.fadhilkholaf.my.id)

---

## Source Code

Find the complete source on [GitHub](https://github.com/fadhilkholaf/ukk-kereta-api-2025).

---

## Tech Stack

- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/orm)

---

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)
- [PostgreSQL](https://www.postgresql.org/download)

### Cloning the Repository

Clone the project and navigate into the directory:

```bash
git clone https://github.com/fadhilkholaf/ukk-kereta-api-2025.git && cd ukk-kereta-api-2025
```

### Setting Up the Environment

1. Create a new `.env` file in the project root.
2. Populate the file with the required environment variables.  
   You can refer to the example provided in `.env.example`.

### Installing Dependencies

Install the project dependencies using pnpm:

```bash
pnpm install
```

### Running the Project

#### Development Server

Start the development server with:

```bash
pnpm dev
```

#### Building the Project

Build the project for production:

```bash
pnpm build
```

#### Production Server

Run the production server with:

```bash
pnpm start
```
