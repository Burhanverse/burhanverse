import { useState } from "react";
import { Calendar, Clock, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const FASTFETCH = () => {
    const [copiedLines, setCopiedLines] = useState<Record<number, boolean>>({});
    const [mainCopied, setMainCopied] = useState<{ [key: string]: boolean }>({}); // Separate state for the main copy button

    const handleCopy = (code: string, line: string, index: number) => {
        const textToCopy = index === -1 ? code : line; // Choose text to copy based on the context

        navigator.clipboard.writeText(textToCopy).then(() => {
            if (index === -1) {
                // Handle the main copy button separately
                setMainCopied((prev) => ({
                    ...prev,
                    [code]: true,
                }));
                // Reset copied state after 2 seconds
                setTimeout(() => {
                    setMainCopied((prev) => ({
                        ...prev,
                        [code]: false,
                    }));
                }, 2000);
            } else {
                // Handle individual line copy
                setCopiedLines((prev) => ({ ...prev, [index]: true }));
                setTimeout(() => setCopiedLines((prev) => ({ ...prev, [index]: false })), 2000);
            }
        }).catch((error) => {
            console.error("Failed to copy text: ", error);
        });
    };

    const arch = `sudo dnf install fastfetch crontab`;
    const setup =
        `git clone https://github.com/Burhanverse/dotfiles.git\n` +
        `mkdir -p ~/.config/fastfetch\n` +
        `cp dotfiles/fastfetch/* ~/.config/fastfetch/*\n` +
        `chmod +x ~/.config/fastfetch/packages.sh\n` +
        `chmod +x ~/.config/fastfetch/upd_pkgs.sh`;

    const cronjob = 
        `crontab -e\n` +
        `# Add the following line to the crontab file:\n` +
        `*/15 * * * * /home/aqua/.config/fastfetch/upd_pkgs.sh`;
    const fastfetch = `fastfetch`;

    return (
        <Card className="bg-gray-800 border-none text-white rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-800 to-teal-600 p-8">
                <h1 className="text-4xl font-bold text-white mb-4">Fastfetch Configuration</h1>
                <div className="text-sm text-teal-300  flex items-center">
                    <span className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        18 Apr, 2025
                    </span>
                    <span className="mx-2">·</span>
                    <span className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        4 min read
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-600">
                    Install and setup FASTFETCH on Linux
                </h2>
                {/* Image with caption */}
                <figure className="mb-6">
                    <img
                        src="https://raw.githubusercontent.com/Burhanverse/assets/refs/heads/main/fedora.png"
                        alt="Fedora Setup"
                        className="w-full rounded-xl"
                    />
                    <figcaption className="text-center mt-1">
                    <h6 className="text-xs text-italic text-gray-300  "><i>For reference I'm using Fedora 42 Workstation with GNOME 48 and wezterm</i></h6>
                    </figcaption>
                </figure>
                <p className="text-s text-gray-300  ">
                    ⦿ First we will install fastfetch and crontab (required to update & display the installed packages):
                </p>
                <div className="half-space"></div>
                <pre className="relative group rounded-lg overflow-hidden bg-gray-900">
                    <div className="flex justify-between items-center bg-gray-700 px-2 py-2">
                        <span className="text-sm font-semibold text-gray-300">Code</span>
                        <button
                            onClick={() => handleCopy(arch, "", -1)} // Main copy button
                            className="text-sm px-2 py-1 text-white rounded hover:text-teal-400 transition"
                        >
                            {mainCopied[arch] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="text-xs p-4 overflow-auto">
                        <code>
                            {arch.split("\n").map((line, index) => (
                                <div key={index} className="group flex items-center">
                                    {/* Line number */}
                                    <span className="mr-4 text-gray-500 select-none">{index + 1}</span>

                                    {/* Code line */}
                                    <span className="flex-grow">{line}</span>

                                    {/* Copy button for individual lines */}
                                    <button
                                        onClick={() => handleCopy("", line, index)} // Individual line copy
                                        aria-label={`Copy line ${index + 1}`}
                                        className="ml-2 text-gray-400 hover:text-white hidden group-hover:inline"
                                    >
                                        {copiedLines[index] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                </div>
                            ))}
                        </code>
                    </div>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ Now clone my dotfiles repository and copy the fastfetch config file to ~/.config/fastfetch directory:
                </p>
                <div className="half-space"></div>
                <pre className="relative group rounded-lg overflow-hidden bg-gray-900">
                    <div className="flex justify-between items-center bg-gray-700 px-2 py-2">
                        <span className="text-sm font-semibold text-gray-300">Code</span>
                        <button
                            onClick={() => handleCopy(setup, "", -1)} // Main copy button
                            className="text-sm px-2 py-1 text-white rounded hover:text-teal-400 transition"
                        >
                            {mainCopied[setup] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="text-xs p-4 overflow-auto">
                        <code>
                            {setup.split("\n").map((line, index) => (
                                <div key={index} className="group flex items-center">
                                    {/* Line number */}
                                    <span className="mr-4 text-gray-500 select-none">{index + 1}</span>

                                    {/* Code line */}
                                    <span className="flex-grow">{line}</span>

                                    {/* Copy button for individual lines */}
                                    <button
                                        onClick={() => handleCopy("", line, index)} // Individual line copy
                                        aria-label={`Copy line ${index + 1}`}
                                        className="ml-2 text-gray-400 hover:text-white hidden group-hover:inline"
                                    >
                                        {copiedLines[index] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                </div>
                            ))}
                        </code>
                    </div>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    The <a className="text-teal-400">packages.sh</a> is executed by fastfetch to display the installed packages which is saved in <a className="text-teal-400">packages_count.txt</a> by the <a className="text-teal-400">upd_pkgs.sh</a> in the same location as the script.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ The data in the <a className="text-teal-400">packages_count.txt</a> file is updated every 15 minutes by crontab. To set up the cron job, run the following command:
                </p>
                <div className="half-space"></div>
                <pre className="relative group rounded-lg overflow-hidden bg-gray-900">
                    <div className="flex justify-between items-center bg-gray-700 px-2 py-2">
                        <span className="text-sm font-semibold text-gray-300">Code</span>
                        <button
                            onClick={() => handleCopy(cronjob, "", -1)} // Main copy button
                            className="text-sm px-2 py-1 text-white rounded hover:text-teal-400 transition"
                        >
                            {mainCopied[cronjob] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="text-xs p-4 overflow-auto">
                        <code>
                            {cronjob.split("\n").map((line, index) => (
                                <div key={index} className="group flex items-center">
                                    {/* Line number */}
                                    <span className="mr-4 text-gray-500 select-none">{index + 1}</span>

                                    {/* Code line */}
                                    <span className="flex-grow">{line}</span>

                                    {/* Copy button for individual lines */}
                                    <button
                                        onClick={() => handleCopy("", line, index)} // Individual line copy
                                        aria-label={`Copy line ${index + 1}`}
                                        className="ml-2 text-gray-400 hover:text-white hidden group-hover:inline"
                                    >
                                        {copiedLines[index] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                </div>
                            ))}
                        </code>
                    </div>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ Now try running the fastfetch command in the terminal:
                </p>
                <div className="half-space"></div>
                <pre className="relative group rounded-lg overflow-hidden bg-gray-900">
                    <div className="flex justify-between items-center bg-gray-700 px-2 py-2">
                        <span className="text-sm font-semibold text-gray-300">Code</span>
                        <button
                            onClick={() => handleCopy(fastfetch, "", -1)} // Main copy button
                            className="text-sm px-2 py-1 text-white rounded hover:text-teal-400 transition"
                        >
                            {mainCopied[fastfetch] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="text-xs p-4 overflow-auto">
                        <code>
                            {fastfetch.split("\n").map((line, index) => (
                                <div key={index} className="group flex items-center">
                                    {/* Line number */}
                                    <span className="mr-4 text-gray-500 select-none">{index + 1}</span>

                                    {/* Code line */}
                                    <span className="flex-grow">{line}</span>

                                    {/* Copy button for individual lines */}
                                    <button
                                        onClick={() => handleCopy("", line, index)} // Individual line copy
                                        aria-label={`Copy line ${index + 1}`}
                                        className="ml-2 text-gray-400 hover:text-white hidden group-hover:inline"
                                    >
                                        {copiedLines[index] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                </div>
                            ))}
                        </code>
                    </div>
                </pre>
                <div className="half-space"></div>
                <i className="text-s text-gray-300  ">
                  And that's it! You should now see the fastfetch output in your terminal. If you want to customize the output, you can edit the <a className="text-teal-400">~/.config/fastfetch/config.jsonc</a> file.
                </i>
                <div className="half-space"></div>
                <i className="text-s text-gray-300  ">
                    View <a className="text-teal-400" href="https://github.com/Burhanverse/dotfiles" target="_blank" rel="noopener noreferrer">dotfiles repository</a>.
                </i>
            </CardContent>
        </Card>
    );
};