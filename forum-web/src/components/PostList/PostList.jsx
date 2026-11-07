import Post from "../Post/Post.jsx";

function PostList({ posts, onDeletePost }) {
    if (!posts.length) return <p>Todavía no hay publicaciones.</p>;
    return <div className="post-list container">
        {posts.map((post) => (
            <Post 
                key={post.id} 
                id={post.id} 
                title={post.title} 
                content={post.content} 
                tags={post.tags} 
                author={post.author} 
                date={post.date} 
                authorId={post.authorId}
                authorRole={post.authorRole}
                onDeletePost={onDeletePost}
            />
        ))}
    </div>;
}

export default PostList;
