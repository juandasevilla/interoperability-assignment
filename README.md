# interoperability-assignment

# Taller Orquestación e Interoperabilidad

## Requisitos

- Docker Desktop instalado
- Docker Compose habilitado
- Git instalado

---

# Clonar el proyecto

```bash
git clone https://github.com/juandasevilla/interoperability-assignment.git
git fetch
cd interoperability-assignment
Levantar los servicios

Construir y levantar los contenedores:

docker compose up --build
docker compose build --no-cache
docker compose up

Los servicios disponibles serán:

Servicio	URL
Frontend React	http://localhost:8085
API Django REST	http://localhost:4000
Adminer	http://localhost:8080
Credenciales Base de Datos
Parámetro	Valor
Database	mystore
User	group3
Password	group3password

Cambio importante realizado
Se modificó el Dockerfile del microservicio Django.

Cambio realizado: FROM python:3.9
Motivo: Las versiones recientes de Python (3.13 y superiores) generan incompatibilidad con Django 3.1 debido a la eliminación del módulo interno cgi.

El error presentado era:

ModuleNotFoundError: No module named 'cgi'

Por esta razón se fijó la versión de Python en 3.9, garantizando compatibilidad con el proyecto.

Verificación del puerto 3306

Antes de levantar los servicios verificar que el puerto 3306 no esté ocupado en la máquina local.

Verificar proceso usando el puerto 3306
netstat -ano | findstr :3306

Obtener el PID y consultar el proceso:

tasklist | findstr PID

Ejemplo:

tasklist | findstr 5360
Detener servicio MySQL local

Si existe un MySQL local ejecutándose, detenerlo temporalmente.

Opción 1 — Desde servicios de Windows

Abrir:

services.msc

Buscar:

MySQL
MySQL80
MariaDB

y seleccionar:

Detener
Opción 2 — Desde terminal como administrador
net stop MySQL80

Luego volver a ejecutar:

docker compose up
Comandos útiles

Ver estado de los contenedores:

docker compose ps

Ver logs del microservicio Django:

docker compose logs mystore_ms

Detener servicios:

docker compose down
Estructura del proyecto
interoperability-assignment/
│
├── docker-compose.yml
├── .env
├── bigstore_ms/
├── mystore_frontend/
