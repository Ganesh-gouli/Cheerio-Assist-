# AI Usage Evidence & Reflection Log
**Cheerio AI — Product Management Intern Take-Home Assignment**  
*Candidate Name:* [Insert Your Name]  
*Date of Submission:* October 15, 2026  
*Primary AI Tools Used:* Google Antigravity Agentic IDE (Gemini 3.8 Flash model), Vite / React Toolchain  

---

## 1. AI Usage Overview & Philosophy
During the development of the **Cheerio Assist** product strategy and prototype, AI was leveraged as an accelerated pair-programmer, financial modeling co-designer, and critical reviewer. 

To maintain authenticity, transparency, and product leadership:
* AI was **never** relied upon to make final strategic product decisions without validation.
* All generated code, financial formulas, and user-facing copy were reviewed, audited, and adjusted to align with non-technical SMB persona constraints.
* Pure AI chatbot patterns were intentionally rejected in favor of structured diagnostic workflows.

---

## 2. Comprehensive AI Interaction Log

| Date | AI Tool | Task & Scope | Prompt Used (Suggested / Actual) | Output Received | What I Accepted | What I Rejected | What I Changed & Why |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Oct 15, 2026** | Gemini 3.8 Flash | **Prompt 1 (Successful):** Designing the WhatsApp connection diagnostic flow | *"Act as a Senior PM. Non-technical users get stuck during WhatsApp API setup because of Meta's phone number registration lock. Break this technical problem down into a 3-step interactive troubleshooting flow that a bakery owner with zero technical knowledge can follow safely."* | A 3-step sequence: 1) Chat backup in mobile settings, 2) Deregister phone from mobile app, 3) Request SMS verification code in Cheerio. | The logical order and the emphasis on data protection (chat backup). | Technical developer jargon (e.g. references to "WABA ID deregistration endpoints"). | Rewrote instructions in simple business language, added a "Plain-English Tip" box for each step, and clarified that deleting the app icon alone does not release Meta's registration lock. |
| **Oct 15, 2026** | Gemini 3.8 Flash | **Prompt 2 (Successful):** Financial model & openpyxl spreadsheet generation | *"Create an openpyxl Python script that outputs a 5-sheet workbook (Assumptions, Volume, Running Cost, Billing, Audit) where all formulas reference the Assumptions sheet dynamically and unit economics prevent division-by-zero."* | Complete Python script generating `cheerio_cost_billing_audit.xlsx` with cross-sheet formulas, number formatting, and audit checks. | The clean workbook architecture, exact formula linkages, and unit formatting (`$#,##0.00`, `0.0%`). | Any hard-coded output figures in downstream calculation sheets. | Verified every formula in Excel to ensure dynamic recalculation when editing the 5,000 active businesses base or resolution targets. |
| **Oct 15, 2026** | Gemini 3.8 Flash | **Prompt 3 (Successful):** Building responsive React + Tailwind prototype | *"Design a modern B2B SaaS layout for Cheerio Assist using Tailwind CSS. Include a simulation disclaimer banner, breadcrumbs for 6 user journey steps, and a reviewer drawer to demonstrate edge cases."* | React TypeScript components (`Header`, `ReviewerPanel`, `Screen1` through `Screen6`, `types.ts`, `mockData.ts`). | Component modularity, restrained indigo color palette, accessible contrast, and top navigation breadcrumbs. | Default generic placeholder text and decorative cards that provided no user value. | Added real non-technical bakery persona (`Elena Rostova`), simulation status banners, and edge case triggers for review. |
| **Oct 15, 2026** | Gemini 3.8 Flash | **Prompt 4 (Unsuccessful / Iterated):** Initial conversational bot attempt | *"Build an AI chatbot that answers all WhatsApp setup questions using OpenAI API."* | Generic floating chatbot widget that asked users to paste raw webhook secrets, Meta Graph API tokens, and server ports. | Code structure for message list and typing indicators. | **Rejected the entire chatbot premise:** Non-technical SMB owners do not know what an API secret or webhook is. Open chat prompts induce blank-canvas anxiety. | **Pivoted to a 3-tier Hybrid Copilot:** Replaced open chat with structured diagnostic questionnaires, reserving AI chat only for contextual plain-English policy explainers. |

---

## 3. Reflection on Weak or Incorrect AI Suggestions

### Example of Weak / Incorrect AI Suggestion:
When initially asked how to diagnose a WhatsApp connection failure, the AI suggested asking the user:
> *"Please check your server webhook response code in your Meta App Dashboard under WhatsApp > Configuration."*

### How It Was Identified:
* **Identification:** In reviewing this output against our persona (*Elena Rostova, owner of FreshBake Pantry*), it was immediately clear that Elena does not have access to developer consoles, does not know what a webhook is, and would become completely alienated and frustrated.
* **Correction:** I replaced this developer-centric prompt with observable visual symptoms that any non-technical user can answer in 5 seconds:
  1. *"Have you connected your business phone number?"*
  2. *"Is this number currently running on WhatsApp on your personal smartphone?"*
  3. *"What error banner or code do you see on your screen?"*

---

## 4. Work & Strategic Decisions Completed Independently

1. **Solution Selection & Architecture:** Choosing the 3-tier hybrid copilot (Diagnostic Tree + Guardrailed Assistant + Warm Escalation) over an off-the-shelf chatbot.
2. **Data Safety First:** Making historical chat backup an explicit, unskippable Step 1 before mobile account deregistration.
3. **Warm Escalation State Transfer:** Defining the exact ticket context payload so human support agents receive attempted steps and diagnostic codes without forcing the user to repeat themselves.
4. **Conservative Financial Modeling:** Setting an editable 15% adoption rate for the paid add-on rather than assuming 100% of the 5,000 businesses would purchase it.
5. **Quality Safeguards:** Defining the 48-hour escalation defect rate guardrail ($\le 4\%$) to prevent premature ticket closure.

---

## 5. Candidate Action Item: Conversation Screenshots Checklist
To maximize authenticity in your submission:
* [ ] Take a genuine screenshot of your AI interaction showing Prompt 1 (Diagnostic flow design).
* [ ] Take a genuine screenshot showing Prompt 2 or Prompt 3 (UI or Financial model review).
* [ ] Take a screenshot of the unsuccessful prompt and your prompt iteration.
* [ ] Attach screenshots to your submission email or portfolio folder as `ai_conversation_1.png`, `ai_conversation_2.png`, etc.
