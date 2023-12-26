push:
	scp -i "C:\Users\ned20\Desktop\AWS KeyPair\WeatherApp.pem" -r "C:\Users\ned20\Documents\GitHub\Weather-App\New Version" ubuntu@ec2-54-167-10-101.compute-1.amazonaws.com:/home/ubuntu
	
compose:
	docker builder prune
	docker-compose up --force-recreate -d