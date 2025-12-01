import { questions } from "../assets/question";
import { questionToResultId } from "../assets/result";
export function calculateFinalResults(answers = []) {
  const totalQuestions = Array.isArray(questions)
    ? questions.length
    : answers.length;

  // normalize to available questions, missing => falsy (treated as "ไม่ใช่")
  const norm = Array.from({ length: totalQuestions }, (_, i) => answers[i]);

  const isYes = (val) =>
    val === "ใช่" ||
    val === "ใช้" /* typo guard? optional */ ||
    val === true ||
    val === 1 ||
    val === "1";

  const yesList = [];
  for (let i = 0; i < totalQuestions; i++) {
    if (isYes(norm[i])) yesList.push(i + 1); // 1-based question id
  }

  // Case 7 → ไม่ใช่ทั้งหมด
  if (yesList.length === 0) return [7];

  // Case 6 → เฉพาะข้อ 1 &/หรือ 2 เท่านั้น (ไม่มีข้ออื่น)
  const only1and2 = yesList.every((id) => id === 1 || id === 2);
  if (only1and2) return [6];

  // อื่น ๆ → ให้ผลของข้อ 3–10 ที่ตอบ "ใช่"
  const mapped = yesList
    .filter((id) => id >= 3) // only questions 3..10 produce mapped results
    .map((qId) => questionToResultId[qId])
    .filter(Boolean);

  // If mapping produced nothing (edge-case), fallback:
  if (mapped.length === 0) {
    // If there are yes answers but none in 3..10 (should have been handled by only1and2),
    // return [6] as a safe fallback.
    return [6];
  }

  // unique result ids
  return [...new Set(mapped)];
}
