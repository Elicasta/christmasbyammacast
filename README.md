# Greetings From Christmas

Client-facing landing page for the 2026 holiday collection.

## Current collection

- The Winter Cottage — Oct 24, 11:30 AM–2:30 PM — $595
- Pine + Plaid — Oct 24, 2:30–5:00 PM — $650
- A Crimson Christmas — Nov 7, 11:00 AM–4:30 PM — $595
- Velvet December — Nov 8, 2:00–4:30 PM — $595
- Little Women — Nov 14, 1:00–3:00 PM — $650
- Christmas Bound — Nov 15, 3:00–5:00 PM — $650
- Chestnut Christmas — Nov 21, 11:00 AM–4:30 PM — $595
- The Winter Carousel — Nov 22, 1:30–3:30 PM — $595
- Salt + Pine — Nov 28, 3:00–5:00 PM — $650

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

Current photography is mapped to all nine stories, including the approved vintage car photograph for `Christmas Bound`.

## Public launch

The client preview ribbon automatically switches to the public-open state on September 1, 2026.
