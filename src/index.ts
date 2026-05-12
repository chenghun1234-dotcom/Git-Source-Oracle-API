import { Hono } from 'hono'
import { html } from 'hono/html'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  CACHE: KVNamespace
  GITHUB_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors())

// Landing Page
app.get('/', (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Git-Source Oracle API | Real-time GitHub Intelligence</title>
        <meta name="description" content="Integrate live GitHub intelligence into your development workflow. Debug, modernize, and patch code using verified open-source patterns.">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
        <style>
            :root {
                --primary: #6366f1;
                --secondary: #a855f7;
                --accent: #22d3ee;
                --bg: #030712;
                --card-bg: rgba(17, 24, 39, 0.7);
                --text: #f3f4f6;
                --text-muted: #9ca3af;
                --glass: rgba(255, 255, 255, 0.03);
                --glass-border: rgba(255, 255, 255, 0.1);
            }

            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            body {
                font-family: 'Outfit', sans-serif;
                background-color: var(--bg);
                color: var(--text);
                line-height: 1.6;
                overflow-x: hidden;
                background-image: 
                    radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
                    radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 40%);
            }

            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
            }

            header {
                padding: 2rem 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                backdrop-filter: blur(10px);
                position: sticky;
                top: 0;
                z-index: 100;
                border-bottom: 1px solid var(--glass-border);
            }

            .logo {
                font-weight: 800;
                font-size: 1.5rem;
                background: linear-gradient(135deg, var(--primary), var(--accent));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: -1px;
            }

            nav a {
                color: var(--text-muted);
                text-decoration: none;
                margin-left: 2rem;
                font-weight: 500;
                transition: color 0.3s;
            }

            nav a:hover {
                color: var(--accent);
            }

            .hero {
                padding: 8rem 0 4rem;
                text-align: center;
                position: relative;
            }

            .hero h1 {
                font-size: 4.5rem;
                font-weight: 800;
                margin-bottom: 1.5rem;
                line-height: 1.1;
                background: linear-gradient(to bottom, #fff 40%, #94a3b8);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .hero p {
                font-size: 1.25rem;
                color: var(--text-muted);
                max-width: 600px;
                margin: 0 auto 2.5rem;
            }

            .badge {
                display: inline-block;
                padding: 0.5rem 1rem;
                border-radius: 9999px;
                background: var(--glass);
                border: 1px solid var(--glass-border);
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--accent);
                margin-bottom: 1.5rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .btn {
                display: inline-block;
                padding: 1rem 2.5rem;
                border-radius: 12px;
                font-weight: 600;
                text-decoration: none;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
            }

            .btn-primary {
                background: var(--primary);
                color: white;
                box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
            }

            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.5);
                filter: brightness(1.1);
            }

            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
                padding: 4rem 0;
            }

            .card {
                background: var(--card-bg);
                border: 1px solid var(--glass-border);
                padding: 2.5rem;
                border-radius: 24px;
                transition: all 0.3s;
                position: relative;
                overflow: hidden;
            }

            .card:hover {
                border-color: var(--primary);
                transform: translateY(-5px);
                background: rgba(17, 24, 39, 0.9);
            }

            .card h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
            }

            .card p {
                color: var(--text-muted);
                font-size: 1rem;
            }

            .code-block {
                background: #0f172a;
                border-radius: 16px;
                padding: 1.5rem;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.9rem;
                margin-top: 2rem;
                border: 1px solid var(--glass-border);
                position: relative;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                text-align: left;
            }

            .code-block span { color: var(--accent); }
            .code-block b { color: var(--secondary); font-weight: normal; }

            .pricing {
                padding: 6rem 0;
                text-align: center;
            }

            .price-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-top: 4rem;
            }

            .price-card {
                background: var(--glass);
                border: 1px solid var(--glass-border);
                padding: 3rem 2rem;
                border-radius: 24px;
                transition: transform 0.3s;
            }

            .price-card.featured {
                border-color: var(--primary);
                background: linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%);
                transform: scale(1.05);
            }

            .price-value {
                font-size: 3rem;
                font-weight: 800;
                margin: 1.5rem 0;
            }

            .price-value span {
                font-size: 1rem;
                color: var(--text-muted);
            }

            footer {
                padding: 4rem 0;
                text-align: center;
                border-top: 1px solid var(--glass-border);
                color: var(--text-muted);
            }

            @media (max-width: 768px) {
                .hero h1 { font-size: 3rem; }
                header nav { display: none; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <div class="logo">ORACLE.GIT</div>
                <nav>
                    <a href="#features">Features</a>
                    <a href="#docs">Docs</a>
                    <a href="#pricing">Pricing</a>
                    <a href="https://rapidapi.com" class="btn btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Get API Key</a>
                </nav>
            </header>

            <section class="hero">
                <div class="badge">Powered by Real-time GitHub Data</div>
                <h1>Code with the collective <br>intelligence of GitHub.</h1>
                <p>The first API that doesn't just predict code, but verifies it against millions of production repositories in real-time.</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <a href="#docs" class="btn btn-primary">Start Building</a>
                    <a href="#demo" class="btn" style="background: var(--glass); border: 1px solid var(--glass-border);">View Demo</a>
                </div>

                <div class="code-block" style="max-width: 700px; margin: 4rem auto 0;">
                    <div><span>POST</span> /api/v1/debug</div>
                    <div style="color: #64748b; margin: 1rem 0;">// Input: Error stack trace</div>
                    <div>{</div>
                    <div style="padding-left: 1.5rem;">"error": <b>"TypeError: Cannot read properties of undefined (reading 'map')"</b>,</div>
                    <div style="padding-left: 1.5rem;">"context": "React v18.2.0, Next.js v14"</div>
                    <div>}</div>
                    <div style="color: var(--accent); margin-top: 1.5rem;">// Oracle Response: Verified solution from 150+ high-star repos</div>
                </div>
            </section>

            <section id="features" class="grid">
                <div class="card">
                    <h3>/debug</h3>
                    <p>Stop Googling error logs. Get immediate, diff-ready solutions extracted from resolved GitHub issues and PRs.</p>
                </div>
                <div class="card">
                    <h3>/modernize</h3>
                    <p>Upgrade legacy implementations to current industry best practices by analyzing patterns in top 1% repositories.</p>
                </div>
                <div class="card">
                    <h3>/examples</h3>
                    <p>Fetch production-grade snippets. Not just hello-world, but real battle-tested code used by verified maintainers.</p>
                </div>
                <div class="card">
                    <h3>/vulnerability-patch</h3>
                    <p>Instant security remediation. We scan live GitHub advisories and suggest the exact minimal patch needed.</p>
                </div>
            </section>

            <section id="pricing" class="pricing">
                <div class="badge">Monetization</div>
                <h2>Simple, Developer-First Pricing</h2>
                <div class="price-grid">
                    <div class="price-card">
                        <h3>Starter</h3>
                        <div class="price-value">$0<span>/mo</span></div>
                        <p>50 calls / month</p>
                        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted);">Perfect for side projects</p>
                    </div>
                    <div class="price-card featured">
                        <h3>Professional</h3>
                        <div class="price-value">$49<span>/mo</span></div>
                        <p>1,000 calls / month</p>
                        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted);">For high-velocity engineers</p>
                    </div>
                    <div class="price-card">
                        <h3>Enterprise</h3>
                        <div class="price-value">Custom</div>
                        <p>Unlimited calls</p>
                        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted);">Private Repo Analysis included</p>
                    </div>
                </div>
            </section>

            <footer>
                <p>&copy; 2026 Git-Source Oracle API. Built for the era of Vibe Coding.</p>
            </footer>
        </div>
    </body>
    </html>
  `)
})

// API Endpoints
app.get('/api/v1/ping', (c) => c.json({ status: 'ok', timestamp: Date.now() }))

app.post('/api/v1/debug', async (c) => {
  const body = await c.req.json()
  // Mock GitHub Search Logic
  return c.json({
    suggestion: "Ensure the array is defined before calling .map(). Using optional chaining and a fallback value is the standard approach in React 18+.",
    diff: "- data.map(item => ...)\n+ (data ?? []).map(item => ...)",
    confidence: 0.98,
    references: [
      { repo: "facebook/react", issue: 12345, stars: 215000 }
    ]
  })
})

app.post('/api/v1/modernize', async (c) => {
  return c.json({
    modernized: "// Pattern extracted from Vercel's latest open-source templates\nconst [data, setData] = useState([]);",
    improvements: ["Uses functional state updates", "Type-safe initial values"]
  })
})

app.post('/api/v1/examples', async (c) => {
  return c.json({
    snippets: [
      { repo: "shadcn/ui", usage: "Lucide icon integration pattern" },
      { repo: "t3-oss/create-t3-app", usage: "TRPC middleware example" }
    ]
  })
})

app.post('/api/v1/vulnerability-patch', async (c) => {
  return c.json({
    status: "vulnerable",
    severity: "high",
    vulnerability: "CVE-2024-XXXX (Prototype Pollution)",
    patch: "Update lodash to v4.17.21 or apply the following diff..."
  })
})

export default app

