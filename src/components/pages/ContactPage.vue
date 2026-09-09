<script setup lang="ts">
import { ref } from "vue";

const copied = ref(false);

function copyDiscordHandle() {
  navigator.clipboard.writeText("burhanverse");
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2500);
}

const keyTechnologies = [
  { name: "TypeScript", icon: "code" },
  { name: "Vue 3", icon: "layers" },
  { name: "Rust", icon: "memory" },
  { name: "Linux", icon: "terminal" },
  { name: "Material Design", icon: "palette" },
];

const featuredProjects = [
  {
    title: "Fagram Desktop",
    desc: "A feature-rich Telegram desktop client with Material Design 3 UI.",
    icon: "send",
    url: "https://github.com/fagramdesktop/fagram-desktop",
  },
  {
    title: "WebClip",
    desc: "A Gboard web clipboard companion for desktop.",
    icon: "widgets",
    url: "https://github.com/Burhanverse/webclip",
  },
];
</script>

<template>
  <div class="about-page-view">
    <div class="minimal-about-container">
      <!-- 1. Minimal Profile Card -->
      <section class="minimal-profile-card">
        <div class="profile-header-layout">
          <div class="profile-avatar-box">
            <img
              src="https://github.com/Burhanverse.png"
              alt="Burhan"
              class="profile-avatar-img"
            />
          </div>

          <div class="profile-meta-col">
            <div class="name-badge-row">
              <h1 class="profile-name">Burhan</h1>
              <span class="profile-handle">@Burhanverse</span>
            </div>

            <p class="profile-role">Software Builder & Interface Artisan</p>

            <p class="profile-bio-text">
              Crafting open-source, desktop tools, and tactile Material Design interfaces.
            </p>

            <div class="tech-chips-row">
              <span v-for="tech in keyTechnologies" :key="tech.name" class="tech-chip">
                <span class="material-symbols-rounded chip-icon">{{ tech.icon }}</span>
                {{ tech.name }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="minimal-projects-section">
        <h2 class="section-heading">
          <span class="material-symbols-rounded heading-icon">rocket_launch</span>
          Featured Projects
        </h2>

        <div class="projects-grid">
          <a
            v-for="item in featuredProjects"
            :key="item.title"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="project-card"
          >
            <md-ripple></md-ripple>
            <div class="project-icon-box">
              <span class="material-symbols-rounded">{{ item.icon }}</span>
            </div>
            <div class="project-info-col">
              <div class="project-title-row">
                <h3 class="project-title">{{ item.title }}</h3>
                <span class="material-symbols-rounded out-arrow">arrow_outward</span>
              </div>
              <p class="project-desc">{{ item.desc }}</p>
            </div>
          </a>
        </div>
      </section>

      <section class="minimal-connect-section">
        <h2 class="section-heading">
          <span class="material-symbols-rounded heading-icon">link</span>
          Connect
        </h2>

        <div class="connect-links-row">
          <a
            href="https://github.com/Burhanverse"
            target="_blank"
            rel="noopener noreferrer"
            class="connect-btn"
          >
            <md-ripple></md-ripple>
            <span class="material-symbols-rounded btn-icon">code</span>
            <span>GitHub</span>
            <span class="material-symbols-rounded arrow-icon">arrow_outward</span>
          </a>

          <button
            type="button"
            class="connect-btn"
            @click="copyDiscordHandle"
          >
            <md-ripple></md-ripple>
            <span class="material-symbols-rounded btn-icon">forum</span>
            <span>{{ copied ? 'Copied @burhanverse' : 'Discord' }}</span>
            <span class="material-symbols-rounded arrow-icon">{{ copied ? 'check' : 'content_copy' }}</span>
          </button>

          <a
            href="https://x.com/burhanverse"
            target="_blank"
            rel="noopener noreferrer"
            class="connect-btn"
          >
            <md-ripple></md-ripple>
            <span class="material-symbols-rounded btn-icon">flutter</span>
            <span>X / Twitter</span>
            <span class="material-symbols-rounded arrow-icon">arrow_outward</span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-page-view {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  padding: 2rem 2rem 6rem 9rem;
  animation: aboutFadeIn 300ms ease;
  will-change: opacity, transform;
}

.minimal-about-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.minimal-profile-card {
  background: var(--md-sys-color-surface-container, rgba(255, 255, 255, 0.7));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.14));
  border-radius: 28px;
  padding: 2.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: border-color 250ms ease, box-shadow 250ms ease;
}

[theme="dark"] .minimal-profile-card {
  background: var(--md-sys-color-surface-container, rgba(40, 30, 26, 0.7));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
}

.profile-header-layout {
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;
}

.profile-avatar-box {
  flex-shrink: 0;
}

.profile-avatar-img {
  width: 8.8rem;
  height: 8.8rem;
  border-radius: 24px;
  object-fit: cover;
  border: 2px solid var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.25));
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.profile-meta-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 0;
}

.name-badge-row {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.profile-name {
  font-family: "Lexend Deca", sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #221a16);
  line-height: 1.1;
  margin: 0;
}

.profile-handle {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--md-sys-color-primary, #bf6038);
  background: rgba(191, 96, 56, 0.1);
  padding: 0.2rem 0.8rem;
  border-radius: 9999px;
}

[theme="dark"] .profile-handle {
  background: rgba(255, 181, 157, 0.15);
  color: var(--md-sys-color-primary, #ffb59d);
}

.profile-role {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--md-sys-color-primary, #bf6038);
  margin: 0;
}

[theme="dark"] .profile-role {
  color: var(--md-sys-color-primary, #ffb59d);
}

.profile-bio-text {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.35rem;
  line-height: 1.6;
  color: var(--md-sys-color-on-surface-variant, #52443d);
  margin: 0.4rem 0 0.8rem;
  max-width: 65ch;
}

.tech-chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.04));
  color: var(--md-sys-color-on-surface, #221a16);
  border: 1px solid var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.08));
}

[theme="dark"] .tech-chip {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--md-sys-color-on-surface, #ede0db);
}

.chip-icon {
  font-size: 1.4rem;
  color: var(--md-sys-color-primary, #bf6038);
}

[theme="dark"] .chip-icon {
  color: var(--md-sys-color-primary, #ffb59d);
}

.minimal-projects-section,
.minimal-connect-section {
  background: var(--md-sys-color-surface-container, rgba(255, 255, 255, 0.7));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.14));
  border-radius: 28px;
  padding: 2.4rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

[theme="dark"] .minimal-projects-section,
[theme="dark"] .minimal-connect-section {
  background: var(--md-sys-color-surface-container, rgba(40, 30, 26, 0.7));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #221a16);
  margin: 0 0 1.6rem;
}

.heading-icon {
  font-size: 2rem;
  color: var(--md-sys-color-primary, #bf6038);
}

[theme="dark"] .heading-icon {
  color: var(--md-sys-color-primary, #ffb59d);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  gap: 1.6rem;
}

.project-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1.4rem;
  padding: 1.6rem;
  border-radius: 20px;
  background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.1));
  text-decoration: none;
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}

[theme="dark"] .project-card {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  border-color: var(--md-sys-color-primary, #bf6038);
}

.project-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 14px;
  background: rgba(191, 96, 56, 0.1);
  color: var(--md-sys-color-primary, #bf6038);
  flex-shrink: 0;
}

[theme="dark"] .project-icon-box {
  background: rgba(255, 181, 157, 0.15);
  color: var(--md-sys-color-primary, #ffb59d);
}

.project-icon-box .material-symbols-rounded {
  font-size: 2.2rem;
}

.project-info-col {
  flex: 1;
  min-width: 0;
}

.project-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.project-title {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #221a16);
  margin: 0;
}

.out-arrow {
  font-size: 1.6rem;
  color: var(--md-sys-color-outline, #85736c);
  transition: transform 200ms ease, color 200ms ease;
}

.project-card:hover .out-arrow {
  color: var(--md-sys-color-primary, #bf6038);
  transform: translate(2px, -2px);
}

.project-desc {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--md-sys-color-on-surface-variant, #52443d);
  margin: 0;
}

.connect-links-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.connect-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.1rem 1.8rem;
  border-radius: 9999px;
  background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.04));
  border: 1px solid var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.14));
  color: var(--md-sys-color-on-surface, #221a16);
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease, background-color 200ms ease;
}

[theme="dark"] .connect-btn {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--md-sys-color-on-surface, #ede0db);
}

.connect-btn:hover {
  transform: translateY(-2px);
  border-color: var(--md-sys-color-primary, #bf6038);
  background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.07));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

[theme="dark"] .connect-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--md-sys-color-primary, #ffb59d);
}

.btn-icon {
  font-size: 1.8rem;
  color: var(--md-sys-color-primary, #bf6038);
}

[theme="dark"] .btn-icon {
  color: var(--md-sys-color-primary, #ffb59d);
}

.arrow-icon {
  font-size: 1.5rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .about-page-view {
    padding: 1.2rem 1.6rem 2rem 1.6rem;
  }

  .minimal-profile-card,
  .minimal-projects-section,
  .minimal-connect-section {
    padding: 2rem 1.6rem;
    border-radius: 2.2rem;
  }

  .profile-header-layout {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.6rem;
  }

  .name-badge-row {
    justify-content: center;
  }

  .tech-chips-row {
    justify-content: center;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .connect-links-row {
    flex-direction: column;
  }

  .connect-btn {
    justify-content: center;
    width: 100%;
  }
}
</style>
