setup:
	@npm install
	@node_modules/bower/bin/bower install

test:
	@grunt jasmine

run:
	@grunt server

build:
	@grunt default

gh-pages:
	@git push origin master:gh-pages

release: gh-pages
	@grunt bump-only
	@make build
	@grunt bump-commit
