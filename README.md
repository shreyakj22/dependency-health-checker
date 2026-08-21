# Dependency Health Checker

A developer productivity tool that analyzes a project's `package.json` and checks the health of its dependencies.

## Problem

Developers often need to manually check whether project dependencies are outdated. This can become difficult when a project contains many dependencies.

Dependency Health Checker provides a simple dashboard to identify outdated packages and understand the overall dependency health of a project.

## Features

- Upload `package.json`
- Paste `package.json` content
- Detect project dependencies
- Check latest package versions from npm
- Identify current and outdated dependencies
- Calculate dependency health score
- Display overall health status
- Search dependencies
- Filter dependencies by status
- Generate npm update commands
- Copy update commands
- Handle invalid JSON
- Handle npm lookup failures

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js

### APIs

- npm Registry API

## Architecture

```text
User
 |
 v
React Frontend
 |
 | HTTP POST
 v
Express Backend
 |
 v
Dependency Analyzer
 |
 v
npm Registry API
 |
 v
Version Comparison
 |
 v
Analysis Result
 |
 v
React Dashboard