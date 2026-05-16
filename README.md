# Projektuppgift – Databas - Programmering i TypeScript, DT208G

**Genomförd av: joha2102**

Länk till API:t: kommer

## Projektbeskrivning

Detta projekt är en del av slutuppgiften i kursen "Programmering i TypeScript" vid Mittuniversitetet. Uppgiften går ut på att skapa en webbplats för ett fiktivt universitet, där det ska gå att lista tillgängliga kurser och skapa ett eget schema av en uppsättning kurser som läses in via en JSON-fil/API.

Denna del avser en databas som hanterar användare och sparade kurser.

Länk till repot för frontend: 

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
Course (id (PK), User_id (FK), Course_code, Subject_code, Added_at)
