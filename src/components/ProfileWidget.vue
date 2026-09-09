<script setup lang="ts">
// Profile widget component
</script>

<template>
  <article class="profile-widget">
    <div class="profile-header-row">
      <!-- Avatar with Rotating Material Shape Mask -->
      <div class="profile-avatar-wrapper">
        <img
          class="profile-avatar-img"
          alt="Burhanverse avatar"
          src="https://github.com/Burhanverse.png"
        />
      </div>

      <!-- Identity & Subtitle -->
      <div class="profile-identity">
        <span class="greeting-text">Hello, my name is</span>
        <h1 class="person-name">Burhan</h1>
        <span class="handle-badge">@Burhanverse</span>
      </div>
    </div>

    <!-- Bio / Intro -->
    <p class="profile-bio">
      Software builder, system explorer, and interface artisan crafting thoughtful open source tools & apps.
    </p>

    <!-- Social Action Chips -->
    <div class="profile-chips-row">
      <a
        href="https://github.com/Burhanverse"
        target="_blank"
        rel="noopener noreferrer"
        class="profile-chip"
        title="Visit GitHub Profile"
      >
        <span class="chip-dot github-dot"></span>
        <span class="chip-label">GitHub</span>
        <span class="material-symbols-rounded chip-arrow">arrow_outward</span>
      </a>

      <a
        href="https://discord.com/users/1044282409501335612"
        target="_blank"
        rel="noopener noreferrer"
        class="profile-chip"
        title="Chat on Discord"
      >
        <span class="chip-dot discord-dot"></span>
        <span class="chip-label">Discord</span>
        <span class="material-symbols-rounded chip-arrow">arrow_outward</span>
      </a>

      <a
        href="https://x.com/burhanverse"
        target="_blank"
        rel="noopener noreferrer"
        class="profile-chip"
        title="Follow on Twitter / X"
      >
        <span class="chip-dot twitter-dot"></span>
        <span class="chip-label">X / Twitter</span>
        <span class="material-symbols-rounded chip-arrow">arrow_outward</span>
      </a>

      <div class="profile-chip static-chip" title="Location: Assam, India">
        <span class="material-symbols-rounded chip-pin">location_on</span>
        <span class="chip-label">Assam, IN</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.profile-widget {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.92));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.14);
  border-radius: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 250ms ease, border-color 250ms ease;
  overflow: hidden;
  will-change: transform, box-shadow;
}

[theme="dark"] .profile-widget {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.92));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
}

.profile-widget:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.09);
}

[theme="dark"] .profile-widget:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
}

.profile-header-row {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Avatar with Rotating Mask */
.profile-avatar-wrapper {
  position: relative;
  width: 8rem;
  height: 8rem;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
  border: 2.5px solid var(--md-sys-color-primary, #bf6038);
}

.profile-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms ease;
}

.profile-widget:hover .profile-avatar-img {
  transform: scale(1.06);
}

/* Identity Text */
.profile-identity {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.greeting-text {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--md-sys-color-on-surface-variant, #6b5548);
}

.person-name {
  font-family: "Lexend Zetta", sans-serif;
  font-size: 3.2rem;
  font-weight: 900;
  color: var(--md-sys-color-on-surface, #221a16);
  margin: 0;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.handle-badge {
  display: inline-block;
  font-family: "JetBrains Mono", monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--md-sys-color-primary, #bf6038);
  background: var(--md-sys-color-primary-container, #faebd4);
  padding: 0.2rem 0.8rem;
  border-radius: 9999px;
  width: fit-content;
  margin-top: 0.2rem;
}

[theme="dark"] .handle-badge {
  color: var(--md-sys-color-on-primary-container, #ffdccf);
  background: var(--md-sys-color-primary-container, #783615);
}

.profile-bio {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.45rem;
  line-height: 1.6;
  color: var(--md-sys-color-on-surface-variant, #52443d);
  margin: 0;
}

/* Action Chips */
.profile-chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.profile-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.2rem;
  background: rgba(0, 0, 0, 0.035);
  border: 1px solid rgba(191, 96, 56, 0.12);
  border-radius: 9999px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface, #221a16);
  text-decoration: none;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

[theme="dark"] .profile-chip {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--md-sys-color-on-surface, #ece2dc);
}

.profile-chip:hover:not(.static-chip) {
  background: var(--md-sys-color-primary-container, #faebd4);
  color: var(--md-sys-color-on-primary-container, #3c1200);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

[theme="dark"] .profile-chip:hover:not(.static-chip) {
  background: var(--md-sys-color-primary-container, #783615);
  color: var(--md-sys-color-on-primary-container, #ffdccf);
}

.static-chip {
  cursor: default;
}

.chip-dot {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
}

.github-dot {
  background-color: #24292f;
}

.discord-dot {
  background-color: #5865f2;
}

.twitter-dot {
  background-color: #1da1f2;
}

.chip-pin {
  font-size: 1.6rem;
  color: var(--md-sys-color-primary, #b95000);
}

.chip-arrow {
  font-size: 1.4rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .profile-widget {
    padding: 1.8rem;
  }
  .person-name {
    font-size: 2.6rem;
  }
  .profile-avatar-wrapper {
    width: 6.5rem;
    height: 6.5rem;
  }
}
</style>
