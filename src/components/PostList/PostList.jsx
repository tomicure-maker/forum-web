import Post from "../Post/Post";

function PostList({ posts }) {
    return (
        <div className="post-list">
            {posts.map((post, index) => (
                <Post key={`${post.title}-${index}`} post={post} />
            ))}
        </div>
    );
}

export default PostList;