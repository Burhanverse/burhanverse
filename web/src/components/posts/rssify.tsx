import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Post4 = () => {

    return (
        <Card className="bg-gray-800 border-none text-white rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-800 to-teal-600 p-8">
                <h1 className="text-4xl font-bold text-white mb-4">RSS-ify</h1>
                <div className="text-sm text-teal-300  flex items-center">
                    <span className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        02 Apr, 2025
                    </span>
                    <span className="mx-2">·</span>
                    <span className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        5 min read
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-600">
                    Introduction:
                </h2>
                <p className="text-s text-gray-300  ">
                    RSS-ify is a lightweight telegram bot powered by NodeJS™, that
                    helps you stay updated by delivering content from your favorite feeds directly to your group
                    chat or in private. Customize, organize, and manage your subscriptions effortlessly!
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    Available <a className="text-teal-400" href="https://rssifyxbot.t.me">@rssifyxbot</a>
                </p>
                <div className="half-space"></div>
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-600">
                    Features:
                </h2>
                <p className="text-s text-gray-300  ">
                    ⦿ RSS-ify supports group topics, which means you can easily set a particular topic in your group
                    as default for your feed updates just by using the <a className="text-teal-400">/set</a> command.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ RSS-ify also supports individual subscriptions, which means you can subscribe to any feed
                    of your choice and get updates directly in your private chat.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ RSS-ify utilizes <a className="text-teal-400" href="https://github.com/burhanverse/api/parserapi/">ParserAPI</a> a suit composed of python libraries for parsing which handles RSS 0.9x, RSS 1.0, RSS 2.0, CDF, Atom 0.3, Atom 1.0 and HTML parsing [experimental].
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ OPML Import and export of feeds are supported, which means you can easily backup and restore your subscriptions.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ If your site is protected with cloudflare then the bot will return invalid URL or an error code 403.
                </p>
                <div className="half-space"></div>
                <p className="text-s text-gray-300  ">
                    ⦿ As of now channels are not supported, but I do have a plan to add support in the future.
                </p>
                <div className="half-space"></div>
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-600">
                    Available commands:
                </h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="text-left text-teal-400 pr-4">Commands</th>
                                <th className="text-left text-teal-400 pl-4">Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="text-teal-200 pr-4">/start</td>
                                <td className="text-gray-300 pl-4">Starts the bot and shows the welcome message.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/set</td>
                                <td className="text-gray-300 pl-4">Sets the default topic for your group.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/add</td>
                                <td className="text-gray-300 pl-4">To add a new feed to the subscription list.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/del</td>
                                <td className="text-gray-300 pl-4">Unsubcscibe existing feed from the subscribed list.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/list</td>
                                <td className="text-gray-300 pl-4">To view the subscribed feeds list.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/del_all</td>
                                <td className="text-gray-300 pl-4">Delete all subscribed feed with a backup.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/pause</td>
                                <td className="text-gray-300 pl-4">Pause the feed updates.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/resume</td>
                                <td className="text-gray-300 pl-4">Resume the feed updates.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/export</td>
                                <td className="text-gray-300 pl-4">Export your subscribed feeds list in OPML format.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/import</td>
                                <td className="text-gray-300 pl-4">Import your subscribed feeds list in OPML format.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/stats</td>
                                <td className="text-gray-300 pl-4">Shows the bot server stats.</td>
                            </tr>
                            <tr>
                                <td className="text-teal-200 pr-4">/about</td>
                                <td className="text-gray-300 pl-4">Shows the current bot version, description, etc.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="half-space"></div>
                <div className="half-space"></div>
                <i className="text-s text-gray-300  ">
                    RSS-ify is open-source and free to use. You can find the source code on <a className="text-teal-400" href="https://github.com/burhanverse/rssify">GitHub</a>.
                </i>
            </CardContent>
        </Card >
    );
};