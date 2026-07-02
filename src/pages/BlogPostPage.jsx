import { Link, useParams } from "react-router-dom";
import PlaceOrderCTA from "../components/PlaceOrderCTA";
import { getAllBlogPosts, getBlogPostBySlug } from "../data/blogPosts";
import NotFound from "./NotFound";
import "./blog-page.css";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogSection({ section }) {
  if (section.type === "heading") {
    return <h2>{section.content}</h2>;
  }
  if (section.type === "paragraph") {
    return <p>{section.content}</p>;
  }
  if (section.type === "list") {
    return (
      <ul>
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (section.type === "image") {
    return (
      <figure className="blog-figure">
        <img src={section.src} alt={section.alt} loading="lazy" />
        {section.caption ? <figcaption>{section.caption}</figcaption> : null}
      </figure>
    );
  }
  return null;
}

function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  const related = getAllBlogPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="blog-page">
      <nav className="blog-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/blog">Blog</Link>
        <span aria-hidden="true"> / </span>
        <span>{post.title}</span>
      </nav>

      <div className="blog-article">
        <header className="blog-article-header">
          <div className="blog-article-hero">
            <img src={post.heroImage} alt={post.heroAlt} decoding="async" />
          </div>
          <h1>{post.title}</h1>
          <div className="blog-article-meta">
            <span>{post.category}</span>
            <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="blog-article-body">
          <p>
            <strong>{post.excerpt}</strong>
          </p>
          {post.sections.map((section, index) => (
            <BlogSection key={`${section.type}-${index}`} section={section} />
          ))}
        </div>
      </div>

      {related.length > 0 ? (
        <aside className="blog-related">
          <h2>More from Cleenzo</h2>
          <div className="blog-related-list">
            {related.map((item) => (
              <Link key={item.slug} to={item.path}>
                {item.title}
              </Link>
            ))}
          </div>
        </aside>
      ) : null}

      <PlaceOrderCTA title="Schedule a free pickup in Raj Nagar Extension" variant="cream" />
    </article>
  );
}

export default BlogPostPage;
