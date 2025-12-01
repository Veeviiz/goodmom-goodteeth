export function calculateOralHealthScore(answers = []) {
  if (!Array.isArray(answers)) throw new Error("answers must be an array");
  const normalized = answers.slice(0, 5).map((v) => (v ? 1 : 0));
  while (normalized.length < 5) normalized.push(0);
  const score = normalized.reduce((s, v) => s + v, 0);
  const level = score <= 1 ? "Low" : score <= 3 ? "Moderate" : "High";
  return { score, level };
}

export function calculateFinalResults(answers = []) {
  const yesList = (answers || [])
    .map((ans, index) => (ans === "ใช่" ? index + 1 : null))
    .filter(Boolean);

  // Case 7 → ไม่ใช่ทั้งหมด
  if (yesList.length === 0) return [7];

  // Case 6 → เฉพาะข้อ 1 & 2 เท่านั้น
  const only1and2 =
    yesList.length > 0 && yesList.every((id) => id === 1 || id === 2);

  if (only1and2) return [6];

  // อื่น ๆ → ให้ผลของข้อ 3–10 ที่ตอบ "ใช่"
  const resultList = yesList.filter((id) => id >= 3);
  return [...new Set(resultList)];
}
