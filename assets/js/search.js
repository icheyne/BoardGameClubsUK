(function () {
  "use strict";

  var GameClubSearch = {
    allClubs: [],
    activeDay: "all",
    searchQuery: "",
    userLat: null,
    userLng: null,

    init: function (clubs) {
      this.allClubs = clubs;
      return this;
    },

    setDay: function (day) {
      this.activeDay = day;
    },

    setQuery: function (query) {
      this.searchQuery = query.toLowerCase().trim();
    },

    setUserLocation: function (lat, lng) {
      this.userLat = lat;
      this.userLng = lng;
    },

    getFiltered: function () {
      var self = this;
      var results = this.allClubs.filter(function (club) {
        // Day filter
        if (self.activeDay !== "all") {
          var matchesDay =
            club.day === self.activeDay ||
            (club.secondary_days &&
              club.secondary_days.indexOf(self.activeDay) !== -1);
          if (!matchesDay) return false;
        }

        // Text search
        if (self.searchQuery) {
          var haystack = [
            club.name,
            club.location.name,
            club.location.address,
            club.description,
            club.day,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          if (haystack.indexOf(self.searchQuery) === -1) return false;
        }

        return true;
      });

      // Sort by distance if user location is known
      if (self.userLat !== null && self.userLng !== null) {
        results.forEach(function (club) {
          club._distance = self.haversine(
            self.userLat,
            self.userLng,
            club.location.lat,
            club.location.lng
          );
        });
        results.sort(function (a, b) {
          return a._distance - b._distance;
        });
      }

      return results;
    },

    haversine: function (lat1, lng1, lat2, lng2) {
      var R = 3959; // miles
      var dLat = this.toRad(lat2 - lat1);
      var dLng = this.toRad(lng2 - lng1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) *
          Math.cos(this.toRad(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },

    toRad: function (deg) {
      return (deg * Math.PI) / 180;
    },
  };

  window.GameClubSearch = GameClubSearch;
})();
