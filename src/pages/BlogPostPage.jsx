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

function BlogCopy({ sections }) {
  return sections.map((section, index) => {
    const key = `${section.type}-${index}`;
    if (section.type === "heading") {
      return <h2 key={key}>{section.content}</h2>;
    }
    if (section.type === "paragraph") {
      return <p key={key}>{section.content}</p>;
    }
    if (section.type === "list") {
      return (
        <ul key={key}>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    return null;
  });
}

function BlogFigure({ image }) {
  if (!image) return null;
  return (
    <figure className="blog-figure">
      <img src={image.src} alt={image.alt} loading="lazy" />
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

function groupCopyWithImages(sections) {
  const rows = [];
  let copy = [];

  sections.forEach((section) => {
    if (section.type === "image") {
      rows.push({ image: section, copy });
      copy = [];
    } else {
      copy.push(section);
    }
  });

  if (copy.length) {
    rows.push({ image: null, copy });
  }

  return rows;
}

function BlogSplitRow({ image, copy, imageOnLeft }) {
  if (!image) {
    return (
      <section className="blog-split blog-split--copy">
        <div className="blog-split-copy">
          <BlogCopy sections={copy} />
        </div>
      </section>
    );
  }

  const sideClass = imageOnLeft ? "blog-split--image-left" : "blog-split--image-right";

  return (
    <section className={`blog-split ${sideClass}`}>
      <div className="blog-split-copy">
        <BlogCopy sections={copy} />
      </div>
      <div className="blog-split-media">
        <BlogFigure image={image} />
      </div>
    </section>
  );
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
  const bodyRows = groupCopyWithImages(post.sections);

  return (
    <article className="blog-page">
      <div className="blog-shell">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/blog">Blog</Link>
          <span aria-hidden="true"> / </span>
          <span>{post.title}</span>
        </nav>

        <div className="blog-article">
          <header className="blog-split blog-split--hero blog-split--image-left">
            <div className="blog-split-copy">
              <p className="blog-article-kicker">{post.category}</p>
              <h1>{post.title}</h1>
              <div className="blog-article-meta">
                <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                <span>{post.readTime}</span>
              </div>
              <p className="blog-article-excerpt">{post.excerpt}</p>
            </div>
            <div className="blog-split-media">
              <div className="blog-article-hero">
                <img src={post.heroImage} alt={post.heroAlt} decoding="async" />
              </div>
            </div>
          </header>

          {bodyRows.map((row, index) => (
            <BlogSplitRow
              key={`${row.image?.src || "copy"}-${index}`}
              image={row.image}
              copy={row.copy}
              imageOnLeft={index % 2 === 1}
            />
          ))}

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
        </div>
      </div>

      <PlaceOrderCTA title="Schedule a free pickup in Raj Nagar Extension" variant="cream" />
    </article>
  );
}

export default BlogPostPage;
