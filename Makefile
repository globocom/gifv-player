BUMP ?= 'patch'

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

patch:
	@$(eval BUMP := 'patch')

minor:
	@$(eval BUMP := 'minor')

major:
	@$(eval BUMP := 'major')

release:
	@grunt bump-only:${BUMP}
	@make build
	@grunt bump-commit
	@$(MAKE) gh-pages
