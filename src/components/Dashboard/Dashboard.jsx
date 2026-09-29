import { useState } from "react";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";

function Dashboard() {
    const [posts, setPosts] = useState([]);

    const handleNewPostSubmit = (postData) => {
        setPosts((currentPosts) => [...currentPosts, postData]);
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h1> FORO </h1>
            <NewPost onNewPostSubmit={handleNewPostSubmit} />
            {posts.map((post, index) => (
                <Post key={`${post.title}-${index}`} post={post} />
            ))}
        </div>
    );
}

export default Dashboard;
