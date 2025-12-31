import { questions } from "../assets/question";

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

  // Count yes answers in question ranges
  const yes1to6 = yesList.filter((id) => id >= 1 && id <= 6).length;
  const yes7to10 = yesList.filter((id) => id >= 7 && id <= 10).length;

  // Rule: any "ใช่" in questions 7-10 => High risk
  if (yes7to10 > 0) {
    return ["high"];
  }

  // No yes answers in 7-10
  // Low risk: yes in 1-6 is 0-2
  if (yes1to6 <= 2) {
    return ["low"];
  }

  // Medium risk: yes in 1-6 is 3-5
  if (yes1to6 >= 3 && yes1to6 <= 5) {
    return ["medium"];
  }

  // High risk: yes in 1-6 is 6 (all of first six)
  if (yes1to6 >= 6) {
    return ["high"];
  }

  // Fallback to low
  return ["low"];
}
