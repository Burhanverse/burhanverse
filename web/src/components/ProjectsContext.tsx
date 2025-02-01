import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ProjectsContext = createContext<{ projects: Project[]; loading: boolean; error: string | null }>({
    projects: [],
    loading: true,
    error: null,
});

export const useProjects = () => useContext(ProjectsContext);

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
interface GitHubRepository {
    name: string;
    description: string | null;
    url: string;
    stargazers: {
        totalCount: number;
    };
    forks: {
        totalCount: number;
    };
    primaryLanguage: {
        name: string;
    } | null;
    repositoryTopics: {
        nodes: {
            topic: {
                name: string;
            };
        }[];
    };
}

interface GitHubUser {
    pinnedItems: {
        nodes: GitHubRepository[];
    };
}

interface GitHubGraphQLResponse {
    data: {
        user: GitHubUser;
    };
}

async function getGithubProjects(): Promise<{ projects: Project[]; error?: string }> {
    const GITHUB_API_URL = 'https://api.github.com/graphql';
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

    const query = `
        query {
            user(login: "Burhanverse") {
                pinnedItems(first: 6, types: [REPOSITORY]) {
                    nodes {
                        ... on Repository {
                            name
                            description
                            url
                            stargazers {
                                totalCount
                            }
                            forks {
                                totalCount
                            }
                            primaryLanguage {
                                name
                            }
                            repositoryTopics(first: 3) {
                                nodes {
                                    topic {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(GITHUB_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            return { projects: [], error: `Failed to fetch repositories: ${response.statusText}` };
        }

        const data: GitHubGraphQLResponse = await response.json();
        const pinnedRepos = data.data.user.pinnedItems.nodes;

        const projects = pinnedRepos.map((repo: GitHubRepository) => {
            const techStack = new Set<string>();
            if (repo.primaryLanguage?.name) techStack.add(repo.primaryLanguage.name);

            repo.repositoryTopics.nodes
                .slice(0, 2)
                .forEach((topic) =>
                    techStack.add(topic.topic.name.replace(/-/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase()))
                );

            return {
                title: repo.name.toLowerCase(),
                description: repo.description || '',
                tech: Array.from(techStack),
                stats: { stars: repo.stargazers.totalCount, forks: repo.forks.totalCount },
                link: repo.url,
            };
        });

        return { projects };
    } catch (error) {
        console.error('Error fetching GitHub repos:', error instanceof Error ? error.message : String(error));
        return { projects: [], error: 'Failed to load projects' };
    }
}

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetched = useRef(false);

    useEffect(() => {
        if (fetched.current) return;

        const fetchProjects = async () => {
            const { projects, error } = await getGithubProjects();
            if (error) {
                setError(error);
            } else {
                setProjects(projects);
            }
            setLoading(false);
            fetched.current = true;
        };

        fetchProjects();
    }, []);

    return (
        <ProjectsContext.Provider value={{ projects, loading, error }}>
            {children}
        </ProjectsContext.Provider>
    );
};