# PRD: Interactive Room → Terminal Portfolio (Full Project)

**Author:** [Your Name]
**Status:** Draft v2 (consolidated — supersedes v1)
**Last updated:** July 18, 2026

---

## 1. Summary

A personal portfolio experienced as a mini-narrative rather than a scrolling page. The visitor starts in a first-person **room scene**, clicks the **computer** to power it on, signs in at a **lock screen**, and lands on a normal-looking **desktop**. A scripted **"hacked" event** then takes over the screen and drops the visitor into a **terminal**, which is the primary way they explore your work. Closing the terminal returns them to the calm desktop — styled in the spirit of the Debuuuuu OS portfolio (icons, interactive tabs, OS chrome) — so they can keep browsing visually instead of typing.

A **resume banner** is visible from the very first screen (placed in the room itself), so a time-pressed visitor is never more than one click from your resume regardless of how deep into the story they go.

## 2. Problem Statement

Generic portfolio sites (hero banner, scroll-down sections, contact form) don't differentiate a web developer from hundreds of others using the same templates. A memorable, narrative, interactive format — one that also demonstrates real frontend engineering ability through its own construction — leaves a stronger impression than describing skills in prose.

## 3. Goals

| Goal | Metric |
|---|---|
| Be memorable to recruiters/hiring managers | Qualitative feedback, repeat visits, shares |
| Prove frontend ability through the build itself | Code quality visible in a linked GitHub repo |
| Get visitors to real project demos/links | Click-through rate on project links |
| Never trap a time-pressed visitor | Resume reachable in ≤1 click from any screen |
| Work well on mobile despite being visual/narrative | No critical usability issues on mobile viewport |

### Non-goals
- Not a literal OS or filesystem emulator — no real persistence, no arbitrary code execution
- Not targeting non-technical visitors as the *primary* audience, though they're fully supported via the escape hatch
- Not copying the Debuuuuu or Manas sites directly — same genre of idea (OS chrome, room scene), distinct execution, content, and visual identity

## 4. Target Audience

1. **Primary:** Technical recruiters and engineers screening candidates — will appreciate the format and evaluate code quality directly.
2. **Secondary:** Non-technical recruiters/HR — need a fast, obvious way to get a plain resume without engaging with the story at all.
3. **Peers/community** — people who find it via GitHub/socials and poke at it for fun; a strong secondary share channel.

## 5. Full Narrative Flow

| Step | What happens |
|---|---|
| 1. Room scene (landing) | Visitor lands on a room — desk, computer, personal props. A resume banner is visible in the room itself (e.g. a poster, sticky note, or object you can click), so it's reachable before anything else loads. |
| 2. Click computer | Clicking the computer transitions/zooms the camera into the monitor, handing off from "room" to "screen." |
| 3. Computer boot | The monitor shows a brief boot sequence (logo, loading bar) — this is the "power on" moment, separate from and before the lock screen. |
| 4. Lock screen | A lock screen appears — time/date, your name, a sign-in/unlock prompt. |
| 5. Desktop (normal state) | On unlock, a normal desktop appears first — Debuuuuu-style OS chrome: icons, taskbar/dock, interactive tabs. This is the calm "home base" of the experience. |
| 6. Hacked event | Shortly after landing on the desktop, a scripted glitch/intrusion event plays over it — screen static, warning text — playful in tone, never alarming. |
| 7. Terminal auto-opens | The hack event resolves into a terminal window opening automatically. This is the primary content-exploration surface (commands: `ls`, `cd`, `cat`, `resume`, etc. — see the Phase-1 PRD scope already built). |
| 8. Close terminal → back to desktop | Closing the terminal returns the visitor to the same Debuuuuu-style desktop from step 5, now fully interactive, so they can browse the rest visually. |

**Content split between surfaces (per earlier suggestion):** the terminal is the detailed/technical surface (full project READMEs, real commands); the desktop icons/tabs are the quick-glance surface (one-line project summaries, direct links). Neither should just duplicate the other.

## 6. Functional Requirements by Phase

### Phase 1 — Terminal + Desktop core *(already scaffolded)*
- Command shell: `help`, `ls`, `cd`, `cat`, `pwd`, `open <project>`, `resume`, `contact`, `whoami`, `theme`, `history`, `clear`, `exit`
- Command history (↑/↓), Tab autocomplete, scrollback buffer
- Mobile quick-command chips
- Debuuuuu-style desktop: icon grid, interactive tabs/panels for About, Projects, Skills, Contact, Terminal (reopen)
- Resume banner pinned and visible in both terminal and desktop views (temporary placement until it moves into the room in Phase 3)

### Phase 2 — Lock screen + hacked event
- Lock screen: clock, your name/avatar, unlock button or field (no real auth — cosmetic only)
- Desktop appears briefly and normally after unlock (no hack yet) — this is the "calm" baseline state
- Hack event: scripted overlay (static/glitch animation + text), tone kept playful and clearly non-alarming from the very first frame (e.g. glitch text resolving to a joke, never implying a real breach)
- Hack event auto-resolves into the terminal opening (Phase 1 component), reusing the same terminal component as before

### Phase 3 — Room scene + resume banner placement
- Room scene: a static or lightly animated first-person view of a room containing a visible computer
- Resume banner lives in the room as a clickable object (poster/note/screen) rather than a floating UI pin
- Click-to-zoom transition from room into the computer screen (Phase 2's boot sequence)
- Computer "boot" animation (logo + loading bar) plays before the lock screen appears

### Phase 4 — Polish + deploy
- Skip-intro control, visible from frame one, persists across the whole room → boot → lock → hack sequence
- Session memory so returning visitors aren't forced to replay the full intro (skip straight to desktop or terminal)
- Cross-browser and mobile pass; reduced-motion handling for all animated sequences
- Deploy to Vercel (or similar), final content pass, share

## 7. Non-Functional Requirements

- **Performance:** Boot/lock/hack sequence should never block interactivity for more than ~1–2s per stage; skip control must be immediately clickable, not delayed
- **Accessibility:**
  - A persistent, always-reachable **"View as normal résumé"** link/button, working without JavaScript animation logic, satisfies both screen-reader users and time-pressed recruiters
  - Visible focus states throughout; keyboard-only path to click the computer, unlock, and skip the intro
  - ARIA live region on the terminal output so screen readers announce new lines
  - `prefers-reduced-motion` respected: skip boot/lock/hack animations entirely when set
- **Responsiveness:** Usable from ~360px width up; room scene and lock screen need mobile-specific layouts, not just scaled-down desktop versions
- **No arbitrary code execution:** terminal commands matched against a fixed whitelist only
- **Browser support:** latest 2 versions of Chrome, Firefox, Safari, Edge

## 8. Design Direction

- Inspired by the *genre* of Debuuuuu's OS-desktop concept (icons, window chrome, playful OS metaphor) and Manas's room-scene concept — but with your own palette, typography, copy, and signature detail so it reads as yours, not a clone
- Distinct visual identity: a deliberate color/type system (see Phase 1 scaffold: deep aubergine/charcoal background, cyan/violet/amber accents, monospace terminal type paired with a display face for the desktop UI) — carried consistently across room, lock screen, desktop, and terminal so the whole experience feels like one coherent product, not four unrelated screens bolted together
- One signature moment to spend the "boldness budget" on — recommend making this either the hack-event transition or the room-to-screen zoom, not both, so it stays sharp rather than diluted
- Dark theme as default; light theme available via the `theme` command (already scaffolded)

## 9. Technical Approach

- **Framework:** React
- **Styling:** CSS variables/custom properties for theming, consistent across all phases
- **State:** Local React state for view/stage transitions (room → boot → lock → desktop → hack → terminal); session storage (not localStorage-in-artifacts, but fine in your real deployed app) to remember "seen intro" for skip logic
- **Content storage:** Static JSON/Markdown bundled at build time — no CMS needed
- **Room/lock/hack visuals:** CSS/SVG animation or a lightweight sprite approach is enough — no need for a game engine or 3D library given this is a portfolio, not a game
- **Hosting:** Vercel or Netlify

## 10. Content Requirements

Must be real before launch (Phase 1 scaffold currently ships with placeholders):
- Bio (about.md) — 2–3 short paragraphs in your own voice
- 3–5 real projects: one-line description, tech tags, live demo link, GitHub link, and a fuller README-style version for the terminal
- Skills list, grouped by category
- Real resume file, linked from the room banner, terminal `resume` command, and desktop icon
- Real contact method(s)
- Room scene art/assets (can be simple/stylized — doesn't need to be photorealistic)

## 11. Success Metrics

- Portfolio link included in applications gets qualitatively positive responses (interviewers mention the site)
- Visitors reach a project demo or the resume within the first minute
- Organic shares (GitHub stars, social mentions) as a byproduct of being distinctive

## 12. Milestones

| Phase | Scope | Status |
|---|---|---|
| 1 | Terminal shell + Debuuuuu-style desktop, placeholder content | **Scaffolded — needs your real content** |
| 2 | Lock screen + hacked event, wired into Phase 1's terminal | Not started |
| 3 | Room scene + click-to-zoom + resume banner in the room | Not started |
| 4 | Skip-intro logic, session memory, accessibility/mobile pass, deploy | Not started |

## 13. Risks / Suggestions Carried Forward

- **Tone risk (hack event):** must read as playful from the first frame, never as a real security concern — resolved via scripted joke copy, not left ambiguous
- **Discoverability risk:** first-time visitors may not know what to type in the terminal — mitigated by the `help` hint on load and the always-visible desktop icons as a non-typing alternative
- **Fatigue risk:** room → boot → lock → hack → terminal is a lot of sequence before content appears — mitigated by a persistent skip control from frame one and session memory so repeat visits go straight to content
- **Accessibility risk:** heavy visual/animation metaphor is inherently less accessible — mitigated by the mandatory plain-resume escape hatch and full keyboard path
- **Scope creep risk:** easter eggs, extra themes, and room detail can expand indefinitely — hold to the four-phase milestone list above before adding more
- **Similarity risk:** since the concept is explicitly inspired by two friends' sites, keep content, copy, and specific visual details (color system, iconography, animation style) original so it reads as "same genre, different voice" rather than a copy

## 14. Open Questions

- Final list of 3–5 projects to feature in both the terminal and desktop views
- Whether to add lightweight, privacy-respecting analytics to see which commands/icons people actually use
- Exact resume banner treatment in the room (poster on the wall vs. a physical object vs. a sticky note) — a visual/art decision for Phase 3
- Whether the hack event should be skippable independently of the full intro, for visitors who complete the intro once but revisit later

---

*Next step: confirm this consolidated scope, then continue building — Phase 1 is already scaffolded and just needs real content; Phase 2 (lock screen + hack event) is the next build target.*
