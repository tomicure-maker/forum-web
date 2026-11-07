import "./Footer.css";

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row g-0 align-items-center text-center">
                    <div className="col-6 site-footer-column">
                        <span>© UTN TUP 2026 Forum Web.</span>
                    </div>
                    <div className="col-6 site-footer-column">
                        <a
                            href="https://github.com/tomicure-maker/forum-web"
                            className="site-footer-link"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src="/github.svg" alt="" width="24" height="24" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}