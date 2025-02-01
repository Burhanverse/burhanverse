import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Mail, ExternalLink, Send, BookOpen, ArrowRight, Star, GitFork, MapPin } from 'lucide-react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useProjects } from './ProjectsContext';

export default function Home() {
    const { projects, loading, error } = useProjects();

    const navigate = useNavigate();

    const dragY = useMotionValue(0);
    const opacity = useTransform(dragY, [0, -100], [1, 0]);
    const scale = useTransform(dragY, [0, -100], [1, 0.8]);

    const handleDragEnd = (_event: MouseEvent | TouchEvent, info: PanInfo) => {
        if (info.offset.y < -50) {
            navigate('/projects');
        }
    };

    const skills = ["Python", "JavaScript", "React", "Tailwind CSS", "Flask", "MongoDB", "HTML", "Figma", "Git", "CI/CD", "Linux"];

    return (
        <div className="poppins-medium min-h-screen bg-gray-950 flex flex-col text-white">
            <div className="flex-grow max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <header className="mb-8 sm:mb-12">
                    <Card
                        className="bg-gradient-to-br from-gray-900 to-gray-800 border-none text-white rounded-3xl shadow-lg overflow-hidden">
                        <CardContent className="p-6 md:p-8">
                            <div
                                className="flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex-shrink-0 relative"
                                >
                                    <div
                                        className="absolute inset-0 bg-teal-800 rounded-full filter blur-xl opacity-50"></div>
                                    <Avatar
                                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 border-4 border-teal-500 shadow-lg relative"
                                    >
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/127223292?v=4"
                                            alt="Burhanverse" />
                                        <AvatarFallback>JT</AvatarFallback>
                                    </Avatar>
                                </motion.div>
                                <div className="flex-grow text-center md:text-left">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <h1 className="rubik-mono-one-regular text-3xl sm:text-4xl md:text-5xl font-bold mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-600">
                                            Burhanverse
                                        </h1>
                                        <p className="nunito-regular text-xs sm:text-2xl md:text-3xl text-teal-300 font-medium mb-4">
                                            <i>A tech enthusiast from a place that's not on most maps. I'm passionate about the science of perception and love exploring new tech ideas</i>
                                        </p>
                                        <div className="flex flex-col space-y-2 mb-6">
                                            <p className="poppins-regular flex items-center justify-center md:justify-start text-gray-300">
                                                <MapPin className="mr-2 h-5 w-5" />
                                                Based in Assam, India
                                            </p>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="flex justify-center md:justify-start space-x-4"
                                    >
                                        <Button size="icon"
                                            className="bg-gradient-to-r from-teal-600 to-teal-900 hover:from-teal-900 hover:to-teal-600  transition-colors">
                                            <a href="https://github.com/Burhanverse" target="_blank"
                                                rel="noopener noreferrer" aria-label="GitHub">
                                                <Github className="h-5 w-5" />
                                            </a>
                                        </Button>
                                        <Button size="icon"
                                            className="bg-gradient-to-l from-teal-600 to-teal-900 hover:from-teal-900 hover:to-teal-600 transition-colors">
                                            <a href="mailto:contact@burhanverse.eu.org" aria-label="Email">
                                                <Mail className="h-5 w-5" />
                                            </a>
                                        </Button>
                                        <Button size="icon"
                                            className="bg-gradient-to-r from-teal-600 to-teal-900 hover:from-teal-900 hover:to-teal-600 transition-colors">
                                            <a href="https://telegram.me/Burhanverse" target="_blank"
                                                rel="noopener noreferrer" aria-label="Telegram">
                                                <Send className="h-5 w-5" />
                                            </a>
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </header>
                <main className="space-y-8 sm:space-y-10">
                    <section>
                        <div className="flex flex-wrap justify-center gap-4">
                            {skills.map((skill, index) => (
                                <Badge key={index} variant="secondary"
                                    className="text-lg py-2 px-4 bg-gray-800 hover:bg-gray-700 transition-colors rounded-2xl text-white">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </section>

                    <section>
                        <Card
                            className="bg-gradient-to-br from-teal-600 to-teal-900 border-none text-white hover:from-teal-800 hover:to-teal-800 transition-colors rounded-3xl shadow-lg overflow-hidden">
                            <Link to="/blog" className="block">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center text-lg sm:text-2xl font-bold">
                                        <BookOpen className="h-8 w-8 mr-3" />
                                        Explore My Blogs
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg sm:text-xl text-gray-200 mb-4">Dive into my latest thoughts
                                        and insights on technology, development, and more.</p>
                                    <div
                                        className="flex items-center text-teal-300 hover:text-teal-100 transition-colors">
                                        <span className="mr-2 font-semibold">Read latest posts</span>
                                        <ArrowRight className="h-5 w-5" />
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    </section>

                    <section>
                        {loading ? (
                            <div className="text-center text-gray-400">Loading projects...</div>
                        ) : error ? (
                            <div className="text-center text-red-500">{error}</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((project) => (
                                    <motion.div
                                        key={project.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="group relative h-56">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                            <div
                                                className="relative backdrop-blur-xl bg-gray-800 rounded-3xl p-6 border border-gray-700 transition-all duration-300 group-hover:border-teal-500/50 h-full flex flex-col">
                                                <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                                                <p className="text-gray-300 mb-4 text-sm line-clamp-2">{project.description}</p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.tech.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between items-center mt-auto">
                                                    <div className="flex gap-4 text-sm text-gray-400">
                                                        <span className="flex items-center gap-1">
                                                            <Star className="w-4 h-4" /> {project.stats.stars}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <GitFork className="w-4 h-4" /> {project.stats.forks}
                                                        </span>
                                                    </div>
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-gray-400 hover:text-teal-400 transition-colors"
                                                    >
                                                        <ExternalLink className="w-5 h-5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
            <motion.div
                drag="y"
                onDragEnd={handleDragEnd}
                style={{
                    y: dragY,
                    opacity,
                    scale,
                    padding: "10px",
                    borderRadius: "20px",
                }}
                dragConstraints={{ top: -100, bottom: 0 }}
                className="cursor-grab active:cursor-grabbing transition-all ease-in-out"
            >
                <div className="flex flex-col items-center justify-center">
                    <p className="tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-600 hover:to-teal-400 text-xs sm:text-sm mb-2 animate-pulse text-center">
                        Pull up to explore projects
                    </p>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-8 h-1.5 sm:w-12 sm:h-2 bg-gradient-to-r from-teal-600 to-teal-900 hover:from-teal-900 hover:to-teal-600 rounded-full"
                    ></motion.div>
                </div>
            </motion.div>
            <footer className="bg-gray-900 rounded-t-3xl mt-8">
                <div className="max-w-6xl mx-auto px-6 py-6 flex justify-center items-center">
                    <div className="tracking-tight bg-clip-text text-sm text-center">
                        © {new Date().getFullYear()} Burhanverse. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

