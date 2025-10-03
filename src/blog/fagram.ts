/**
 * Article: Getting Started with Material Design 3
 */

import { ArticleContent } from "../types";

export const article1: ArticleContent = {
  id: 1,
  slug: "fagram-desktop",
  sections: [
    {
      type: "paragraph",
      content: "All linux packages are maintained by @burhanverse",
    },
    {
      type: "heading",
      content: "Setup for ArchLinux/ArchLinux based distros:",
    },
    {
      type: "paragraph",
      content:
        "You can install fagram from AUR. If you have an AUR helper like yay, you can run:",
    },
    {
      type: "code",
      content: `yay -S fagram-bin`,
      language: "Terminal",
    },
    {
      type: "heading",
      content: "Setup for Fedora/CentOS users:",
    },
    {
      type: "paragraph",
      content: "You can install fagram from copr you can run:",
    },
    {
      type: "code",
      content: `sudo dnf copr enable burhanverse/fagram
sudo dnf install fagram`,
      language: "Terminal",
    },
    {
      type: "heading",
      content: "Setup for Debian/Ubuntu users:",
    },
    {
      type: "paragraph",
      content:
        'You can install fagram from <a href="https://github.com/burhancodes/fagram-deb" target="_blank">github hosted DEB package repo</a>, you can run:',
    },
    {
      type: "code",
      content: `bash <(curl -s "https://raw.githubusercontent.com/burhancodes/fagram-deb/main/install.sh")`,
      language: "Terminal",
    },
  ],
};
