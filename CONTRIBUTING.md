# Contributing to GameClub

Thanks for helping grow the GameClub directory! Here's how to contribute.

## Adding a New Club

1. Fork this repository
2. Create a new file in `_clubs/` named `your-club-name.md`
3. Use the frontmatter template below
4. Submit a pull request

### Frontmatter Template

```yaml
---
name: "Your Club Name"
day: "Thursday"
secondary_days: []
time: "7:00pm - 10:00pm"
frequency: "weekly"
location:
  name: "Venue Name"
  address: "Full Address, Town, Postcode"
  lat: 53.0000
  lng: -1.0000
cost: ""
age_restriction: ""
website: ""
facebook: ""
description: >-
  A short description of your club.
---
```

### Field Guide

| Field | Required | Notes |
|-------|----------|-------|
| `name` | Yes | Full club name |
| `day` | Yes | Primary meeting day (Monday-Sunday) |
| `secondary_days` | No | Array of additional days, e.g. `["Friday"]` |
| `time` | No | Meeting time, e.g. "7:00pm - 10:00pm" |
| `frequency` | Yes | "weekly", "fortnightly", "monthly", or custom text |
| `location.name` | Yes | Venue name |
| `location.address` | Yes | Full address including postcode |
| `location.lat` | Yes | Latitude (decimal degrees) |
| `location.lng` | Yes | Longitude (decimal degrees) |
| `cost` | No | Entry fee, leave empty string if free |
| `age_restriction` | No | e.g. "16+", "18+", leave empty if none |
| `website` | No | Full URL or empty string |
| `facebook` | No | Full URL or empty string |
| `description` | Yes | 1-3 sentence description |

### Finding Coordinates

1. Go to [openstreetmap.org](https://www.openstreetmap.org)
2. Search for the venue address
3. The URL will contain the coordinates, or right-click and "Show address"

## Updating a Club

Edit the relevant file in `_clubs/` and submit a pull request with a brief description of what changed.

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.
