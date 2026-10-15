import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def create_cheerio_workbook():
    wb = openpyxl.Workbook()
    # Remove default sheet
    wb.remove(wb.active)

    # Styles
    font_title = Font(name='Segoe UI', size=14, bold=True, color='1E1B4B')
    font_subtitle = Font(name='Segoe UI', size=9, italic=True, color='475569')
    font_header = Font(name='Segoe UI', size=10, bold=True, color='FFFFFF')
    font_bold = Font(name='Segoe UI', size=10, bold=True, color='0F172A')
    font_regular = Font(name='Segoe UI', size=10, color='334155')
    font_italic = Font(name='Segoe UI', size=9, italic=True, color='64748B')
    font_formula = Font(name='Segoe UI', size=10, bold=True, color='1E3A8A')
    font_metric = Font(name='Segoe UI', size=11, bold=True, color='047857')

    fill_indigo_header = PatternFill(start_color='4338CA', end_color='4338CA', fill_type='solid')
    fill_slate_sub = PatternFill(start_color='F1F5F9', end_color='F1F5F9', fill_type='solid')
    fill_accent_green = PatternFill(start_color='ECFDF5', end_color='ECFDF5', fill_type='solid')
    fill_accent_amber = PatternFill(start_color='FFFBEB', end_color='FFFBEB', fill_type='solid')
    fill_zebra = PatternFill(start_color='F8FAFC', end_color='F8FAFC', fill_type='solid')

    thin_border_side = Side(border_style='thin', color='CBD5E1')
    thick_bottom_side = Side(border_style='medium', color='4338CA')
    double_bottom_side = Side(border_style='double', color='0F172A')

    border_cell = Border(left=thin_border_side, right=thin_border_side, top=thin_border_side, bottom=thin_border_side)
    border_total = Border(top=thin_border_side, bottom=double_bottom_side)

    align_left = Alignment(horizontal='left', vertical='center')
    align_right = Alignment(horizontal='right', vertical='center')
    align_center = Alignment(horizontal='center', vertical='center')

    # =========================================================================
    # SHEET 1: ASSUMPTIONS
    # =========================================================================
    ws1 = wb.create_sheet(title='Assumptions')
    ws1.views.sheetView[0].showGridLines = True

    ws1['A1'] = "Cheerio Assist — Operational & Financial Model Assumptions"
    ws1['A1'].font = font_title
    ws1['A2'] = "Baseline assumptions for 5,000 active businesses scaling WhatsApp API support. Clearly marked as provisional."
    ws1['A2'].font = font_subtitle

    headers1 = ["Assumption Parameter", "Value", "Unit", "Type / Status", "Source / Rationale"]
    for col_idx, h in enumerate(headers1, 1):
        cell = ws1.cell(row=4, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_indigo_header
        cell.alignment = align_left if col_idx != 2 else align_right

    assumptions_data = [
        ("Active Businesses Base", 5000, "#,##0", "Assignment Specification", "Provided in prompt context"),
        ("Monthly Support Queries per Business", 0.80, "0.00", "Provisional Assumption", "Estimated based on B2B SaaS onboarding benchmarks"),
        ("Share of Inbound Queries Eligible for Self-Service", 0.70, "0.0%", "Provisional Assumption", "Top 5 issues (WhatsApp, Templates, Flows, Integrations)"),
        ("Target Resolution Rate on Eligible Queries", 0.65, "0.0%", "3-Month Provisional Target", "Expected autonomous resolution without human intervention"),
        ("Average Input Tokens per AI Interaction", 850, "#,##0", "Engineering Estimate", "Includes system prompt, user query, and diagnostic history"),
        ("Average Output Tokens per AI Interaction", 350, "#,##0", "Engineering Estimate", "Concise, plain-English guidance and step instructions"),
        ("LLM Model Input Price per 1M Tokens ($)", 0.15, "$#,##0.00", "Verified Public Price", "OpenAI GPT-4o-mini ($0.15/1M input) / Gemini 1.5 Flash"),
        ("LLM Model Output Price per 1M Tokens ($)", 0.60, "$#,##0.00", "Verified Public Price", "OpenAI GPT-4o-mini ($0.60/1M output) / Gemini 1.5 Flash"),
        ("Cloud Infrastructure, Search & Monitoring / Mo ($)", 250.00, "$#,##0.00", "Operational Estimate", "Vector indexing, logging, serverless hosting (Vercel/AWS)"),
        ("Blended Human Support Cost per Ticket ($)", 8.50, "$#,##0.00", "Industry Benchmark", "Average cost of Tier 1/2 human support agent time (15-20 min)"),
        ("Proposed Premium Add-on Price ($/mo)", 19.00, "$#,##0.00", "Proposed Pricing Model", "Optional 'Cheerio Assist Pro' tier with custom CRM syncing"),
        ("Assumed Adoption Rate for Paid Add-on", 0.15, "0.0%", "Conservative Assumption", "15% adoption among 5,000 businesses (750 paying orgs)")
    ]

    for idx, (param, val, num_fmt, status, source) in enumerate(assumptions_data, 5):
        row_fill = fill_zebra if idx % 2 == 0 else PatternFill(fill_type=None)
        
        c1 = ws1.cell(row=idx, column=1, value=param)
        c1.font = font_bold if "Base" in param or "Price" in param else font_regular
        c1.border = border_cell
        c1.fill = row_fill

        c2 = ws1.cell(row=idx, column=2, value=val)
        c2.font = font_formula
        c2.number_format = num_fmt
        c2.alignment = align_right
        c2.border = border_cell
        c2.fill = row_fill

        c3 = ws1.cell(row=idx, column=3, value=num_fmt if '%' in num_fmt or '$' in num_fmt else ("Accounts" if idx==5 else "Queries/Biz" if idx==6 else "Tokens" if idx in [9,10] else "Units"))
        c3.font = font_italic
        c3.alignment = align_center
        c3.border = border_cell
        c3.fill = row_fill

        c4 = ws1.cell(row=idx, column=4, value=status)
        c4.font = font_regular
        c4.border = border_cell
        c4.fill = row_fill

        c5 = ws1.cell(row=idx, column=5, value=source)
        c5.font = font_italic
        c5.border = border_cell
        c5.fill = row_fill

    # Note at bottom
    ws1.cell(row=18, column=1, value="Note: Model prices based on OpenAI GPT-4o-mini / Gemini 1.5 Flash official documentation (https://openai.com/api/pricing/). All other values are editable scenario inputs.").font = font_subtitle

    # =========================================================================
    # SHEET 2: VOLUME AND RESOLUTION
    # =========================================================================
    ws2 = wb.create_sheet(title='Volume & Resolution')
    ws2.views.sheetView[0].showGridLines = True

    ws2['A1'] = "Monthly Support Query Volume & Resolution Funnel"
    ws2['A1'].font = font_title
    ws2['A2'] = "Formulas strictly reference the Assumptions sheet. Distinguishes eligible queries from automated resolutions."
    ws2['A2'].font = font_subtitle

    headers2 = ["Funnel Metric", "Formula / Source", "Monthly Volume", "Share of Total", "Operational Definition & Rationale"]
    for col_idx, h in enumerate(headers2, 1):
        cell = ws2.cell(row=4, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_indigo_header
        cell.alignment = align_left if col_idx not in [3, 4] else align_right

    volume_rows = [
        ("Total Monthly Inbound Support Queries", "=Assumptions!B5*Assumptions!B6", "#,##0", "=C5/C5", "5,000 businesses * 0.8 queries/month"),
        ("Queries Eligible for Self-Service Automation", "=C5*Assumptions!B7", "#,##0", "=C6/C$5", "Issues covered by WhatsApp, Template, Bot, and Integration copilot"),
        ("Ineligible Complex / Custom Queries", "=C5-C6", "#,##0", "=C7/C$5", "Complex bugs, legal, or bespoke enterprise requests (Direct to Human)"),
        ("Queries Successfully Resolved Autonomously", "=C6*Assumptions!B8", "#,##0", "=C8/C$5", "Resolved via diagnostic checklist & AI Copilot without agent ticket"),
        ("Queries Escalated to Human Support (From Eligible)", "=C6-C8", "#,##0", "=C9/C$5", "Failed troubleshooting, account-level locks, or explicit escalation"),
        ("Total Residual Queries Handled by Humans", "=C7+C9", "#,##0", "=C10/C$5", "Sum of ineligible inbound queries + escalated eligible queries")
    ]

    for idx, (metric, formula, num_fmt, share_formula, notes) in enumerate(volume_rows, 5):
        row_fill = fill_accent_green if "Resolved" in metric else (fill_zebra if idx % 2 == 0 else PatternFill(fill_type=None))

        c1 = ws2.cell(row=idx, column=1, value=metric)
        c1.font = font_bold if "Resolved" in metric or "Total" in metric else font_regular
        c1.border = border_cell
        c1.fill = row_fill

        c2 = ws2.cell(row=idx, column=2, value=formula)
        c2.font = font_italic
        c2.border = border_cell
        c2.fill = row_fill

        c3 = ws2.cell(row=idx, column=3, value=formula)
        c3.font = font_formula if "Resolved" not in metric else font_metric
        c3.number_format = num_fmt
        c3.alignment = align_right
        c3.border = border_cell
        c3.fill = row_fill

        c4 = ws2.cell(row=idx, column=4, value=share_formula)
        c4.font = font_regular
        c4.number_format = "0.0%"
        c4.alignment = align_right
        c4.border = border_cell
        c4.fill = row_fill

        c5 = ws2.cell(row=idx, column=5, value=notes)
        c5.font = font_italic
        c5.border = border_cell
        c5.fill = row_fill

    # Summary KPI Callout
    ws2.cell(row=12, column=1, value="Key Performance Rates:").font = font_bold
    ws2.cell(row=13, column=1, value="Overall Autonomous Resolution Rate (% of All Inbound)").font = font_regular
    ws2.cell(row=13, column=3, value="=C8/C5").font = font_metric
    ws2.cell(row=13, column=3).number_format = "0.0%"
    ws2.cell(row=13, column=3).alignment = align_right
    ws2.cell(row=13, column=5, value="1,820 resolved / 4,000 total inbound = 45.5% net support workload automated").font = font_italic

    ws2.cell(row=14, column=1, value="Effective Self-Service Resolution Rate (% of Eligible)").font = font_regular
    ws2.cell(row=14, column=3, value="=C8/C6").font = font_metric
    ws2.cell(row=14, column=3).number_format = "0.0%"
    ws2.cell(row=14, column=3).alignment = align_right
    ws2.cell(row=14, column=5, value="1,820 resolved / 2,800 eligible = 65.0% success rate on eligible workflows").font = font_italic

    # =========================================================================
    # SHEET 3: RUNNING COST
    # =========================================================================
    ws3 = wb.create_sheet(title='Running Cost')
    ws3.views.sheetView[0].showGridLines = True

    ws3['A1'] = "Cheerio Assist — Recurring Monthly Operating Cost Model"
    ws3['A1'].font = font_title
    ws3['A2'] = "Calculates token consumption, API spend, infrastructure, and blended per-resolution economics."
    ws3['A2'].font = font_subtitle

    headers3 = ["Cost Component", "Formula / Derivation", "Unit Cost", "Monthly Total ($)", "Cost Modeling Notes"]
    for col_idx, h in enumerate(headers3, 1):
        cell = ws3.cell(row=4, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_indigo_header
        cell.alignment = align_left if col_idx not in [3, 4] else align_right

    cost_rows = [
        ("Input Token Cost per AI Interaction", "=(Assumptions!B9/1000000)*Assumptions!B11", "$#,##0.00000", "=C5*'Volume & Resolution'!C6", "850 tokens * $0.15/1M tokens = $0.0001275 per interaction"),
        ("Output Token Cost per AI Interaction", "=(Assumptions!B10/1000000)*Assumptions!B12", "$#,##0.00000", "=C6*'Volume & Resolution'!C6", "350 tokens * $0.60/1M tokens = $0.0002100 per interaction"),
        ("Total AI Model Cost per Interaction", "=C5+C6", "$#,##0.00000", "=D5+D6", "Blended token cost per interaction = $0.0003375"),
        ("Total Monthly AI Model Inference Cost", "=D7", "$#,##0.00", "=D7", "Inference across 2,800 eligible customer sessions"),
        ("Platform Infrastructure, Search & Logging", "=Assumptions!B13", "$#,##0.00", "=Assumptions!B13", "Vercel / AWS serverless, Vector search cache, monitoring"),
        ("Total Monthly Solution Operating Cost", "=D8+D9", "$#,##0.00", "=D8+D9", "Sum of monthly AI token inference + fixed cloud infrastructure"),
        ("Average Cost per Incoming Support Query", "=D10/'Volume & Resolution'!C5", "$#,##0.000", "=D10/'Volume & Resolution'!C5", "Total operating cost / 4,000 incoming support queries"),
        ("Cost per Successfully Automated Resolution", "=D10/'Volume & Resolution'!C8", "$#,##0.000", "=D10/'Volume & Resolution'!C8", "Total operating cost / 1,820 resolved queries ($0.138 per resolution!)")
    ]

    for idx, (comp, formula_derivation, unit_fmt, monthly_formula, notes) in enumerate(cost_rows, 5):
        is_highlight = idx in [10, 12]
        row_fill = fill_accent_green if is_highlight else (fill_zebra if idx % 2 == 0 else PatternFill(fill_type=None))

        c1 = ws3.cell(row=idx, column=1, value=comp)
        c1.font = font_bold if is_highlight else font_regular
        c1.border = border_cell
        c1.fill = row_fill

        c2 = ws3.cell(row=idx, column=2, value=formula_derivation)
        c2.font = font_italic
        c2.border = border_cell
        c2.fill = row_fill

        c3 = ws3.cell(row=idx, column=3, value=formula_derivation if idx <= 7 else "")
        c3.font = font_formula
        c3.number_format = unit_fmt
        c3.alignment = align_right
        c3.border = border_cell
        c3.fill = row_fill

        c4 = ws3.cell(row=idx, column=4, value=monthly_formula)
        c4.font = font_bold if is_highlight else font_regular
        c4.number_format = "$#,##0.00" if idx not in [11, 12] else "$#,##0.000"
        c4.alignment = align_right
        c4.border = border_cell
        c4.fill = row_fill

        c5 = ws3.cell(row=idx, column=5, value=notes)
        c5.font = font_italic
        c5.border = border_cell
        c5.fill = row_fill

    # =========================================================================
    # SHEET 4: BILLING AND MARGIN
    # =========================================================================
    ws4 = wb.create_sheet(title='Billing & Margin')
    ws4.views.sheetView[0].showGridLines = True

    ws4['A1'] = "Cheerio Assist — Monetization Strategy & Margin Comparison"
    ws4['A1'].font = font_title
    ws4['A2'] = "Evaluates Free Core Feature vs Usage Credits vs Paid Add-on. Recommends hybrid approach."
    ws4['A2'].font = font_subtitle

    # Strategy Comparison Table
    headers4_a = ["Commercial Model", "Proposed Price", "User Adoption Friction", "Primary Strategic Value", "Product Recommendation"]
    for col_idx, h in enumerate(headers4_a, 1):
        cell = ws4.cell(row=4, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_indigo_header
        cell.alignment = align_left

    comparison_data = [
        ("1. Free Self-Service (Core Included)", "$0.00 / mo", "Zero Friction (100% Onboarding Access)", "Prevents early churn, boosts WhatsApp onboarding velocity", "RECOMMENDED FOR CORE: Free for standard setup diagnostics"),
        ("2. Usage-Based Resolution Credits", "$0.50 / resolved query", "High Friction (Unpredictable bills for non-technical users)", "Direct cost recovery but penalizes users who need help", "NOT RECOMMENDED: Punishes confused non-technical users"),
        ("3. Paid Plan Add-on (Cheerio Assist Pro)", "$19.00 / mo / business", "Low Friction for growing businesses needing custom flows", "Generates high-margin recurring SaaS ARR ($14.2K/mo)", "RECOMMENDED FOR PRO: Paid add-on for custom CRM & priority SLA")
    ]

    for idx, (model, price, friction, value, rec) in enumerate(comparison_data, 5):
        row_fill = fill_accent_green if "1." in model or "3." in model else fill_zebra
        for col_idx, text in enumerate([model, price, friction, value, rec], 1):
            c = ws4.cell(row=idx, column=col_idx, value=text)
            c.font = font_bold if col_idx in [1, 5] else font_regular
            c.border = border_cell
            c.fill = row_fill

    # Financial Model for Paid Add-on (Cheerio Assist Pro)
    ws4.cell(row=9, column=1, value="Financial P&L for Option 3: 'Cheerio Assist Pro' Add-On Tier").font = font_bold
    ws4.cell(row=10, column=1, value="Parameter").font = font_header
    ws4.cell(row=10, column=1).fill = fill_indigo_header
    ws4.cell(row=10, column=2, value="Formula / Value").font = font_header
    ws4.cell(row=10, column=2).fill = fill_indigo_header
    ws4.cell(row=10, column=3, value="Monthly Amount").font = font_header
    ws4.cell(row=10, column=3).fill = fill_indigo_header
    ws4.cell(row=10, column=4, value="Unit").font = font_header
    ws4.cell(row=10, column=4).fill = fill_indigo_header
    ws4.cell(row=10, column=5, value="Analytical Rationale").font = font_header
    ws4.cell(row=10, column=5).fill = fill_indigo_header

    pl_rows = [
        ("Total Addressable Active Businesses", "=Assumptions!B5", "=Assumptions!B5", "#,##0", "Total customer base in Cheerio workspace"),
        ("Paid Pro Add-on Adoption Rate", "=Assumptions!B16", "=Assumptions!B16", "0.0%", "Conservative 15% adoption rate (does not assume 100%)"),
        ("Paying Business Accounts", "=C11*C12", "=C11*C12", "#,##0", "750 businesses paying for enhanced Assist Pro workflows"),
        ("Monthly Add-on Subscription Price", "=Assumptions!B15", "=Assumptions!B15", "$#,##0.00", "Proposed $19.00/month flat fee per account"),
        ("Gross Monthly Subscription Revenue", "=C13*C14", "=C13*C14", "$#,##0.00", "750 accounts * $19.00/month = $14,250.00 ARR driver"),
        ("Allocated Solution Operating Cost (AI + Infra)", "='Running Cost'!D10", "='Running Cost'!D10", "$#,##0.00", "Total operating cost of Cheerio Assist (~$250.95/month)"),
        ("Monthly Gross Profit", "=C15-C16", "=C15-C16", "$#,##0.00", "Monthly net contribution margin from Cheerio Assist Pro"),
        ("Gross Margin Percentage", "=C17/C15", "=C17/C15", "0.0%", "Exceptional 98.2% gross margin due to ultra-efficient LLM tokens"),
        ("Break-Even Paying Business Accounts", "=C16/C14", "=C16/C14", "#,##0", "Only 14 paying businesses needed to cover entire AI & infra cost!")
    ]

    for idx, (param, form_text, form_calc, fmt, rationale) in enumerate(pl_rows, 11):
        is_summary = idx in [15, 17, 18, 19]
        row_fill = fill_accent_green if idx == 17 else (fill_zebra if idx % 2 == 0 else PatternFill(fill_type=None))

        c1 = ws4.cell(row=idx, column=1, value=param)
        c1.font = font_bold if is_summary else font_regular
        c1.border = border_cell
        c1.fill = row_fill

        c2 = ws4.cell(row=idx, column=2, value=form_text)
        c2.font = font_italic
        c2.border = border_cell
        c2.fill = row_fill

        c3 = ws4.cell(row=idx, column=3, value=form_calc)
        c3.font = font_bold if is_summary else font_regular
        c3.number_format = fmt
        c3.alignment = align_right
        c3.border = border_cell
        c3.fill = row_fill

        c4 = ws4.cell(row=idx, column=4, value=fmt)
        c4.font = font_italic
        c4.alignment = align_center
        c4.border = border_cell
        c4.fill = row_fill

        c5 = ws4.cell(row=idx, column=5, value=rationale)
        c5.font = font_italic
        c5.border = border_cell
        c5.fill = row_fill

    # =========================================================================
    # SHEET 5: AUDIT AND SAVINGS
    # =========================================================================
    ws5 = wb.create_sheet(title='Audit & Savings')
    ws5.views.sheetView[0].showGridLines = True

    ws5['A1'] = "Cheerio Assist — Human Support Cost Savings & Governance Audit"
    ws5['A1'].font = font_title
    ws5['A2'] = "Quantifies net operational savings vs manual human support and defines 8 monthly audit thresholds."
    ws5['A2'].font = font_subtitle

    # Section 1: Net Support Savings
    headers5_a = ["Financial Metric", "Formula / Source", "Monthly Figure ($)", "Annualized ($)", "Strategic Impact Summary"]
    for col_idx, h in enumerate(headers5_a, 1):
        cell = ws5.cell(row=4, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_indigo_header
        cell.alignment = align_left if col_idx not in [3, 4] else align_right

    savings_rows = [
        ("Human Support Cost Without Solution (Status Quo)", "='Volume & Resolution'!C5*Assumptions!B14", "$#,##0.00", "=C5*12", "4,000 inbound queries * $8.50/human ticket = $34,000/mo spend"),
        ("Residual Human Support Cost With Cheerio Assist", "='Volume & Resolution'!C10*Assumptions!B14", "$#,##0.00", "=C6*12", "2,180 escalated/ineligible queries * $8.50/ticket = $18,530/mo spend"),
        ("Gross Monthly Human Labor Savings", "=C5-C6", "$#,##0.00", "=C7*12", "1,820 tickets eliminated from human queues = $15,470/mo saved"),
        ("Total Operating Cost of Cheerio Assist", "='Running Cost'!D10", "$#,##0.00", "=C8*12", "AI tokens + cloud infrastructure = $250.95/mo"),
        ("Net Monthly Support Cost Savings", "=C7-C8", "$#,##0.00", "=C9*12", "Gross Labor Savings minus Solution Cost = $15,219.05/mo Net!"),
        ("Percentage Cost Reduction on Inbound Support", "=C9/C5", "0.0%", "N/A", "Net 44.8% reduction in total customer support operating expenditure"),
        ("ROI Multiple on AI Investment", "=C7/C8", "0.0x", "N/A", "Every $1.00 spent on Cheerio Assist saves $61.64 in human support labor!")
    ]

    for idx, (metric, formula, fmt, annual_form, impact) in enumerate(savings_rows, 5):
        is_highlight = idx in [9, 10, 11]
        row_fill = fill_accent_green if is_highlight else (fill_zebra if idx % 2 == 0 else PatternFill(fill_type=None))

        c1 = ws5.cell(row=idx, column=1, value=metric)
        c1.font = font_bold if is_highlight else font_regular
        c1.border = border_cell
        c1.fill = row_fill

        c2 = ws5.cell(row=idx, column=2, value=formula)
        c2.font = font_italic
        c2.border = border_cell
        c2.fill = row_fill

        c3 = ws5.cell(row=idx, column=3, value=formula)
        c3.font = font_bold if is_highlight else font_regular
        c3.number_format = fmt
        c3.alignment = align_right
        c3.border = border_cell
        c3.fill = row_fill

        c4 = ws5.cell(row=idx, column=4, value=annual_form)
        c4.font = font_bold if is_highlight else font_regular
        c4.number_format = "$#,##0.00" if "N/A" not in annual_form else "@"
        c4.alignment = align_right
        c4.border = border_cell
        c4.fill = row_fill

        c5 = ws5.cell(row=idx, column=5, value=impact)
        c5.font = font_italic
        c5.border = border_cell
        c5.fill = row_fill

    # Section 2: Monthly Audit Checklist & Anomaly Thresholds
    ws5.cell(row=13, column=1, value="Monthly Engineering, Billing & Safety Audit Controls").font = font_bold

    headers5_b = ["Audit Check", "Target Cadence", "Recommended Alert Threshold", "Remediation Action if Triggered", "Owner"]
    for col_idx, h in enumerate(headers5_b, 1):
        cell = ws5.cell(row=14, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_indigo_header
        cell.alignment = align_left

    audit_checks = [
        ("1. AI Usage vs. Billed Customer Usage", "Monthly", "Variance > 5.0% between provider logs and internal counts", "Reconcile token telemetry; inspect gateway dropouts", "Product Analyst"),
        ("2. Token Consumption & Provider Invoices", "Monthly / Weekly", "MoM token growth > 25% without corresponding user growth", "Audit prompt token bloat; prune vector context chunk size", "AI Engineer"),
        ("3. Duplicate Usage Records / Loop Trap", "Daily Automated", "> 4 identical diagnostic queries from same user in 1 hour", "Break recursive loop; auto-escalate with pre-filled case", "AI Engineer"),
        ("4. Failed or Repeated API Requests", "Real-Time / Daily", "Client retry failure rate > 8.0%", "Check Meta Cloud API webhook latency & status page", "DevOps / Support Eng"),
        ("5. Unusual Cost per Resolution Spike", "Weekly", "Cost per automated resolution > $0.05", "Inspect model fallback routing; ensure mini-tier routing", "AI Engineer"),
        ("6. Escalation Rate Drift", "Weekly", "Escalation rate on eligible queries > 45.0%", "Review failed diagnostic paths; update decision tree rules", "Product Manager"),
        ("7. Revenue & Subscription Churn", "Monthly", "Pro Add-on monthly churn > 5.0%", "Interview churning accounts; refine custom CRM integrations", "Product Manager"),
        ("8. Gross Margin Degradation Floor", "Monthly", "Gross margin on Cheerio Assist Pro drops below 85.0%", "Review infrastructure allocations and token efficiency", "Product Analyst")
    ]

    for idx, (check, cadence, threshold, action, owner) in enumerate(audit_checks, 15):
        row_fill = fill_accent_amber if idx % 2 == 0 else fill_zebra
        for col_idx, text in enumerate([check, cadence, threshold, action, owner], 1):
            c = ws5.cell(row=idx, column=col_idx, value=text)
            c.font = font_regular if col_idx != 1 else font_bold
            c.border = border_cell
            c.fill = row_fill

    # Auto-adjust column widths across all sheets
    for ws in wb.worksheets:
        for col in ws.columns:
            max_len = 0
            col_letter = get_column_letter(col[0].column)
            for cell in col:
                val = str(cell.value or '')
                if cell.row in [1, 2]: # skip title lengths for col width
                    continue
                if len(val) > max_len:
                    max_len = len(val)
            ws.column_dimensions[col_letter].width = max(max_len + 4, 12)

    # Save workbook
    output_path = r"c:\Users\lenovo\OneDrive\Desktop\Assignment 1 Cheerio AI\cheerio_cost_billing_audit.xlsx"
    wb.save(output_path)
    print(f"Successfully generated {output_path}")

if __name__ == '__main__':
    create_cheerio_workbook()
