function Post({ post }) {
    return (
        <div className="blog-post">
            <h2 className="display-5 link-body-emphasis mb-1">{post.title}</h2>
            <hr />
            <p className="blog-post-meta">
                Posted on January 1, 2023 by John Doe
            </p>
            <p>{post.content}</p>
        </div>
    );
}

export default Post;
