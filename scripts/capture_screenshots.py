import os
import subprocess
import time

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out_dir = r"c:\Users\lenovo\OneDrive\Desktop\Assignment 1 Cheerio AI\public\screenshots"
os.makedirs(out_dir, exist_ok=True)

screens = [
    ("01_support_home.png", "http://localhost:5173/?screen=home"),
    ("02_diagnostic_questionnaire.png", "http://localhost:5173/?screen=identify"),
    ("03_guided_troubleshooting.png", "http://localhost:5173/?screen=troubleshoot"),
    ("04_ai_support_copilot.png", "http://localhost:5173/?screen=ai_assistant"),
    ("05_resolution_confirmation.png", "http://localhost:5173/?screen=resolution"),
    ("06_warm_human_escalation.png", "http://localhost:5173/?screen=escalation"),
    ("07_meta_template_linter.png", "http://localhost:5173/?screen=template_linter"),
    ("08_chatbot_flow_debugger.png", "http://localhost:5173/?screen=flow_debugger"),
    ("09_shopify_integration_health.png", "http://localhost:5173/?screen=integration_health"),
]

for filename, url in screens:
    target_path = os.path.join(out_dir, filename)
    print(f"Capturing {filename} from {url}...")
    cmd = [
        edge_path,
        "--headless",
        "--disable-gpu",
        "--window-size=1280,820",
        "--hide-scrollbars",
        f"--screenshot={target_path}",
        url
    ]
    try:
        subprocess.run(cmd, timeout=8, check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except subprocess.TimeoutExpired:
        print(f"Timeout on {filename}, moving on...")
    time.sleep(1)

print("Done. Checking files in directory:")
for f in os.listdir(out_dir):
    p = os.path.join(out_dir, f)
    print(f"{f}: {os.path.getsize(p)} bytes")
