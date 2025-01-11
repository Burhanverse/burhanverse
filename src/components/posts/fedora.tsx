import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import Prism from "prismjs";
import "prism-themes/themes/prism-duotone-sea.css";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Post1 = () => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const colloid_installer = `wget https://github.com/Burhanverse/scripts/raw/main/colloid_installer.sh && chmod +x colloid_installer.sh ./colloid_installer.sh `;
    const ntfs1 = `sudo dnf install ntfs-3g fuse`;
    const ntfs2 = `sudo parted -l`;
    const ntfs3 = `sudo mkdir /mnt/ntfs_partition3`;
    const ntfs4 = `sudo mkdir /mnt/ntfs_partition4`;
    const ntfs5 = `sudo mount -t ntfs /dev/nvme0n1p3 /mnt/ntfs_partition3`;
    const ntfs6 = `sudo mount -t ntfs /dev/nvme0n1p4 /mnt/ntfs_partition4`;
    const ntfs7 = `mount | grep ntfs`;
    const ntfs8 = `sudo nano /etc/fstab`;
    const ntfs9 = `/dev/nvme0n1p3 /mnt/ntfs_partition3 ntfs-3g auto,nodev,nofail,x-gvfs-show,uid=1000,gid=1000,umask=000 0 0`;
    const ntfs10 = `/dev/nvme0n1p4 /mnt/ntfs_partition4 ntfs-3g auto,nodev,nofail,x-gvfs-show,uid=1000,gid=1000,umask=000 0 0`;
    const tpadfix1 = `gsettings list-recursively org.gnome.desktop.peripherals.touchpad`;
    const tpadfix2 = `gsettings get org.gnome.desktop.peripherals.touchpad click-method`;
    const tpadfix3 = `gsettings range org.gnome.desktop.peripherals.touchpad click-method`;
    const tpadfix4 = `gsettings set org.gnome.desktop.peripherals.touchpad click-method 'areas'`;
    const weather = `wget https://gitlab.com/julianfairfax/scripts/-/raw/main/add-location-to-gnome-weather.sh chmod +x add-location-to-gnome-weather.sh ./add-location-to-gnome-weather.sh`;
    const kernel1 = `sudo dnf update -y`;
    const kernel2 = ` curl -sSL https://raw.githubusercontent.com/Burhanverse/scripts/main/rem_kernel.sh | bash`;

    return (
        <Card className="bg-gray-800 border-none text-white rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-900 to-teal-900 p-8">
                <h1 className="text-4xl font-bold text-white mb-4">My Fedora Setup</h1>
                <div className="text-sm text-gray-400 flex items-center">
                    <span className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        11 Jan, 2025
                    </span>
                    <span className="mx-2">·</span>
                    <span className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        15 min read
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                {/* Image with caption */}
                <figure className="mb-6">
                    <img
                        src="https://burhanverse.eu.org/img/fedora.png"
                        alt="Fedora Setup"
                        className="w-full rounded-xl mb-6"
                    />
                    <figcaption className="text-xs text-center text-gray-400 mt-1">
                        Running Fedora 41 with GNOME 47
                    </figcaption>
                </figure>

                <p className="text-s text-gray-300">
                    I have been using Fedora for a long time now and I have customized it to my liking. Here are some tweaks and stuffs that I use on my Fedora setup.
                </p>
                <div className="half-space"></div>

                <h2 className="text-2xl text-center font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                    Contents
                </h2>
                <p className="text-center text-s text-gray-300">
                    <a className="text-teal-400" href="#colloid">Colloid icons installer</a>
                </p>
                <p className=" text-center text-s text-gray-300">
                    <a className="text-teal-400" href="#ext">GNOME Extensions</a>
                </p>
                <p className="text-center text-s text-gray-300">
                    <a className="text-teal-400" href="#ntfs">Mount NTFS</a>
                </p>
                <p className="text-center text-s text-gray-300">
                    <a className="text-teal-400" href="#tpadfix">TouchPad Fix</a>
                </p>
                <p className="text-center text-s text-gray-300">
                    <a className="text-teal-400" href="#weather">GNOME Weather location fix</a>
                </p>
                <p className="text-center text-s text-gray-300">
                    <a className="text-teal-400" href="#kernel">Update/Clean Kernels</a>
                </p>
                <br />
                <h2 id="colloid" className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                    Colloid icons installer
                </h2>
                <p className="text-s text-gray-300">
                    I have made a script to install the <a className="text-teal-400" href="https://github.com/vinceliuice/Colloid-icon-theme/ ">Colloid icon theme</a> on Fedora. You can run the script below to install the icons.
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{colloid_installer}</code>
                    <button
                        onClick={() => handleCopy(colloid_installer)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <br />
                <h2 id="ext" className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                    GNOME Extensions
                </h2>
                <p className="text-s text-gray-300">
                    GNOME Extensions are a great way to customize your desktop. You can install the <a className="text-teal-400" href="https://extensions.gnome.org/">GNOME Extensions</a> from the official website. Or use the <a className="text-teal-400" href="https://flathub.org/apps/com.mattjakeman.ExtensionManager">Extension Manager</a> from Flathub.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/615/appindicator-support">AppIndicator and KstatusNotifier</a> - Adds AppIndicator, KStatusNotifierItem and legacy Tray icons support to the Shell.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/6/applications-menu">Apps Menu</a> - Add a category-based menu for apps.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/3193/blur-my-shell">Blur My Shell</a> - Adds a blur look to different parts of the GNOME Shell, including the top panel, dash and overview.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/517/caffeine">Caffeine</a> - Disable the screensaver and auto suspend.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/4839/clipboard-history/">Clipboard History</a> - Gnome Clipboard History is a clipboard manager GNOME extension that saves items you've copied into an easily accessible, searchable history panel.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/307/dash-to-dock">Dash to Dock</a> - A dock for the Gnome Shell. This extension moves the dash out of the overview transforming it in a dock for an easier launching of applications and a faster switching between windows and desktops. Side and bottom placement options are available.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/1319/gsconnect/">GSConnect</a> - GSConnect is a complete implementation of KDE Connect especially for GNOME Shell with Nautilus, Chrome and Firefox integration. It does not rely on the KDE Connect desktop application and will not work with it installed.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/6580/open-bar/">OpenBar</a> - Top Bar / Top Panel , Menus , Dash / Dock , Gnome Shell , Gtk Apps theming. Open the bar and let the colors 🍹 flow. Here's my <a className="text-teal-400" href="https://github.com/Burhanverse/my-linux-setup/blob/master/configs/openbar_config"> config</a> you can download and import it.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/5446/quick-settings-tweaker/">Quick Settings Tweaker</a> - Let's tweak gnome 43's quick settings! You can add Media Controls, Notifications, Volume Mixer on quick settings and remove useless buttons! (Works on GNOME 47).
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/7065/tiling-shell/">Tiling Shell</a> - Extend Gnome Shell with advanced tiling window management. Supports multiple monitors, Windows 11 Snap Assistant, Fancy Zones, customised tiling layouts and more.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ <a className="text-teal-400" href="https://extensions.gnome.org/extension/1460/vitals/">Vitals</a> - A glimpse into your computer's temperature, voltage, fan speed, memory usage, processor load, system resources, network speed and storage stats. This is a one stop shop to monitor all of your vital sensors. Uses asynchronous polling to provide a smooth user experience.
                </p>
                <br />
                <h2 id="ntfs" className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                    MY way of mounting NTFS partions to Linux with full RW permissions:
                </h2>
                <p className="text-s font-semibold text-gray-300">
                    ⦿ Prerequisites:
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    To install ntfs-3g and fuse on CentOS, Fedora, AlmaLinux, and Red Hat:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{ntfs1}</code>
                    <button
                        onClick={() => handleCopy(ntfs1)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s font-semibold text-gray-300">
                    ⦿ Mount NTFS partition on Linux:
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    We will use the parted command to identify the path through which our NTFS partition is accessed.
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{ntfs2}</code>
                    <button
                        onClick={() => handleCopy(ntfs2)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <p className="text-s text-gray-300">
                    Here my NTFS partitions are /dev/nvme0n1p3 and /dev/nvme0n1p4.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    Then, create the path where you plan to mount the partition, if it hasn’t already been created.
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{ntfs3}</code>
                    <button
                        onClick={() => handleCopy(ntfs3)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <pre className="relative group">
                    <code className="language-javascript">{ntfs4}</code>
                    <button
                        onClick={() => handleCopy(ntfs4)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    The most basic mount command would look like this. It should mount your NTFS partition with read and write permissions. This is probably the only command that most users will need.
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{ntfs5}</code>
                    <button
                        onClick={() => handleCopy(ntfs5)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <pre className="relative group">
                    <code className="language-javascript">{ntfs6}</code>
                    <button
                        onClick={() => handleCopy(ntfs6)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    To verify the mount and the permissions that it has, use the mount command.
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{ntfs7}</code>
                    <button
                        onClick={() => handleCopy(ntfs7)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s font-semibold text-gray-300">
                    ⦿ Change Ownership to your username:
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    To make the NTFS partition mount automatically on startup, we’ll need to add a line to the /etc/fstab file on our system. Use nano or your favorite text editor to open it up under root permissions.
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{ntfs8}</code>
                    <button
                        onClick={() => handleCopy(ntfs8)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    Then, add the following line to the file, while substituting your own device directory and mount path.
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{ntfs9}</code>
                    <button
                        onClick={() => handleCopy(ntfs9)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <pre className="relative group">
                    <code className="language-javascript">{ntfs10}</code>
                    <button
                        onClick={() => handleCopy(ntfs10)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <p className="text-s text-gray-300">
                    After updating the /etc/fstab file, you can run sudo mount -a to mount the partitions according to the updated configuration.
                </p>
                <br />
                <h2 id="tpadfix" className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                    Fix TouchPad 'right-click' on Fedora (GNOME):
                </h2>
                <p className="text-s text-gray-300">
                    To fix the RightClick on touchpad we need to change the touchpad clickarea method. Open a terminal and follow the below steps,
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ To check the full list of touchpad settings:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{tpadfix1}</code>
                    <button
                        onClick={() => handleCopy(tpadfix1)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ To check the current click method:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{tpadfix2}</code>
                    <button
                        onClick={() => handleCopy(tpadfix2)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ To check the available click methods:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{tpadfix3}</code>
                    <button
                        onClick={() => handleCopy(tpadfix3)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ To set the click method to 'areas':
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{tpadfix4}</code>
                    <button
                        onClick={() => handleCopy(tpadfix4)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <br />
                <h2 id="weather" className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                    GNOME Weather Location fix:
                </h2>
                <p className="text-s text-gray-300">
                    Well If you're here, it probably means GNOME Weather isn't showing your location, or even your country is missing. It's a known issue, but sadly, GNOME devs are lazy to fix it.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ ⦿ Here's the workaround to add your location on the weather app:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{weather}</code>
                    <button
                        onClick={() => handleCopy(weather)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <p className="text-s text-gray-300">
                    Thanks to <a className="text-teal-400" href="https://gitlab.com/julianfairfax">@julianfairfax</a> for the script.
                </p>
                <br />
                <h2 id="kernel" className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                    My way of updating kernel to latest version and make it default
                </h2>
                <p className="text-xs text-gray-300">
                    NOTE: If something goes wrong although it shouldn't, Don't blame me for your broken system. Simply what I'm trying to say is " Do it at your own risk".
                </p>
                <p className="text-s text-gray-300">
                    ⦿ Firstly check for update:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{kernel1}</code>
                    <button
                        onClick={() => handleCopy(kernel1)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    Make sure to reboot with the new kernel and test it as sometimes the kernel may not boot in some rare cases.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300">
                    ⦿ After the successful reboot, run this to remove your old kernels:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{kernel2}</code>
                    <button
                        onClick={() => handleCopy(kernel2)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <p className="text-s text-gray-300">
                    Here's the <a className="text-teal-400" href="https://github.com/Burhanverse/scripts/blob/main/rem_kernel.sh">script</a> if you are interested to inspect.
                </p>
                <p className="text-s text-gray-300">
                    The script is taken from <a className="text-teal-400" href="https://docs.fedoraproject.org/en-US/quick-docs/upgrading-fedora-offline/#sect-clean-up-old-kernels">official fedora docs</a>, which is used to remove old kernels.
                </p>
                <p className="text-s text-gray-300">
                    Now you can normally reboot your system to see the changes.
                </p>
            </CardContent>
        </Card>
    );
};
