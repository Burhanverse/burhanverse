import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, GitFork, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
    title: string;
    description: string;
    tech: string[];
    stats: {
        stars: number;
        forks: number;
    };
    link: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch repositories sorted by last updated date in descending order
                const response = await fetch(
                    'https://api.github.com/users/Burhanverse/repos?sort=updated&direction=desc&per_page=20'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }
                const data = await response.json();
                const formattedProjects = data.map((repo: any) => ({
                    title: repo.name,
                    description: repo.description || '',
                    tech: repo.language ? [repo.language] : [],
                    stats: {
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                    },
                    link: repo.html_url,
                }));
                setProjects(formattedProjects);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-400">Loading projects...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Heading Section */}
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
                    My Projects
                </h1>

                {/* Projects Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="group relative h-56 rounded-3xl overflow-hidden shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                <div className="relative backdrop-blur-xl bg-gray-800 rounded-3xl p-6 border border-gray-700 transition-all duration-300 group-hover:border-teal-500/50 h-full flex flex-col">
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

                {/* Back to Home Button at the Bottom */}
                <div className="mt-12 text-center">
                    <Link to="/">
                        <Button variant="ghost" className="hover:bg-gray-800 hover:text-white transition-colors">
                            <ArrowLeft className="mr-2 h-5 w-5 text-white" /> Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}