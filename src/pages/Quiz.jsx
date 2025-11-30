import React, { useState } from "react";
import { questions } from "../assets/question";
import { resultMap } from "../assets/result";
import { BsEmojiDizzy, BsEmojiGrin, BsEmojiFrown } from "react-icons/bs";

function calculateFinalResults(answers) {
  // answers = ["ใช่","ไม่ใช่", ...] index 0-9

  const yesList = answers
    .map((ans, index) => (ans === "ใช่" ? index + 1 : null))
    .filter(Boolean);

  // Case 7 → ไม่ใช่ทั้งหมด
  if (yesList.length === 0) return [7];

  // Case 6 → เฉพาะข้อ 1  2 เท่านั้น
  const only1and2 =
    yesList.length > 0 && yesList.every((id) => id === 1 || id === 2);

  if (only1and2) return [6];

  // Case อื่นๆ → ให้ผลของข้อ 3–10 ที่ตอบ "ใช่"
  const resultList = yesList
    .filter((id) => id >= 3) // ตัดข้อ 1–2 ออก
    .map((id) => resultMap[id]?.id);

  const uniqueResultsList = [...new Set(resultList)];
  return uniqueResultsList;
}

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // true = ใช่, false = ไม่ใช่
  const finished = index >= (Array.isArray(questions) ? questions.length : 0);

  const getQuestionText = (q) => {
    if (typeof q === "string") return q;
    if (!q) return "";
    return q.text ?? q.question ?? q.q ?? JSON.stringify(q);
  };

  const handleAnswer = (value) => {
    setAnswers((prev) => [...prev, value]);
    setIndex((i) => i + 1);
  };

  const handleRestart = () => {
    setAnswers([]);
    setIndex(0);
  };

  // นับจำนวนใช่/ไม่ใช่
  // const yesCount = answers.filter(Boolean).length;
  // const noCount = answers.filter((a) => !a).length;

  // คำนวณความเสี่ยงตอนจบ
  const results = finished ? calculateFinalResults(answers) : null;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-8 font-display">
        <div className="w-full max-w-md">
          {!finished ? (
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full border-2 border-[#5a4631] ${
                        i < index ? "bg-white" : "bg-white"
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-8 bg-[#5a4631] rounded-full"
                    />
                  ))}
                </div>

                <div className="bg-[#ffe680] w-80 h-40 rounded-xl shadow-lg p-6 text-center border-4 border-[#5a4631] flex flex-col justify-center mx-auto">
                  <p className="text-2xl font-medium text-[#5a4631]">คำถาม</p>
                  <p className="text-4xl font-bold text-[#5a4631]">{`คำถามที่ ${
                    index + 1
                  }`}</p>
                </div>
              </div>

              <div className="bg-[#ffe680] shadow-lg border-4 border-[#5a4631] rounded-xl shadow p-6 text-center w-80">
                <p className="text-xl text-[#5a4631] mb-4">
                  {getQuestionText(questions[index])}
                </p>

                <div className="flex gap-4 justify-center mt-4">
                  <button
                    onClick={() => handleAnswer("ใช่")}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                  >
                    ใช่
                  </button>
                  <button
                    onClick={() => handleAnswer("ไม่ใช่")}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                  >
                    ไม่ใช่
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  {index + 1} / {questions.length}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative text-white p-4 rounded-xl text-center">
              <div className="absolute top-5 left-1/2  -translate-x-1/2 flex gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-white rounded-full border-2 border-[#5a4631]"
                  ></div>
                ))}
              </div>

              {/* ขดลวดอยู่บนขอบ */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-8 bg-[#5a4631] rounded-full"
                  ></div>
                ))}
              </div>
              <div className="bg-[#ffe680] rounded-xl shadow-lg p-6 text-center border-4 border-[#5a4631] flex flex-col justify-center">
                <p className="text-2xl font-bold text-[#5a4631]">
                  สรุปการประเมิน
                </p>
              </div>

              {/* <p className="mb-2">ใช่: {yesCount}</p>
              <p className="mb-2">ไม่ใช่: {noCount}</p> */}
              {results && (
                <div className="">
                  {/* ดึงผลลัพธ์แบบไม่ซ้ำ */}
                  {[...new Set(results)].map((resultId, index) => {
                    // หา object ใน resultMap ที่มี id ตรงกัน
                    const resultObj = Object.values(resultMap).find(
                      (r) => r.id === resultId
                    );
                    if (!resultObj) return null;

                    return (
                      <div
                        key={index}
                        className=" p-4 bg-[#5a4631] rounded-2xl mt-3 whitespace-pre-line"
                      >
                        <div className="bg-[#ffe680] rounded-xl p-4">
                          {" "}
                          <p className="text-2xl text-[#5a4631] font-bold">
                            {resultObj.message}
                          </p>
                        </div>

                        <h1 className="text-[#f6f1e8] mt-2 font-bold">
                          คำแนะนำ
                        </h1>
                        <p className="text-[#f6f1e8] text-left text-sm">
                          <ul className="list-disc list-inside ">
                            {resultObj.protect.split("\n").map((line, idx) => (
                              <li key={idx} className="">
                                {line.trim()}
                              </li>
                            ))}
                          </ul>
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex gap-3 justify-center mt-4 ">
                <button
                  onClick={handleRestart}
                  className="bg-[#ffe680] text-[#5a4631] px-4 py-2 rounded-lg font-medium"
                >
                  ทำใหม่
                </button>
              </div>
            </div>
          )}
          <div>
            <h1 className="text-[#5a4631]">จัดทำโดย</h1>
            <h1 className="text-[#5a4631]">
              นักศึกษาทันตสาธารณสุข ชั้นปีที่ 4
            </h1>
            <h1 className="text-[#5a4631]">
              วิทยาลัยการสาธารณสุขสิรินธร จังหวัดยะลา
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
