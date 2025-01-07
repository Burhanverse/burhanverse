import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BlogPost() {
    const { id } = useParams<{ id: string }>();
    const postId = Number(id);
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        // Fetch the blog post data from an external source (JSON file)
        fetch(`/public/posts/post_${postId}.json`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => {
                console.error("Error fetching blog post:", error);
                setPost(null); // Set post to null if error occurs
            });
    }, [postId]);

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
                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">{post.content.introduction}</p>
                            {post.content.sections.map((section: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-purple-400">{section.title}</h2>
                                    {section.content.map((para: string, i: number) => (
                                        <p key={i} className="mb-4 text-lg sm:text-xl text-gray-300 leading-relaxed">{para}</p>
                                    ))}
                                    {section.list && (
                                        <ul className="list-disc pl-6 space-y-2">
                                            {section.list.map((item: string, i: number) => (
                                                <li key={i} className="text-lg sm:text-xl text-gray-300 leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
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
