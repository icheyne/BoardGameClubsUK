---
layout: default
title: Add Your Club
permalink: /contribute/
---

<div class="content-page" markdown="1">

# Add Your Club

GameClub is community-maintained. Anyone can add a new club or update existing information by submitting a pull request on GitHub.

## Step-by-Step Guide

### 1. Create a new file

Create a new file in the `_clubs/` folder. Name it using the format `your-club-name.md` (lowercase, hyphens instead of spaces).

### 2. Copy this template

Paste the following into your new file and fill in the details:

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
  A short description of your club. What games do you play?
  Are newcomers welcome? Any other useful info.
---
```

### 3. Fill in the details

- **name**: Your club's full name
- **day**: The primary day you meet (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday)
- **secondary_days**: If you meet on additional days, list them like `["Friday", "Sunday"]`
- **time**: When you meet, e.g. "7:00pm - 10:00pm"
- **frequency**: How often - "weekly", "fortnightly", "monthly", or a custom description like "2nd Thursday of the month"
- **location**: Venue name, full address, and coordinates
- **cost**: Entry fee, or leave blank if free
- **age_restriction**: e.g. "16+" or "18+", or leave blank if all ages
- **website** / **facebook**: Links to your club's web presence

### 4. Find your coordinates

To get the latitude and longitude for your venue:

1. Go to [OpenStreetMap](https://www.openstreetmap.org)
2. Search for your venue's address
3. Right-click on the map and select "Show address"
4. The coordinates will appear in the URL bar (lat and lng)

### 5. Submit a pull request

Commit your file and open a pull request. We'll review it and merge it in.

## Updating an Existing Club

Find the club's file in the `_clubs/` folder, make your changes, and submit a pull request.

## Need Help?

If you're not familiar with GitHub, you can [open an issue](https://github.com) with your club's details and we'll add it for you.

</div>
