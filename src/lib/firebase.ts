const BREVO_FORM_URL =
  "https://efe515da.sibforms.com/serve/MUIFAP7Cze_dhLtUmtu7oQL3wLqsmv8danKyMsdeIT0ck2dnwI2a330uCX5Tumwgb8Imm0MX2mnH5t3-tQ6-18zoDszqGkCDurQON90FgTdeUvcWunifPa8lhq-u9Tu4bpwO3lY81at-_1Y3MIfSXlwFjbjnzxFHPDgR5Um3EbfnvIW_LIJZ5WRXdoIYhTZTqqwUmk6vWywzHIgFrg==";

export async function addWaitlistEntry(email: string, type: "fan" | "club") {
  const formData = new FormData();
  formData.append("EMAIL", email);
  formData.append("CATEGORY", type === "fan" ? "1" : "2");
  formData.append("email_address_check", "");
  formData.append("locale", "en");

  await fetch(BREVO_FORM_URL, {
    method: "POST",
    body: formData,
    mode: "no-cors",
  });
}

export async function submitTeamSuggestion(
  teamName: string,
  country?: string,
  sport?: string
) {
  const res = await fetch("/api/suggest-team", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teamName, country, sport }),
  });

  if (!res.ok) {
    throw new Error("Failed to submit suggestion");
  }
}
