import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Tag from "../Tag/Tag.jsx";
import { getPost, updatePost } from "../../services/postService.js";
import CommentList from "../Comments/CommentList.jsx";
import { getCurrentUser } from "../../services/authService.js";

function PostDetail() {
    const { id } = useParams();
    const [result, setResult] = useState({ id: null, post: null, error: "" });
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);
    const [editError, setEditError] = useState("");

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
    const currentUser = getCurrentUser();
    const canEdit =
        currentUser?.id === post.authorId ||
        ["admin", "superadmin"].includes(currentUser?.rol);

    async function handleEditSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setEditError("");

        try {
            const updatedPost = await updatePost(post.id, { title, content });
            setResult((current) => ({ ...current, post: updatedPost }));
            setEditing(false);
        } catch (error) {
            setEditError(error.message || "No se pudo editar la publicación.");
        } finally {
            setSaving(false);
        }
    }

    return <div className="blog-post container mt-4">
        {editing ? (
            <form onSubmit={handleEditSubmit}>
                <label className="form-label" htmlFor="edit-post-title">Título</label>
                <input
                    id="edit-post-title"
                    className="form-control mb-2"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />
                <label className="form-label" htmlFor="edit-post-content">Contenido</label>
                <textarea
                    id="edit-post-content"
                    className="form-control mb-2"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    required
                />
                <button className="btn btn-primary btn-sm me-2" type="submit" disabled={saving}>
                    {saving ? "Guardando..." : "Guardar"}
                </button>
                <button className="btn btn-secondary btn-sm" type="button" onClick={() => setEditing(false)} disabled={saving}>
                    Cancelar
                </button>
            </form>
        ) : (
            <>
                <h1>{post.title}</h1>
                <hr />
                <p>{post.content}</p>
                {canEdit && (
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm mb-2"
                        onClick={() => {
                            setTitle(post.title);
                            setContent(post.content);
                            setEditing(true);
                        }}
                    >
                        Editar
                    </button>
                )}
            </>
        )}
        {editError && <Alert variant="danger">{editError}</Alert>}
        <div className="text-muted">
            <div>Publicado por {post.author}</div>
            {post.editedBy && <div>Editado por {post.editedBy}</div>}
        </div>
        <div className="tags">{post.tags.map((tag) => <Tag key={tag.tagName} tagName={tag.tagName} color={tag.color} />)}</div>
        <CommentList postId={post.id} />
    </div>;
}

export default PostDetail;
