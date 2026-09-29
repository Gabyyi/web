# Team Profile Hub (Spring Boot + Gradle + PostgreSQL)

Project implementation for your group requirements:
- Java + Spring Boot backend with custom REST API
- PostgreSQL database
- Static frontend (HTML/CSS/JS)
- Search by Name and Skills
- Gradle build (no Maven)

## Data model fields
The profile model uses these fields:
- `fname`
- `lname`
- `email`
- `ps` (password/phone)
- `group`
- `DETAILS`
- `SKILLS`

## API endpoints
Base path: `/api/profiles`

- `GET /api/profiles` - list all profiles
- `GET /api/profiles/{id}` - get profile by id
- `POST /api/profiles` - create profile
- `PUT /api/profiles/{id}` - update profile
- `DELETE /api/profiles/{id}` - delete profile
- `GET /api/profiles/search?name=...&skills=...` - search by name and skills

## PostgreSQL setup
Create a local database, for example:

```sql
CREATE DATABASE lab1db;
```

Environment variables (optional, defaults are provided):
- `DB_URL` default: `jdbc:postgresql://localhost:5432/lab1db`
- `DB_USER` default: `postgres`
- `DB_PASS` default: `postgres`

## Run

```bash
./gradlew bootRun
```

Open:
- UI: `http://localhost:8080`
- API: `http://localhost:8080/api/profiles`

## Notes
- JPA is configured with `spring.jpa.hibernate.ddl-auto=update` for easy development.
- Main UI files are under `src/main/resources/static/`.
