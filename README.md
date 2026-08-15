# Greetings From Christmas

Client-facing landing page for the 2026 holiday collection.

## Current collection

- The Winter Cottage — Oct 24, 11:30 AM–2:30 PM
- Pine + Plaid — Oct 24, 2:30–5:00 PM
- A Crimson Christmas — Nov 7, 11:00 AM–4:30 PM
- Velvet December — Nov 8, 2:00–4:30 PM
- Little Women — Nov 14, 1:00–3:00 PM
- Christmas Bound — Nov 15, 3:00–5:00 PM
- Chestnut Christmas — Nov 21, 11:00 AM–4:30 PM
- The Winter Carousel — Nov 22, 1:30–3:30 PM
- Salt + Pine — Nov 28, 3:00–5:00 PM

## Booking links

Booking buttons use the Pixieset reservation URLs stored in `collections.js`. All nine collections currently have active reservation links.

Add or update the `bookingUrl` value for a collection in `collections.js`:

```js
{
  name: "The Winter Cottage",
  // ...
  bookingUrl: "https://your-booking-link.com"
}
```

Once a URL is present, the page automatically enables the button for that collection.

## Design direction

The site uses native responsive images for the collection cards. Every published image must be a valid browser-readable file in `assets/`; a failed image shows a controlled fallback instead of silently collapsing the card.

Current photography is mapped to all nine stories, including the approved Cottage, Chestnut, and vintage car photographs.

Carousel descriptions are deliberately edited into balanced, complete-sentence summaries. Do not line-clamp or truncate them. Equal card height comes from the flex layout and bottom-pinned date and booking controls. The complete story copy lives in `collections.js` and appears under **The Story** on each booking page.

The 1200 × 630 link-preview image is `assets/greetings-from-christmas-share.jpg`. Keep the Open Graph and Twitter image metadata in both `index.html` and `booking.html` pointed to its absolute production URL so text-message and social previews remain intentional.

At 680px and below, the centered brand is paired with a native `<details>` hamburger menu for Dates and Booking. Preserve the desktop links for larger screens and keep the mobile menu keyboard-operable.

## Public launch

The client preview ribbon automatically switches to the public-open state on September 1, 2026.
