(function () {
  "use strict";

  var baseurl = window.GameClub ? window.GameClub.baseurl : "";
  var map;
  var search;
  var debounceTimer;

  function init() {
    map = window.GameClubMap.init();

    fetch(baseurl + "/api/clubs.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (clubs) {
        search = window.GameClubSearch.init(clubs);
        update();
        bindEvents();
      })
      .catch(function (err) {
        console.error("Failed to load clubs:", err);
      });
  }

  function update() {
    var filtered = search.getFiltered();
    map.addClubs(filtered);
    map.fitToMarkers();
    renderCards(filtered);
    updateResultCount(filtered.length, search.allClubs.length);
  }

  function renderCards(clubs) {
    var container = document.getElementById("club-list");
    if (!container) return;

    if (clubs.length === 0) {
      container.innerHTML =
        '<p style="color:#555;text-align:center;padding:2rem 0;">No clubs match your search. Try a different filter or search term.</p>';
      return;
    }

    var html = clubs
      .map(function (club) {
        var tags = '<span class="tag tag-day">' + escapeHtml(club.day) + "</span>";

        if (club.secondary_days) {
          club.secondary_days.forEach(function (d) {
            tags += '<span class="tag tag-day">' + escapeHtml(d) + "</span>";
          });
        }

        if (club.frequency && club.frequency !== "weekly") {
          tags += '<span class="tag">' + escapeHtml(club.frequency) + "</span>";
        }

        if (club.cost) {
          tags += '<span class="tag tag-cost">' + escapeHtml(club.cost) + "</span>";
        }

        if (club.age_restriction) {
          tags += '<span class="tag">' + escapeHtml(club.age_restriction) + "</span>";
        }

        var distanceBadge = "";
        if (club._distance !== undefined) {
          distanceBadge =
            '<span class="club-distance">' +
            club._distance.toFixed(1) +
            " mi</span>";
        }

        return (
          '<div class="club-card">' +
          '<div class="club-card-header">' +
          '<div class="club-name"><a href="' +
          escapeHtml(club.url) +
          '">' +
          escapeHtml(club.name) +
          "</a></div>" +
          distanceBadge +
          "</div>" +
          '<div class="club-meta">' +
          "<span>" +
          escapeHtml(club.location.name) +
          "</span>" +
          "<span>" +
          escapeHtml(club.time || "See details") +
          "</span>" +
          "</div>" +
          '<div class="club-tags">' +
          tags +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    container.innerHTML = html;
  }

  function updateResultCount(shown, total) {
    var el = document.getElementById("result-count");
    if (!el) return;
    if (shown === total) {
      el.textContent = total + " clubs";
    } else {
      el.textContent = "Showing " + shown + " of " + total + " clubs";
    }
  }

  function bindEvents() {
    // Day filter pills
    var pills = document.querySelectorAll(".day-pill");
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) {
          p.classList.remove("active");
        });
        pill.classList.add("active");
        search.setDay(pill.getAttribute("data-day"));
        update();
      });
    });

    // Search input
    var searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          search.setQuery(searchInput.value);
          update();
        }, 200);
      });
    }

    // Locate button
    var locateBtn = document.getElementById("locate-btn");
    if (locateBtn) {
      locateBtn.addEventListener("click", function () {
        if (!navigator.geolocation) {
          alert("Geolocation is not supported by your browser.");
          return;
        }

        locateBtn.disabled = true;
        locateBtn.textContent = "Locating...";

        navigator.geolocation.getCurrentPosition(
          function (pos) {
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            search.setUserLocation(lat, lng);
            map.showUserLocation(lat, lng);
            locateBtn.textContent = "Location found";
            update();
          },
          function () {
            locateBtn.disabled = false;
            locateBtn.textContent = "Find my location";
            alert("Unable to retrieve your location.");
          }
        );
      });
    }
  }

  function escapeHtml(text) {
    if (!text) return "";
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  // Start
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
