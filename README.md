# 🔧 GestionInterventions

Plateforme web de gestion des interventions techniques — développée avec **Spring Boot** (backend) et **React** (frontend).

---

## 📌 Description

Cette application permet aux entreprises de maintenance et de support technique de :
- Centraliser les demandes d'intervention
- Affecter les interventions aux techniciens disponibles
- Suivre l'état d'avancement en temps réel
- Gérer les utilisateurs et leurs rôles (Admin, Technicien)

---

## 🗂️ Structure du projet

```
GestionInterventions/
├── backend/      → API REST Spring Boot + Oracle
└── frontend/     → Interface React
```

---

## ⚙️ Technologies utilisées

### Backend
| Technologie | Version |
|---|---|
| Java | 17 |
| Spring Boot | 4.x |
| Spring Data JPA | — |
| Oracle XE | 11g |
| Lombok | — |

### Frontend
| Technologie | Usage |
|---|---|
| React | Interface utilisateur |
| useState / useEffect | Gestion des états |
| Fetch API | Communication avec le backend |

---

## 🚀 Lancer le projet

### 1. Backend

```bash
# Cloner le repo
git clone https://github.com/Farnane2005/GestionInterventions.git

# Aller dans le dossier backend
cd GestionInterventions/backend

# Copier le fichier de config
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Remplir vos identifiants Oracle dans application.properties
# spring.datasource.username=VOTRE_USERNAME
# spring.datasource.password=VOTRE_PASSWORD

# Lancer l'application (Eclipse)
# Clic droit → Run As → Spring Boot App
```

Le backend démarre sur : `http://localhost:8081`

### 2. Frontend

```bash
# Aller dans le dossier frontend
cd GestionInterventions/frontend

# Installer les dépendances
npm install

# Lancer l'application
npm start
```

Le frontend démarre sur : `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentification
| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Connexion |
| POST | `/api/auth/register/admin` | Créer un admin |
| POST | `/api/auth/register/technicien` | Créer un technicien |

### Interventions
| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/interventions` | Liste toutes les interventions |
| POST | `/api/interventions` | Créer une intervention |
| PUT | `/api/interventions/{id}` | Modifier une intervention |
| DELETE | `/api/interventions/{id}` | Supprimer une intervention |
| PUT | `/api/interventions/{id}/affecter/{techId}` | Affecter un technicien |
| PUT | `/api/interventions/{id}/terminer` | Terminer une intervention |

### Techniciens
| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/techniciens` | Liste tous les techniciens |
| POST | `/api/techniciens` | Ajouter un technicien |
| PUT | `/api/techniciens/{id}` | Modifier un technicien |
| DELETE | `/api/techniciens/{id}` | Supprimer un technicien |
| GET | `/api/techniciens/disponibles` | Techniciens disponibles |

---

## 👤 Rôles utilisateurs

| Rôle | Accès |
|---|---|
| `SUPER_ADMIN` | Accès complet |
| `ADMIN` | Gestion interventions & techniciens |
| `TECHNICIEN` | Consultation de ses interventions |

---

## 👥 Contributeurs

- **Farnane2005 ( EL FARNANE MOHAMED)** — Backend Spring Boot
- **zzidani4800 (Zidane ZIDANI)** — Frontend React

---

## 📄 Licence

Projet académique — Institut Supérieur d'Informatique (ISI)
