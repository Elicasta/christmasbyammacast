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
    position: "0% 0%",
    alt: "Soft icy blue and white Christmas cottage interior"
  },
  "Pine + Plaid": {
    position: "50% 0%",
    alt: "Outdoor Christmas tree with plaid details, wrapped gifts, and evergreens"
  },
  "A Crimson Christmas": {
    position: "100% 0%",
    alt: "Deep crimson and evergreen traditional Christmas room"
  },
  "Velvet December": {
    position: "0% 50%",
    alt: "Soft mauve and dusty blue Christmas living room"
  },
  "Little Women": {
    position: "50% 50%",
    alt: "Warm old-fashioned candlelit Christmas room with stockings, plaid, and handmade details"
  },
  "Christmas Bound": {
    position: "100% 50%",
    alt: "Vintage red car filled with Christmas gifts and greenery"
  },
  "Chestnut Christmas": {
    position: "0% 100%",
    alt: "Warm chestnut brown and cream Christmas living room"
  },
  "The Winter Carousel": {
    position: "50% 100%",
    alt: "White and gold winter carousel Christmas scene"
  },
  "Salt + Pine": {
    position: "100% 100%",
    alt: "South Florida Christmas setting with sand, palms, warm light, and a softly decorated tree"
  }
};

const STORY_SPRITE_PARTS = [
  "assets/story-sprite/00.txt",
  "assets/story-sprite/01.txt",
  "assets/story-sprite/02.txt",
  "assets/story-sprite/03.txt"
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function installRuntimeStyles() {
  const style = document.createElement("style");
  style.dataset.runtimeFixes = "christmas-collection";
  style.textContent = `
    .story-media {
      aspect-ratio: 8 / 5 !important;
      background-color: #d7d2c8;
      background-repeat: no-repeat;
      background-size: 300% 300%;
      overflow: hidden;
      transform: translateZ(0);
    }
    .story-wide .story-media { aspect-ratio: 8 / 5 !important; }

    .ec-oval-mark {
      display: block !important;
      width: 76px !important;
      height: 38px !important;
      object-fit: contain !important;
      flex: 0 0 auto;
    }
    .hero-byline {
      display: flex !important;
      align-items: center;
      gap: .75rem !important;
    }
    .hero-byline .ec-oval-mark {
      width: 86px !important;
      height: 42px !important;
    }
    .footer-ec .ec-oval-mark {
      width: 92px !important;
      height: 44px !important;
    }

    @media (max-width: 680px) {
      .brand .ec-oval-mark {
        width: 58px !important;
        height: 30px !important;
      }
      .hero-byline .ec-oval-mark {
        width: 72px !important;
        height: 36px !important;
      }
      .footer-ec .ec-oval-mark {
        width: 78px !important;
        height: 38px !important;
      }
      .hero h1 > em { margin-top: .16em !important; }
      .collection-intro { padding-top: 4.25rem !important; }
    }
  `;
  document.head.appendChild(style);
}

function applyBrandMark() {
  document.querySelectorAll('img[src="assets/ec-mark.webp"]').forEach((img) => {
    img.src = "assets/ec-oval.webp";
    img.classList.add("ec-oval-mark");
  });
}

async function loadStorySprite() {
  const parts = await Promise.all(STORY_SPRITE_PARTS.map(async (path) => {
    const response = await fetch(path, { cache: "force-cache" });
    if (!response.ok) throw new Error(`Could not load ${path}: ${response.status}`);
    return response.text();
  }));

  const base64 = parts.join("").replace(/\s+/g, "");
  return `data:image/webp;base64,${base64}`;
}

async function attachStoryImages() {
  let sprite;
  try {
    sprite = await loadStorySprite();
  } catch (error) {
    console.error("Christmas collection photography failed to load", error);
    return;
  }

  document.querySelectorAll(".story").forEach((story) => {
    const heading = story.querySelector("h3");
    if (!heading) return;

    const image = STORY_IMAGES[heading.textContent.trim()];
    if (!image || story.querySelector(".story-media")) return;

    const figure = document.createElement("figure");
    figure.className = "story-media";
    figure.setAttribute("role", "img");
    figure.setAttribute("aria-label", image.alt);
    figure.style.backgroundImage = `url("${sprite}")`;
    figure.style.backgroundPosition = image.position;

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

installRuntimeStyles();
applyBrandMark();
renderSchedule();
populateBookingSelect();
bindStoryLinks();
updatePreviewRibbon();
attachStoryImages();
