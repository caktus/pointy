
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
HASH := $(shell git rev-parse --short HEAD)
BRANCH_CLEAN := $(shell echo ${BRANCH} | sed "s@/@-@")
API_TAG = ${BRANCH_CLEAN}-api-${HASH}
WEB_TAG = ${BRANCH_CLEAN}-web-${HASH}

build-api:
	@echo ${API_TAG}
	docker-compose build api
	docker tag pointy_api:latest pointy_api:${API_TAG}
	docker-compose build web
	docker tag pointy_web:latest point_api:${WEB_TAG}
