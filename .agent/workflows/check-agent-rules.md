---
description: Check and follow AGENT_RULES.md before executing any task
---

# Agent Rules Check

Before executing any task in this project, follow these steps:

1. Check if `AGENT_RULES.md` exists in the project root
2. If it exists, read the file using `view_file`
3. Follow all rules and guidelines defined in the file
4. When creating new files, follow the "File Creation Patterns" section
5. When creating new folders/modules, update the "Project Map" section in AGENT_RULES.md

## Quick Reference

Key rules to remember:

- Use **DTOs** for user input, not Entity
- Access repository via **Use Case**, not directly
- Use **Result<T>** for return types, not throw errors
- Use **Mappers** to convert API (snake_case) ↔ Entity (camelCase)
- Entity = `camelCase`, API Model = `snake_case`
