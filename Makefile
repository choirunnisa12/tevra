# Tevra Makefile

.PHONY: help install build test deploy frontend clean

# Default target
help:
	@echo "Tevra Web3 Automation Bot"
	@echo ""
	@echo "Available commands:"
	@echo "  install     - Install all dependencies"
	@echo "  build       - Build smart contracts"
	@echo "  test        - Run smart contract tests"
	@echo "  deploy      - Deploy contracts to network"
	@echo "  frontend    - Start frontend development server"
	@echo "  clean       - Clean build artifacts"
	@echo "  lint        - Run linters"

# Install dependencies
install:
	@echo "Installing dependencies..."
	cd contracts && forge install
	cd frontend && npm install

# Build smart contracts
build:
	@echo "Building smart contracts..."
	cd contracts && forge build

# Run tests
test:
	@echo "Running smart contract tests..."
	cd contracts && forge test -vvv

# Deploy contracts
deploy:
	@echo "Deploying contracts..."
	cd contracts && forge script script/Deploy.s.sol --rpc-url $(RPC_URL) --broadcast --verify

# Start frontend development server
frontend:
	@echo "Starting frontend development server..."
	cd frontend && npm run dev

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	cd contracts && forge clean
	cd frontend && rm -rf .next node_modules

# Run linters
lint:
	@echo "Running linters..."
	cd contracts && forge fmt
	cd frontend && npm run lint

# Setup development environment
setup: install build
	@echo "Development environment setup complete!"
	@echo "Run 'make frontend' to start the development server"

# Full test suite
test-all: test
	@echo "Running frontend tests..."
	cd frontend && npm test

# Production build
build-all: build
	@echo "Building frontend for production..."
	cd frontend && npm run build

# Quick start for development
dev: setup frontend
