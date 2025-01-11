import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-duotone-sea.css";
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

    const arch = `sudo sh -c "curl -s https://raw.githubusercontent.com/materialgram/arch/x86_64/installer.sh | bash"`;
    const rpm1 = `sudo dnf copr enable burhanverse/materialgram && sudo dnf install materialgram`;
    const rpm2 = `sudo dnf update materialgram --refresh`;
    const deb1 = `bash <(curl -s "https://raw.githubusercontent.com/ghazzor/materialgram-deb-package/master/install.sh")`;
    const deb2 = `sudo apt update && sudo apt install materialgram`;

    return (
        <Card className="bg-gray-800 border-none text-white rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-900 to-teal-900 p-8">
                <h1 className="text-4xl font-bold text-white mb-4">My Fedora Setup</h1>
                <div className="text-sm text-gray-400  flex items-center">
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
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
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
                <pre className="relative group">
                    <code className="language-javascript">{arch}</code>
                    <button
                        onClick={() => handleCopy(arch)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <br />
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                    Setup for Fedora/CentOS users
                </h2>
                <p className="text-s text-gray-300  ">
                    <a className="text-teal-400" href="https://copr.fedorainfracloud.org/coprs/burhanverse/materialgram/">Materialgram Copr Repository</a> maintained by <a className="text-teal-400" href="https://github.com/burhanverse">@burhanverse</a>
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ Add the repository and install Materialgram:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{rpm1}</code>
                    <button
                        onClick={() => handleCopy(rpm1)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ Update Materialgram:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{rpm2}</code>
                    <button
                        onClick={() => handleCopy(rpm2)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <br />
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                    Setup for Debian/Ubuntu users
                </h2>
                <p className="text-s text-gray-300  ">
                    <a className="text-teal-400" href="https://github.com/ghazzor/materialgram-deb-package ">Materialgram Deb Repository</a> maintained by <a className="text-teal-400" href="https://github.com/ghazzor">@ghazzor</a>
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ You can use this installer script:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{deb1}</code>
                    <button
                        onClick={() => handleCopy(deb1)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ Update Materialgram:
                </p>
                <pre className="relative group">
                    <code className="language-javascript">{deb2}</code>
                    <button
                        onClick={() => handleCopy(deb2)}
                        className="hidden group-hover:inline-block absolute top-2 right-2 text-sm px-2 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition"
                    >
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </pre>

            </CardContent>
        </Card>
    );
};
