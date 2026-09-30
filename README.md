# Aakanshya Thapa Portfolio — Production v9 Scroll Navigator Fix

- Fixes navigator staying on Home.
- Active section is now derived from each section's live viewport rectangle.
- Scroll updates are throttled through requestAnimationFrame.
- The light mint 42px-wide liquid navigator follows Home/About/Experience/Projects/Skills/Honors/Contact.
- Bottom-of-page logic forces Contact active.
- 520 ms liquid movement retained.
- Removed hard-coded Home active state from HTML.
- CSS and JS cache-busted for production deployment.
- Production domain/search configuration retained.
