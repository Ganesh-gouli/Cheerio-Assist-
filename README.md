# Cheerio Assist — Setup & Support Copilot
**Product Intern Take-Home Assignment | Cheerio AI**  
*An Intelligent, Guided Self-Service & Warm Escalation Copilot for Non-Technical Users.*

---

## 🌟 Project Overview
Cheerio AI empowers small businesses to automate marketing and customer engagement on WhatsApp. However, non-technical business owners frequently encounter setup blockers—specifically WhatsApp Cloud API phone registration, Meta Business verification, message template rejections, and integration field mapping.

**Cheerio Assist** is a 3-tier hybrid support copilot engineered to resolve high-frequency setup roadblocks autonomously without human intervention, while executing a warm, context-preserving handover when human expertise is truly required.

---

## 🚀 Key Deliverables in This Repository

1. **Clickable Web Prototype:** `Cheerio Assist` (Vite, React 19, TypeScript, Tailwind CSS).
2. **Product Strategy Document (4 Pages):** [`cheerio_product_assignment.md`](./cheerio_product_assignment.md).
3. **Financial, Cost & Audit Spreadsheet:** [`cheerio_cost_billing_audit.xlsx`](./cheerio_cost_billing_audit.xlsx) *(5 fully dynamic formula-linked sheets compatible with Google Sheets)*.
4. **AI Usage Evidence & Reflection Log:** [`ai_usage_log_template.md`](./ai_usage_log_template.md).
5. **Excel Generator Script:** [`scripts/generate_excel.py`](./scripts/generate_excel.py).

---

## 🖥️ How to Run the Prototype Locally

### Prerequisites
* Node.js (v18+ recommended; tested on v22.17.0)
* npm (v9+)

### Installation & Launch
```bash
# 1. Clone or navigate to the project directory
cd "Assignment 1 Cheerio AI"

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

Open your browser and navigate to:  
👉 **`http://localhost:5173/`**

To verify the production build and TypeScript compilation:
```bash
npm run build
```

---

## 📱 Interactive User Journey & Screen Walkthrough

The prototype guides **Elena Rostova** (Non-technical Owner of *FreshBake Artisan Pantry*) through resolving setup issues with dedicated interactive tools for all top 4 categories:

### 1. Primary Flow — WhatsApp Cloud API Connection:
* **Screen 1 — Support Home:**
  * Personalized greeting for Elena.
  * Real-time platform status indicator (*All Systems Operational*).
  * Smart intent search input with instant suggestions.
  * 4 core issue category cards (WhatsApp Setup, Message Templates, Chatbot Builder, Third-Party Integrations).
  * Recent support session history.
  * Visible direct human escalation card.
* **Screen 2 — Issue Identification (Interactive Diagnostic):**
  * Plain-English questions diagnosing phone number status and Meta error symptoms.
  * **"Explain in Simple Terms"** jargon helper tooltips (e.g., explaining *Cloud API vs Mobile App*).
  * Safe uncertainty handling for ambiguous inputs.
* **Screen 3 — Guided Troubleshooting (Diagnostic Engine with Voice Narration):**
  * Dynamic diagnosis: *Meta Error 133010 (Phone Number Active on Mobile App)*.
  * **"Listen to Voice"** Speech Synthesis audio readout for auditory learners.
  * Numbered, plain-English instructions with actionable tips:
    1. Backup chat history to personal iCloud/Google Drive (safeguard).
    2. Deregister phone number from the mobile app settings.
    3. Trigger 6-digit SMS verification code in Cheerio.
  * **"This Didn't Work For Me"** failure trigger revealing alternative workarounds.
* **Screen 4 — AI Support Assistant (Cheerio Copilot Chat):**
  * Conversational chat interface for follow-up questions.
  * Pre-configured responses for policy, data safety, and pricing questions.
  * Explicit uncertainty acknowledgment for unrecognized queries.
  * Automatic security & billing escalation guardrails.
* **Screen 5 — Resolution Confirmation:**
  * Celebratory success badge confirming simulated WhatsApp API connection.
  * Concise summary of completed actions.
  * Recommended next business steps (Create template, test broadcast, sync Shopify).
  * Customer Effort Score (CES) feedback loop with fallback escalation.
* **Screen 6 — Human Escalation (Warm Handover & Report Export):**
  * Transferred diagnostic trace (attempted steps, error code, business profile).
  * Generated Case Reference ID (e.g., `#CH-90422`).
  * SLA estimation (~18 min response).
  * **"Export Report (.md)"** button allowing one-click download of the complete diagnostic audit report.
  * Copyable ticket context for email/chat support.
  * Clear simulated status disclaimer.

### 2. Category 2 Tool — WhatsApp Template Approval Linter (`/template_linter`):
* Interactive regex and Meta policy analyzer that detects promotional language in Utility templates, missing variable sample previews (`{{1}}`), and spam formatting.
* One-click **"Auto-Fix with Compliance Engine"** that sanitizes copy into compliant Meta phrasing, boosting approval probability from 18% to 96%.

### 3. Category 3 Tool — Chatbot Flow Visual Graph & Loop Debugger (`/flow_debugger`):
* Visual flow graph analyzer detecting unlinked decision buttons (*orphan nodes*) and infinite loop traps on default fallback handlers.
* One-click **"Auto-Repair Flow Logic"** that connects exit guards to human support queues and links buttons to live Shopify lookups.
* Built-in interactive WhatsApp bot chat simulator to test the repaired flow.

### 4. Category 4 Tool — Shopify & Webhook Health Diagnostic (`/integration_health`):
* Automated 3-point health check covering OAuth token validity, webhook handshake delivery (resolves 401 signature mismatches), and customer phone E.164 auto-formatting.
* **"Fire Test Order Webhook"** simulator confirming simulated end-to-end payload delivery in under 120ms.

---

## 🛠️ Testing the 6 Edge Cases

Click the **"View Intern Design Rationale"** button in the top banner of the prototype to open the slide-out testing drawer:

1. **Technical Jargon Confusion:** Click *"1. User confused by technical jargon"* → Opens plain-English tooltips for terms like *Cloud API*.
2. **Recommended Step Fails:** Click *"2. Recommended step does not work"* → Triggers the inline failure fallback banner on Step 1.
3. **Incomplete / Ambiguous Information:** Click *"3. Incomplete information"* → Activates Safe Uncertainty Mode.
4. **Immediate Human Request:** Click *"4. User wants human immediately"* → Bypasses all questionnaires into instant warm escalation.
5. **Account / Billing Guardrails:** Click *"5. Billing guardrail"* → Triggers security escalation in AI chat.
6. **Unresolved After Completion:** Click *"6. Flow completed but issue persists"* → Escalates persistent issue from the confirmation screen.

---

## 📊 Importing the Financial Model into Google Sheets

The companion file `cheerio_cost_billing_audit.xlsx` is natively formatted for Google Sheets:

1. Open [Google Sheets](https://sheets.google.com).
2. Click **File > Import > Upload**.
3. Select `cheerio_cost_billing_audit.xlsx` from this project folder.
4. Choose **"Replace spreadsheet"** and click **Import data**.
5. All 5 sheets will load with complete formatting and live formulas:
   * **`Assumptions`**: Editable inputs for 5,000 businesses, token pricing, and resolution rates.
   * **`Volume & Resolution`**: Dynamic funnel calculating 1,820 automated resolutions (45.5% net).
   * **`Running Cost`**: Token economics (\$0.138 per resolution; \$250.95/month total operating cost).
   * **`Billing & Margin`**: Strategic comparison and P&L for *Cheerio Assist Pro* (\$14.2K/mo revenue, 98.2% gross margin).
   * **`Audit & Savings`**: Net labor savings (\$15,219/month; 44.8% reduction) and 8 anomaly alert thresholds.

---

## 🌐 Deploying to a Live Public URL (Vercel / Netlify)

To deploy the prototype publicly for your application submission:

### Option A: Vercel (Fastest)
```bash
# 1. Install Vercel CLI (if not installed)
npm install -g vercel

# 2. Deploy directly from the project directory
vercel
```
Follow the CLI prompts (default settings work automatically). Vercel will output a live URL (e.g., `https://cheerio-assist-copilot.vercel.app`).

### Option B: Netlify Drop
1. Run `npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist/` folder into the browser window.
4. Netlify will instantly provide a public HTTPS link.

---

## 📋 Interview Prep: Key Decisions & Rationale

Be prepared to explain these core product decisions during your interview:

1. **Why a 3-tier Hybrid Copilot over a pure AI Chatbot?**  
   Non-technical SMB users suffer from "blank-canvas paralysis" in open chat windows. Structured diagnostic trees provide immediate, deterministic resolution without the risk of AI hallucination.
2. **Why make chat backup Step 1?**  
   The primary emotional blocker for SMB owners porting WhatsApp is fear of losing historical customer chats. Prioritizing backup builds trust before account deregistration.
3. **Why recommend Free Core + Paid Pro Add-on?**  
   Setup support should be free to prevent day-1 churn and protect core SaaS ARR. Premium custom integration diagnostics can be packaged into an optional Pro add-on (\$19/mo) yielding a 98.2% gross margin.
4. **How does the system protect against false resolutions?**  
   By tracking the *Escalation Defect Rate* (users reopening a ticket within 48 hours of marking an issue resolved) with an alert threshold of $\le 4.0\%$.

---
*Created for the Cheerio AI Product Intern Take-Home Assessment.*
