import {useNavigate} from "react-router-dom";
import Tag from "../Tag/Tag";

function Post({ id, title, content, tags = [] }) {

    const navigate = useNavigate();

    const handlePostClick = () => {
        navigate(`/post/${id}`);
    };

    return (
        <div className="blog-post" onClick={handlePostClick}>
            <h2 className="display-5 link-body-emphasis mb-1">{title}</h2>
            <hr />
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
