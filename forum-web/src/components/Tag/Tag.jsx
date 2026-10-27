function Tag({ tagName, color, selected = false, onClick }) {
    return (
        <a
            href="#"
            className={`d-inline-block m-1 px-2 py-1 rounded-pill text-decoration-none ${selected ? `bg-${color} text-dark` : `bg-light text-${color} border border-${color}`}`}
            onClick={(e) => {
                e.preventDefault();
                if (onClick) {
                    onClick();
                }
            }}>
            {tagName}
        </a>
    );
}

export default Tag;
