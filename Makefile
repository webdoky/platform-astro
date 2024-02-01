#!make

# include .env
# If .env exists
ifneq ("$(wildcard .env)","")
	include .env
	export $(shell sed 's/=.*//' .env)
endif
.ONESHELL:
.PHONY: build clean deploy install lint preview rebuild test
.SHELLFLAGS += -e

dist: astro.config.mjs lint package.json src src/content/processed-content yarn.lock
	npx astro build

external/translated-content:
	git submodule add git@github.com:webdoky/content.git ./external/translated-content

preprocess/dist:
	rm -rf ./preprocess/dist
	tsc --project ./preprocess/tsconfig.json --outDir ./preprocess/dist

src/content/processed-content: external/translated-content preprocess/dist
	rm -rf ./src/content/processed-content
	node ./preprocess/dist/index.js

clean:
	rm -rf dist

lint: src
	yarn lint

node_modules:
	yarn

original-content:
	git submodule add git@github.com:mdn/content.git ./external/original-content

preview:
	yarn preview

rebuild: clean build

test: src
	yarn test
