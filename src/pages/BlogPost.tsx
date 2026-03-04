import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  // Split content into paragraphs and headings
  const blocks = post.content.split("\n\n").filter(Boolean);

  return (
    <main className="min-h-screen bg-brand-white">
      {/* Header */}
      <header className="bg-brand-dark py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold text-brand-yellow hover:opacity-80 transition-opacity">
            UltraFans
          </Link>
          <Link to="/blog" className="font-display text-sm font-bold text-brand-white/60 hover:text-brand-white transition-colors uppercase tracking-widest">
            Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="py-12 sm:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-body text-xs text-brand-dark/40 uppercase tracking-wider">
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="text-brand-dark/20">·</span>
              <span className="font-body text-xs text-brand-dark/40">{post.readTime}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 pb-8 border-b border-brand-dark/10">
              <div className="w-10 h-10 rounded-full bg-brand-indigo/10 flex items-center justify-center">
                <span className="font-display text-sm font-bold text-brand-indigo">{post.author[0]}</span>
              </div>
              <div>
                <p className="font-display text-sm font-bold text-brand-dark">{post.author}</p>
                <p className="font-body text-xs text-brand-dark/50">{post.authorRole}</p>
              </div>
            </div>
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            {blocks.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="font-display text-xl sm:text-2xl font-bold text-brand-dark mt-10 mb-2"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="font-body text-brand-dark/80 leading-relaxed text-base sm:text-lg">
                  {block}
                </p>
              );
            })}
          </motion.div>

          {/* Author bio */}
          <div className="mt-16 pt-8 border-t border-brand-dark/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-indigo/10 flex items-center justify-center shrink-0">
                <span className="font-display text-base font-bold text-brand-indigo">{post.author[0]}</span>
              </div>
              <div>
                <p className="font-display text-sm font-bold text-brand-dark mb-1">About {post.author}</p>
                <p className="font-body text-sm text-brand-dark/60 leading-relaxed">{post.authorBio}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Footer nav */}
      <footer className="py-8 px-6 border-t border-brand-dark/5">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link to="/blog" className="font-display text-sm font-bold text-brand-dark/40 hover:text-brand-dark transition-colors">
            &larr; All posts
          </Link>
          <Link to="/" className="font-display text-sm font-bold text-brand-dark/40 hover:text-brand-dark transition-colors">
            UltraFans Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
