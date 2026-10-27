import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import TagSelector from "../TagSelector/TagSelector.jsx";

function NewPost({ onNewPostSubmit, availableTags }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await onNewPostSubmit({ title, content, tags: selectedTags });
            setTitle(""); setContent(""); setSelectedTags([]);
        } catch (err) { setError(err.message); }
        finally { setSubmitting(false); }
    };

    return (
        <div className="new-post">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="title">Título:</Form.Label>
                <Form.Control id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <Form.Label htmlFor="content">Contenido:</Form.Label>
                <Form.Control as="textarea" id="content" name="content" value={content} placeholder="¡Creá una publicación!" onChange={(e) => setContent(e.target.value)} required />
                <TagSelector availableTags={availableTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                <Button variant="primary" type="submit" disabled={submitting}>{submitting ? "Publicando..." : "Publicar"}</Button>
            </Form>
        </div>
    );
}

export default NewPost;
