"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

// Dynamic import for 3D graph (heavy library - lazy load)
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-500" />
    </div>
  ),
});

// ============================================================================
// DEMO GRAPH DATA
// ============================================================================
const demoGraphData = {
  nodes: [
    // Courses (larger nodes)
    { id: "math18", name: "MATH 18", type: "course", color: "#ef4444" },
    { id: "cse101", name: "CSE 101", type: "course", color: "#3b82f6" },
    { id: "cogs10", name: "COGS 10", type: "course", color: "#a855f7" },
    { id: "phys2a", name: "PHYS 2A", type: "course", color: "#f97316" },
    { id: "cse12", name: "CSE 12", type: "course", color: "#06b6d4" },
    { id: "math20c", name: "MATH 20C", type: "course", color: "#ec4899" },
    // Modules (medium nodes)
    { id: "math18-m1", name: "Linear Algebra", type: "module", color: "#ef4444" },
    { id: "math18-m2", name: "Eigenvalues", type: "module", color: "#ef4444" },
    { id: "math18-m3", name: "Vector Spaces", type: "module", color: "#ef4444" },
    { id: "cse101-m1", name: "Algorithms", type: "module", color: "#3b82f6" },
    { id: "cse101-m2", name: "Data Structures", type: "module", color: "#3b82f6" },
    { id: "cse101-m3", name: "Graph Theory", type: "module", color: "#3b82f6" },
    { id: "cogs10-m1", name: "Cognition", type: "module", color: "#a855f7" },
    { id: "cogs10-m2", name: "Memory", type: "module", color: "#a855f7" },
    { id: "phys2a-m1", name: "Mechanics", type: "module", color: "#f97316" },
    { id: "phys2a-m2", name: "Kinematics", type: "module", color: "#f97316" },
    { id: "cse12-m1", name: "Java Basics", type: "module", color: "#06b6d4" },
    { id: "cse12-m2", name: "OOP", type: "module", color: "#06b6d4" },
    { id: "math20c-m1", name: "Multivariable", type: "module", color: "#ec4899" },
    { id: "math20c-m2", name: "Integrals", type: "module", color: "#ec4899" },
    // Assignments (smaller nodes)
    { id: "math18-a1", name: "HW 1", type: "assignment", color: "#ef4444" },
    { id: "math18-a2", name: "Midterm", type: "assignment", color: "#ef4444" },
    { id: "cse101-a1", name: "PA 1", type: "assignment", color: "#3b82f6" },
    { id: "cse101-a2", name: "PA 2", type: "assignment", color: "#3b82f6" },
    { id: "cogs10-a1", name: "Essay 1", type: "assignment", color: "#a855f7" },
    { id: "phys2a-a1", name: "Lab 1", type: "assignment", color: "#f97316" },
    { id: "cse12-a1", name: "PA 1", type: "assignment", color: "#06b6d4" },
    { id: "math20c-a1", name: "Quiz 1", type: "assignment", color: "#ec4899" },
  ],
  links: [
    // Course to Module links
    { source: "math18", target: "math18-m1" },
    { source: "math18", target: "math18-m2" },
    { source: "math18", target: "math18-m3" },
    { source: "cse101", target: "cse101-m1" },
    { source: "cse101", target: "cse101-m2" },
    { source: "cse101", target: "cse101-m3" },
    { source: "cogs10", target: "cogs10-m1" },
    { source: "cogs10", target: "cogs10-m2" },
    { source: "phys2a", target: "phys2a-m1" },
    { source: "phys2a", target: "phys2a-m2" },
    { source: "cse12", target: "cse12-m1" },
    { source: "cse12", target: "cse12-m2" },
    { source: "math20c", target: "math20c-m1" },
    { source: "math20c", target: "math20c-m2" },
    // Module to Assignment links
    { source: "math18-m1", target: "math18-a1" },
    { source: "math18-m2", target: "math18-a2" },
    { source: "cse101-m1", target: "cse101-a1" },
    { source: "cse101-m2", target: "cse101-a2" },
    { source: "cogs10-m1", target: "cogs10-a1" },
    { source: "phys2a-m1", target: "phys2a-a1" },
    { source: "cse12-m1", target: "cse12-a1" },
    { source: "math20c-m1", target: "math20c-a1" },
    // Cross-course relationships (prerequisites)
    { source: "math18", target: "math20c" },
    { source: "cse12", target: "cse101" },
  ],
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated gradient orb */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/10 blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Dot grid overlay */}
      <div className="dot-grid pointer-events-none absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
          <motion.h1
            variants={fadeInUp}
            custom={0}
            className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Learning Made
            <span className="block bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
              Efficient
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={0.2}
            className="mx-auto mt-6 max-w-xl text-lg font-normal text-slate-300 md:text-xl"
          >
            Play School Like A Game — Navigate your Canvas courses as a 3D
            knowledge graph
          </motion.p>

          <motion.div variants={fadeInUp} custom={0.4} className="mt-10">
            <a
              href="/app"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-[--shadow-glow-emerald] transition-all duration-300 hover:scale-105 hover:shadow-[--shadow-glow-emerald-lg]"
            >
              Launch Dashboard
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-2">
          <motion.div
            className="h-2 w-1 rounded-full bg-white/40"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// GRAPH PREVIEW SECTION
// ============================================================================
function GraphPreviewSection() {
  const ref = useRef(null);
  const graphRef = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isGraphReady, setIsGraphReady] = useState(false);

  // Auto-rotate when in view
  useEffect(() => {
    if (isInView && graphRef.current) {
      const controls = graphRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
      }
    }
  }, [isInView, isGraphReady]);

  return (
    <section ref={ref} className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Your Academic Universe
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
        </motion.div>

        {/* Graph container - using glass-card utility */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card relative overflow-hidden rounded-3xl p-4 md:p-8"
          style={{ height: "70vh", minHeight: "500px" }}
        >
          {/* Graph */}
          <div className="absolute inset-0">
            <ForceGraph3D
              ref={graphRef}
              graphData={demoGraphData}
              backgroundColor="rgba(5,7,13,0)"
              nodeLabel="name"
              nodeColor={(node: any) => node.color}
              nodeVal={(node: any) =>
                node.type === "course" ? 12 : node.type === "module" ? 6 : 3
              }
              linkWidth={1.5}
              linkColor={() => "rgba(255,255,255,0.08)"}
              enableNodeDrag={false}
              enableNavigationControls={true}
              showNavInfo={false}
              onEngineStop={() => setIsGraphReady(true)}
              d3AlphaDecay={0.02}
              d3VelocityDecay={0.3}
            />
          </div>

          {/* Overlay hint */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-center">
            <div className="rounded-full bg-black/40 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm">
              Drag to rotate • Scroll to zoom
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FEATURE CARDS SECTION
// ============================================================================
const features = [
  {
    icon: (
      <svg
        className="h-12 w-12 text-emerald-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    ),
    title: "Voice-First Control",
    description:
      "Say 'Show me CSE 101' and watch the graph zoom to your course. Natural language navigation powered by AI.",
  },
  {
    icon: (
      <svg
        className="h-12 w-12 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
        />
      </svg>
    ),
    title: "Spatial Learning",
    description:
      "Every course, module, and assignment becomes a node. See relationships, prerequisites, and connections at a glance.",
  },
  {
    icon: (
      <svg
        className="h-12 w-12 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    title: "Live Canvas Data",
    description:
      "Syncs with your Canvas LMS. Updates automatically when assignments are added or grades are posted.",
  },
];

function FeatureCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid gap-8 md:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              custom={index * 0.1}
              className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-xl"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// DASHBOARD MOCKUP SECTION
// ============================================================================
function DashboardMockupSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-black/20 px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            The Full Experience
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Your courses, visualized in 3D with voice navigation and real-time
            sync
          </p>
        </motion.div>

        {/* Browser window frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto max-w-6xl"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-3 rounded-t-xl bg-slate-800/80 px-4 py-3 backdrop-blur-sm">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="mx-4 flex-1">
              <div className="rounded-md bg-slate-900/60 px-4 py-1.5 font-mono text-sm text-slate-400">
                n-mapper.app/dashboard
              </div>
            </div>
          </div>

          {/* Screenshot container */}
          <div className="relative overflow-hidden rounded-b-xl border-2 border-white/10 bg-slate-900 shadow-[--shadow-mockup]">
            <div className="group relative aspect-video">
              {/* Placeholder for dashboard image */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#05070d]">
                <div className="text-sm text-slate-600">
                  [Dashboard Screenshot: /docs/images/dashboard.png]
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>

          {/* Caption */}
          <motion.a
            href="/app"
            className="mx-auto mt-6 inline-flex items-center gap-2 text-emerald-400 transition-colors hover:text-emerald-300"
            whileHover={{ x: 5 }}
          >
            See it in action
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// SOCIAL PROOF SECTION
// ============================================================================
const universities = [
  { name: "UC San Diego", abbr: "UCSD" },
  { name: "MIT", abbr: "MIT" },
  { name: "Stanford", abbr: "Stanford" },
  { name: "UC Berkeley", abbr: "Berkeley" },
];

function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-transparent to-white/5 px-4 py-16"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-sm uppercase tracking-wider text-slate-400"
        >
          Trusted by Students at Top Universities
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {universities.map((uni) => (
            <div
              key={uni.abbr}
              className="cursor-default text-slate-500 transition-all duration-300 hover:scale-110 hover:text-slate-300"
            >
              <span className="text-2xl font-bold tracking-tight opacity-40 transition-opacity hover:opacity-80">
                {uni.abbr}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================
function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="flex min-h-screen items-center justify-center px-4 py-24"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg"
      >
        {/* Card */}
        <div className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-8 text-center backdrop-blur-2xl md:p-12">
          {/* Glow effect */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-50 blur-xl" />

          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Transform
              <br />
              Your Learning?
            </h2>

            <p className="mb-8 text-slate-300">
              Join 10,000+ students navigating their courses spatially
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/app"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-[--shadow-glow-emerald] transition-all duration-300 hover:scale-105 hover:shadow-[--shadow-glow-emerald-lg]"
              >
                Get Started Free
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>

              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-4 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch Demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
            <span className="text-sm font-bold text-white">N</span>
          </div>
          <span className="font-semibold text-white">N-Mapper</span>
        </div>

        <p className="text-sm text-slate-500">
          Made with ❤️ for students who want to play school like a game
        </p>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-(--color-primary-dark)">
      <HeroSection />
      <GraphPreviewSection />
      <FeatureCardsSection />
      <DashboardMockupSection />
      <SocialProofSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
