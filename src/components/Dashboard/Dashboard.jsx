import { useState } from "react";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import PostList from "../PostList/PostList";

function Dashboard() {

    const availableTags = [
        { tagName: "JavaScript", color: "warning" },
        { tagName: "React", color: "primary" },
        { tagName: "CSS", color: "info" },
        { tagName: "Pregunta", color: "success" },
    ];

    const [posts, setPosts] = useState([]);

    const handleNewPostSubmit = (postData) => {

        const newPost = {
            ...postData,
            id: posts.length + 1,
            author: "Usuario",
            date: new Date().toLocaleDateString(),
        }
        setPosts((currentPosts) => [...currentPosts, newPost]);

    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h1> FORO </h1>
            <NewPost onNewPostSubmit={handleNewPostSubmit}
            availableTags={availableTags} />

            <PostList posts={posts} />
        </div>
    );
}

export default Dashboard;
