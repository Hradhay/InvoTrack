import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ClipboardCheck, Truck, ArrowLeftRight, 
  BarChart3, SlidersHorizontal, ChevronRight, 
  ArrowRight, CheckCircle2, ShieldCheck, MapPin, Zap, Boxes
} from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Easing } from "framer-motion";

const easeOut: Easing = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: easeOut }
  })
};

const features = [
  { icon: Boxes, title: "Product Management", desc: "Create and manage product catalog with SKU, categories, and stock details." },
  { icon: ClipboardCheck, title: "Goods Receipts", desc: "Track incoming items from suppliers and update quantities automatically." },
  { icon: Truck, title: "Delivery Orders", desc: "Handle outgoing shipments and reduce stock accurately." },
  { icon: ArrowLeftRight, title: "Internal Transfers", desc: "Move items between warehouse locations while maintaining records." },
  { icon: SlidersHorizontal, title: "Stock Adjustments", desc: "Correct inventory mismatches between system records and physical counts." },
  { icon: BarChart3, title: "Smart Dashboard", desc: "Real-time overview of warehouse operations and KPIs." },
];

const steps = [
  "Register products",
  "Receive goods from vendors",
  "Move items between locations",
  "Deliver goods to customers",
  "Adjust discrepancies",
];

const benefits = [
  { icon: Zap, text: "Real-time inventory visibility" },
  { icon: CheckCircle2, text: "Organized warehouse operations" },
  { icon: ShieldCheck, text: "Reduced manual errors" },
  { icon: MapPin, text: "Multi-location tracking" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Boxes className="h-4 w-4 text-primary-foreground" />
            </div>
            InvoTrack
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild><Link to="/login">Login</Link></Button>
            <Button asChild><Link to="/signup">Get Started</Link></Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.04]" />
        <div className="container relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden" animate="visible"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Zap className="h-3.5 w-3.5" /> Smart Warehouse Operations
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Manage Warehouse Operations with{" "}
              <span className="text-gradient">Clarity and Speed</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              InvoTrack centralizes product movement, warehouse activity, and stock monitoring in one powerful platform.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex gap-3 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/signup">Get Started <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card">
        <div className="container">
          <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl font-bold text-foreground mb-3">Everything You Need</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-lg mx-auto">Comprehensive tools to manage every aspect of your warehouse operations.</motion.p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i} className="p-6 rounded-xl bg-background border shadow-card hover:shadow-elevated transition-shadow group">
                <div className="h-11 w-11 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl font-bold text-foreground mb-3">How It Works</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground">Five simple steps to streamlined warehouse management.</motion.p>
          </motion.div>
          <motion.div className="max-w-2xl mx-auto space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border shadow-card">
                <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary-foreground">{i + 1}</span>
                </div>
                <span className="font-medium text-foreground">{step}</span>
                {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-card">
        <div className="container">
          <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl font-bold text-foreground mb-3">Why InvoTrack?</motion.h2>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {benefits.map((b, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="text-center p-6">
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <b.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <p className="font-medium text-foreground text-sm">{b.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <motion.div 
            className="max-w-2xl mx-auto text-center gradient-primary rounded-2xl p-12"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Start Managing Your Warehouse Smarter</h2>
            <p className="text-primary-foreground/80 mb-6">Join InvoTrack and bring clarity to every product movement.</p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link to="/signup">Create Account <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display font-semibold text-foreground">
            <div className="h-6 w-6 rounded-lg gradient-primary flex items-center justify-center">
              <Boxes className="h-3 w-3 text-primary-foreground" />
            </div>
            InvoTrack
          </div>
          <p>"Clarity in Every Product Movement"</p>
        </div>
      </footer>
    </div>
  );
}

