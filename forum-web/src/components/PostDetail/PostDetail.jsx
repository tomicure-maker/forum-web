    import { useParams } from "react-router-dom";
    import Tag from "../Tag/Tag";


function PostDetail({ posts }) {

  const { id } = useParams();

  const post = posts.find((post) => post.id === Number(id));
    
    if (!post) {
        return <div>Post not found</div>;
    }
    // CAMBIAR POR NOT FOUND DSP//
    return (
          <div className="blog-post">
              <h1 className="display-5 link-body-emphasis mb-1">{post.title}</h1>
              <hr />
              <p>{post.content}</p>

              <div className="tags">
                  {post.tags.map((tag) => (
                      <Tag
                          key={tag.tagName}
                          tagName={tag.tagName}
                          color={tag.color}
                      />
                  ))}
              </div>
          </div>
      );
  }

export default PostDetail;