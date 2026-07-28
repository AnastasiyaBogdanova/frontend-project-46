install:
	npm ci --legacy-peer-deps

lint:
	npm run lint

test:
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: install lint test test-coverage