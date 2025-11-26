const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrbwgvdo";

const form = document.getElementById("msgForm");
const messageEl = document.getElementById("message");
const statusEl = document.getElementById("status");
const mailtoBtn = document.getElementById("mailtoBtn");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = messageEl.value.trim();
  if (!message) {
    statusEl.textContent = "Please write a message before sending.";
    return;
  }
  sendBtn.disabled = true;
  statusEl.textContent = "Sending...";

  try {
    const payload = { message };
    const resp = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (resp.ok) {
      statusEl.textContent = "Message sent! Thank you 😊";
      messageEl.value = "";
    } else {
      statusEl.textContent = "Unable to send via Formspree. Try mail client fallback.";
    }
  } catch (err) {
    statusEl.textContent = "Network error — try the mail client fallback.";
  } finally {
    sendBtn.disabled = false;
  }
});

mailtoBtn.addEventListener("click", () => {
  const body = encodeURIComponent(messageEl.value || "");
  const subject = encodeURIComponent("Anonymous message");
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});
