---

# 🎬 Peppo AI Video Generator

An AI-powered web app that generates short videos from text prompts using [Replicate](https://replicate.com) models.  
Built with **Next.js 15**, deployed on **Vercel**, and integrated with Replicate’s video generation API.

👉 **Live Demo:** [Peppo AI Video Generator](https://peppo-video-generator.vercel.app)

---

## ✨ Features
- Generate AI videos from natural language prompts
- Choose custom duration (5–10 seconds)
- Inline video preview with auto-play & loop
- One-click download (Browser Dependent)
- Copy video link instantly
- View recent generations (history up to 6 items)
- Cloud-deployed with scalable serverless functions
- RAG-style prompt enrichment – user prompts are automatically augmented with cinematic style attributes (lighting, motion, textures) to boost quality.
- Secure API key handling — stored as environment variables in Vercel (never exposed to client-side code)



## 🛠 Tech Stack
- **Frontend:** Next.js (App Router, React, TailwindCSS)
- **Backend:** Next.js API Routes (Node.js runtime)
- **AI Model:** Replicate (`minimax/video-01`)
- **Deployment:** Vercel


---


## Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/Shakthirekak11/Peppo-AI-VideoGenerator.git
cd Peppo-AI-VideoGenerator
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create a `.env.local` file in the root directory and add your Replicate API token:

```bash
REPLICATE_API_TOKEN=your_replicate_api_key
```

> You can get a key from [Replicate Account](https://replicate.com/account).

### 4. Run the app

```bash
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000).



## Deployment

The app is designed for **Vercel** deployment.

### Steps:

1. Push your code to GitHub:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
2. Go to [Vercel](https://vercel.com).
3. Import the GitHub repo.
4. Add your environment variable (`REPLICATE_API_TOKEN`) under **Settings → Environment Variables**.
5. Deploy 

---

## Future Improvements

* **Video Streaming Optimization**
  Stream video output progressively (start playing before full file downloads).

* **Improvised RAG-Based Prompt Enrichment**
  Replace lightweight RAG with a full retrieval system (vector database + semantic search) to dynamically enrich prompts with contextual knowledge or style guides.

* **Advanced Controls**

  * Adjustable resolution (e.g., 480p / 720p / 1080p)
  * Frame rate customization
  * Multiple aspect ratios (16:9, 9:16, 1:1)

* **User Project History**
  Persistent storage (Supabase / Firebase) so users can log in and access all their past generations.

* **Creative Prompt Suggestions**
  Auto-suggest variations of prompts using OpenAI or HuggingFace models.

* **Multi-language Support**
  Allow prompts in multiple languages and auto-translate them into English for model input.

* **Billing / Usage Tracking**
  Limit free usage and integrate Stripe for paid tiers.



## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR.

---

