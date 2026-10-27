import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Tag from "../Tag/Tag.jsx";
import { getPost } from "../../services/postService.js";
import CommentList from "../Comments/CommentList.jsx";

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        setLoading(true);
        getPost(id).then((data) => { if (active) setPost(data); })
            .catch((err) => { if (active) setError(err.message); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [id]);

    if (loading) return <div className="container mt-4"><Spinner animation="border" /></div>;
    if (error) return <div className="container mt-4"><Alert variant="danger">{error}</Alert></div>;
    if (!post) return <div className="container mt-4">No se encontró la publicación.</div>;

    return <div className="blog-post container mt-4">
        <h1>{post.title}</h1><hr /><p>{post.content}</p>
        <p className="text-muted">Publicado por {post.author}</p>
        <div className="tags">{post.tags.map((tag) => <Tag key={tag.tagName} tagName={tag.tagName} color={tag.color} />)}</div>\n        <CommentList postId={post.id} />
    </div>;
}

export default PostDetail;
