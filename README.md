# 🎙️ VoiceDoc Agent

**Voice‑native document intelligence powered by Google Cloud, ElevenLabs, & Datadog**

VoiceDoc Agent transforms static documents into *living conversations*. Built on **Google Cloud’s partner ecosystem**, the agent enables users to upload text-based documents and interact with them entirely through speech. Using **Gemini on Vertex AI** for reasoning and **ElevenLabs Agents** for expressive, real-time voice, VoiceDoc STT & TTS demonstrates how partner AI services can be composed into a cohesive, production-grade system.

The project was created for **AI Partner Catalyst: Accelerate Innovation**, showcasing how Google Cloud partners can accelerate innovation through **voice-first AI experiences** with **Datadog-powered LLM observability**.

---

## 🚀 Why VoiceDoc Agent

Most “chat with your documents” tools treat voice as a thin layer on top of text. VoiceDoc Agent is different:

* 🧠 **Deep document understanding** with Gemini (not just retrieval)
* 🎭 **Tone‑adaptive voice personas** powered by ElevenLabs Agents
* 🗣️ **Voice‑first interaction** — minimal typing, natural conversation
* 📄 **Single‑document focus** — deep dive into one uploaded file at a time
* 💭 **Context‑aware memory** — remembers your conversation history

The result: a hands‑free, conversational experience that feels fundamentally different from text‑based RAG apps.

---

## 🏆 What Sets VoiceDoc Agent Apart

Unlike typical RAG demos, VoiceDoc Agent treats voice as a first-class signal:
- **Voice tone** directly impacts latency, cost, and observability metadata.
- **Expressive speech** introduces measurable infrastructure tradeoffs (dual-call reasoning).
- **Observability** is designed around voice-native UX health, not just text chat completion.

---

## ✨ Key Features

### 🔊 Tone‑Adaptive Voice Intelligence

On upload, documents are automatically classified (e.g. legal, financial, technical, academic). The ElevenLabs voice agent adapts accordingly:

* **Legal** → calm, cautious, precise, slower pace
* **Financial** → confident, structured, executive‑style summaries
* **Technical** → neutral, step‑by‑step explanations
* **Academic** → thoughtful, analytical, highlights assumptions
* **Narrative / Policy** → conversational, explanatory

“Without ElevenLabs’ real-time expressive agents, the same intelligence delivered via text would lose its emotional nuance, pacing control, and trust signals. This level of real-time expressive control is only possible with ElevenLabs’ low-latency agent architecture.”

The same answer spoken with the wrong tone would feel *wrong* — this is where ElevenLabs becomes essential.

### 🎭 Emotion & Expressive Modes

VoiceDoc Agent features a dual-mode system to balance speed and emotional depth:

*   **⚡ Standard Mode (Zap)**: Optimized for ultra-fast, direct responses. Perfect for quick lookups and technical documents where speed is the priority.
*   **✨ Expressive Mode (Sparkles)**: Uses a sophisticated two-step process. Gemini first generates a thoughtful response, then a second pass injects natural emotion tags like `[excited]`, `[thoughtful]`, or `[whispers]`. This results in high-quality, nuanced speech that brings narratives and complex documents to life.

---

### 🗣️ Voice‑First Conversations

Users can interact naturally using speech:

* “Give me a 60‑second verbal briefing.”
* “Where are the risks mentioned?”
* “Explain this section like I’m non‑technical.”
* “Jump to the assumptions.”
* “What does this document *not* say?”

The agent responds verbally and may ask clarifying questions before answering.

---

### 📚 Document Intelligence (RAG + Reasoning)

* Chunking + embeddings for retrieval
* Gemini reasoning on top of retrieved context
* Optimized for deep single-document reasoning, with optional multi-document comparison and summarization

---

## 🧠 Architecture Overview

**Frontend**

* React
* ElevenLabs React SDK (real‑time conversational audio)

**Backend (Google Cloud)**

* Cloud Run (API + orchestration)
* Cloud Storage (document uploads)
* Firestore (sessions & metadata)

**AI Layer**

* Gemini on Vertex AI (classification, reasoning, conversation)
* Vertex AI Embeddings (vector search)
* **Vector storage**: Firestore (prototype) / Vertex AI Vector Search (production-ready path)
* **Voice Intelligence**: ElevenLabs Agents (persona-driven, real-time voice with tone adaptation)

---

## 🛠️ Tech Stack

* **Google Cloud**: Vertex AI (Gemini), Cloud Run, Cloud Storage, Firestore
* **ElevenLabs**: Agents API, React SDK
* **Frontend**: React
* **Backend**: Node.js (primary), Python (auxiliary scripts)

---

## 🎥 Demo

A 3‑minute demo video will showcase:

1. Uploading different document types
2. Automatic voice tone adaptation
3. Voice‑only document exploration
4. Gemini‑powered reasoning over content

---

## 📦 Getting Started

```bash
# clone repo
git clone https://github.com/seehiong/voicedoc-agent.git
cd voicedoc-agent

# install dependencies
npm install
```

### ⚙️ Configuration

Before running the application, you need to set up your environment:

1. **Copy the environment template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Configure your API keys** in `.env.local`:
   - `VERTEX_PROJECT_ID`: Your Google Cloud Project ID
   - `ELEVENLABS_API_KEY`: Your ElevenLabs API Key
   - `DATADOG_API_KEY`: Your Datadog API key
   - `DATADOG_SITE`: e.g., `datadoghq.com`
   - `NEXT_PUBLIC_DATADOG_CLIENT_TOKEN`: For RUM
   - `NEXT_PUBLIC_DATADOG_APPLICATION_ID`: For RUM

3. **Set up Google Cloud Service Account**:
   - Download your service account JSON file from Google Cloud Console
   - Place it in the project root (e.g., `voicedoc-agent-xxxxx.json`)
   - Update `GOOGLE_APPLICATION_CREDENTIALS` in `.env.local` to point to this file:
     ```
     GOOGLE_APPLICATION_CREDENTIALS=./voicedoc-agent-xxxxx.json
     ```

### ▶️ Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 📋 Environment Variables Reference

*   `GOOGLE_APPLICATION_CREDENTIALS`: Path to your service account JSON.
*   `VERTEX_PROJECT_ID`: Your Google Cloud Project ID.
*   `ELEVENLABS_API_KEY`: Your ElevenLabs API Key.
*   `DATADOG_API_KEY`: Your Datadog API key.
*   `DATADOG_SITE`: e.g., `datadoghq.com`.
*   `NEXT_PUBLIC_DATADOG_CLIENT_TOKEN`: For RUM.
*   `NEXT_PUBLIC_DATADOG_APPLICATION_ID`: For RUM.

### 📊 Datadog Observability (Datadog Challenge)

VoiceDoc Agent is instrumented for **End-to-End LLM Observability**, providing a complete story from the moment a user speaks to the final AI response.

## 🔍 Observability Strategy (Datadog)

VoiceDoc Agent emits structured LLM telemetry into Datadog, including:
- Gemini latency and error rates
- Token usage and estimated cost
- Voice mode performance differences

Detection rules automatically open Datadog Cases with contextual runbooks, allowing AI engineers to act immediately when cost, latency, or reliability thresholds are breached.

This project treats observability not as a debugging tool, but as a product signal — measuring how voice expressiveness directly impacts latency, cost, and user experience.

Example SLOs include:
- 95% of voice responses delivered within 3s (Standard Mode)
- <1% Gemini request error rate over a 30-minute window

All dashboards and monitors are exported as standalone JSON files to ensure full reproducibility by the judging team.

### 📥 How to Import Configuration

#### 📊 Dashboard
1.  Open Datadog and go to **Dashboards** > **New Dashboard**.
2.  Click the **...** (three dots) breadcrumb in the top right.
3.  Select **Import dashboard JSON**.
4.  Copy and paste the content of **setup/datadog-dashboard.json**.

#### 🔔 Monitors
1.  Go to **Monitors** > **New Monitor**.
2.  Select **Metric** as the monitor type.
3.  In the top right, click the **JSON** tab (next to "GUI").
4.  Copy one monitor object from **setup/datadog-monitors.json** (e.g., the "High LLM Latency" object) and paste it into the box, replacing the existing template.
5.  Click **Save** at the bottom. Repeat for each monitor in the file.

> [!TIP]
> Each monitor in `setup/datadog-monitors.json` includes a contextual **Runbook** and is pre-configured to tag the AI engineering team.

> [!NOTE]
> All Gemini-related telemetry is emitted as custom metrics for unified monitoring and simplified dashboarding.

#### 🎙️ The Observable Story
1.  **User Action**: RUM tracks when a user clicks the **Voice Input** button or toggles **Expressive Mode**.
2.  **Session Replay**: Watch users interact with the app in real-time, including voice inputs and AI responses.
3.  **Custom Metrics**: Real-time tracking of latency, token usage, and cost.
4.  **Correlation**: Connect user actions in Session Replay to metric spikes in dashboards.

#### 📈 Explicitly Emitted Metrics
| Metric Name | Description |
| ----------- | ----------- |
| `voicedoc.request.latency_ms` | Duration of the Gemini API call |
| `voicedoc.llm.total_tokens` | Sum of prompt and completion tokens |
| `voicedoc.llm.cost` | Estimated cost per request |
| `voicedoc.request.hits` | Count of conversational interactions |
| `voicedoc.request.errors` | Count of LLM or RAG retrieval failures |

### 🚦 Synthetic Traffic Generator (Datadog Validation)

To demonstrate that VoiceDoc Agent’s observability is intentional and reproducible, the project includes a synthetic traffic generator that simulates realistic voice-first usage patterns and deliberately triggers Datadog detection rules.

The generator produces:
- **Persona-aware queries**: Legal, financial, technical, and academic persona simulations.
- **Mode Toggles**: Standard vs. Expressive Mode interactions to highlight latency and token cost tradeoffs.
- **Burst Traffic**: Simulates load spikes to pressure test the Gemini API.
- **Deterministic Failures**: Forced Gemini failures to prove error monitors and incident workflows.

Each request is tagged with scenario metadata and traced end-to-end through Datadog.

#### ▶️ Run the traffic generator
```bash
python scripts/traffic-generator.py
```

#### 🔍 What to observe in Datadog
Running the generator will surface the following signals:
- 📈 **Increased latency & tokens**: Compare `voice_mode:expressive` vs `voice_mode:standard`.
- ⚡ **Latency spikes**: Visible during the `burst-test` scenario.
- ❌ **Error-rate threshold breach**: Triggered by the `error-demo` scenario.
- 🚨 **Datadog Case Creation**: An automatic case will open with the contextual runbook attached.

All synthetic traffic is tagged with `traffic.type: synthetic` and `traffic.scenario: [scenario-name]`, allowing dashboards to cleanly separate demo traffic from real user activity.

#### 💻 Functional Implementation
Unlike "aspirational" integrations, VoiceDoc Agent explicitly emits telemetry using **Datadog's HTTPS API** (agentless). Here is the core implementation from `src/lib/datadog-metrics.ts`:

```typescript
// AGENTLESS METRICS - No agent required, works on Cloud Run
async function sendMetric(metricName: string, value: number, type: 'g' | 'c' | 'ms', tags: string[] = []) {
    if (DD_API_KEY) {
        const series = [{
            metric: `voicedoc.${metricName}`,
            points: [[Math.floor(Date.now() / 1000), value]],
            type: type === 'c' ? 'count' : 'gauge',
            tags: [...tags, 'service:voicedoc-agent', `env:${process.env.NODE_ENV}`]
        }];

        const response = await fetch(`https://api.${DD_SITE}/api/v1/series?api_key=${DD_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ series })
        });
    }
}

// Usage in API routes
await MetricsCollector.recordRequestDuration(duration, voice_mode, isNarration, trafficType);
await MetricsCollector.recordTokens(promptTokens, completionTokens, voice_mode, trafficType);
await MetricsCollector.recordLLMCost(promptTokens, completionTokens, voice_mode, trafficType);
```

> [!NOTE]
> `dd-trace` is optionally used for span tagging but **not required** for metrics. All metrics are sent directly to Datadog's API via HTTPS, enabling full observability without any agent or sidecar.

## 📚 Documentation Structure

- **`setup/`** - Configuration files and deployment guides
  - Datadog dashboard and monitor JSON files
  - Cloud Run deployment guide
  - Service account permissions

- **`docs/`** - Usage guides and references
  - Datadog demo quick reference
  - RUM and Session Replay guide
  - Environment variables explanation

- **`sample/`** - Sample documents for testing
  - Legal, financial, technical, and academic documents
  - Test different personas and voice modes

### 🔐 Security & Permissions

We follow **least-privilege best practices** for API security. 

**Recommended ElevenLabs Scopes:**
*   ✅ **Text to Speech** → Access
*   ✅ **Voices** → Read
*   ✅ **Speech to Text** → Access
*   ❌ **Everything else** → No Access

ElevenLabs API keys are scoped to the minimum permissions required to function.

---

## ☁️ Deployment (Cloud Run)

VoiceDoc Agent is a containerized Next.js application optimized for **Google Cloud Run**.

### 🛠️ Production Build
The project includes a multi-stage `Dockerfile` that leverages Next.js **Output Tracing** to create a minimal, high-performance production image (~100MB).

### 🐳 Running Locally with Docker
1.  **Build and Push** (if you haven't already):
    ```powershell
    ./scripts/docker-push.ps1
    ```

2.  **Run the container**:
    ```powershell
    ./scripts/docker-run.ps1
    ```
    This script will:
    - Mount your service account JSON file into the container
    - Load environment variables from `.env.local`
    - Start the container on port 3000

3.  **Access the application**:
    Open [http://localhost:3000](http://localhost:3000)

> [!NOTE]
> The service account file (`voicedoc-agent-xxxxx.json`) must be in the project root directory.

### 🚀 Deployment Steps (Docker Hub)
1.  **Build and Push**:
    Ensure you are logged in to Docker Hub:
    ```powershell
    docker login
    ```
    Then run the push script:
    ```powershell
    ./scripts/docker-push.ps1
    ```

2.  **Deploy to Cloud Run**:
    ```powershell
    gcloud run deploy voicedoc-agent `
      --image docker.io/seehiong/voicedoc-agent:latest `
      --platform managed `
      --region us-central1 `
      --allow-unauthenticated `
      --env-vars-file cloud-run-env.yaml `
      --memory 1Gi `
      --cpu 1 `
      --timeout 300 `
      --max-instances 10 `
      --service-account voicedoc-agent@voicedoc-agent.iam.gserviceaccount.com      
    ```

---

## 🧪 Hackathon Submission

* **Primary Challenge**: ElevenLabs Challenge
* **Additional Challenge**: Datadog Challenge
* **Google Cloud Usage**: Gemini (Vertex AI), Cloud Run, Cloud Storage
* **Partner Usage**: ElevenLabs Agents for conversational voice

---

## 📄 License

This project is open source under the **MIT License**.

---

## 🌟 Vision

VoiceDoc Agent points toward a future where documents are no longer read — they’re *spoken with*. Voice is not just an interface, but an active dimension of intelligence.
