
# Art-Website – Setup Guide für Entwickler

Dies ist eine Fullstack-Webanwendung mit Angular (Frontend) und ASP.NET Core + SQLite (Backend), organisiert als Monorepo.

---

## Voraussetzungen

### Backend (.NET)
- [.NET SDK 6+](https://dotnet.microsoft.com/download)
- Optional: Visual Studio 2022 oder VS Code

### Frontend (Angular)
- [Node.js LTS](https://nodejs.org/)
- Angular CLI:  
  ```bash
  npm install -g @angular/cli
  ```

### Git
- Git muss installiert sein

---

## Setup nach dem Klonen des Repos

```bash
git clone https://gitlab.com/dein-benutzername/art-website.git
cd art-website
```

---

### 1. Backend vorbereiten (ASP.NET Core + SQLite)

```bash
cd server

# Abhängigkeiten laden
dotnet restore

# (Falls nicht vorhanden) dotnet-ef installieren:
dotnet tool install --global dotnet-ef

# Datenbank per Migration erzeugen
dotnet ef database update
```

Falls `art.db` bereits im Repo liegt, kann dieser Schritt entfallen.

---

### 2. Frontend vorbereiten (Angular)

```bash
cd ../client

# Node-Module installieren
npm install

# Entwicklungsserver starten
ng serve
```

Frontend ist erreichbar unter:  
http://localhost:4200

---

### 3. Uploads-Ordner manuell anlegen (für Bild-Uploads)

```bash
cd ..
mkdir uploads
```

---

## Ordnerstruktur

```
art-website/
├── client/      # Angular Frontend
├── server/      # ASP.NET Core Web API Backend
├── uploads/     # Bildspeicher (ggf. manuell anlegen)
```

---

## ⚙️ Nützliche Befehle

| Befehl | Beschreibung |
|--------|--------------|
| `dotnet run` | Startet das Backend |
| `ng serve` | Startet das Frontend |
| `dotnet ef migrations add <Name>` | Neue Datenbankmigration |
| `dotnet ef database update` | Migrationen anwenden |

---

## 🧑‍💻 Weitere Hinweise

- Bei Windows: Zeilenende-Konflikte vermeiden mit `.gitattributes`:
  ```
  * text=auto
  ```

- Der Ordner `uploads/` ist in `.gitignore` – ggf. manuell erstellen:
  ```bash
  mkdir uploads
  ```

---

