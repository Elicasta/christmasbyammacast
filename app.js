const COLLECTIONS = [
  {
    name: "The Winter Cottage",
    date: "October 24",
    time: "11:30 AM to 2:30 PM",
    price: 595,
    location: "The Cottage · Indoors",
    bookingUrl: "https://ECCreativeStudio.pixieset.com/booking/The-Winter-Cottage"
  },
  {
    name: "Pine + Plaid",
    date: "October 24",
    time: "2:30 PM to 5:00 PM",
    price: 650,
    location: "The Cottage · Outdoors",
    bookingUrl: "https://ECCreativeStudio.pixieset.com/booking/Pine-Plaid"
  },
  {
    name: "A Crimson Christmas",
    date: "November 7",
    time: "11:00 AM to 4:30 PM",
    price: 595,
    location: "Mint Studios",
    bookingUrl: "https://ECCreativeStudio.pixieset.com/booking/A-Crimson-Christmas"
  },
  {
    name: "Velvet December",
    date: "November 8",
    time: "2:00 PM to 4:30 PM",
    price: 595,
    location: "Mint Studios",
    bookingUrl: "https://ECCreativeStudio.pixieset.com/booking/Velvet-December"
  },
  {
    name: "Little Women",
    date: "November 14",
    time: "1:00 PM to 3:00 PM",
    price: 650,
    location: "Limited Holiday Story",
    bookingUrl: "https://ECCreativeStudio.pixieset.com/booking/Little-Women"
  },
  {
    name: "Christmas Bound",
    date: "November 15",
    time: "3:00 PM to 5:00 PM",
    price: 650,
    location: "Vintage Car Event · 4 sessions",
    bookingUrl: "https://ECCreativeStudio.pixieset.com/booking/Christmas-Bound"
  },
  {
    name: "Chestnut Christmas",
    date: "November 21",
    time: "11:00 AM to 4:30 PM",
    price: 595,
    location: "Mint Studios",
    bookingUrl: "https://ECCreativeStudio.pixieset.com/booking/Chestnut-Christmas"
  },
  {
    name: "The Winter Carousel",
    date: "November 22",
    time: "1:30 PM to 3:30 PM",
    price: 595,
    location: "Mint Studios",
    bookingUrl: "https://ECCreativeStudio.pixieset.com/booking/The-Winter-Carousel"
  },
  {
    name: "Salt + Pine",
    date: "November 28",
    time: "3:00 PM to 5:00 PM",
    price: 650,
    location: "Outdoor Coastal Story",
    bookingUrl: ""
  }
];

const STORY_IMAGES = {
  "The Winter Cottage": {
    src: "assets/winter-cottage.webp",
    alt: "Soft icy blue and white Christmas cottage interior"
  },
  "Pine + Plaid": {
    src: "assets/pine-plaid.webp",
    alt: "Outdoor Christmas tree with plaid details, wrapped gifts, and evergreens"
  },
  "A Crimson Christmas": {
    src: "assets/crimson-christmas.webp",
    alt: "Deep crimson and evergreen traditional Christmas room"
  },
  "Velvet December": {
    src: "assets/velvet-december.webp",
    alt: "Soft mauve and dusty blue Christmas living room"
  },
  "Little Women": {
    src: "assets/little-women.webp",
    alt: "Warm old-fashioned candlelit Christmas room with stockings, plaid, and handmade details"
  },
  "Christmas Bound": {
    src: "assets/christmas-bound.webp",
    alt: "Vintage red car filled with Christmas gifts and greenery"
  },
  "Chestnut Christmas": {
    src: "assets/chestnut-christmas.webp",
    alt: "Warm chestnut brown and cream Christmas living room"
  },
  "The Winter Carousel": {
    src: "assets/winter-carousel.webp",
    alt: "White and gold winter carousel Christmas scene"
  },
  "Salt + Pine": {
    src: "assets/salt-pine.webp",
    alt: "South Florida Christmas setting with sand, palms, warm light, and a softly decorated tree"
  }
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function attachStoryImages() {
  document.querySelectorAll(".story").forEach((story, index) => {
    const heading = story.querySelector("h3");
    if (!heading) return;

    const image = STORY_IMAGES[heading.textContent.trim()];
    if (!image || story.querySelector(".story-media")) return;

    const figure = document.createElement("figure");
    figure.className = "story-media";

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.loading = index === 0 ? "eager" : "lazy";
    img.decoding = "async";
    if (index === 0) img.fetchPriority = "high";

    img.addEventListener("error", () => {
      figure.remove();
      story.classList.remove("has-photo");
    }, { once: true });

    figure.appendChild(img);
    story.prepend(figure);
    story.classList.add("has-photo");
  });
}

function renderSchedule() {
  const schedule = document.querySelector("#schedule-list");
  if (!schedule) return;

  schedule.innerHTML = COLLECTIONS.map((item) => `
    <div class="schedule-row">
      <time>${item.date}</time>
      <strong>${item.name}</strong>
      <span class="schedule-time">${item.time}</span>
      <span class="price">${currency.format(item.price)}</span>
    </div>
  `).join("");
}

function populateBookingSelect() {
  const select = document.querySelector("#story-select");
  if (!select) return;

  select.innerHTML = COLLECTIONS.map((item) => (
    `<option value="${item.name}">${item.name}</option>`
  )).join("");

  select.addEventListener("change", () => setSelectedStory(select.value));
  setSelectedStory(select.value);
}

function setSelectedStory(name) {
  const item = COLLECTIONS.find((story) => story.name === name) || COLLECTIONS[0];
  const output = document.querySelector("#selected-story");
  const button = document.querySelector("#booking-button");
  const status = document.querySelector("#booking-status");
  const select = document.querySelector("#story-select");

  if (select && select.value !== item.name) select.value = item.name;

  if (output) {
    output.innerHTML = `
      <strong>${item.name}</strong>
      <span>${item.date} · ${item.time} · ${currency.format(item.price)} · ${item.location}</span>
    `;
  }

  if (!button || !status) return;

  if (item.bookingUrl) {
    button.href = item.bookingUrl;
    button.textContent = `Book ${item.name}`;
    button.classList.remove("is-disabled");
    button.setAttribute("aria-disabled", "false");
    status.textContent = "Booking is open. Your reservation is secured once the required deposit is received within three days.";
  } else {
    button.href = "#";
    button.textContent = "Booking link coming soon";
    button.classList.add("is-disabled");
    button.setAttribute("aria-disabled", "true");
    status.textContent = "Salt + Pine booking access will be added here once its reservation link is live.";
  }
}

function bindStoryLinks() {
  document.querySelectorAll("[data-select-story]").forEach((link) => {
    link.addEventListener("click", () => setSelectedStory(link.dataset.selectStory));
  });
}

function updatePreviewRibbon() {
  const ribbon = document.querySelector(".preview-ribbon");
  if (!ribbon) return;

  const publicLaunch = new Date("2026-09-01T00:00:00");
  if (Date.now() >= publicLaunch.getTime()) {
    ribbon.innerHTML = "<span>The 2026 Holiday Collection is now open</span>";
  }
}

attachStoryImages();
renderSchedule();
populateBookingSelect();
bindStoryLinks();
updatePreviewRibbon();
