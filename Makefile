build:
	docker build -t cardarenafe .
	docker run -it -p 5173:5173 cardarenafe

run:
	docker run -it -p 5173:5173 cardarenafe

run-dev:
	npm start