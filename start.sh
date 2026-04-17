#!/bin/bash

# Quick start script for Awesome AI Pedia

echo "Awesome AI Pedia startup"
echo "================================"

# Check whether Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js was not found. Please install Node.js 18+ first."
    echo "Download: https://nodejs.org/"
    exit 1
fi

# Check Node.js major version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Error: Node.js 18+ is required. Current version: $(node --version)"
    exit 1
fi

echo "Node.js version check passed: $(node --version)"

# Install dependencies on first run
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo "Dependencies installed"
else
    echo "Dependencies already installed"
fi

# Start the local dev server
echo ""
echo "Starting VitePress dev server..."
echo "Default local URL: http://localhost:5173/Awesome-AI-Pedia/"
echo "Use the actual URL shown by VitePress if the port changes."
echo "Press Ctrl+C to stop the server."
echo ""
npm run dev
