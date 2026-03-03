import { useState, FormEvent } from "react";
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

export default function FooterSection() {
  const { ref, isInView } = useInView();
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"fan" | "partner">("fan");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <footer id="footer" ref={ref} className="py-24 md:py-32 px-6 dark-gradient dark-section">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-white mb-4">Join the waitlist

          </h2>
          <p className="font-body text-brand-white/50 mb-8">
            Get early access before the whistle blows.
          </p>

          {/* Toggle */}
          <div className="inline-flex rounded-xl bg-brand-white/10 p-1 mb-8">
            <button
              onClick={() => setType("fan")}
              className={`px-5 py-2.5 rounded-lg font-display font-bold text-sm transition-all ${
              type === "fan" ?
              "bg-brand-yellow text-brand-dark" :
              "text-brand-white/60 hover:text-brand-white"}`
              }>
              
              I'm a fan
            </button>
            <button
              onClick={() => setType("partner")}
              className={`px-5 py-2.5 rounded-lg font-display font-bold text-sm transition-all ${
              type === "partner" ?
              "bg-brand-yellow text-brand-dark" :
              "text-brand-white/60 hover:text-brand-white"}`
              }>
              
              I'm a partner
            </button>
          </div>

          {!submitted ?
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 rounded-xl bg-brand-white/10 border-2 border-brand-white/20 text-brand-white placeholder:text-brand-white/30 font-body text-base focus:outline-none focus:border-brand-yellow/50 transition-colors" />
            
              <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-brand-yellow text-brand-dark font-display font-bold text-base transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
              
                {type === "fan" ? "Get Early Access 🚀" : "Partner With Us 🤝"}
              </button>
            </form> :

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-6 py-6 rounded-xl bg-brand-white/10 border-2 border-brand-yellow/30">
            
              <span className="text-3xl block mb-2">🥐</span>
              <p className="font-display font-bold text-lg text-brand-white">
                {type === "fan" ? "You're on the roster!" : "We'll be in touch!"}
              </p>
              <p className="text-sm text-brand-white/50 font-body">
                {type === "fan" ?
              "We'll reach out before kickoff." :
              "Our partnerships team will contact you within 48 hours."}
              </p>
            </motion.div>
          }
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-brand-white/10 text-center">
        <p className="font-display text-2xl font-bold text-brand-yellow mb-4">Ultrafans</p>
        <div className="flex justify-center gap-6 flex-wrap mb-6">
          {["About", "Careers", "Blog", "X (Twitter)", "Discord", "Instagram"].map((link) =>
          <a
            key={link}
            href="#"
            className="font-body text-sm text-brand-white/40 hover:text-brand-white transition-colors">
            
              {link}
            </a>
          )}
        </div>
        <p className="font-body text-xs text-brand-white/20 mb-2">© 2026 Ultrafans. All rights reserved.</p>
      </div>
    </footer>);

}