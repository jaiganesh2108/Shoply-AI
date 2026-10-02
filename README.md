# Shoply-AI -- an agentic full-stack E-Commerce website
<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_standard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"on-secondary-container":"#00424e","on-primary-container":"#340080","secondary-container":"#03b5d3","on-primary-fixed":"#23005c","outline":"#958ea0","primary-fixed":"#e9ddff","on-primary":"#3c0091","primary-container":"#a078ff","on-error":"#690005","surface-variant":"#34343a","on-tertiary":"#3d2f00","surface-bright":"#38393f","inverse-on-surface":"#2f3036","surface-tint":"#d0bcff","secondary-fixed-dim":"#4cd7f6","error-container":"#93000a","tertiary":"#e7c356","tertiary-fixed-dim":"#e7c355","on-secondary-fixed":"#001f26","on-surface-variant":"#cbc3d7","on-primary-fixed-variant":"#5516be","surface-dim":"#121318","primary-fixed-dim":"#d0bcff","primary":"#d0bcff","error":"#ffb4ab","on-secondary":"#003640","on-tertiary-fixed":"#241a00","on-tertiary-fixed-variant":"#574500","tertiary-container":"#caa83d","on-background":"#e3e1e9","secondary-fixed":"#acedff","on-tertiary-container":"#4f3d00","inverse-surface":"#e3e1e9","surface-container-lowest":"#0d0e13","surface-container-highest":"#34343a","secondary":"#4cd7f6","tertiary-fixed":"#ffe089","surface":"#121318","surface-container-low":"#1a1b21","on-surface":"#e3e1e9","outline-variant":"#494454","background":"#121318","surface-container-high":"#292a2f","on-error-container":"#ffdad6","inverse-primary":"#6d3bd7","on-secondary-fixed-variant":"#004e5c","surface-container":"#1e1f25"},borderRadius:{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},spacing:{"space-xs":"0.25rem","space-sm":"0.5rem","space-xl":"2.5rem","space-lg":"1.5rem","space-2xl":"4rem","gutter":"1.5rem","space-md":"1rem","margin-mobile":"1.25rem","margin":"3rem","gutter-mobile":"1rem"},fontFamily:{"headline-md":["Plus Jakarta Sans"],"body-lg":["Inter"],"headline-sm":["Plus Jakarta Sans"],"body-sm":["Inter"],"label-md":["Inter"],"display-hero-mobile":["Plus Jakarta Sans"],"display-hero":["Plus Jakarta Sans"],"label-sm":["Inter"],"headline-lg":["Plus Jakarta Sans"],"headline-lg-mobile":["Plus Jakarta Sans"],"body-md":["Inter"],"title-md":["Plus Jakarta Sans"],"code-telemetry":["Inter"]},fontSize:{"headline-md":["28px",{"lineHeight":"36px","letterSpacing":"-0.02em","fontWeight":"600"}],"body-lg":["18px",{"lineHeight":"28px","letterSpacing":"-0.01em","fontWeight":"400"}],"headline-sm":["20px",{"lineHeight":"28px","letterSpacing":"-0.015em","fontWeight":"500"}],"body-sm":["12px",{"lineHeight":"18px","letterSpacing":"0em","fontWeight":"400"}],"label-md":["13px",{"lineHeight":"18px","letterSpacing":"0.02em","fontWeight":"500"}],"display-hero-mobile":["36px",{"lineHeight":"44px","letterSpacing":"-0.025em","fontWeight":"700"}],"display-hero":["56px",{"lineHeight":"64px","letterSpacing":"-0.03em","fontWeight":"700"}],"label-sm":["11px",{"lineHeight":"16px","letterSpacing":"0.08em","fontWeight":"600"}],"headline-lg":["40px",{"lineHeight":"48px","letterSpacing":"-0.025em","fontWeight":"600"}],"headline-lg-mobile":["28px",{"lineHeight":"36px","letterSpacing":"-0.02em","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"22px","letterSpacing":"-0.005em","fontWeight":"400"}],"title-md":["16px",{"lineHeight":"24px","letterSpacing":"-0.01em","fontWeight":"600"}],"code-telemetry":["11px",{"lineHeight":"16px","letterSpacing":"0.04em","fontWeight":"500"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container relative min-h-screen"><div class="pointer-events-none fixed inset-0 z-0 overflow-hidden"><div class="absolute -top-[25%] left-1/4 h-[550px] w-[550px] rounded-full bg-primary/10 blur-[130px]"></div><div class="absolute top-[40%] -right-[15%] h-[600px] w-[600px] rounded-full bg-secondary/10 blur-[140px]"></div><div class="absolute bottom-[10%] left-[5%] h-[450px] w-[450px] rounded-full bg-tertiary/5 blur-[120px]"></div></div><header class="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/30"><div class="h-20 w-full px-margin flex items-center justify-between gap-space-lg"><div class="flex items-center gap-space-lg"><a class="flex items-center gap-space-sm group" data-path="neural-catalog" href="#"><img alt="AURA AI Commerce Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W51vPXmj8nWd7CEHIFpWXzsEW31frHn7mCLJuQQ5Uz4C-mSxVUdwch-ttYBRCVbCvWKgJscQ46iPQjuazQqeytqZic_-9ddQg5B1z608P1IJUqDo2sv9AR4vBtbXK1YgHvcGSpnck_Ko9oVeNTPQv92_ZOiAmHVptHxE96iqU1o4Hkrf8rUS11jzE4WQXwqrDi4qbjRQavuAzsuIF56Wo07vCWy3VloIxJo-t6373Gcw23sbRDtGKApF-w"/><div class="flex flex-col"><span class="font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface">AURA</span><span class="font-code-telemetry text-code-telemetry text-secondary tracking-widest uppercase -mt-1">Autonomous Commerce</span></div></a><div class="hidden xl:flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container/60 border border-outline-variant/40"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span></span><span class="font-code-telemetry text-code-telemetry text-on-surface-variant">Engine Online <span class="text-secondary font-semibold">99.98% Synapse</span></span></div></div><nav class="hidden lg:flex items-center gap-space-md font-label-md text-label-md" data-active-classes="bg-surface-container text-primary font-semibold rounded-lg"><a class="px-space-sm py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" data-path="ecosystem" href="#">Ecosystem</a><a class="px-space-sm py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" data-path="autonomous-agents" href="#">Autonomous Agents</a><a class="px-space-sm py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" data-path="neural-catalog" href="#">Neural Catalog</a><a class="px-space-sm py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" data-path="enterprise-vault" href="#">Enterprise Vault</a><a aria-current="page" class="px-space-sm py-2 transition-colors bg-surface-container text-primary font-semibold rounded-lg" data-path="showcase" href="#">Showcase</a></nav><div class="flex items-center gap-space-md"><div class="hidden md:flex items-center relative w-64 xl:w-72"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span class="material-symbols-outlined text-outline text-[18px]">search</span></div><input class="w-full pl-9 pr-4 py-2 bg-surface-container-low/70 border border-outline-variant/40 rounded-full font-code-telemetry text-code-telemetry text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]" placeholder="Ask Aura AI anything... [⌘K]" type="text"/></div><div class="hidden sm:flex items-center gap-1 px-space-sm py-1.5 rounded-full bg-surface-container border border-outline-variant/30"><span class="font-code-telemetry text-code-telemetry text-on-surface-variant">USD / NeuroPay</span></div><button aria-label="Theme Switch" class="w-9 h-9 rounded-full bg-surface-container border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span class="material-symbols-outlined text-[18px]">dark_mode</span></button><a class="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/50 text-on-surface hover:border-secondary transition-colors group" data-path="cart" href="#"><span class="material-symbols-outlined text-[18px] text-secondary group-hover:scale-110 transition-transform">shopping_bag</span><span class="font-label-sm text-label-sm font-semibold bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded-full">3</span></a><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="relative z-10 w-full pt-20 bg-background"><div class="flex flex-col w-full text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
<!-- HERO SECTION -->
<section class="relative w-full overflow-hidden pb-space-2xl pt-space-xl">
<!-- Ambient 3D Interactive Canvas -->
<!-- STITCH_THREEJS_START:ANIMATION_2 class="absolute inset-0 w-full h-[640px] pointer-events-none opacity-85" -->
<div class="absolute inset-0 w-full h-[640px] pointer-events-none opacity-85" style="display:block;">
<script src="https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"></script>
<div id="threejs-container-ANIMATION_2" style="width:100%;height:100%"></div>
<script>
(function() {
  const container = document.getElementById('threejs-container-ANIMATION_2');
  const devicePixelRatio = window.devicePixelRatio || 1;
  const scene = new THREE.Scene();
const width = container.clientWidth || window.innerWidth;
const height = container.clientHeight || window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
camera.position.z = 24;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Create futuristic floating neural nodes & wireframe cyber orb
const group = new THREE.Group();
scene.add(group);

// Core glowing cage
const geomSphere = new THREE.IcosahedronGeometry(7, 2);
const matWire = new THREE.MeshBasicMaterial({
  color: 0x8b5cf6,
  wireframe: true,
  transparent: true,
  opacity: 0.35
});
const sphereMesh = new THREE.Mesh(geomSphere, matWire);
group.add(sphereMesh);

// Inner core lattice
const geomInner = new THREE.OctahedronGeometry(4.5, 1);
const matInner = new THREE.MeshPhongMaterial({
  color: 0x06b6d4,
  wireframe: true,
  transparent: true,
  opacity: 0.65
});
const innerMesh = new THREE.Mesh(geomInner, matInner);
group.add(innerMesh);

// Glowing orbital particle cloud
const particleCount = 280;
const particleGeom = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const scales = new Float32Array(particleCount);

for(let i = 0; i < particleCount; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(Math.random() * 2 - 1);
  const r = 8 + Math.random() * 6;
  positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i * 3 + 2] = r * Math.cos(phi);
  scales[i] = Math.random() * 2 + 1;
}
particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMat = new THREE.PointsMaterial({
  color: 0xec4899,
  size: 0.3,
  transparent: true,
  opacity: 0.85
});
const points = new THREE.Points(particleGeom, particleMat);
group.add(points);

// Subtle ambient & directional lights
const light = new THREE.DirectionalLight(0x06b6d4, 1.5);
light.position.set(10, 15, 20);
scene.add(light);
const purpleLight = new THREE.PointLight(0x8b5cf6, 2, 40);
purpleLight.position.set(-10, -10, 15);
scene.add(purpleLight);

let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  mouseX = (e.clientX - windowHalfX) * 0.0008;
  mouseY = (e.clientY - windowHalfY) * 0.0008;
});

function handleResize() {
  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', handleResize);

let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();
  
  group.rotation.y += 0.004 + (mouseX - group.rotation.y) * 0.05;
  group.rotation.x += 0.002 + (mouseY - group.rotation.x) * 0.05;
  
  sphereMesh.rotation.y = time * 0.15;
  innerMesh.rotation.x = -time * 0.25;
  points.rotation.y = -time * 0.08;

  renderer.render(scene, camera);
}
animate();

})();
</script>
</div>
<!-- STITCH_THREEJS_END:ANIMATION_2 -->
<!-- Cyber Gradient Glow Layer -->
<div class="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary/20 via-secondary/15 to-transparent blur-3xl opacity-60"></div>
<div class="relative max-w-7xl mx-auto px-margin-mobile md:px-margin flex flex-col items-center text-center">
<!-- Live Agent Synapse Pulse Pill -->
<div class="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-xl shadow-lg mb-space-lg group transition-all duration-300 hover:bg-surface-bright/80">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
</span>
<span class="font-code-telemetry text-code-telemetry text-secondary tracking-wider uppercase font-semibold">Autonomous Core 4.5 Active</span>
<span class="text-outline text-xs px-1">•</span>
<span class="font-code-telemetry text-code-telemetry text-on-surface-variant">Escrow Protocol Verified</span>
</div>
<!-- Main Headline -->
<h1 class="font-display-hero text-headline-lg md:text-display-hero max-w-4xl text-on-surface font-extrabold tracking-tight leading-none mb-space-md">
        COMMERCE RUN BY <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">INTELLIGENCE</span>.
      </h1>
<!-- Subheadline -->
<p class="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-space-xl">
        Experience the world's first autonomous commerce ecosystem. Neural shopping agents that negotiate, curate, and predict your lifestyle demands before you think of them.
      </p>
<!-- CTAs -->
<div class="flex flex-col sm:flex-row items-center gap-space-md w-full justify-center max-w-md mb-space-xl">
<button class="relative group w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-primary-container via-primary to-inverse-primary text-on-primary font-label-md text-label-md font-bold shadow-xl shadow-primary-container/30 hover:shadow-primary-container/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden" id="deployAgentBtn">
<span class="relative z-10 flex items-center gap-2">
<span class="material-symbols-outlined text-[20px]">smart_toy</span>
            Deploy Personal Agent
          </span>
<div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
</button>
<a class="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-surface-container/70 backdrop-blur-xl hover:bg-surface-bright/80 text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]" href="#neuralCatalog">
<span class="material-symbols-outlined text-secondary text-[20px]">hub</span>
          Explore Neural Catalog
        </a>
</div>
<!-- Quick Prompt Pills -->
<div class="flex flex-wrap items-center justify-center gap-2 max-w-3xl mb-space-2xl">
<span class="font-code-telemetry text-code-telemetry text-outline uppercase tracking-wider mr-1">Quick Intent:</span>
<button class="px-3 py-1.5 rounded-full bg-surface-container-low/70 hover:bg-surface-container-highest text-on-surface-variant hover:text-secondary font-code-telemetry text-code-telemetry transition-all duration-200 backdrop-blur-md flex items-center gap-1.5 shadow-sm" onclick="simulatePrompt('Find me noise-cancelling neural gear under $600')">
<span class="material-symbols-outlined text-[14px] text-secondary">tune</span>
          “Neural audio gear &lt;$600”
        </button>
<button class="px-3 py-1.5 rounded-full bg-surface-container-low/70 hover:bg-surface-container-highest text-on-surface-variant hover:text-primary font-code-telemetry text-code-telemetry transition-all duration-200 backdrop-blur-md flex items-center gap-1.5 shadow-sm" onclick="simulatePrompt('Negotiate bundle price for Chrono S1 with titanium band')">
<span class="material-symbols-outlined text-[14px] text-primary">currency_exchange</span>
          “Negotiate Chrono S1 bundle”
        </button>
<button class="px-3 py-1.5 rounded-full bg-surface-container-low/70 hover:bg-surface-container-highest text-on-surface-variant hover:text-tertiary font-code-telemetry text-code-telemetry transition-all duration-200 backdrop-blur-md flex items-center gap-1.5 shadow-sm" onclick="simulatePrompt('Compare spatial cortical audio latency against industry benchmarks')">
<span class="material-symbols-outlined text-[14px] text-tertiary">analytics</span>
          “Compare spatial audio specs”
        </button>
</div>
<!-- Live Micro-Stats Ticker Trough -->
<div class="w-full max-w-5xl rounded-xl bg-surface-container/60 backdrop-blur-2xl p-space-md shadow-2xl">
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-md divide-y md:divide-y-0 md:divide-x divide-outline-variant/30 text-center">
<div class="flex flex-col items-center py-2 md:py-0 px-space-md">
<div class="flex items-baseline gap-1">
<span class="font-headline-md text-headline-md font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary" id="savedTicker">$4,289,140</span>
<span class="font-code-telemetry text-code-telemetry text-secondary font-semibold">USD</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Real-Time Autonomous Agent Savings</span>
</div>
<div class="flex flex-col items-center py-2 md:py-0 px-space-md">
<div class="flex items-baseline gap-1">
<span class="font-headline-md text-headline-md font-bold text-on-surface">11.8</span>
<span class="font-code-telemetry text-code-telemetry text-primary font-semibold">MS</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Mean Neural Decision Latency</span>
</div>
<div class="flex flex-col items-center py-2 md:py-0 px-space-md">
<div class="flex items-baseline gap-1">
<span class="font-headline-md text-headline-md font-bold text-tertiary">99.42%</span>
<span class="material-symbols-outlined text-tertiary text-[18px]">verified</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Predictive Sensory Preference Accuracy</span>
</div>
</div>
</div>
</div>
</section>
<!-- LIVE AGENTIC AI SHOPPING COPILOT (Interactive Centerpiece) -->
<section class="w-full py-space-xl px-margin-mobile md:px-margin max-w-6xl mx-auto -mt-6">
<div class="relative rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl shadow-2xl p-space-lg md:p-space-xl overflow-hidden">
<!-- Ambient Refraction Highlight -->
<div class="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
<div class="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none"></div>
<!-- Agent Terminal Header -->
<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm pb-space-md border-b border-outline-variant/30">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary-container to-primary flex items-center justify-center text-on-primary-container shadow-md">
<span class="material-symbols-outlined text-[24px]">cognition</span>
</div>
<div>
<div class="flex items-center gap-2">
<h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">Agent Aura-7</h2>
<span class="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-code-telemetry text-code-telemetry font-bold">SYNAPSE ACTIVE</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Autonomous Procurement Daemon • Private Vault Session #8942-AZ</p>
</div>
</div>
<!-- Status Pill -->
<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-highest/60 backdrop-blur-md">
<span class="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
<span class="font-code-telemetry text-code-telemetry text-tertiary font-medium">Autonomous Discount Applied: -18%</span>
</div>
</div>
<!-- Dialogue Simulation Area -->
<div class="py-space-md space-y-3">
<!-- Agent Response Message Bubble -->
<div class="flex items-start gap-3 max-w-3xl">
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary shrink-0 mt-1 shadow-sm">
<span class="material-symbols-outlined text-[16px]">psychology</span>
</div>
<div class="p-3.5 rounded-xl rounded-tl-none bg-surface-container/90 backdrop-blur-md shadow-md">
<p class="font-body-md text-body-md text-on-surface leading-snug" id="agentMessage">
              Analyzing your acoustic environment &amp; biometric telemetry... Found <span class="text-secondary font-semibold">1 perfect match</span> with <strong class="text-tertiary">98.7% sensory harmony</strong>: The <strong class="text-on-surface">AURA Synapse One</strong>. Hedged manufacturer liquidation index to reduce cost by $100.
            </p>
<!-- Audio Waveform Visualization -->
<div class="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-outline-variant/20">
<span class="font-code-telemetry text-code-telemetry text-outline">NEURAL HARMONIC</span>
<div class="flex items-center gap-0.5 h-4 px-2">
<span class="w-1 bg-secondary rounded-full h-3 animate-pulse"></span>
<span class="w-1 bg-primary rounded-full h-4 animate-bounce"></span>
<span class="w-1 bg-secondary-fixed rounded-full h-2 animate-pulse"></span>
<span class="w-1 bg-secondary rounded-full h-3.5 animate-bounce"></span>
<span class="w-1 bg-tertiary rounded-full h-2 animate-pulse"></span>
<span class="w-1 bg-secondary rounded-full h-4 animate-bounce"></span>
<span class="w-1 bg-primary rounded-full h-1.5 animate-pulse"></span>
</div>
<span class="font-code-telemetry text-code-telemetry text-secondary ml-auto">MATCH CONFIRMED: 99.8%</span>
</div>
</div>
</div>
</div>
<!-- Interactive Prompt Input Simulator -->
<div class="relative mt-space-sm">
<div class="flex items-center rounded-xl bg-surface-container-lowest/90 backdrop-blur-xl p-1.5 shadow-inner">
<div class="pl-3 pr-2 text-secondary flex items-center">
<span class="material-symbols-outlined text-[20px]">terminal</span>
</div>
<input class="w-full bg-transparent font-code-telemetry text-code-telemetry text-on-surface placeholder:text-outline focus:outline-none py-2 px-1" id="copilotInput" placeholder="Command Aura-7 (e.g. 'Synthesize optimal daily kit under $1,800')..." type="text" value="Negotiate bundle price for Chrono S1"/>
<button class="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-md shrink-0" id="sendPromptBtn">
<span>Execute</span>
<span class="material-symbols-outlined text-[16px]">bolt</span>
</button>
</div>
</div>
</div>
</section>
<!-- INTELLIGENT NEURAL PRODUCT SEARCH & FILTER MATRIX -->
<section class="w-full py-space-xl max-w-7xl mx-auto px-margin-mobile md:px-margin" id="neuralCatalog">
<div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md mb-space-lg">
<div>
<div class="flex items-center gap-2 mb-1">
<span class="font-code-telemetry text-code-telemetry text-secondary uppercase tracking-widest font-semibold">Autonomous Inventory</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-[10px] font-code-telemetry text-outline">SEC-ESCROW</span>
</div>
<h2 class="font-headline-lg text-headline-md md:text-headline-lg font-bold text-on-surface">Neural Hardware Matrix</h2>
</div>
<!-- Sorting Selector -->
<div class="flex items-center gap-space-sm bg-surface-container-low/70 backdrop-blur-xl p-1 rounded-lg">
<span class="font-code-telemetry text-code-telemetry text-on-surface-variant pl-3">Vector Sort:</span>
<button class="px-3 py-1.5 rounded-md bg-surface-container-high text-secondary font-label-md text-label-md font-medium shadow-sm">AI Affinity</button>
<button class="px-3 py-1.5 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium transition-colors">Quantum Vol.</button>
<button class="px-3 py-1.5 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium transition-colors">Predictive Rank</button>
</div>
</div>
<!-- Category Filter Tabs -->
<div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-space-xl">
<button class="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold whitespace-nowrap shadow-md">All Synapses (14)</button>
<button class="px-4 py-2 rounded-full bg-surface-container/70 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium whitespace-nowrap backdrop-blur-md transition-colors">Neural Audio (4)</button>
<button class="px-4 py-2 rounded-full bg-surface-container/70 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium whitespace-nowrap backdrop-blur-md transition-colors">Holographic Wearables (3)</button>
<button class="px-4 py-2 rounded-full bg-surface-container/70 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium whitespace-nowrap backdrop-blur-md transition-colors">Autonomous Couriers (2)</button>
<button class="px-4 py-2 rounded-full bg-surface-container/70 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium whitespace-nowrap backdrop-blur-md transition-colors">Biometric Escrow (5)</button>
</div>
<!-- FEATURED FLAGSHIP PRODUCTS GRID -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-2xl">
<!-- PRODUCT 1: AURA Synapse One ANC Headset -->
<div class="group relative rounded-2xl bg-surface-container/60 hover:bg-surface-container-high/80 backdrop-blur-xl transition-all duration-300 p-space-md md:p-space-lg flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-secondary/10">
<!-- Ambient hover light -->
<div class="absolute -top-20 -right-20 w-52 h-52 bg-secondary/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
<div>
<!-- Badges & Affinity -->
<div class="flex items-center justify-between gap-2 mb-space-md">
<div class="flex flex-wrap gap-1.5">
<span class="px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-code-telemetry text-code-telemetry font-bold flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                Quantum Audio
              </span>
<span class="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-code-telemetry text-code-telemetry font-semibold">
                Low Stock (4 units)
              </span>
</div>
<span class="px-2.5 py-1 rounded-full bg-surface-container-highest text-tertiary font-code-telemetry text-code-telemetry font-bold">
              99.8% Match
            </span>
</div>
<!-- Product Image -->
<div class="relative w-full h-72 md:h-80 rounded-xl overflow-hidden bg-surface-container-lowest flex items-center justify-center mb-space-md group-hover:scale-[1.01] transition-transform duration-500">
<img alt="AURA Synapse One Neural ANC Headset" class="w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIWy_ZgmrSboMioKWPk7GOVLIv-HoKTWXJ2B7CMX-InpcX1LkET7q82gTMWfNhvFBniSMOd7Ijj-l1mE_kHPD-tLKA7humH7h_4ciWJi5IOT3sibheJrXQSVcjEOipG9y4geOvjIdlhondq7T_zOPfGL-P6jr1l9-MsHtw7BDUgFaHs9MowFbksdnqDfQbdqAROpGglNLuS2sW_at6xAks3WHAhyU8f0nYdHXw9n4tdnaEYvU4m8uRMw"/>
<div class="absolute bottom-3 left-3 px-2 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md font-code-telemetry text-[10px] text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[12px] text-secondary">graphic_eq</span> 0.1ms Cortical Direct
            </div>
</div>
<!-- Product Titles & Description -->
<h3 class="font-headline-sm text-headline-sm font-bold text-on-surface mb-1 group-hover:text-secondary transition-colors">
            AURA Synapse One — Neural ANC Headset
          </h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
            Direct cortical brainwave sync, 180-hour graphene capacitor battery, and hand-finished liquid titanium frame with real-time neural attenuation.
          </p>
<!-- Micro Spec Badges -->
<div class="grid grid-cols-3 gap-2 mb-space-md">
<div class="p-2 rounded-lg bg-surface-container-low text-center">
<span class="block font-code-telemetry text-code-telemetry text-outline">INTERFACE</span>
<span class="font-label-md text-label-md font-semibold text-on-surface">Neural EEG</span>
</div>
<div class="p-2 rounded-lg bg-surface-container-low text-center">
<span class="block font-code-telemetry text-code-telemetry text-outline">PLAYTIME</span>
<span class="font-label-md text-label-md font-semibold text-on-surface">180 Hours</span>
</div>
<div class="p-2 rounded-lg bg-surface-container-low text-center">
<span class="block font-code-telemetry text-code-telemetry text-outline">WEIGHT</span>
<span class="font-label-md text-label-md font-semibold text-on-surface">198 Grams</span>
</div>
</div>
</div>
<!-- Pricing & Action Bar -->
<div class="pt-space-md border-t border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
<div>
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-extrabold text-on-surface">$549 <span class="text-xs font-normal text-outline">USD</span></span>
<span class="font-body-sm text-body-sm text-outline line-through">$649</span>
</div>
<span class="font-code-telemetry text-code-telemetry text-secondary font-semibold">Agent Negotiated -15% Savings</span>
</div>
<div class="flex items-center gap-2 w-full sm:w-auto">
<button class="px-3.5 py-2.5 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-md text-label-md font-medium transition-colors flex items-center gap-1.5" title="Simulate AR Fit">
<span class="material-symbols-outlined text-[18px]">view_in_ar</span>
<span class="hidden lg:inline">AR Fit</span>
</button>
<button class="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-secondary/20">
<span class="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
<span>Quick Buy</span>
</button>
</div>
</div>
</div>
<!-- PRODUCT 2: Aethel S1 Holographic Chronometer -->
<div class="group relative rounded-2xl bg-surface-container/60 hover:bg-surface-container-high/80 backdrop-blur-xl transition-all duration-300 p-space-md md:p-space-lg flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/10">
<!-- Ambient hover light -->
<div class="absolute -top-20 -right-20 w-52 h-52 bg-primary/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
<div>
<!-- Badges & Affinity -->
<div class="flex items-center justify-between gap-2 mb-space-md">
<div class="flex flex-wrap gap-1.5">
<span class="px-2.5 py-1 rounded-full bg-primary/15 text-primary font-code-telemetry text-code-telemetry font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-[12px]">auto_awesome</span>
                Photonic Display
              </span>
<span class="px-2.5 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-code-telemetry text-code-telemetry font-semibold">
                Bestseller
              </span>
</div>
<span class="px-2.5 py-1 rounded-full bg-surface-container-highest text-primary font-code-telemetry text-code-telemetry font-bold">
              99.2% Affinity
            </span>
</div>
<!-- Product Image -->
<div class="relative w-full h-72 md:h-80 rounded-xl overflow-hidden bg-surface-container-lowest flex items-center justify-center mb-space-md group-hover:scale-[1.01] transition-transform duration-500">
<img alt="Aethel S1 Holographic Chronometer with holographic HUD projected from watch face" class="w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoZnUcRaVXud8VcYm11CxBFRqJX6dogsHGmDwaplTYiaDzctVoPT3K9oH3eYD_MyXdYUniKHYXMuHPVgVeeIvJvrG_D0h6kXI3xazD9NdMSHfBxiVyZ4xbxk23qn_EEeVmY2djEwgx7A0HEl9p0pmCz1FyC-TzYKm5dYqJ_ZvMehPuNztopIkTR7kXn8qKWwczBGfeJetabGAs9R88lZC-aV6XhJ9qyYJ8Niis7QjIBApYO1Dvk2auZw"/>
<div class="absolute bottom-3 left-3 px-2 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md font-code-telemetry text-[10px] text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[12px] text-primary">key</span> ZK Private Key Vault
            </div>
</div>
<!-- Product Titles & Description -->
<h3 class="font-headline-sm text-headline-sm font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
            Aethel S1 Holographic Chronometer
          </h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
            Floating volumetric photonic dials, micro-LED tachymeter, Swiss precision escapement, and hardware-encrypted private key cold vault.
          </p>
<!-- Micro Spec Badges -->
<div class="grid grid-cols-3 gap-2 mb-space-md">
<div class="p-2 rounded-lg bg-surface-container-low text-center">
<span class="block font-code-telemetry text-code-telemetry text-outline">CRYSTAL</span>
<span class="font-label-md text-label-md font-semibold text-on-surface">Sapphire Monolith</span>
</div>
<div class="p-2 rounded-lg bg-surface-container-low text-center">
<span class="block font-code-telemetry text-code-telemetry text-outline">HOLOGRAPHY</span>
<span class="font-label-md text-label-md font-semibold text-on-surface">4K Volumetric</span>
</div>
<div class="p-2 rounded-lg bg-surface-container-low text-center">
<span class="block font-code-telemetry text-code-telemetry text-outline">SECURITY</span>
<span class="font-label-md text-label-md font-semibold text-on-surface">EAL6+ Secure Chip</span>
</div>
</div>
</div>
<!-- Pricing & Action Bar -->
<div class="pt-space-md border-t border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
<div>
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-extrabold text-on-surface">$1,280 <span class="text-xs font-normal text-outline">USD</span></span>
<span class="font-body-sm text-body-sm text-outline">Escrow Ready</span>
</div>
<span class="font-code-telemetry text-code-telemetry text-primary font-semibold">Autonomous Hedging Tier 1</span>
</div>
<div class="flex items-center gap-2 w-full sm:w-auto">
<button class="px-3.5 py-2.5 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-md text-label-md font-medium transition-colors flex items-center gap-1.5" title="Summon Full Spec Sheet">
<span class="material-symbols-outlined text-[18px]">description</span>
<span class="hidden lg:inline">Specs</span>
</button>
<button class="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20">
<span class="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
<span>Quick Buy</span>
</button>
</div>
</div>
</div>
</div>
<!-- SECONDARY PRODUCT TEASERS / CARDS -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
<!-- Product 3: Vortex K-9 Autonomous Courier Drone -->
<div class="rounded-xl bg-surface-container/40 backdrop-blur-xl p-space-md flex flex-col sm:flex-row items-center gap-space-md shadow-lg group hover:bg-surface-container/60 transition-colors">
<div class="w-full sm:w-36 h-36 rounded-lg bg-surface-container-lowest shrink-0 overflow-hidden relative flex items-center justify-center">
<img class="w-full h-full object-cover" data-alt="High tech minimalist autonomous black stealth drone with carbon fiber rotor guards and luminous cyan navigation light ring hovering on a clean dark slate surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0035Z7B67_ktuFSqqVE3LVadJpK257G6CBTdHsEYeHN5YD1tf8dJHzMsI6AvH2ym21WjWZJaGfAzZO466mn9a2xA-KWHckCm3-hjlKNSi-BCWIC6e8icoX9Mzb6MFeNSGRHgMepMKCCYptuDtfYOaHmiDb_XJ1RaHgkR59NXcF23Oil-93_wbC6TefaHeItB8NviYZvlP29sTEzWhnOYEYFzkDjh_Wdjj1uyagY7f32C7MhquYmeATw"/>
<span class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-surface-container-lowest/80 text-[10px] font-code-telemetry text-secondary">AIR-MESH</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-center justify-between mb-1">
<h4 class="font-title-md text-title-md font-bold text-on-surface truncate">Vortex K-9 Autonomous Courier</h4>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">$2,400</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-2">
            AI-piloted micro delivery vector with LiDAR obstacle mapping and tamper-evident magnetic cryogenic storage container.
          </p>
<div class="flex items-center justify-between">
<span class="font-code-telemetry text-code-telemetry text-tertiary">Pre-Order: Batch #03</span>
<button class="px-3 py-1.5 rounded-md bg-surface-container-high hover:bg-primary hover:text-on-primary font-label-sm text-label-sm font-semibold transition-all">
              Reserve Unit
            </button>
</div>
</div>
</div>
<!-- Product 4: NeuroPlex Biometric Ring Gen 4 -->
<div class="rounded-xl bg-surface-container/40 backdrop-blur-xl p-space-md flex flex-col sm:flex-row items-center gap-space-md shadow-lg group hover:bg-surface-container/60 transition-colors">
<div class="w-full sm:w-36 h-36 rounded-lg bg-surface-container-lowest shrink-0 overflow-hidden relative flex items-center justify-center">
<img class="w-full h-full object-cover" data-alt="Ultra luxury smart titanium biometric smart ring with an ethereal violet internal light slit resting on polished obsidian mirror stand with dramatic studio rim light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnelPZq1FGYmkfRQrG41m0_sFN5JIPIxb7CdO2G5KqEXCftpORgyMMsN7T_pzzvoaX3qjxxp_LSo7BzR93z5MsHpoIZGZ_Nbz-wYvpGTd-1wXZ_JZ-qOs5BdFmLZPVD1rbxBeGxbo6hmrRfLzVF2wuoqtk-FjSNCmWjixIxTIeXgk-NuWd0L2MSNWO5kXNVTZrF32dMVnqsBuakknzA0ytKDbXPyo2znRHyaq7K5NvDPD1t9XkDNtfXA"/>
<span class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-surface-container-lowest/80 text-[10px] font-code-telemetry text-primary">NFC BIO</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-center justify-between mb-1">
<h4 class="font-title-md text-title-md font-bold text-on-surface truncate">NeuroPlex Biometric Ring Gen 4</h4>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">$390</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-2">
            Continuous glucose &amp; cortisol monitoring with zero-latency decentralized key release for autonomous transactions.
          </p>
<div class="flex items-center justify-between">
<span class="font-code-telemetry text-code-telemetry text-secondary">Immediate Dispatch</span>
<button class="px-3 py-1.5 rounded-md bg-surface-container-high hover:bg-secondary hover:text-on-secondary font-label-sm text-label-sm font-semibold transition-all">
              Claim Allocation
            </button>
</div>
</div>
</div>
</div>
</section>
<!-- PREDICTIVE AI RECOMMENDATIONS & DYNAMIC DEALS -->
<section class="w-full py-space-2xl bg-surface-container-lowest/40 backdrop-blur-md">
<div class="max-w-7xl mx-auto px-margin-mobile md:px-margin">
<!-- Section Header with Countdown -->
<div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md pb-space-lg border-b border-outline-variant/30 mb-space-xl">
<div>
<span class="font-code-telemetry text-code-telemetry text-tertiary uppercase tracking-widest font-semibold flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-tertiary">timer</span>
            Autonomous Flash Syndicate
          </span>
<h2 class="font-headline-lg text-headline-md md:text-headline-lg font-bold text-on-surface">Curated For Your Neural Vector</h2>
</div>
<div class="flex items-center gap-2 bg-surface-container-low/80 backdrop-blur-xl px-4 py-2 rounded-xl shadow-inner">
<span class="font-code-telemetry text-code-telemetry text-outline">Negotiation closes in:</span>
<span class="font-code-telemetry text-body-md font-bold text-secondary tracking-widest" id="countdownTimer">04h : 18m : 32s</span>
</div>
</div>
<!-- Comparison Matrix with Interactive Radar Telemetry -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
<!-- Radar / Telemetry Metric Panel (SVG Chart) -->
<div class="lg:col-span-5 rounded-2xl bg-surface-container/70 backdrop-blur-2xl p-space-lg shadow-xl flex flex-col justify-between">
<div class="flex items-center justify-between mb-space-md">
<div>
<span class="font-code-telemetry text-code-telemetry text-secondary">METRIC PROVENANCE</span>
<h3 class="font-title-md text-title-md font-bold text-on-surface">Hardware Affinity Topology</h3>
</div>
<span class="px-2 py-1 rounded bg-secondary/10 text-secondary font-code-telemetry text-[11px] font-bold">LIVE TELEMETRY</span>
</div>
<!-- Inline Lightweight Vector Radar Chart -->
<div class="relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center my-space-sm">
<svg class="w-full h-full text-outline-variant/40" fill="none" viewbox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<!-- Concentric Polygonal Guides -->
<polygon points="100,20 180,75 160,165 40,165 20,75" stroke="currentColor" stroke-width="1"></polygon>
<polygon points="100,50 150,85 138,145 62,145 50,85" stroke="currentColor" stroke-dasharray="2 2" stroke-width="0.75"></polygon>
<polygon points="100,75 125,95 119,125 81,125 75,95" stroke="currentColor" stroke-width="0.5"></polygon>
<!-- Radar Axes -->
<line stroke="currentColor" stroke-width="0.5" x1="100" x2="100" y1="20" y2="180"></line>
<line stroke="currentColor" stroke-width="0.5" x1="20" x2="180" y1="75" y2="75"></line>
<line stroke="currentColor" stroke-width="0.5" x1="40" x2="160" y1="165" y2="75"></line>
<!-- Data Polygon (AURA Synapse One Profile) -->
<polygon class="text-secondary/30 fill-current" points="100,28 172,78 152,158 55,145 32,82"></polygon>
<polygon points="100,28 172,78 152,158 55,145 32,82" stroke="#4cd7f6" stroke-width="2"></polygon>
<!-- Data Nodes -->
<circle class="fill-secondary" cx="100" cy="28" r="3.5"></circle>
<circle class="fill-secondary" cx="172" cy="78" r="3.5"></circle>
<circle class="fill-secondary" cx="152" cy="158" r="3.5"></circle>
<circle class="fill-secondary" cx="55" cy="145" r="3.5"></circle>
<circle class="fill-secondary" cx="32" cy="82" r="3.5"></circle>
</svg>
<span class="absolute top-1 font-code-telemetry text-[10px] text-on-surface-variant">Acoustic Fidelity (98%)</span>
<span class="absolute right-0 top-1/3 font-code-telemetry text-[10px] text-on-surface-variant">Autonomy (96%)</span>
<span class="absolute bottom-2 right-4 font-code-telemetry text-[10px] text-on-surface-variant">Security (99%)</span>
<span class="absolute bottom-2 left-4 font-code-telemetry text-[10px] text-on-surface-variant">Ergonomics (92%)</span>
<span class="absolute left-0 top-1/3 font-code-telemetry text-[10px] text-on-surface-variant">Cognitive Sync (99.8%)</span>
</div>
<!-- Dynamic Legend -->
<div class="grid grid-cols-2 gap-2 pt-space-sm border-t border-outline-variant/30 font-code-telemetry text-code-telemetry">
<div class="flex items-center gap-1.5 text-on-surface">
<span class="w-2.5 h-2.5 rounded-sm bg-secondary"></span>
<span>AURA Synapse</span>
</div>
<div class="flex items-center gap-1.5 text-outline">
<span class="w-2.5 h-2.5 rounded-sm bg-outline-variant"></span>
<span>Legacy Flagship</span>
</div>
</div>
</div>
<!-- Dynamic Recommendation Details -->
<div class="lg:col-span-7 space-y-space-md">
<div class="rounded-xl bg-surface-container/60 backdrop-blur-xl p-space-md shadow-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<div class="w-16 h-16 rounded-xl bg-surface-container-lowest flex items-center justify-center text-secondary shrink-0 shadow-md">
<span class="material-symbols-outlined text-[32px]">hearing</span>
</div>
<div>
<span class="font-code-telemetry text-code-telemetry text-secondary font-semibold">RECOMMENDATION #1</span>
<h4 class="font-title-md text-title-md font-bold text-on-surface">Algorithmic Match: Synapse ANC Headset</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Autonomous price mitigation negotiated down $100 based on your current cart volume.</p>
</div>
</div>
<div class="flex items-center gap-3 shrink-0">
<span class="font-headline-sm text-headline-sm font-bold text-secondary">$549</span>
<button class="px-4 py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-secondary-container hover:text-on-secondary-container transition-colors">
                Apply Deal
              </button>
</div>
</div>
<div class="rounded-xl bg-surface-container/60 backdrop-blur-xl p-space-md shadow-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<div class="w-16 h-16 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-md">
<span class="material-symbols-outlined text-[32px]">watch</span>
</div>
<div>
<span class="font-code-telemetry text-code-telemetry text-primary font-semibold">RECOMMENDATION #2</span>
<h4 class="font-title-md text-title-md font-bold text-on-surface">Chronometer Synthetic Escrow Bundle</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Paired with Ring Gen 4 unlocks automatic zero-knowledge biometric payments globally.</p>
</div>
</div>
<div class="flex items-center gap-3 shrink-0">
<span class="font-headline-sm text-headline-sm font-bold text-primary">$1,570</span>
<button class="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors">
                Bundle
              </button>
</div>
</div>
<div class="rounded-xl bg-surface-container/60 backdrop-blur-xl p-space-md shadow-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<div class="w-16 h-16 rounded-xl bg-surface-container-lowest flex items-center justify-center text-tertiary shrink-0 shadow-md">
<span class="material-symbols-outlined text-[32px]">bolt</span>
</div>
<div>
<span class="font-code-telemetry text-code-telemetry text-tertiary font-semibold">PREDICTED UPGRADE CYCLE</span>
<h4 class="font-title-md text-title-md font-bold text-on-surface">Auto-Renewal &amp; Trade-In Daemon</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Locks guaranteed 82% residual value buy-back in Q4 2026 with no customer friction.</p>
</div>
</div>
<div class="flex items-center gap-3 shrink-0">
<span class="font-headline-sm text-headline-sm font-bold text-tertiary">Free</span>
<button class="px-4 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-md text-label-md font-semibold transition-colors">
                Enable
              </button>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- SOCIAL PROOF & TESTIMONIALS -->
<section class="w-full py-space-2xl max-w-7xl mx-auto px-margin-mobile md:px-margin">
<div class="text-center max-w-2xl mx-auto mb-space-xl">
<span class="font-code-telemetry text-code-telemetry text-secondary uppercase tracking-widest font-semibold">Verified Collectors &amp; Visionaries</span>
<h2 class="font-headline-lg text-headline-md md:text-headline-lg font-bold text-on-surface mt-1">Autonomous Commerce in Practice</h2>
</div>
<!-- Testimonial Bento Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-2xl">
<div class="rounded-2xl bg-surface-container/50 backdrop-blur-xl p-space-lg shadow-xl flex flex-col justify-between">
<div>
<div class="flex items-center gap-1 text-tertiary mb-space-sm">
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
            “My Aura shopping agent negotiated directly with 6 different authenticated suppliers while I was asleep, securing the Aethel S1 with titanium band for 19% under retail.”
          </p>
</div>
<div class="flex items-center gap-3 pt-space-sm border-t border-outline-variant/20">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-secondary">
            KL
          </div>
<div>
<h4 class="font-label-md text-label-md font-bold text-on-surface">Dr. Kieran Locke</h4>
<span class="font-code-telemetry text-code-telemetry text-outline">Partner, Quantum Synthesis Capital</span>
</div>
</div>
</div>
<div class="rounded-2xl bg-surface-container/50 backdrop-blur-xl p-space-lg shadow-xl flex flex-col justify-between">
<div>
<div class="flex items-center gap-1 text-secondary mb-space-sm">
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
            “The Synapse One audio fidelity surpasses electrostatic studio monitors. Having an AI agent manage micro-discounts without spam or popups feels like true 21st-century luxury.”
          </p>
</div>
<div class="flex items-center gap-3 pt-space-sm border-t border-outline-variant/20">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">
            EV
          </div>
<div>
<h4 class="font-label-md text-label-md font-bold text-on-surface">Elena Vance</h4>
<span class="font-code-telemetry text-code-telemetry text-outline">Creative Director, Studio Monolith</span>
</div>
</div>
</div>
<div class="rounded-2xl bg-surface-container/50 backdrop-blur-xl p-space-lg shadow-xl flex flex-col justify-between">
<div>
<div class="flex items-center gap-1 text-primary mb-space-sm">
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
<span class="material-symbols-outlined text-[18px]">star</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
            “Zero-knowledge checkout is the real leap. My biometric ring verified liquidity without revealing my wallet balance or personal address. Absolutely immaculate engineering.”
          </p>
</div>
<div class="flex items-center gap-3 pt-space-sm border-t border-outline-variant/20">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-tertiary">
            RH
          </div>
<div>
<h4 class="font-label-md text-label-md font-bold text-on-surface">Ryo Hashimoto</h4>
<span class="font-code-telemetry text-code-telemetry text-outline">Lead Architect, NeuralMesh Labs</span>
</div>
</div>
</div>
</div>
<!-- Trust Badges Bar -->
<div class="w-full rounded-2xl bg-surface-container-low/60 backdrop-blur-xl p-space-md flex flex-wrap items-center justify-around gap-space-md text-center">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[24px]">encrypted</span>
<span class="font-code-telemetry text-code-telemetry text-on-surface-variant font-semibold">Zero-Knowledge Escrow Proofs</span>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[24px]">wallet</span>
<span class="font-code-telemetry text-code-telemetry text-on-surface-variant font-semibold">Apple Pay &amp; Solana Quantum Pay</span>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary text-[24px]">energy_savings_leaf</span>
<span class="font-code-telemetry text-code-telemetry text-on-surface-variant font-semibold">100% Carbon-Neutral Autonomous Routing</span>
</div>
</div>
</section>
<!-- NEWSLETTER & WAITLIST CTA BANNER -->
<section class="w-full py-space-2xl px-margin-mobile md:px-margin max-w-7xl mx-auto">
<div class="relative rounded-3xl bg-gradient-to-br from-surface-container-high via-surface-container-low to-surface-container-lowest p-space-xl md:p-space-2xl overflow-hidden shadow-2xl">
<!-- Glow Refraction Orbs -->
<div class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"></div>
<div class="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
<div class="relative max-w-2xl mx-auto text-center">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary font-code-telemetry text-code-telemetry font-bold mb-space-sm">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          SYNAPSE PROTOCOL V5 INVITES OPEN
        </span>
<h2 class="font-headline-lg text-headline-md md:text-headline-lg font-bold text-on-surface mb-space-sm">
          Plug Your Life Into the Autonomous Matrix.
        </h2>
<p class="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
          Receive invite-only access to private agent arbitrage daemon releases and limited bespoke horological hardware drops.
        </p>
<form class="flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto" id="waitlistForm" onsubmit="event.preventDefault(); activateSynapse();">
<div class="relative w-full">
<input class="w-full px-4 py-3.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-xl font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary transition-all shadow-inner" id="waitlistEmail" placeholder="Enter ENS or secure transmission email..." required="" type="email"/>
</div>
<button class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-secondary to-primary hover:from-secondary-container hover:to-primary-container text-on-secondary font-label-md text-label-md font-bold transition-all duration-200 shadow-lg shadow-secondary/20 shrink-0 flex items-center justify-center gap-2" type="submit">
<span>Activate Synapse</span>
<span class="material-symbols-outlined text-[18px]">east</span>
</button>
</form>
<span class="hidden mt-3 font-code-telemetry text-code-telemetry text-secondary" id="waitlistConfirmation">
          Transmitted to Aura-7 Core. Priority slot #1,042 reserved.
        </span>
</div>
</div>
</section>
</div>
<script>
  // Dynamic Simulation Interactions
  function simulatePrompt(promptText) {
    const input = document.getElementById('copilotInput');
    const msg = document.getElementById('agentMessage');
    if (input && msg) {
      input.value = promptText;
      msg.innerHTML = '<span class="text-secondary animate-pulse">Consulting sovereign neural mesh...</span>';
      setTimeout(() => {
        if (promptText.includes('noise-cancelling')) {
          msg.innerHTML = 'Filtered 32 models. <strong class="text-secondary">AURA Synapse One</strong> is the single candidate with cortical dampening under $600. Direct coupon applied: <strong class="text-tertiary">-$100 USD</strong>.';
        } else if (promptText.includes('Chrono S1')) {
          msg.innerHTML = 'Synthesized bundle terms: Aethel S1 + Titanium link strap bundled at <strong class="text-primary">$1,390 USD</strong> (Market val: $1,620). Escrow contract lock available for 60 minutes.';
        } else {
          msg.innerHTML = 'Cortical audio latency measured at <strong class="text-secondary">0.1ms</strong> vs 34ms industry average. Verified by Zero-Knowledge Benchmarks Protocol.';
        }
      }, 500);
    }
  }

  const sendBtn = document.getElementById('sendPromptBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const input = document.getElementById('copilotInput');
      if (input && input.value) {
        simulatePrompt(input.value);
      }
    });
  }

  // Deploy button interaction
  const deployBtn = document.getElementById('deployAgentBtn');
  if (deployBtn) {
    deployBtn.addEventListener('click', () => {
      simulatePrompt('Deploy Aura-7 daemon to scan high-tier algorithmic curations');
      const terminal = document.getElementById('copilotInput');
      if (terminal) terminal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Waitlist Activation Interaction
  function activateSynapse() {
    const confirmation = document.getElementById('waitlistConfirmation');
    const input = document.getElementById('waitlistEmail');
    if (confirmation && input) {
      confirmation.classList.remove('hidden');
      input.value = '';
    }
  }

  // Live Micro-Ticker Simulation
  let savedValue = 4289140;
  setInterval(() => {
    savedValue += Math.floor(Math.random() * 45) + 10;
    const ticker = document.getElementById('savedTicker');
    if (ticker) {
      ticker.innerText = '$' + savedValue.toLocaleString();
    }
  }, 3000);

  // Dynamic Countdown Timer
  let hours = 4, minutes = 18, seconds = 32;
  setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else {
      seconds = 59;
      if (minutes > 0) {
        minutes--;
      } else {
        minutes = 59;
        if (hours > 0) hours--;
      }
    }
    const timerElem = document.getElementById('countdownTimer');
    if (timerElem) {
      const pad = (n) => n.toString().padStart(2, '0');
      timerElem.innerText = `${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
    }
  }, 1000);
</script></main><footer class="relative z-10 w-full bg-surface-container-lowest border-t border-outline-variant/20 pt-space-2xl pb-space-lg"><div class="w-full px-margin"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-xl pb-space-2xl border-b border-outline-variant/20"><div class="lg:col-span-2 space-y-space-md"><div class="flex items-center gap-space-sm"><img alt="AURA AI Commerce Logo" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W51vPXmj8nWd7CEHIFpWXzsEW31frHn7mCLJuQQ5Uz4C-mSxVUdwch-ttYBRCVbCvWKgJscQ46iPQjuazQqeytqZic_-9ddQg5B1z608P1IJUqDo2sv9AR4vBtbXK1YgHvcGSpnck_Ko9oVeNTPQv92_ZOiAmHVptHxE96iqU1o4Hkrf8rUS11jzE4WQXwqrDi4qbjRQavuAzsuIF56Wo07vCWy3VloIxJo-t6373Gcw23sbRDtGKApF-w"/><span class="font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface">AURA</span></div><p class="font-body-md text-body-md text-on-surface-variant max-w-sm">Transcendent autonomous commerce protocols powered by deep neural networks, verifiable escrow synthesis, and bespoke physical-digital acquisitions.</p><div class="pt-space-xs"><div class="flex items-center gap-2 max-w-md"><div class="relative flex-1"><input class="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary" placeholder="Synapse channel subscription..." type="email"/></div><button class="px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors">Connect</button></div></div></div><div class="space-y-space-sm"><h3 class="font-title-md text-title-md text-on-surface">Neural Infrastructure</h3><ul class="space-y-2 font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" href="#">Cognitive Engine 4.5</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Decentralized Synapse</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Latency Sharding</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Autonomous Routing</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Real-Time Valuation</a></li></ul></div><div class="space-y-space-sm"><h3 class="font-title-md text-title-md text-on-surface">Autonomous Agents</h3><ul class="space-y-2 font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" href="#">Collector AI Concierge</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Market Arbitrage Daemons</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Curation Synthesis</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Bespoke Fabrication</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Portfolio Hedging</a></li></ul></div><div class="space-y-space-sm"><h3 class="font-title-md text-title-md text-on-surface">Hardware Ecosystem</h3><ul class="space-y-2 font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" href="#">Holo-Vault Display</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Quantum Key Rings</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Haptic Neural Link</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Zero-Knowledge Relays</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Cryptographic Chips</a></li></ul></div><div class="space-y-space-sm"><h3 class="font-title-md text-title-md text-on-surface">Governance &amp; Vault</h3><ul class="space-y-2 font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" href="#">Sovereign Escrow</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Consensus Attestation</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Audit Matrix</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Physical Asset Safes</a></li><li><a class="hover:text-on-surface transition-colors" href="#">Legal Frameworks</a></li></ul></div></div><div class="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-code-telemetry text-code-telemetry text-outline"><div class="flex items-center gap-space-md"><span>© 2025 AURA PROTOCOL LABS INC. ALL RIGHTS RESERVED.</span><span class="hidden md:inline-block w-1 h-1 rounded-full bg-outline"></span><span class="text-secondary font-medium">SYSTEM VERIFIED: QUANTUM ESCROW V3</span></div><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-xs"><span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span><span>QUANTUM LATENCY: <strong class="text-on-surface font-semibold">1.24 MS</strong></span></div><div class="flex items-center gap-space-sm"><a class="hover:text-on-surface transition-colors" href="#">SECURITY</a><a class="hover:text-on-surface transition-colors" href="#">TERMS</a><a class="hover:text-on-surface transition-colors" href="#">PRIVACY</a></div></div></div></div></footer></body></html>