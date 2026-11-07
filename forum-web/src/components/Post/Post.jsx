import {useNavigate} from "react-router-dom";
import Tag from "../Tag/Tag";
import { getCurrentUser } from "../../services/authService.js";


function Post({ id, title, content, tags = [], authorId, authorRole, onDeletePost }) {

    const navigate = useNavigate();
    const currentUser = getCurrentUser();


    const isAuthor = currentUser?.id === authorId;

    const canDelete =
         isAuthor ||
        (currentUser?.rol === "admin" && authorRole === "usuario") ||
        (currentUser?.rol === "superadmin" &&
            ["usuario", "admin"].includes(authorRole));

    const handlePostClick = () => {
        navigate(`/post/${id}`);
    };

    return (
        <div className="blog-post" onClick={handlePostClick}>
            <h2 className="display-5 link-body-emphasis mb-1">{title}</h2>

            {canDelete && (
                <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={(event) => {
                        event.stopPropagation();

                        if (window.confirm("¿Estas seguro de eliminar esta publicacion?")) {
                            onDeletePost(id);
                        }
                    }}
                >
                     Eliminar
                </button>
            )}

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
