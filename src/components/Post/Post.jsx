import Tag from "../Tag/Tag";

function Post({ post }) {
    const { title, content, tags = [] } = post;

    return (
        <div className="blog-post">
            <h2 className="display-5 link-body-emphasis mb-1">{title}</h2>
            <hr />
            <p className="blog-post-meta">
                Posted on January 1, 2023 by John Doe
            </p>
            <p>{content}</p>
            <div className="tags">
                {tags.map((tag) => (
                    <Tag
                        key={tag.tagName}
                        tagName={tag.tagName}
                        color={tag.color}
                        selected={true}
                    />
                ))}
            </div>
        </div>
    );
}

export default Post;
