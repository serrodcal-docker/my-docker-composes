# Docker Compose with Toxiproxy

## Simple test without Toxiproxy

> docker compose up

> curl http://localhost:8290/health/hospital/SVQ002 -H 'Content-Type: application/json' -w "\n" -m 2 --connect-timeout 2 -v

## Toxiproxy for latency

> docker compose -f docker-compose-toxiproxy.yml up

> docker exec -it toxiproxy /toxiproxy-cli toxic add -t latency -a latency=2000 toxi_hospital_blue

> docker exec -it toxiproxy /toxiproxy-cli toxic remove -n latency_downstream toxi_hospital_blue

> k6 run script_toxiproxy.js

> docker compose down -v --remove-orphans

### Toxiproxy for timeouts 

> docker exec -it toxiproxy /toxiproxy-cli toxic add -t timeout -a timeout=1000 toxi_hospital_blue

> docker exec -it toxiproxy /toxiproxy-cli toxic remove -n timeout_downstream toxi_hospital_blue