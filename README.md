# Sudoku

Juego de Sudoku construido con la arquitectura MEAN (MongoDB, Express, Angular 4, Node.js). Incluye generador/resolvedor de sudokus, autenticacion con JWT y un tablero interactivo dibujado con p5.js.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) y Docker Compose

## Ejecutar en entorno local

1. Clonar el repositorio:

```bash
git clone https://github.com/alonsocoding/Sudoku_Game
cd Sudoku_Game
```

2. Levantar los servicios:

```bash
docker-compose up
```

Esto levanta:
- **MongoDB** en el puerto `27017`
- **Backend (API)** en el puerto `8080` con la app Angular servida en `http://localhost:8080`

3. Abrir en el navegador:

```
http://localhost:8080
```

### Comandos utiles

| Accion | Comando |
|---|---|
| Levantar en background | `docker-compose up -d` |
| Ver logs | `docker-compose logs -f backend` |
| Detener servicios | `docker-compose down` |
| Reconstruir imagen | `docker-compose up --build` |
| Eliminar datos de MongoDB | `docker-compose down -v` |

## Estructura del proyecto

```
.
├── index.js                  # Entry point del servidor
├── app.js                    # Configuracion de Express y rutas
├── Dockerfile                # Imagen del backend (Node 20)
├── docker-compose.yml        # Servicios: MongoDB + Backend
├── .env                      # Variables de entorno (credenciales, puertos)
├── middlewares/
│   └── authenticated.js      # Middleware de autenticacion JWT
├── services/
│   └── jwt.js                # Creacion de tokens JWT
├── controllers/
│   ├── user.js               # Registro, login, actualizacion de usuarios
│   └── sudoku.js             # CRUD de grids y juegos, resolvedor
├── routes/
│   ├── user.js               # Rutas de usuario (/api/register, /api/login, ...)
│   └── sudoku.js             # Rutas de sudoku (/api/sudoku/...)
├── models/
│   ├── user.js               # Schema de usuario
│   ├── game.js               # Schema de juego
│   ├── grid.js               # Schema de tablero
│   ├── cell.js               # Schema de celda
│   └── solver/               # Logica de resolvedor y generador de sudokus
├── client/                   # Frontend Angular 4
│   ├── src/
│   │   ├── app/              # Componentes, servicios y modelos Angular
│   │   ├── styles.css        # Estilos globales
│   │   └── index.html        # HTML principal
│   └── package.json
└── public/                   # Build de Angular (generado por ng build)
```

## API

Todas las rutas estan bajo `/api`:

| Metodo | Ruta | Descripcion |
|---|---|---|
| POST | `/register` | Registrar usuario |
| POST | `/login` | Iniciar sesion |
| PUT | `/update-user/:id` | Actualizar usuario (requiere JWT) |
| GET | `/find-user/:id` | Buscar usuario (requiere JWT) |
| POST | `/sudoku/insert-grid` | Insertar grids |
| GET | `/sudoku/get-grid/:id` | Obtener grid |
| GET | `/sudoku/get-grid-diff/:difficulty` | Obtener grid por dificultad |
| POST | `/sudoku/insert-game` | Guardar juego |
| GET | `/sudoku/get-game/:id` | Cargar juego |
| POST | `/sudoku/rsolve` | Resolver sudoku |

## Stack

- **Backend:** Node.js + Express + Mongoose + JWT
- **Frontend:** Angular 4 + Bootstrap 4 + p5.js
- **Base de datos:** MongoDB 8
- **Infraestructura:** Docker + Docker Compose
