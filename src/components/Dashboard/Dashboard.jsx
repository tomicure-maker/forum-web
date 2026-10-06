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
        setPosts((currentPosts) => [...currentPosts, postData]);
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
