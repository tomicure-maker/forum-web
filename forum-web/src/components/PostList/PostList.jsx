import Post from "../Post/Post.jsx";

function PostList({ posts }) {
    if (!posts.length) return <p>Todavía no hay publicaciones.</p>;
    return <div className="post-list">
        {posts.map((post) => <Post key={post.id} id={post.id} title={post.title} content={post.content} tags={post.tags} author={post.author} date={post.date} />)}
    </div>;
}

export default PostList;
