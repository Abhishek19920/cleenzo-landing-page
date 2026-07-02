import { Link } from "react-router-dom";
import PlaceOrderCTA from "../components/PlaceOrderCTA";
import { getAllBlogPosts } from "../data/blogPosts";
import "./blog-page.css";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="blog-page">
      <header className="blog-hero">
        <div className="blog-hero-inner">
          <p className="blog-eyebrow">Cleenzo blog</p>
          <h1>Fabric care, stain removal &amp; how we work</h1>
          <p>
            Practical guides from our Raj Nagar team — spot cleaning, German chemicals, barcode
            tracking and choosing between laundry and dry clean.
          </p>
        </div>
      </header>

      <div className="blog-container">
        <div className="blog-grid">
          {posts.map((post) => (
            <Link key={post.slug} to={post.path} className="blog-card">
              <img
                src={post.heroImage}
                alt={post.heroAlt}
                className="blog-card-image"
                loading="lazy"
              />
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-card-category">{post.category}</span>
                  <span>{formatDate(post.datePublished)}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="blog-card-link">Read article →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <PlaceOrderCTA title="Book laundry or dry cleaning in Ghaziabad" variant="cream" />
    </div>
  );
}

export default BlogPage;
