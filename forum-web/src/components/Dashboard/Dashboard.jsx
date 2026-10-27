import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import NewPost from "../NewPost/NewPost.jsx";
import PostList from "../PostList/PostList.jsx";
import { createPost, getPosts } from "../../services/postService.js";
import { getTags } from "../../services/tagService.js";
import { isAuthenticated } from "../../services/authService.js";

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());

    useEffect(() => {
        let active = true;
        Promise.allSettled([getPosts(), getTags()]).then(([postsResult, tagsResult]) => {
            if (!active) return;

            const errors = [];
            if (postsResult.status === "fulfilled") setPosts(postsResult.value);
            else errors.push(postsResult.reason.message);

            if (tagsResult.status === "fulfilled") setAvailableTags(tagsResult.value);
            else errors.push(tagsResult.reason.message);

            setError(errors.join(" "));
            setLoading(false);
        });
        return () => { active = false; };
    }, []);
    useEffect(() => {
        const updateAuth = () => setLoggedIn(isAuthenticated());
        window.addEventListener("forum-auth-changed", updateAuth);
        return () => window.removeEventListener("forum-auth-changed", updateAuth);
    }, []);

    const handleNewPostSubmit = async (postData) => {
        try {
            const newPost = await createPost(postData);
            setPosts((current) => [newPost, ...current]);
            setError("");
        } catch (err) { setError(err.message); throw err; }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>FORO</h1>
            {error && <Alert variant="danger" className="w-75">{error}</Alert>}
            {loggedIn ? <NewPost onNewPostSubmit={handleNewPostSubmit} availableTags={availableTags} /> : <p>Iniciá sesión para crear publicaciones.</p>}
            {loading ? <Spinner animation="border" role="status" aria-label="Cargando publicaciones" /> : <PostList posts={posts} />}
        </div>
    );
}

export default Dashboard;
