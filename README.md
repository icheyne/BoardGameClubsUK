<div align="center">

# BoardGameClubs.uk

**Find your nearest board game club in the UK.**

A community-built directory powered by an interactive map.

[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?logo=github)](https://boardgameclubs.uk)
[![Built with Jekyll](https://img.shields.io/badge/Built%20with-Jekyll-cc0000?logo=jekyll)](https://jekyllrb.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green)](#license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange)](https://boardgameclubs.uk/contribute/)

[Live Site](https://boardgameclubs.uk) · [Add a Club](https://boardgameclubs.uk/contribute/) · [Report a Bug](https://github.com/BoardGameClubs/BoardGameClubs_Web/issues/new)

</div>

---

## What is this?

BoardGameClubs.uk helps people find board game clubs near them. Search by postcode, browse the map, or filter by day and distance. Every club listing is maintained by the community through GitHub.

## How it works

- The site is built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/)
- Each club is a Markdown file in the `_clubs/` directory
- Club data is served as JSON and rendered on an interactive [Leaflet](https://leafletjs.com/) map
- Anyone can add or update a club by submitting a pull request

## Adding a club

1. Create a new file in `_clubs/` named `your-club-name.md`
2. Use the template below and fill in your details
3. Submit a pull request

```yaml
---
name: "Your Club Name"
day: "Thursday"
secondary_days: []
time: "7:00pm - 10:00pm"
frequency: "Weekly"
location:
  name: "Venue Name"
  address: "Full Address, Town, Postcode"
  lat: 53.0000
  lng: -1.0000
cost: "Free"
image: ""
website: ""
facebook: ""
description: >-
  A short description of your club.
---
```

Not comfortable with GitHub? [Open an issue](https://github.com/BoardGameClubs/BoardGameClubs_Web/issues/new) with your club's details and we'll add it for you.

## Running locally

```bash
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000`.

## Contributing

All contributions are welcome - whether it's adding a club, fixing a bug, or improving the site. See the [contribute page](https://boardgameclubs.uk/contribute/) for a full guide.

## Tech stack

- **Jekyll**: static site generator
- **Leaflet**: interactive maps
- **GitHub Pages**: hosting and deployment
- **Lucide**: icons

## License

This project is licensed under the [MIT License](LICENSE). You're free to use, modify, and distribute the code.

Club data is contributed by the community and is available under [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) - you can share and adapt the data as long as you give appropriate credit.
