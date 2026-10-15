# AI Prompt Log & Iteration Record
**Cheerio AI — Product Management Intern Take-Home Assessment**  
*Candidate:* **Ganesh Gouli** | *Role:* **Product Intern**  
*Project:* **Cheerio Assist — Setup & Support Copilot**  
*Repository:* [https://github.com/Ganesh-gouli/Cheerio-Assist-](https://github.com/Ganesh-gouli/Cheerio-Assist-)  
*Live Prototype:* [https://cheerio-assist.vercel.app/](https://cheerio-assist.vercel.app/)  
*Submission Document:* [`solution_document.pdf`](https://github.com/Ganesh-gouli/Cheerio-Assist-/blob/main/solution_document.pdf)

---

## Overview & Philosophy
During the execution of this take-home assessment, AI (Google Antigravity Agentic IDE powered by Gemini 3.8 Flash) was used as an accelerator for brainstorming, spreadsheet code generation, component scaffolding, and testing.

**Guiding Principles:**
1. **Human Product Ownership:** AI never dictated strategic product tradeoffs or user experience architecture.
2. **Rejection of Blind Automation:** Pure chatbot suggestions were critically evaluated and rejected when they introduced risk of hallucinating API credentials or alienating non-technical users.
3. **Rigorous Auditing:** Every prompt output was tested against the realities of a non-technical SMB retail owner (*Elena Rostova, FreshBake Bakery*).

---

## Chronological Prompt Log & Iteration History

### Prompt 1: Problem Definition & Non-Technical Persona Scoping
* **Prompt Used:**
  > *"Act as a Senior PM. Non-technical users get stuck during WhatsApp API setup because of Meta's phone number registration lock. Break this technical problem down into a 3-step interactive troubleshooting flow that a bakery owner with zero technical knowledge can follow safely."*
* **What AI Generated:**
  A 3-step sequence that included technical references to *WhatsApp Business Account (WABA) IDs*, *Meta Graph API deregistration endpoints*, and *server webhook callbacks*.
* **What I Changed & Why:**
  * **Removed All Developer Jargon:** A bakery owner does not understand WABA IDs or API endpoints. Replaced these terms with plain-English instructions ("Your business phone number").
  * **Prioritized Data Protection First:** Added an explicit, unskippable Step 1 ("Back Up Your Chat History") before any phone deregistration, addressing the SMB owner's #1 psychological fear: losing customer conversations.
  * **Clarified Mobile App vs. API Lock:** Explained clearly that deleting the WhatsApp app icon from a smartphone does *not* delete the Meta account registration lock.

---

### Prompt 2: Architectural Strategy & Rejection of Standalone Chatbot
* **Prompt Used:**
  > *"Propose a customer support automation solution for Cheerio AI. Can an open-ended conversational LLM bot resolve all setup queries?"*
* **What AI Generated:**
  A conventional floating AI chatbot widget where users are expected to type free-form questions, and the model attempts to diagnose their setup errors conversationally.
* **What I Changed & Why:**
  * **Rejected the Pure Chatbot Architecture:** Non-technical users experience severe "blank-canvas paralysis"—they do not know what questions to ask or how to describe errors like `Meta 133010`. Furthermore, unconstrained LLMs risk hallucinating incorrect API configurations.
  * **Designed a 3-Tier Hybrid Copilot Architecture:**
    1. **Tier 1 (Deterministic Diagnostic Tree):** 3 quick multiple-choice questions with inline "Explain in Simple Terms" jargon helpers.
    2. **Tier 2 (Contextual Plain-English Assistant):** Guardrailed explainer with prompt chips and rule confidence scores, restricted to Cheerio policy and Meta rules.
    3. **Tier 3 (Warm Human Escalation):** Context-preserving transfer so the user never repeats their issue.

---

### Prompt 3: Financial & Unit Economics Modeling Script
* **Prompt Used:**
  > *"Create an openpyxl Python script to model customer support automation economics for 5,000 active businesses, including agent headcount savings, LLM token costs, and a paid Pro support tier."*
* **What AI Generated:**
  A basic 2-sheet spreadsheet script with hard-coded numerical totals and an assumption that 100% of the 5,000 businesses would purchase the $19/month Pro tier.
* **What I Changed & Why:**
  * **Architected a 5-Sheet Dynamic Model:** Expanded the model into `Assumptions`, `Volume & Resolution`, `Running Cost`, `Billing & Margin`, and `Audit & Savings`.
  * **Eliminated Hard-Coded Numbers:** Replaced hard-coded values with dynamic cross-sheet Excel formulas (`=Assumptions!C6 * ...`) to guarantee recalculation when variables change.
  * **Applied Conservative Business Assumptions:** Lowered the paid tier adoption rate from an unrealistic 100% to a defensible 15% (750 paid subscribers), demonstrating true product conservatism.
  * **Delivered Core Metrics:** Documented a **$0.138 cost per automated resolution**, **$14.2K/mo gross margin** on Pro Support, and **$15.2K/mo net support cost savings**.

---

### Prompt 4: Interactive React & Tailwind Prototype Scaffolding
* **Prompt Used:**
  > *"Design a modern B2B SaaS layout for Cheerio Assist using Tailwind CSS. Include a simulation disclaimer banner, breadcrumbs for 6 user journey steps, and a reviewer drawer to demonstrate edge cases."*
* **What AI Generated:**
  A generic dashboard layout with basic forms and placeholder cards.
* **What I Changed & Why:**
  * **Elevated Visual Hierarchy & Aesthetics:** Replaced basic styles with a curated dark indigo theme, glassmorphic cards, clear typography, and status badges.
  * **Built-in Accessibility & Voice Narration:** Integrated the browser Web Speech API on Screen 3 to provide hands-free voice guidance for users working on mobile devices while reading instructions on desktop.
  * **Added Jargon Helpers:** Added inline translation drawers that explain terms like "Webhook", "WABA ID", and "Cloud API" in one sentence.

---

### Prompt 5: Specialized Interactive Tools for Top Support Categories
* **Prompt Used:**
  > *"Add specialized modules for the remaining high-frequency support categories: message template rejections, chatbot logic loops, and Shopify webhooks."*
* **What AI Generated:**
  Static documentation cards explaining what Meta templates and webhooks are.
* **What I Changed & Why:**
  * **Built 3 Interactive Functional Simulators:**
    1. **Meta Template Linter (`ScreenTemplateLinter.tsx`):** Pre-flight scanner with live approval gauge jumping from 18% to 96% and 1-click AI auto-sanitizer.
    2. **Chatbot Flow Debugger (`ScreenFlowDebugger.tsx`):** Visual node graph detecting broken button links and infinite loop traps, paired with an interactive WhatsApp phone simulator.
    3. **Shopify Integration Health (`ScreenIntegrationHealth.tsx`):** Automated 3-point diagnostic checking OAuth permissions, webhook handshakes, and E.164 phone formatting with simulated test order dispatch.

---

### Prompt 6: Warm Human Escalation & Audit Trail
* **Prompt Used:**
  > *"Design the escalation screen when automated self-service cannot resolve the issue."*
* **What AI Generated:**
  A standard "Contact Us" form with blank fields asking the user to re-enter their name, email, and description of the problem.
* **What I Changed & Why:**
  * **Eliminated Repetitive User Frustration:** Designed a warm state handover protocol that auto-populates Case Reference `#CH-45303`, priority status, and the complete diagnostic trace of attempted steps.
  * **Added Markdown Audit Report Exporter:** Implemented a 1-click button allowing users and support agents to download the full diagnostic transcript (`.md`) for CRM logging.

---

### Prompt 7: Solution Document & Screenshot Generation
* **Prompt Used:**
  > *"Export the solution document to styled HTML and PDF, including high-resolution UI screenshots and open-access links."*
* **What AI Generated:**
  HTML referencing external image paths that caused broken image icons during PDF export, along with default browser header and footer lines (`file:///C:/Users/...`).
* **What I Changed & Why:**
  * **Automated Screenshot Capture:** Wrote a Python script utilizing headless Microsoft Edge to capture pixel-perfect 1280x820 screenshots of all 9 screens.
  * **Base64-Inlined Image Data:** Upgraded `scripts/generate_html_doc.py` to embed all images as base64 data URIs, ensuring 100% self-contained rendering.
  * **Stripped Browser Headers/Footers:** Added `--no-pdf-header-footer` and `@media print` margin controls to generate a publication-grade PDF without local file paths.

---

## Summary of Independent Candidate Contributions
1. **Strategic Framing:** Conceptualizing the 3-tier hybrid copilot model instead of accepting default LLM chatbot templates.
2. **User-Centric Empathy:** Rooting every decision in the non-technical bakery owner persona (*Elena Rostova*).
3. **Financial Discipline:** Enforcing realistic, formulaic unit economics ($0.138/resolution, 15% adoption rate, $15.2K/mo net savings).
4. **Transparent Verification:** Documenting prompt iterations, rejected AI suggestions, and verified open-access resources.
