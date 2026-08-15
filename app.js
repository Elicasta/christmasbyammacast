const COLLECTIONS = window.HOLIDAY_COLLECTIONS || [];

function bindImageFallbacks(root = document) {
  root.querySelectorAll(".story-media img, .booking-visual img").forEach((img) => {
    if (img.dataset.fallbackBound === "true") return;
    img.dataset.fallbackBound = "true";

    const figure = img.closest(".story-media, .booking-visual");
    if (!figure) return;

    const showFallback = () => {
      if (!img.isConnected || figure.classList.contains("is-error")) return;

      const fallback = document.createElement("span");
      fallback.className = "story-media-fallback";
      fallback.textContent = "Collection preview unavailable";

      figure.classList.add("is-error");
      figure.setAttribute("role", "img");
      figure.setAttribute("aria-label", img.alt || "Collection preview unavailable");
      if (figure.classList.contains("booking-visual")) {
        img.hidden = true;
      } else {
        img.remove();
      }
      figure.appendChild(fallback);
    };

    img.addEventListener("error", showFallback, { once: true });
    if (img.complete && img.naturalWidth === 0) showFallback();
  });
}

function setupStoryCarousel() {
  const carousel = document.querySelector("#story-carousel");
  const count = document.querySelector("#carousel-count");
  const buttons = [...document.querySelectorAll("[data-carousel-direction]")];
  if (!carousel || !count) return;

  const slides = [...carousel.querySelectorAll(".story")];
  if (!slides.length) return;

  let currentIndex = 0;
  let frame = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const slideLeft = (slide) => (
    slide.getBoundingClientRect().left
    - carousel.getBoundingClientRect().left
    + carousel.scrollLeft
  );

  const update = () => {
    currentIndex = slides.reduce((closest, slide, index) => (
      Math.abs(slideLeft(slide) - carousel.scrollLeft)
        < Math.abs(slideLeft(slides[closest]) - carousel.scrollLeft)
        ? index
        : closest
    ), 0);

    count.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    buttons.forEach((button) => {
      const direction = Number(button.dataset.carouselDirection);
      button.disabled = (
        (direction < 0 && currentIndex === 0)
        || (direction > 0 && currentIndex === slides.length - 1)
      );
    });
  };

  const move = (direction) => {
    const targetIndex = Math.min(
      slides.length - 1,
      Math.max(0, currentIndex + direction)
    );

    carousel.scrollTo({
      left: slideLeft(slides[targetIndex]),
      behavior: reducedMotion ? "auto" : "smooth"
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => move(Number(button.dataset.carouselDirection)));
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
  });

  carousel.addEventListener("scroll", () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener("resize", update);
  update();
}

function renderSchedule() {
  const schedule = document.querySelector("#schedule-list");
  if (!schedule) return;

  schedule.innerHTML = COLLECTIONS.map((item) => `
    <a class="schedule-row" href="booking.html?story=${item.slug}" aria-label="Book ${item.name}">
      <time>${item.date}</time>
      <strong>${item.name}</strong>
      <span class="schedule-time">${item.time}</span>
      <span class="schedule-action">Book now →</span>
    </a>
  `).join("");
}

function setBookingStory(item, updateUrl = false) {
  const page = document.querySelector("[data-booking-page]");
  if (!page || !item) return;

  const select = document.querySelector("#story-select");
  const title = document.querySelector("#booking-title");
  const feeling = document.querySelector("#booking-feeling");
  const description = document.querySelector("#booking-description");
  const think = document.querySelector("#booking-think");
  const date = document.querySelector("#booking-date");
  const time = document.querySelector("#booking-time");
  const location = document.querySelector("#booking-location");
  const status = document.querySelector("#booking-status");
  const button = document.querySelector("#booking-button");
  const visual = document.querySelector("#booking-visual");
  const image = document.querySelector("#booking-image");
  const pending = document.querySelector("#booking-image-pending");

  page.style.setProperty("--accent", item.accent);
  if (select) select.value = item.slug;
  if (title) title.textContent = item.name;
  if (feeling) feeling.textContent = item.feeling;
  if (description) description.textContent = item.description;
  if (think) think.innerHTML = `<strong>Think:</strong> ${item.think}`;
  if (date) date.textContent = item.date;
  if (time) time.textContent = item.time;
  if (location) location.textContent = item.location;

  if (visual && image && pending) {
    visual.classList.remove("is-error", "is-pending");
    visual.querySelector(".story-media-fallback")?.remove();

    if (item.image) {
      image.hidden = false;
      image.src = item.image;
      image.alt = item.imageAlt;
      image.style.objectPosition = item.imagePosition || "center";
      image.dataset.fallbackBound = "false";
      pending.hidden = true;
      bindImageFallbacks(visual);
    } else {
      image.hidden = true;
      image.removeAttribute("src");
      image.alt = "";
      image.style.objectPosition = "center";
      pending.hidden = false;
      visual.classList.add("is-pending");
    }
  }

  if (button && status) {
    if (item.bookingUrl) {
      button.href = item.bookingUrl;
      button.textContent = `Book ${item.name}`;
      button.classList.remove("is-disabled");
      button.setAttribute("aria-disabled", "false");
      status.textContent = "A deposit secures your reservation and is due within three days.";
    } else {
      button.href = "#";
      button.textContent = "Booking link coming soon";
      button.classList.add("is-disabled");
      button.setAttribute("aria-disabled", "true");
      status.textContent = "Salt + Pine booking access will be added here once its reservation link is live.";
    }
  }

  document.title = `${item.name} Booking Details | EC Creative Studios`;

  if (updateUrl) {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("story", item.slug);
    window.history.replaceState({}, "", nextUrl);
  }
}

function setupBookingPage() {
  const page = document.querySelector("[data-booking-page]");
  const select = document.querySelector("#story-select");
  if (!page || !select || !COLLECTIONS.length) return;

  select.innerHTML = COLLECTIONS.map((item) => (
    `<option value="${item.slug}">${item.name}</option>`
  )).join("");

  const requestedSlug = new URLSearchParams(window.location.search).get("story");
  const selected = COLLECTIONS.find((item) => item.slug === requestedSlug) || COLLECTIONS[0];

  select.addEventListener("change", () => {
    const item = COLLECTIONS.find((collection) => collection.slug === select.value);
    setBookingStory(item, true);
  });

  setBookingStory(selected, Boolean(requestedSlug && requestedSlug !== selected.slug));
}

function updatePreviewRibbon() {
  const ribbon = document.querySelector(".preview-ribbon");
  if (!ribbon) return;

  const publicLaunch = new Date("2026-09-01T00:00:00");
  if (Date.now() >= publicLaunch.getTime()) {
    ribbon.innerHTML = "<span>The 2026 Holiday Collection is now open</span>";
  }
}

bindImageFallbacks();
setupStoryCarousel();
renderSchedule();
setupBookingPage();
updatePreviewRibbon();
