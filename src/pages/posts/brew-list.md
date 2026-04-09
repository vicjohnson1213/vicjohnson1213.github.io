---
layout: ../../layouts/MdLayout.astro
pubDate: 2026-04-09
displayTitle: Brew list with installation time
description: Brew list, sorted by when the package was installed
---

### The command:

```
brew list --installed-on-request | xargs brew info --json=v1 | jq -r '.[] | "\(.name)\t\(.installed[].time | strftime("%Y-%m-%d"))"' | sort -k 2 | column -t
```

### The breakdown

| Part | What it does |
| --- | --- |
| `brew list --installed-on-request` | Lists all packages that you explicitly installed |
| `xargs brew info --json=v1` | Get the info for each installed package in JSON format |
| `jq -r '.[] \| "\(.name)\t\(.installed[].time \| strftime("%Y-%m-%d"))"'` | Pull the package name and installed timestamp from the JSON. Format the date |
| `sort -k 2` | Sort by installed date |
| `column -t` | Build a table |
