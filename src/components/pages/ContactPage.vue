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

const skillCategories = [
  {
    title: "Programming Languages",
    icon: "code",
    skills: [
      { name: "TypeScript", level: "Expert", color: "#3178c6" },
      { name: "JavaScript", level: "Advanced", color: "#f1e05a" },
      { name: "Rust", level: "Intermediate", color: "#dea584" },
      { name: "Python", level: "Advanced", color: "#3572A5" },
      { name: "CSS3 / SCSS", level: "Expert", color: "#563d7c" },
      { name: "HTML5", level: "Expert", color: "#e34c26" },
      { name: "C / C++", level: "Intermediate", color: "#555555" },
      { name: "Shell / Bash", level: "Advanced", color: "#89e051" },
    ],
  },
  {
    title: "Frameworks & Web Ecosystem",
    icon: "layers",
    skills: [
      { name: "Vue 3 & Composition API", level: "Expert", color: "#41b883" },
      { name: "Vite", level: "Expert", color: "#646cff" },
      { name: "Material Design 3 (M3)", level: "Expert", color: "#bf6038" },
      { name: "React", level: "Advanced", color: "#61dafb" },
      { name: "Node.js", level: "Advanced", color: "#339933" },
      { name: "Tauri & Electron", level: "Intermediate", color: "#24c8db" },
      { name: "TailwindCSS", level: "Advanced", color: "#06b6d4" },
      { name: "Prism.js / Syntax Highlighting", level: "Advanced", color: "#f92672" },
    ],
  },
  {
    title: "Tools & Operating Systems",
    icon: "terminal",
    skills: [
      { name: "Arch Linux", level: "Daily Driver", color: "#1793d1" },
      { name: "Git & GitHub", level: "Workflow", color: "#f05032" },
      { name: "Neovim & VS Code", level: "Core Editor", color: "#57a143" },
      { name: "Figma", level: "UI Prototyping", color: "#f24e1e" },
      { name: "Linux Ricing & Dotfiles", level: "Enthusiast", color: "#8a2be2" },
      { name: "GitHub Actions / CI", level: "Automation", color: "#2088ff" },
    ],
  },
];

const endeavors = [
  {
    title: "Fagram Desktop",
    tag: "Flagship Desktop App",
    desc: "A modern, expressive cross-platform Telegram client built for power users. Focused on silky fluid Material 3 animations, speed, and sleek privacy controls.",
    icon: "send",
    color: "#2aabee",
    link: "https://github.com/fagramdesktop/fagram-desktop",
  },
  {
    title: "Material You Web Ecosystem",
    tag: "Design & Widgets",
    desc: "Reimagining the web as a Google Pixel Tablet and Chromebook widget canvas. Developing responsive flower clocks, capsule scrobblers, and dynamic color extractors.",
    icon: "widgets",
    color: "#bf6038",
    link: "https://github.com/Burhanverse/Burhanverse.github.io",
  },
  {
    title: "Ambient Lofi & Last.fm Companion",
    tag: "Audio & Ergonomics",
    desc: "Building desktop companion apps and real-time scrobbling tools that sync musical study sessions with aesthetic visualizers and clock widgets.",
    icon: "headphones",
    color: "#e5cd86",
    link: "https://github.com/Burhanverse",
  },
  {
    title: "Anime & Manga Journey",
    tag: "Passions & Leisure",
    desc: "Avid anime watcher with over 420+ completed episodes and 85+ manga chapters logged on AniList. Always exploring captivating storytelling and art direction.",
    icon: "movie_filter",
    color: "#41b883",
    link: "https://anilist.co/user/Burhanverse",
  },
];

const touchpoints = [
  {
    name: "GitHub",
    handle: "@Burhanverse",
    desc: "Browse open source projects, stars & contributions",
    icon: "code",
    color: "#24292f",
    url: "https://github.com/Burhanverse",
  },
  {
    name: "Discord",
    handle: "@burhanverse",
    desc: "Direct messages, real-time chats & collaboration",
    icon: "forum",
    color: "#5865f2",
    action: "copy",
  },
  {
    name: "X / Twitter",
    handle: "@burhanverse",
    desc: "Tech updates, banter, and software explorations",
    icon: "flutter",
    color: "#1da1f2",
    url: "https://x.com/burhanverse",
  },
  {
    name: "Location & Time",
    handle: "Assam, India (IST)",
    desc: "Available across Indian Standard Time (UTC+05:30)",
    icon: "location_on",
    color: "#bf6038",
    url: null,
  },
];
</script>

<template>
  <div class="about-page-view">
    <!-- 1. Hero Persona & Identity Card -->
    <section class="about-hero-widget" aria-label="About Sid">
      <div class="hero-left-col">
        <div class="avatar-glow-wrapper">
          <img
            src="https://github.com/Burhanverse.png"
            alt="Sid (Burhanverse)"
            class="about-avatar-img"
          />
          <div class="status-live-badge" title="Open for collaboration">
            <span class="pulse-dot"></span>
            <span>Building in Public</span>
          </div>
        </div>

        <div class="hero-title-meta">
          <div class="name-title-row">
            <h1 class="persona-name">𝙎𝙞𝙙.</h1>
            <span class="persona-aka">(Burhan)</span>
            <span class="handle-pill">@Burhanverse</span>
          </div>

          <p class="persona-role">
            Full-Stack Software Builder • System Explorer • Interface Artisan
          </p>

          <p class="persona-tagline">
            Crafting thoughtful open source software, desktop companion utilities, and tactile Material Design 3 interfaces from Assam, India.
          </p>

          <!-- Badges Cluster -->
          <div class="meta-badges-cluster">
            <span class="meta-chip">
              <span class="material-symbols-rounded chip-ico">location_on</span>
              Assam, India
            </span>
            <span class="meta-chip">
              <span class="material-symbols-rounded chip-ico">corporate_fare</span>
              Core at @fagramdesktop
            </span>
            <span class="meta-chip">
              <span class="material-symbols-rounded chip-ico">schedule</span>
              IST (UTC +05:30)
            </span>
            <span class="meta-chip highlight-chip">
              <span class="material-symbols-rounded chip-ico">handshake</span>
              Open to Collaborations
            </span>
          </div>
        </div>
      </div>

      <div class="hero-right-col">
        <div class="quick-facts-box">
          <h3 class="quick-facts-title">Snapshot</h3>
          <div class="fact-row">
            <span class="fact-lbl">Primary Focus:</span>
            <span class="fact-val">Expressive MD3 & Linux Systems</span>
          </div>
          <div class="fact-row">
            <span class="fact-lbl">Preferred Stack:</span>
            <span class="fact-val">Vue 3, Vite, TypeScript, Rust</span>
          </div>
          <div class="fact-row">
            <span class="fact-lbl">Workstation:</span>
            <span class="fact-val">Arch Linux • Neovim • Alacritty</span>
          </div>
          <div class="fact-row">
            <span class="fact-lbl">Soundtrack:</span>
            <span class="fact-val">Lofi & Japanese Ambient</span>
          </div>
        </div>

        <div class="hero-cta-row">
          <a
            href="https://github.com/Burhanverse"
            target="_blank"
            rel="noopener noreferrer"
            class="about-action-btn primary-btn"
          >
            <md-ripple></md-ripple>
            <span class="material-symbols-rounded">folder_shared</span>
            <span>View GitHub Work</span>
          </a>

          <button
            type="button"
            class="about-action-btn secondary-btn"
            @click="copyDiscordHandle"
          >
            <md-ripple></md-ripple>
            <span class="material-symbols-rounded">{{ copied ? 'check' : 'content_copy' }}</span>
            <span>{{ copied ? 'Discord Copied!' : 'Copy Discord ID' }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 2. Narrative Story & Engineering Mindset -->
    <div class="story-philosophy-grid">
      <!-- Story Card -->
      <section class="about-card story-card" aria-label="My Story">
        <div class="card-icon-pill">
          <span class="material-symbols-rounded">auto_stories</span>
        </div>
        <h2 class="section-title">The Journey</h2>
        <div class="narrative-body">
          <p>
            I began my computing journey tinkering with Linux system configurations, window managers, and exploring how code shapes the digital tools we touch every day.
          </p>
          <p>
            Over the years, curiosity evolved into crafting production-ready software, cross-platform apps, and rich web ecosystems. Whether engineering <b>Fagram Desktop</b> or inventing widgetized desktop homescreens, I care deeply about the intersection of technical robustness and visual delight.
          </p>
          <p>
            When I'm not writing code, you'll find me tweaking my Arch setup, discovering new lofi beats, or tracking anime on AniList.
          </p>
        </div>
      </section>

      <!-- Philosophy Card -->
      <section class="about-card philosophy-card" aria-label="Engineering Philosophy">
        <div class="card-icon-pill">
          <span class="material-symbols-rounded">psychology</span>
        </div>
        <h2 class="section-title">Core Principles</h2>
        <div class="philosophy-items-col">
          <div class="phil-item">
            <div class="phil-bullet">
              <span class="material-symbols-rounded">palette</span>
            </div>
            <div>
              <h4 class="phil-heading">Tactile Aesthetics & Material You</h4>
              <p class="phil-desc">
                Interfaces shouldn't feel sterile. Warm color palettes, fluid squircle morphs, and smooth micro-animations make software an absolute joy to use.
              </p>
            </div>
          </div>

          <div class="phil-item">
            <div class="phil-bullet">
              <span class="material-symbols-rounded">bolt</span>
            </div>
            <div>
              <h4 class="phil-heading">Performance & Zero Bloat</h4>
              <p class="phil-desc">
                Leveraging high-performance build tools like Vite, Vue 3 reactivity, and native web standards to keep bundle sizes lean and interactions instantaneous.
              </p>
            </div>
          </div>

          <div class="phil-item">
            <div class="phil-bullet">
              <span class="material-symbols-rounded">public</span>
            </div>
            <div>
              <h4 class="phil-heading">Open Source & Community</h4>
              <p class="phil-desc">
                Building in the open, sharing tools that empower other builders, and contributing to the open source developer ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 3. Technical Arsenal & Skills Matrix -->
    <section class="about-card skills-arsenal-section" aria-label="Technical Skills">
      <div class="skills-section-header">
        <div class="header-icon-box">
          <span class="material-symbols-rounded">terminal</span>
        </div>
        <div>
          <h2 class="section-title">Technical Arsenal</h2>
          <p class="section-subtitle">Languages, frameworks, and workflow tools I use daily</p>
        </div>
      </div>

      <div class="skills-categories-grid">
        <div
          v-for="cat in skillCategories"
          :key="cat.title"
          class="skill-category-box"
        >
          <div class="cat-header-row">
            <span class="material-symbols-rounded cat-ico">{{ cat.icon }}</span>
            <h3 class="cat-title">{{ cat.title }}</h3>
          </div>

          <div class="skills-chips-wrapper">
            <div
              v-for="skill in cat.skills"
              :key="skill.name"
              class="skill-tag-pill"
            >
              <span class="skill-dot" :style="{ backgroundColor: skill.color }"></span>
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level-badge">{{ skill.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Active Endeavors & Current Focus -->
    <section class="about-card endeavors-section" aria-label="Active Endeavors">
      <div class="skills-section-header">
        <div class="header-icon-box">
          <span class="material-symbols-rounded">rocket_launch</span>
        </div>
        <div>
          <h2 class="section-title">Active Endeavors & Focus</h2>
          <p class="section-subtitle">Key projects and creative areas currently taking shape</p>
        </div>
      </div>

      <div class="endeavors-cards-grid">
        <a
          v-for="item in endeavors"
          :key="item.title"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          class="endeavor-card"
        >
          <md-ripple></md-ripple>
          <div class="endeavor-top-row">
            <div class="endeavor-icon-box" :style="{ color: item.color }">
              <span class="material-symbols-rounded">{{ item.icon }}</span>
            </div>
            <span class="endeavor-tag-pill">{{ item.tag }}</span>
            <span class="material-symbols-rounded link-out-icon">arrow_outward</span>
          </div>

          <h3 class="endeavor-title">{{ item.title }}</h3>
          <p class="endeavor-desc">{{ item.desc }}</p>
        </a>
      </div>
    </section>

    <!-- 5. Social Touchpoints & Direct Connection -->
    <section class="about-card touchpoints-section" aria-label="Connect With Me">
      <div class="skills-section-header">
        <div class="header-icon-box">
          <span class="material-symbols-rounded">alternate_email</span>
        </div>
        <div>
          <h2 class="section-title">Connect & Reach Out</h2>
          <p class="section-subtitle">Always open to discussions on software, design systems, and collaborations</p>
        </div>
      </div>

      <div class="touchpoints-grid">
        <component
          :is="item.url ? 'a' : 'div'"
          v-for="item in touchpoints"
          :key="item.name"
          :href="item.url || undefined"
          :target="item.url ? '_blank' : undefined"
          :rel="item.url ? 'noopener noreferrer' : undefined"
          class="touchpoint-card"
          :class="{ 'is-clickable': !!item.url || item.action === 'copy' }"
          @click="item.action === 'copy' ? copyDiscordHandle() : null"
        >
          <md-ripple v-if="item.url || item.action === 'copy'"></md-ripple>

          <div class="touchpoint-icon-box" :style="{ color: item.color }">
            <span class="material-symbols-rounded">{{ item.icon }}</span>
          </div>

          <div class="touchpoint-text-col">
            <div class="touchpoint-top-row">
              <h3 class="tp-name">{{ item.name }}</h3>
              <span v-if="item.url" class="material-symbols-rounded out-arrow">arrow_outward</span>
              <span v-else-if="item.action === 'copy'" class="material-symbols-rounded out-arrow">
                {{ copied ? 'check' : 'content_copy' }}
              </span>
            </div>
            <p class="tp-desc">{{ item.desc }}</p>
            <span class="tp-handle-badge">
              {{ item.action === 'copy' && copied ? 'Copied to Clipboard!' : item.handle }}
            </span>
          </div>
        </component>
      </div>
    </section>

    <!-- 6. Footer Widget -->
    <footer class="about-footer-widget">
      <div class="footer-meta-left">
        <img src="https://github.com/Burhanverse.png" alt="Burhan" class="footer-avatar-mini" />
        <div>
          <p class="footer-primary-txt">Designed & crafted with ❤️ by <i>Sid (Burhan)</i></p>
          <p class="footer-secondary-txt">Google Material Design 3 • Tablet & Mobile Homescreen Edition</p>
        </div>
      </div>
      <div class="footer-meta-right">
        <span class="badge-m3">M3 Expressive</span>
        <span class="footer-year">© 2026</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.about-page-view {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  max-width: 132rem;
  margin: 0 auto;
  padding: 1.2rem 1.6rem 6rem;
  animation: aboutFadeIn 360ms ease;
}

@keyframes aboutFadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 1. Hero Persona Widget */
.about-hero-widget {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2.8rem;
  padding: 2.8rem 3.2rem;
  border-radius: 2.8rem;
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.88));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.12);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

[theme="dark"] .about-hero-widget {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
}

.hero-left-col {
  display: flex;
  align-items: center;
  gap: 2.8rem;
  flex: 1 1 54rem;
}

.avatar-glow-wrapper {
  position: relative;
  width: 11rem;
  height: 11rem;
  flex-shrink: 0;
}

.about-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 3rem;
  object-fit: cover;
  border: 2px solid var(--md-sys-color-primary, #bf6038);
  box-shadow: 0 8px 24px rgba(191, 96, 56, 0.22);
}

.status-live-badge {
  position: absolute;
  bottom: -0.6rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--md-sys-color-surface-container-highest, #261b16);
  color: var(--md-sys-color-on-surface, #ece2dc);
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  font-size: 1.05rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.pulse-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: #2ea043;
  box-shadow: 0 0 6px #2ea043;
}

.hero-title-meta {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.name-title-row {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.persona-name {
  font-family: "Lexend Deca", sans-serif;
  font-size: 3.2rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0;
  line-height: 1.1;
}

.persona-aka {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--md-sys-color-primary, #bf6038);
}

.handle-pill {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--md-sys-color-primary, #bf6038);
  background: var(--md-sys-color-primary-container, rgba(191, 96, 56, 0.12));
  padding: 0.3rem 1rem;
  border-radius: 9999px;
}

.persona-role {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--md-sys-color-secondary, #81552a);
  margin: 0;
}

[theme="dark"] .persona-role {
  color: var(--md-sys-color-secondary, #edbc90);
}

.persona-tagline {
  font-size: 1.45rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  margin: 0;
  max-width: 56rem;
  line-height: 1.5;
}

.meta-badges-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.6rem;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  background: rgba(0, 0, 0, 0.035);
  padding: 0.4rem 1rem;
  border-radius: 9999px;
}

[theme="dark"] .meta-chip {
  background: rgba(255, 255, 255, 0.045);
}

.chip-ico {
  font-size: 1.6rem;
  color: var(--md-sys-color-primary, #bf6038);
}

.highlight-chip {
  background: rgba(191, 96, 56, 0.12);
  color: var(--md-sys-color-primary, #bf6038);
  font-weight: 700;
}

.hero-right-col {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  flex: 1 1 36rem;
}

.quick-facts-box {
  background: rgba(0, 0, 0, 0.03);
  border-radius: 2rem;
  padding: 1.6rem 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

[theme="dark"] .quick-facts-box {
  background: rgba(255, 255, 255, 0.04);
}

.quick-facts-title {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--md-sys-color-primary, #bf6038);
  margin: 0 0 0.2rem 0;
}

.fact-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-size: 1.3rem;
}

.fact-lbl {
  color: var(--md-sys-color-on-surface-variant, #52443e);
  font-weight: 600;
}

.fact-val {
  color: var(--md-sys-color-on-surface, #1f1b18);
  font-weight: 700;
  text-align: right;
}

.hero-cta-row {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.about-action-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.8rem;
  border-radius: 9999px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.primary-btn {
  background: var(--md-sys-color-primary, #bf6038);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(191, 96, 56, 0.3);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(191, 96, 56, 0.4);
}

.secondary-btn {
  background: rgba(0, 0, 0, 0.04);
  color: var(--md-sys-color-on-surface, #1f1b18);
  border: 1px solid rgba(191, 96, 56, 0.16);
}

[theme="dark"] .secondary-btn {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.secondary-btn:hover {
  background: rgba(191, 96, 56, 0.1);
}

/* 2. Story & Philosophy Grid */
.story-philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  gap: 2.4rem;
}

.about-card {
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.88));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.12);
  border-radius: 2.8rem;
  padding: 2.6rem 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

[theme="dark"] .about-card {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
}

.card-icon-pill {
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 1.6rem;
  background: var(--md-sys-color-primary-container, rgba(191, 96, 56, 0.12));
  color: var(--md-sys-color-primary, #bf6038);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.6rem;
}

.section-title {
  font-family: "Lexend Deca", sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0 0 1.2rem 0;
}

.narrative-body p {
  font-size: 1.45rem;
  line-height: 1.7;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  margin: 0 0 1.2rem 0;
}

.narrative-body p:last-child {
  margin-bottom: 0;
}

.philosophy-items-col {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.phil-item {
  display: flex;
  align-items: flex-start;
  gap: 1.4rem;
}

.phil-bullet {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 1.2rem;
  background: rgba(0, 0, 0, 0.035);
  color: var(--md-sys-color-primary, #bf6038);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

[theme="dark"] .phil-bullet {
  background: rgba(255, 255, 255, 0.045);
}

.phil-heading {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0 0 0.3rem 0;
}

.phil-desc {
  font-size: 1.35rem;
  line-height: 1.55;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  margin: 0;
}

/* 3. Skills Arsenal */
.skills-section-header {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  margin-bottom: 2.4rem;
}

.header-icon-box {
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 1.6rem;
  background: var(--md-sys-color-primary-container, rgba(191, 96, 56, 0.12));
  color: var(--md-sys-color-primary, #bf6038);
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-subtitle {
  font-size: 1.35rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  margin: 0;
}

.skills-categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  gap: 2rem;
}

.skill-category-box {
  background: rgba(0, 0, 0, 0.025);
  border-radius: 2.2rem;
  padding: 1.8rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

[theme="dark"] .skill-category-box {
  background: rgba(255, 255, 255, 0.035);
}

.cat-header-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cat-ico {
  font-size: 2rem;
  color: var(--md-sys-color-primary, #bf6038);
}

.cat-title {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0;
}

.skills-chips-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.skill-tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--md-sys-color-surface-container-lowest, #ffffff);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0.5rem 1.1rem;
  border-radius: 9999px;
  font-size: 1.3rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

[theme="dark"] .skill-tag-pill {
  background: var(--md-sys-color-surface-container-high, #30231c);
  border-color: rgba(255, 255, 255, 0.06);
}

.skill-dot {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 50%;
}

.skill-name {
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #1f1b18);
}

.skill-level-badge {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
}

[theme="dark"] .skill-level-badge {
  background: rgba(255, 255, 255, 0.06);
}

/* 4. Endeavors Grid */
.endeavors-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  gap: 2rem;
}

.endeavor-card {
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.025);
  border-radius: 2.2rem;
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}

[theme="dark"] .endeavor-card {
  background: rgba(255, 255, 255, 0.035);
}

.endeavor-card:hover {
  transform: translateY(-3px);
  border-color: rgba(191, 96, 56, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.endeavor-top-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.endeavor-icon-box {
  width: 4rem;
  height: 4rem;
  border-radius: 1.2rem;
  background: var(--md-sys-color-surface-container-lowest, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
}

[theme="dark"] .endeavor-icon-box {
  background: var(--md-sys-color-surface-container-high, #30231c);
}

.endeavor-tag-pill {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--md-sys-color-primary, #bf6038);
  background: rgba(191, 96, 56, 0.08);
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
}

.link-out-icon {
  font-size: 1.6rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  margin-left: auto;
}

.endeavor-title {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0;
}

.endeavor-desc {
  font-size: 1.35rem;
  line-height: 1.55;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  margin: 0;
}

/* 5. Touchpoints Grid */
.touchpoints-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 1.8rem;
}

.touchpoint-card {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  background: rgba(0, 0, 0, 0.025);
  border-radius: 2.2rem;
  padding: 2rem;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}

[theme="dark"] .touchpoint-card {
  background: rgba(255, 255, 255, 0.035);
}

.touchpoint-card.is-clickable {
  cursor: pointer;
}

.touchpoint-card.is-clickable:hover {
  transform: translateY(-3px);
  border-color: rgba(191, 96, 56, 0.25);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.touchpoint-icon-box {
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 1.6rem;
  background: var(--md-sys-color-surface-container-lowest, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

[theme="dark"] .touchpoint-icon-box {
  background: var(--md-sys-color-surface-container-high, #30231c);
}

.touchpoint-text-col {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.touchpoint-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tp-name {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0;
}

.out-arrow {
  font-size: 1.6rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
}

.tp-desc {
  font-size: 1.3rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  margin: 0;
  line-height: 1.4;
}

.tp-handle-badge {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--md-sys-color-primary, #bf6038);
  margin-top: 0.4rem;
}

/* 6. Footer Widget */
.about-footer-widget {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.88));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.12);
  border-radius: 2.4rem;
  padding: 1.8rem 2.4rem;
}

[theme="dark"] .about-footer-widget {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.footer-meta-left {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.footer-avatar-mini {
  width: 4rem;
  height: 4rem;
  border-radius: 1.2rem;
  object-fit: cover;
  border: 1.5px solid var(--md-sys-color-primary, #bf6038);
}

.footer-primary-txt {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0;
}

.footer-secondary-txt {
  font-size: 1.2rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  margin: 0;
}

.footer-meta-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.badge-m3 {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.15rem;
  font-weight: 700;
  background: var(--md-sys-color-primary-container, rgba(191, 96, 56, 0.12));
  color: var(--md-sys-color-primary, #bf6038);
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
}

.footer-year {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface-variant, #52443e);
}

@media (max-width: 768px) {
  .about-hero-widget {
    padding: 2rem;
  }
  .hero-left-col {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  .meta-badges-cluster {
    justify-content: center;
  }
  .hero-right-col {
    width: 100%;
  }
  .hero-cta-row {
    justify-content: center;
  }
  .story-philosophy-grid {
    grid-template-columns: 1fr;
  }
  .skills-categories-grid {
    grid-template-columns: 1fr;
  }
  .endeavors-cards-grid {
    grid-template-columns: 1fr;
  }
  .touchpoints-grid {
    grid-template-columns: 1fr;
  }
}
</style>
