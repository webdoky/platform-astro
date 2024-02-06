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

src/content/processed-content: external/translated-content
	cp -r ./external/translated-content/files/uk ./src/content/processed-content
  # Rename all folders in ./src/content/processed-content, replacing starting _ with -_
	find ./src/content/processed-content -name "_*" -type d | while read -r dir; do mv "$$dir" "$$(dirname "$$dir")/-`basename $$dir`"; done

clean:
	rm -rf dist

lint: src
	yarn lint

node_modules:
	yarn

external/original-content:
	git submodule add git@github.com:mdn/content.git ./external/original-content

preview:
	yarn preview

rebuild: clean build

test: src
	yarn test
