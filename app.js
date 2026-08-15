const COLLECTIONS = [
  {
    name: "The Winter Cottage",
    date: "October 24",
    time: "11:30 AM to 2:30 PM",
    price: 595,
    bookingUrl: ""
  },
  {
    name: "Pine + Plaid",
    date: "October 24",
    time: "2:30 PM to 5:00 PM",
    price: 650,
    bookingUrl: ""
  },
  {
    name: "A Crimson Christmas",
    date: "November 7",
    time: "11:00 AM to 4:30 PM",
    price: 595,
    bookingUrl: ""
  },
  {
    name: "Velvet December",
    date: "November 8",
    time: "2:00 PM to 4:30 PM",
    price: 595,
    bookingUrl: ""
  },
  {
    name: "Little Women",
    date: "November 14",
    time: "1:00 PM to 3:00 PM",
    price: 650,
    bookingUrl: ""
  },
  {
    name: "Christmas Bound",
    date: "November 15",
    time: "3:00 PM to 5:00 PM",
    price: 650,
    note: "4 sessions",
    bookingUrl: ""
  },
  {
    name: "Chestnut Christmas",
    date: "November 21",
    time: "11:00 AM to 4:30 PM",
    price: 595,
    bookingUrl: ""
  },
  {
    name: "The Winter Carousel",
    date: "November 22",
    time: "1:30 PM to 3:30 PM",
    price: 595,
    bookingUrl: ""
  },
  {
    name: "Salt + Pine",
    date: "November 28",
    time: "3:00 PM to 5:00 PM",
    price: 650,
    bookingUrl: ""
  }
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

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
    const note = item.note ? ` · ${item.note}` : "";
    output.innerHTML = `
      <strong>${item.name}</strong>
      <span>${item.date} · ${item.time} · ${currency.format(item.price)}${note}</span>
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
    status.textContent = "Booking access will appear here once the reservation link is connected.";
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

renderSchedule();
populateBookingSelect();
bindStoryLinks();
updatePreviewRibbon();
