import { useState } from "react";
import { Calendar, Clock, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Post2 = () => {
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

    const arch = `sudo sh -c "curl -s https://raw.githubusercontent.com/materialgram/arch/x86_64/installer.sh | bash"`;
    const rpm1 =
        `sudo dnf copr enable burhanverse/materialgram\n` +
        `sudo dnf install materialgram`;
    const rpm2 = `sudo dnf update materialgram --refresh`;
    const deb1 = `bash <(curl -s "https://raw.githubusercontent.com/ghazzor/materialgram-deb-package/master/install.sh")`;
    const deb2 = `sudo apt update && sudo apt install materialgram`;

    return (
        <Card className="bg-gray-800 border-none text-white rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-800 to-teal-600 p-8">
                <h1 className="text-4xl font-bold text-white mb-4">Materialgram</h1>
                <div className="text-sm text-teal-300  flex items-center">
                    <span className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        11 Jan, 2025
                    </span>
                    <span className="mx-2">·</span>
                    <span className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        3 min read
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-600">
                    Setup for Arch Linux users
                </h2>
                <h6 className="text-xs text-italic text-gray-300  ">NOTE: If you have installed the flatpak version then please do remove it first.</h6>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    <a className="text-teal-400" href="https://github.com/materialgram/arch">Materialgram Arch Repository</a> maintained by <a className="text-teal-400" href="https://github.com/omansh-krishn">@omansh-krishn</a>
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ You can use this installer script:
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
                <br />
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-600">
                    Setup for Fedora/CentOS users
                </h2>
                <p className="text-s text-gray-300  ">
                    <a className="text-teal-400" href="https://copr.fedorainfracloud.org/coprs/burhanverse/materialgram/">Materialgram Copr Repository</a> maintained by <a className="text-teal-400" href="https://github.com/burhanverse">@burhanverse</a>
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ Add the repository and install Materialgram:
                </p>
                <div className="half-space"></div>
                <pre className="relative group rounded-lg overflow-hidden bg-gray-900">
                    <div className="flex justify-between items-center bg-gray-700 px-2 py-2">
                        <span className="text-sm font-semibold text-gray-300">Code</span>
                        <button
                            onClick={() => handleCopy(rpm1, "", -1)} // Main copy button
                            className="text-sm px-2 py-1 text-white rounded hover:text-teal-400 transition"
                        >
                            {mainCopied[rpm1] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="text-xs p-4 overflow-auto">
                        <code>
                            {rpm1.split("\n").map((line, index) => (
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
                    ⦿ Update Materialgram:
                </p>
                <div className="half-space"></div>
                <pre className="relative group rounded-lg overflow-hidden bg-gray-900">
                    <div className="flex justify-between items-center bg-gray-700 px-2 py-2">
                        <span className="text-sm font-semibold text-gray-300">Code</span>
                        <button
                            onClick={() => handleCopy(rpm2, "", -1)} // Main copy button
                            className="text-sm px-2 py-1 text-white rounded hover:text-teal-400 transition"
                        >
                            {mainCopied[rpm2] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="text-xs p-4 overflow-auto">
                        <code>
                            {rpm2.split("\n").map((line, index) => (
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
                <br />
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-600">
                    Setup for Debian/Ubuntu users
                </h2>
                <p className="text-s text-gray-300  ">
                    <a className="text-teal-400" href="https://github.com/ghazzor/materialgram-deb-package ">Materialgram Deb Repository</a> maintained by <a className="text-teal-400" href="https://github.com/ghazzor">@ghazzor</a>
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ You can use this installer script:
                </p>
                <div className="half-space"></div>
                <pre className="relative group rounded-lg overflow-hidden bg-gray-900">
                    <div className="flex justify-between items-center bg-gray-700 px-2 py-2">
                        <span className="text-sm font-semibold text-gray-300">Code</span>
                        <button
                            onClick={() => handleCopy(deb1, "", -1)} // Main copy button
                            className="text-sm px-2 py-1 text-white rounded hover:text-teal-400 transition"
                        >
                            {mainCopied[deb1] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="text-xs p-4 overflow-auto">
                        <code>
                            {deb1.split("\n").map((line, index) => (
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
                    ⦿ Update Materialgram:
                </p>
                <div className="half-space"></div>
                <pre className="relative group rounded-lg overflow-hidden bg-gray-900">
                    <div className="flex justify-between items-center bg-gray-700 px-2 py-2">
                        <span className="text-sm font-semibold text-gray-300">Code</span>
                        <button
                            onClick={() => handleCopy(deb2, "", -1)} // Main copy button
                            className="text-sm px-2 py-1 text-white rounded hover:text-teal-400 transition"
                        >
                            {mainCopied[deb2] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="text-xs p-4 overflow-auto">
                        <code>
                            {deb2.split("\n").map((line, index) => (
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
            </CardContent>
        </Card>
    );
};