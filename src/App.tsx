import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import Projects from './components/Projects';
import Loader from './components/Loader';
import TransitionWrapper from './components/TransitionWrapper';
import { ProjectsProvider } from './components/ProjectsContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function AppContent() {
    useSmoothScroll();

    return (
        <AnimatePresence mode="wait">
            <Routes>
                <Route
                    path="/"
                    element={
                        <TransitionWrapper>
                            <Home />
                        </TransitionWrapper>
                    }
                />
                <Route
                    path="/blog"
                    element={
                        <TransitionWrapper>
                            <BlogList />
                        </TransitionWrapper>
                    }
                />
                <Route
                    path="/blog/:slug"
                    element={
                        <TransitionWrapper>
                            <BlogPost />
                        </TransitionWrapper>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <TransitionWrapper>
                            <Projects />
                        </TransitionWrapper>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <ProjectsProvider>
                <Suspense fallback={<Loader />}>
                    <AppContent />
                </Suspense>
            </ProjectsProvider>
        </Router>
    );
}

export default App;