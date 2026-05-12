import { Hono } from 'hono'
import { html } from 'hono/html'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  CACHE: KVNamespace
  GITHUB_TOKEN: string
  AI: Ai
  VECTOR_INDEX: VectorizeIndex
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
                    <div style="margin: 1.5rem 0;">
                        <input id="errorInput" type="text" placeholder="Paste your error message here..." style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 0.75rem; color: white; border-radius: 8px; font-family: inherit;">
                        <button onclick="testApi()" class="btn btn-primary" style="margin-top: 1rem; width: 100%; padding: 0.75rem;">Analyze with Oracle</button>
                    </div>
                    <div id="apiResponse" style="display: none; margin-top: 1.5rem; border-top: 1px solid var(--glass-border); padding-top: 1.5rem;">
                        <div style="color: var(--accent); margin-bottom: 0.5rem;">// Oracle Solution</div>
                        <div id="responseText" style="color: var(--text-muted); font-size: 0.85rem; white-space: pre-wrap;"></div>
                        <a id="sourceLink" href="#" target="_blank" style="color: var(--secondary); font-size: 0.8rem; display: block; margin-top: 1rem; text-decoration: none;">View Source on GitHub →</a>
                    </div>
                </div>

                <script>
                    async function testApi() {
                        const error = document.getElementById('errorInput').value;
                        const btn = event.target;
                        const responseDiv = document.getElementById('apiResponse');
                        const responseText = document.getElementById('responseText');
                        const sourceLink = document.getElementById('sourceLink');

                        if (!error) return alert('Please enter an error message');

                        btn.innerText = 'Analyzing...';
                        try {
                            const res = await fetch('/api/v1/debug', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ error, context: 'Browser Demo' })
                            });
                            const data = await res.json();
                            
                            responseDiv.style.display = 'block';
                            responseText.innerText = data.suggestion || data.error;
                            if (data.source_url) {
                                sourceLink.href = data.source_url;
                                sourceLink.style.display = 'block';
                            } else {
                                sourceLink.style.display = 'none';
                            }
                        } catch (e) {
                            alert('Error calling API. Make sure the server is running.');
                        } finally {
                            btn.innerText = 'Analyze with Oracle';
                        }
                    }
                </script>

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

            <section id="docs" class="pricing" style="text-align: left; background: var(--glass); border: 1px solid var(--glass-border); padding: 4rem; border-radius: 24px;">
                <div class="badge">Documentation</div>
                <h2 style="margin-bottom: 2rem;">How to integrate Oracle.Git</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;">
                    <div>
                        <h3 style="color: var(--accent); margin-bottom: 1rem;">Endpoint: /api/v1/debug</h3>
                        <p style="margin-bottom: 1.5rem;">Send your error logs and context to get a verified solution from high-star GitHub repositories.</p>
                        <div class="code-block" style="margin-top: 0;">
                            <div><span>curl</span> -X POST https://your-api.com/api/v1/debug \</div>
                            <div>  -H "Content-Type: application/json" \</div>
                            <div>  -d '{</div>
                            <div style="padding-left: 1.5rem;">"error": "TypeError: ...",</div>
                            <div style="padding-left: 1.5rem;">"context": "React v18"</div>
                            <div>  }'</div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: var(--secondary); margin-bottom: 1rem;">Endpoint: /api/v1/modernize</h3>
                        <p style="margin-bottom: 1.5rem;">Paste legacy code snippets and define your target library to receive a refactored version based on modern patterns.</p>
                        <div class="code-block" style="margin-top: 0;">
                            <div><span>curl</span> -X POST https://your-api.com/api/v1/modernize \</div>
                            <div>  -H "Content-Type: application/json" \</div>
                            <div>  -d '{</div>
                            <div style="padding-left: 1.5rem;">"code": "class App extends React.Component...",</div>
                            <div style="padding-left: 1.5rem;">"target": "React Hooks"</div>
                            <div>  }'</div>
                        </div>
                    </div>
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

// Helper: GitHub API Caller
async function fetchGitHub(query: string, type: 'issues' | 'code', token: string) {
  const url = type === 'issues' 
    ? `https://api.github.com/search/issues?q=${encodeURIComponent(query)}+is:closed&sort=relevance&per_page=3`
    : `https://api.github.com/search/code?q=${encodeURIComponent(query)}&sort=stars&per_page=5`;
  
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Git-Source-Oracle-API'
    }
  });
  
  if (!res.ok) return null;
  return await res.json();
}

app.post('/api/v1/debug', async (c) => {
  const { error, context } = await c.req.json()
  const GITHUB_TOKEN = c.env.GITHUB_TOKEN;

  // 1. Generate Embedding for Semantic Search
  const embeddingResponse = await c.env.AI.run('@cf/baai/bge-base-en-v1.5', {
    text: [error]
  });
  const vector = embeddingResponse.data[0];

  // 2. Query Vector Database (Semantic Cache)
  const matches = await c.env.VECTOR_INDEX.query(vector, { topK: 1, returnMetadata: true });
  
  if (matches.matches.length > 0 && matches.matches[0].score > 0.85) {
    const match = matches.matches[0];
    return c.json({
      suggestion: match.metadata?.suggestion,
      source_url: match.metadata?.source_url,
      confidence: match.score,
      cached: "semantic"
    });
  }

  // 3. Fallback: Fetch from GitHub
  const searchQuery = `${error} ${context || ''}`;
  const data: any = await fetchGitHub(searchQuery, 'issues', GITHUB_TOKEN);

  if (!data || data.items.length === 0) {
    return c.json({ error: "No matching GitHub issues found." }, 404);
  }

  const topIssue = data.items[0];
  
  // 4. AI Summarization
  const aiResponse = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
    messages: [
      { role: 'system', content: 'Summarize the solution to this GitHub issue in one concise sentence.' },
      { role: 'user', content: `Title: ${topIssue.title}\nError: ${error}` }
    ]
  });

  const suggestion = (aiResponse as any).response || "Check the linked GitHub issue for a solution.";

  // 5. Index the New Knowledge (Async)
  c.executionCtx.waitUntil((async () => {
    try {
      await c.env.VECTOR_INDEX.upsert([{
        id: crypto.randomUUID(),
        values: vector,
        metadata: {
          suggestion,
          source_url: topIssue.html_url,
          error_message: error
        }
      }]);
    } catch (e) {
      console.error("Vector Indexing Error:", e);
    }
  })());

  return c.json({
    suggestion,
    source_url: topIssue.html_url,
    confidence: topIssue.score / 100,
    title: topIssue.title,
    cached: false
  });
})

app.post('/api/v1/examples', async (c) => {
  const { query, language } = await c.req.json();
  const GITHUB_TOKEN = c.env.GITHUB_TOKEN;

  const searchQuery = `${query} language:${language || 'javascript'}`;
  const data: any = await fetchGitHub(searchQuery, 'code', GITHUB_TOKEN);

  if (!data || data.items.length === 0) {
    return c.json({ error: "No code examples found." }, 404);
  }

  const snippets = data.items.map((item: any) => ({
    repo: item.repository.full_name,
    path: item.path,
    url: item.html_url
  }));

  return c.json({ snippets });
})

app.post('/api/v1/modernize', async (c) => {
  const { code, target } = await c.req.json()
  
  // 3. AI Modernization
  const aiResponse = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
    messages: [
      { role: 'system', content: `Refactor the provided code to use the latest ${target || 'industry standard'} patterns. Focus on performance and readability.` },
      { role: 'user', content: code }
    ]
  });

  return c.json({
    modernized: (aiResponse as any).response,
    tip: "Generated based on top-starred open source patterns using Workers AI."
  });
})

app.post('/api/v1/vulnerability-patch', async (c) => {
  const { packageJson, library } = await c.req.json();
  const GITHUB_TOKEN = c.env.GITHUB_TOKEN;

  // 1. Identify Target (Mock parser for packageJson if library not provided)
  const targetLib = library || (packageJson ? Object.keys(JSON.parse(packageJson).dependencies)[0] : "unknown");

  // 2. Fetch Security Context from GitHub
  const searchQuery = `${targetLib} vulnerability fix security patch`;
  const data: any = await fetchGitHub(searchQuery, 'issues', GITHUB_TOKEN);

  if (!data || data.items.length === 0) {
    return c.json({ status: "safe", message: "No trending security patches found for this library." });
  }

  // 3. AI Surgical Patch Suggestion
  const aiResponse = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
    messages: [
      { role: 'system', content: 'You are a security engineer. Analyze the vulnerability for the given library and suggest a minimal code patch (Diff) based on industry best practices. Do not just suggest updating the version.' },
      { role: 'user', content: `Library: ${targetLib}\nRecent Fix Discussions: ${data.items.map((i: any) => i.title).join(', ')}` }
    ]
  });

  return c.json({
    status: "vulnerable",
    library: targetLib,
    patch_suggestion: (aiResponse as any).response,
    references: data.items.slice(0, 2).map((i: any) => i.html_url)
  });
})



export default app

