import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';

export default function BlogPost() {
    const { id } = useParams<{ id: string }>();
    const postId = Number(id);
    const [post, setPost] = useState<any>(null);
    const [copiedCodes, setCopiedCodes] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        fetch(`/posts/post_${postId}.json`)
            .then(response => response.json())
            .then(data => {
                setPost(data);
                Prism.highlightAll();
            })
            .catch(error => {
                console.error("Error fetching blog post:", error);
                setPost(null);
            });
    }, [postId]);

    const copyToClipboard = (content: string, index: number) => {
        navigator.clipboard.writeText(content)
            .then(() => {
                setCopiedCodes(prev => ({ ...prev, [index]: true }));
                setTimeout(() => setCopiedCodes(prev => ({ ...prev, [index]: false })), 2000);
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    const renderContentWithLinksAndImages = (content: string) => {
        // Render links and images
        return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, p1, p2) => {
            if (p2.match(/\.(jpeg|jpg|gif|png)$/i)) {
                // Image format
                return `<img src="${p2}" alt="${p1}" class="max-w-full h-auto rounded-lg mb-4" />`;
            } else {
                // Normal links
                return `<a href="${p2}" target="_blank" class="text-blue-500 hover:underline">${p1}</a>`;
            }
        });
    };

    const getTextClasses = (fontSize: string, fontStyle: string) => {
        const sizeClasses = {
            small: "text-base",
            medium: "text-lg sm:text-xl",
            large: "text-2xl sm:text-3xl",
        };

        const styleClasses = {
            regular: "font-normal",
            bold: "font-bold",
            italic: "italic",
            underline: "underline",
        };

        return `${sizeClasses[fontSize] || sizeClasses.medium} ${styleClasses[fontStyle] || styleClasses.regular} text-gray-300 leading-relaxed`;
    };

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
                <Card className="bg-gray-800 border-none text-white rounded-2xl shadow-lg p-8">
                    <CardContent>
                        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
                        <Link to="/blog">
                            <Button variant="ghost" className="mb-8 hover:bg-gray-700 hover:text-white transition-colors">
                                <ArrowLeft className="mr-2 h-5 w-5 text-white" /> Back to Blog
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl mx-auto">
                <Link to="/blog">
                    <Button variant="ghost" className="mb-8 hover:bg-gray-800 hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 h-5 w-5 text-white" /> Back to Blogs
                    </Button>
                </Link>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="bg-gray-800 border-none text-white rounded-2xl shadow-lg overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-purple-900 to-indigo-900 p-8">
                            <CardTitle className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</CardTitle>
                            <div className="flex items-center text-sm text-gray-300">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span className="mr-4">{post.date}</span>
                                <Clock className="mr-2 h-4 w-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <p
                                className={getTextClasses(post.content.introductionFontSize, post.content.introductionFontStyle)}
                                dangerouslySetInnerHTML={{ __html: renderContentWithLinksAndImages(post.content.introduction) }}
                            />
                            {post.content.sections.map((section: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <h2 className={getTextClasses(section.titleFontSize, section.titleFontStyle)}>
                                        {section.title}
                                    </h2>
                                    {section.content.map((para: string, i: number) => (
                                        <p
                                            key={i}
                                            className={getTextClasses(section.contentFontSize, section.contentFontStyle)}
                                            dangerouslySetInnerHTML={{ __html: renderContentWithLinksAndImages(para) }}
                                        />
                                    ))}
                                    {section.list && (
                                        <ul className="list-disc pl-6 space-y-2">
                                            {section.list.map((item: string, i: number) => (
                                                <li
                                                    key={i}
                                                    className={getTextClasses(section.listFontSize, section.listFontStyle)}
                                                    dangerouslySetInnerHTML={{ __html: renderContentWithLinksAndImages(item) }}
                                                />
                                            ))}
                                        </ul>
                                    )}
                                    {section.code && (
                                        <div className="relative flex items-center space-x-4">
                                            <pre className="bg-gray-800 p-4 rounded-lg flex-1">
                                                <code className={`language-${section.code.language}`}>
                                                    {section.code.content}
                                                </code>
                                            </pre>
                                            <Button
                                                variant="ghost"
                                                onClick={() => copyToClipboard(section.code.content, index)}
                                                className="text-gray-400 hover:text-white hover:bg-gray-700 transition-colors p-2"
                                                aria-label="Copy code"
                                            >
                                                {copiedCodes[index] ? "Copied!" : <Copy className="h-5 w-5" />}
                                            </Button>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
