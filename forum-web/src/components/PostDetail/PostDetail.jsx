import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Tag from "../Tag/Tag.jsx";
import { getPost } from "../../services/postService.js";
import CommentList from "../Comments/CommentList.jsx";

function PostDetail() {
    const { id } = useParams();
    const [result, setResult] = useState({ id: null, post: null, error: "" });

    useEffect(() => {
        let active = true;
        getPost(id).then((post) => {
            if (active) setResult({ id, post, error: "" });
        }).catch((err) => {
            if (active) setResult({ id, post: null, error: err.message || "No se pudo cargar la publicación." });
        });
        return () => { active = false; };
    }, [id]);

    if (result.id !== id) return <div className="container mt-4"><Spinner animation="border" /></div>;
    if (result.error) return <div className="container mt-4"><Alert variant="danger">{result.error}</Alert></div>;
    if (!result.post) return <div className="container mt-4">No se encontró la publicación.</div>;

    const { post } = result;

    return <div className="blog-post container mt-4">
        <h1>{post.title}</h1><hr /><p>{post.content}</p>
        <p className="text-muted">Publicado por {post.author}</p>
        <div className="tags">{post.tags.map((tag) => <Tag key={tag.tagName} tagName={tag.tagName} color={tag.color} />)}</div>
        <CommentList postId={post.id} />
    </div>;
}

export default PostDetail;
