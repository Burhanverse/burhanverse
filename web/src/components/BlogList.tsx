import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const blogPosts = [
    { slug: "fedora", title: "Fedora Setup", excerpt: "Tweaks and stuffs that I use on my fedora workstation...", date: "2025-06-01", readTime: "15 min read" },
    { slug: "materialgram", title: "Materialgram", excerpt: "Guide on how to install materialgram native distro packages...", date: "2025-11-01", readTime: "3 min read" },
    { slug: "fagram", title: "FAgram Desktop", excerpt: "Install FAgram on Arch/Fedora/Ubuntu/Debian linux distros...", date: "2025-02-04", readTime: "3 min read" },
    { slug: "rssify", title: "RSS-ify", excerpt: "Introduction and general information on my RSS-ify telegram bot...", date: "2025-24-02", readTime: "5 min read" },
]

export default function BlogList() {
    return (
        <div className="min-h-screen bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">My Blogs</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">Thoughts, ideas, and insights on technology, development, and more</p>
                </header>

                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={`/blog/${post.slug}`}> {/* Use the slug in the link */}
                                <Card className="bg-gray-800 border-none text-white hover:bg-gray-700 transition-all duration-300 rounded-2xl shadow-lg transform hover:-translate-y-1">
                                    <CardHeader>
                                        <CardTitle className="text-xl sm:text-2xl font-semibold mb-2">{post.title}</CardTitle>
                                        <div className="flex items-center text-sm text-gray-400 mb-2">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span className="mr-4">{post.date}</span>
                                            <Clock className="mr-2 h-4 w-4" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-300 mb-4">{post.excerpt}</p>
                                        <div className="flex items-center text-teal-400 hover:text-teal-300 transition-colors">
                                            <span className="mr-2 font-semibold">Read more</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </main>
            </div>
            <div className="mt-12 text-center">
                <Link to="/">
                    <Button variant="ghost" className="hover:bg-gray-800 hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
