import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Post1 } from "./posts/fedora";
import { Post2 } from "./posts/materialgram";
import { Post3 } from "./posts/fagram";
import { Post4 } from "./posts/rssify";

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();

    const postComponents: { [key: string]: JSX.Element } = {
        "fedora": <Post1 />,
        "materialgram": <Post2 />,
        "fagram": <Post3 />,
        "rssify": <Post4 />,
    };

    if (!slug) {
        return <p>Error: Post not found. Please check the URL.</p>;
    }

    const postContent = postComponents[slug] ?? (
        <p>Error: Post not found. Please check the URL.</p>
    );

    if (!postContent) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
                <h1 className="text-3xl font-bold mb-4">Post not found</h1>
                <Link to="/blog">
                    <Button variant="ghost" className="mb-8 hover:bg-gray-700 hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 h-5 w-5 text-white" /> Back to Blog
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl mx-auto">
                <Link to="/blog/">
                    <Button variant="ghost" className="mb-8 hover:bg-gray-800 hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 h-5 w-5 text-white" /> Back to Blogs
                    </Button>
                </Link>
                {postContent}
            </div>
        </div>
    );
}
