# Projektuppgift – Databas - Programmering i TypeScript, DT208G

**Genomförd av: joha2102**

Länk till API:t: https://ts-projektuppgift-jh-postgres.onrender.com/

## Projektbeskrivning

Detta projekt är en del av slutuppgiften i kursen "Programmering i TypeScript" vid Mittuniversitetet. Uppgiften går ut på att skapa en webbplats för ett fiktivt universitet, där det ska gå att lista tillgängliga kurser och skapa ett eget schema av en uppsättning kurser som läses in via en JSON-fil/API.

Denna del avser webbtjänst som hanterar användare och sparade kurser. API:et använder PostgreSQL (Render Postgres) som databas och JWT för autentisering.

Länk till repot för frontend: https://github.com/JohannaHannahoJ/ts-projektuppgift-jh

## Installation

Initiera npm-projekt:
```
npm init -y
```

Installera paket:
```
npm install express cors dotenv jsonwebtoken bcrypt pg body-parser
```

Installera nodemon:
npm install nodemon --save-dev

Kör projektet:
```
npm run serve
```
## Databas
Databasen är skapad via Renders PostgreSQL-tjänst. 

Projektet har en `.env`-fil för känsliga uppgifter. Se `.env.sample` för aktuella variabler.

För att skapa databasen körs:
```
node install.js
```
Install.js kopplar då upp sig mot Renders PostgreSQL och skapar tabellerna.

### Basrelationer
User (id (PK), Username, Password, Account_created)
Course (id (PK), User_id (FK), Course_code, Course_name, Points, Subject, Syllabus Added_at)

## API Endpoints
Så här används API:ets endpoints

### Users
| Metod | Ändpunkt        | Beskrivning                                        |
|-------|-----------------|----------------------------------------------------|
| POST  | /users/login    | Loggar in en användare och returnerar JWT-token    |
| POST  | /users/register | Skapar ny användare                                |

### Courses
| Metod | Ändpunkt             | Beskrivning                                        |
|-------|----------------------|----------------------------------------------------|
| GET   | /courses             | Hämtar användarens sparade kurser                  |
| POST  | /courses             | Lägger till kurs i användarens schema              |
| DELETE| /courses/:courseCode | Tar bort kurs från schemat                         |

