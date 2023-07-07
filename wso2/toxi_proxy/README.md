# Docker Compose with Toxiproxy

## Simple test without Toxiproxy

> docker compose up

> curl http://localhost:8290/health/hospital/SVQ002 -H 'Content-Type: application/json' -w "\n" -m 5 --connect-timeout 5 -v

## Toxiproxy

> docker compose up

> docker exec -it toxiproxy /toxiproxy-cli toxic add -t latency -a latency=2000 toxi_hospital_blue

> k6 run script.js