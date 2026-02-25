(function () {
  "use strict";

  var GameClubMap = {
    map: null,
    markers: null,
    markerMap: {},
    userMarker: null,

    init: function () {
      this.map = L.map("map").setView([53.8, -1.58], 9);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(this.map);

      this.markers = L.markerClusterGroup({
        maxClusterRadius: 40,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
      });

      this.map.addLayer(this.markers);

      return this;
    },

    addClubs: function (clubs) {
      var self = this;
      this.markers.clearLayers();
      this.markerMap = {};

      clubs.forEach(function (club) {
        if (!club.location.lat || !club.location.lng) return;

        var popupContent =
          '<div class="popup-name"><a href="' +
          club.url +
          '">' +
          self.escapeHtml(club.name) +
          "</a></div>" +
          '<div class="popup-meta">' +
          self.escapeHtml(club.day) +
          (club.time ? " &middot; " + self.escapeHtml(club.time) : "") +
          "<br>" +
          self.escapeHtml(club.location.name) +
          "</div>";

        var marker = L.marker([club.location.lat, club.location.lng]).bindPopup(
          popupContent
        );

        self.markers.addLayer(marker);
        self.markerMap[club.slug] = marker;
      });
    },

    fitToMarkers: function () {
      if (this.markers.getLayers().length > 0) {
        this.map.fitBounds(this.markers.getBounds(), { padding: [30, 30] });
      }
    },

    showUserLocation: function (lat, lng) {
      if (this.userMarker) {
        this.map.removeLayer(this.userMarker);
      }

      this.userMarker = L.circleMarker([lat, lng], {
        radius: 10,
        fillColor: "#4285f4",
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      })
        .addTo(this.map)
        .bindPopup("You are here");

      // Fit bounds to include user and all visible markers
      var bounds = this.markers.getBounds();
      if (bounds.isValid()) {
        bounds.extend([lat, lng]);
        this.map.fitBounds(bounds, { padding: [30, 30] });
      } else {
        this.map.setView([lat, lng], 12);
      }
    },

    escapeHtml: function (text) {
      if (!text) return "";
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(text));
      return div.innerHTML;
    },

    invalidateSize: function () {
      if (this.map) {
        this.map.invalidateSize();
      }
    },
  };

  window.GameClubMap = GameClubMap;
})();
