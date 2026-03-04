import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { blogPosts } from "@/data/blogPosts";
import LanguageToggle from "@/components/landing/LanguageToggle";

export default function Blog() {
  const { t, i18n } = useTranslation();
  return (
    <main className="min-h-screen bg-brand-white">
      {/* Header */}
      <header className="bg-brand-dark py-6 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold text-brand-yellow hover:opacity-80 transition-opacity">
            UltraFans
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-bold text-brand-white/60 uppercase tracking-widest">{t("blog.heading")}</span>
            <LanguageToggle dark />
          </div>
        </div>
      </header>

      {/* Title */}
      <section className="py-16 sm:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-4"
          >
            {t("blog.heading")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-brand-dark/60 text-lg max-w-xl"
          >
            {t("blog.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Post list */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block group rounded-2xl border border-brand-dark/10 bg-white p-6 sm:p-8 transition-all hover:border-brand-yellow/40 hover:shadow-lg"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-body text-xs text-brand-dark/40 uppercase tracking-wider">
                    {new Date(post.date).toLocaleDateString(i18n.language, { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="text-brand-dark/20">·</span>
                  <span className="font-body text-xs text-brand-dark/40">{post.readTime}</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-dark mb-2 group-hover:text-brand-indigo transition-colors">
                  {post.title}
                </h2>
                <p className="font-body text-brand-dark/60 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-indigo/10 flex items-center justify-center">
                    <span className="font-display text-xs font-bold text-brand-indigo">{post.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-brand-dark">{post.author}</p>
                    <p className="font-body text-xs text-brand-dark/40">{post.authorRole}</p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-brand-dark/5">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/" className="font-display text-sm font-bold text-brand-dark/40 hover:text-brand-dark transition-colors">
            {t("blog.backToHome")}
          </Link>
        </div>
      </footer>
    </main>
  );
}
