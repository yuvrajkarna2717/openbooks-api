# 🤝 Contributing to OpenBooks API

Thank you for your interest in contributing to OpenBooks API! This guide will help you get started with contributing to our open-source project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issue Reporting](#issue-reporting)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful** and inclusive to all contributors
- **Be constructive** in discussions and feedback
- **Focus on the code**, not the person
- **Help others** learn and grow
- **Follow** project guidelines and standards

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- Git
- A Supabase account (free tier is sufficient)
- Basic knowledge of JavaScript/Node.js

### Fork and Clone

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/openbooks-api.git
   cd openbooks-api
   ```
3. **Add upstream** remote:
   ```bash
   git remote add upstream https://github.com/YuvrajKarna/openbooks-api.git
   ```

## 🛠️ Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .example.env .env
   # Update .env with your Supabase credentials
   ```

3. **Run migrations**:
   ```bash
   npm run migrate
   ```

4. **Start development server**:
   ```bash
   npm run devStart
   ```

5. **Run tests**:
   ```bash
   npm test
   ```

## 📝 Contributing Guidelines

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🧪 **Test coverage**
- 🎨 **Code refactoring**
- 🔧 **Performance improvements**

### Before You Start

1. **Check existing issues** to avoid duplicates
2. **Create an issue** for major changes to discuss approach
3. **Keep changes focused** - one feature/fix per PR
4. **Follow coding standards** outlined below

## 🔄 Pull Request Process

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add tests for new functionality
- Update documentation if needed

### 3. Test Your Changes

```bash
npm test                # Run all tests
npm run test:coverage   # Check coverage
npm run devStart        # Test locally
```

### 4. Commit Your Changes

Use conventional commit messages:

```bash
git commit -m "feat: add book search by author"
git commit -m "fix: resolve rate limiting issue"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for scraper"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `test`: Tests
- `refactor`: Code refactoring
- `style`: Code style changes
- `chore`: Maintenance tasks

### 5. Push and Create PR

```bash
git push origin your-branch-name
```

Then create a Pull Request on GitHub with:
- **Clear title** describing the change
- **Detailed description** of what was changed and why
- **Link to related issues** (if any)


## 🎨 Coding Standards

### File Naming Convention

Use **kebab-case** for all files:
```
✅ book.model.js
✅ rate-limit.middleware.js
✅ scrape-book.controller.js
❌ bookModel.js
❌ rateLimitMiddleware.js
```

### Code Style

- **ES6+ syntax** with modules
- **Consistent indentation** (2 spaces)
- **Meaningful variable names**
- **JSDoc comments** for functions
- **Error handling** for all async operations


### Project Structure Guidelines

- **Controllers**: Handle HTTP requests/responses
- **Models**: Database interactions and business logic
- **Middlewares**: Reusable request processing
- **Utils**: Helper functions and utilities
- **Routes**: API endpoint definitions

## 🧪 Testing

### Writing Tests

- **Unit tests** for individual functions
- **Integration tests** for API endpoints
- **Use descriptive test names**
- **Test both success and error cases**

### Test Example:

```javascript
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';

describe('Books API', () => {
  it('should fetch all books', async () => {
    const response = await request(app)
      .get('/api/fetch/all-books')
      .expect(200);
    
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
  
  it('should handle invalid price range', async () => {
    const response = await request(app)
      .get('/api/fetch/books/price-range?minPrice=invalid')
      .expect(400);
    
    expect(response.body).toHaveProperty('message');
  });
});
```

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 📚 Documentation

### API Documentation

- Update Swagger/OpenAPI specs in `docs/swagger.js`
- Include request/response examples
- Document all parameters and responses

### Code Documentation

- Add JSDoc comments for public functions
- Update README for new features
- Include inline comments for complex logic

## 🐛 Issue Reporting

### Bug Reports

Include the following information:

- **Environment** (Node.js version, OS)
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Error messages/logs**
- **Screenshots** (if applicable)

### Feature Requests

- **Clear description** of the feature
- **Use case** and motivation
- **Proposed implementation** (if any)
- **Breaking changes** (if any)

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - High priority items

## 🎯 Development Tips

### Staying Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### Debugging

- Use `console.log` for development debugging
- Remove debug logs before committing
- Use proper error handling and logging

### Performance

- Avoid blocking operations
- Use database indexes appropriately
- Implement proper caching where needed

## 🤔 Questions?

- **GitHub Discussions**: For general questions
- **GitHub Issues**: For bugs and feature requests
- **Email**: [your.email@example.com](mailto:your.email@example.com)

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

---

**Thank you for contributing to OpenBooks API! 🚀**

Every contribution, no matter how small, helps make this project better for everyone.