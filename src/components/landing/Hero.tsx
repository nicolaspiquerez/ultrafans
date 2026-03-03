import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import athleteSoccer from "@/assets/athlete-soccer.jpg";
import athleteBasketball from "@/assets/athlete-basketball.jpg";
import athleteNfl from "@/assets/athlete-nfl.jpg";
import athleteUfc from "@/assets/athlete-ufc.jpg";
import fansCheering from "@/assets/fans-cheering.jpg";

const floatingProfiles = [
{ img: athleteSoccer, name: "Carlos M.", fans: "12.4K football fans", className: "top-[15%] left-[8%] float-1" },
{ img: athleteBasketball, name: "Jay W.", fans: "8.9K NBA fans", className: "top-[10%] right-[10%] float-2" },
{ img: athleteNfl, name: "Marcus T.", fans: "15.1K NFL fans", className: "bottom-[25%] left-[5%] float-3 hidden md:block" },
{ img: athleteUfc, name: "Viktor K.", fans: "6.7K Rugby fans", className: "bottom-[20%] right-[8%] float-4" },
{ img: fansCheering, name: "Fan Club", fans: "23.4K fans", className: "top-[45%] left-[15%] float-5 hidden lg:block" }];


export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, hsl(50 100% 60%) 0%, hsl(45 100% 65%) 30%, hsl(50 100% 55%) 60%, hsl(48 90% 58%) 100%)`,
        backgroundSize: "400% 400%",
        animation: "hero-gradient 8s ease infinite"
      }}>
      
      {/* Floating athlete profiles */}
      {floatingProfiles.map((p, i) =>
      <div
        key={i}
        className={`absolute z-10 ${p.className}`}>
        
          <div className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-foreground/10 shadow-xl">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-display font-bold bg-foreground/80 text-brand-yellow px-2 py-0.5 rounded-full">
              {p.fans}
            </span>
          </div>
        </div>
      )}

      {/* Geometric shapes */}
      <div className="absolute top-20 right-[20%] w-32 h-32 border-4 border-foreground/10 rounded-3xl rotate-12 float-2" />
      <div className="absolute bottom-32 left-[20%] w-24 h-24 bg-foreground/5 rounded-full float-4" />
      <div className="absolute top-[40%] right-[30%] w-16 h-16 border-2 border-foreground/10 rounded-xl rotate-45 float-1" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          
          <span className="inline-block font-display text-sm md:text-base font-bold tracking-widest uppercase mb-6 bg-foreground/10 px-4 py-2 rounded-full">EARLY ACCESS

          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
            Ultrafans
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-foreground/80 font-body">
            The platform where sports fans unlock real experiences
            with the teams they love.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          
          {!submitted ?
          <>
              <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 rounded-xl bg-foreground/10 border-2 border-foreground/20 text-foreground placeholder:text-foreground/40 font-body text-base focus:outline-none focus:border-foreground/40 transition-colors" />
            
              <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-brand-dark font-display font-bold text-brand-white text-base transition-all hover:scale-105 hover:shadow-2xl active:scale-95 whitespace-nowrap">
              
                Get Early Access 🚀
              </button>
            </> :

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full px-6 py-5 rounded-xl bg-foreground/10 border-2 border-foreground/20 text-center">
            
              <span className="text-3xl block mb-2">🥐</span>
              <p className="font-display font-bold text-lg">You're on the roster!</p>
              <p className="text-sm text-foreground/70 font-body">We'll be in touch before kickoff.</p>
            </motion.div>
          }
        </motion.form>
      </div>
    </section>);

}