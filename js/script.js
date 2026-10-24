(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var nav = document.getElementById("mainNav");
  var navLinks = document.getElementById("navLinks");
  var backToTop = document.getElementById("backToTop");
  var year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Show the "HB" monogram if images/profile.webp is missing
  var profileImg = document.getElementById("profileImg");
  if (profileImg) {
    var showFallback = function () {
      profileImg.parentElement.classList.add("no-photo");
    };
    if (profileImg.complete && profileImg.naturalWidth === 0) {
      showFallback();
    } else {
      profileImg.addEventListener("error", showFallback);
    }
  }

  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle("scrolled", y > 20);
    backToTop.classList.toggle("show", y > 600);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Collapse the mobile menu after choosing a link
  if (navLinks && window.bootstrap) {
    var collapse = bootstrap.Collapse.getOrCreateInstance(navLinks, { toggle: false });
    navLinks.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (navLinks.classList.contains("show")) {
          collapse.hide();
        }
      });
    });
  }

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0 });
    document.querySelector(".navbar-brand").focus({ preventScroll: true });
  });

  var revealEls = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();
