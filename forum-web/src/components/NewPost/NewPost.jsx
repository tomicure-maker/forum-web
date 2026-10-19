import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import TagSelector from "../TagSelector/TagSelector";

function NewPost({ onNewPostSubmit, availableTags }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = { title, content, tags: selectedTags };

        onNewPostSubmit(postData);
        setTitle("");
        setContent("");
        setSelectedTags([]);
    };

    return (
        <div className="new-post">
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="title">Title:</Form.Label>
                <Form.Control
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Form.Label htmlFor="content">Content:</Form.Label>
                <Form.Control
                    as="textarea"
                    id="content"
                    name="content"
                    value={content}
                    placeholder="Create a New Post!"
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <TagSelector
                    availableTags={availableTags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default NewPost;
