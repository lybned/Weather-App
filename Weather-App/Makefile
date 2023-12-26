
compose:
	docker stop $$(docker ps -a -q)
	docker system prune -a
	docker-compose up --force-recreate -d