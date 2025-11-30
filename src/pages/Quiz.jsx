import React, { useState } from "react";
import { questions } from "../assets/question";
import { BsEmojiDizzy, BsEmojiGrin, BsEmojiFrown } from "react-icons/bs";
// ฟังก์ชันคำนวณคะแนนและความเสี่ยงแบบง่าย
function calculateOralHealthScore(answers) {
  const totalScore = answers.filter(Boolean).length; // นับ true = ใช่
  let riskLevel = "Low";
  if (totalScore >= 4) {
    riskLevel = "High";
  } else if (totalScore >= 2) {
    riskLevel = "Moderate";
  }
  return { totalScore, riskLevel };
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
  const { riskLevel } = finished
    ? calculateOralHealthScore(answers)
    : { riskLevel: null };

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
                        i < index ? "bg-[#5a4631]" : "bg-white"
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
                    onClick={() => handleAnswer(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                  >
                    ใช่
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
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
            <div className="bg-[#5a4631] text-white p-6 rounded-xl text-center">
              <h2 className="text-2xl font-semibold mb-4">สรุปการประเมิน</h2>
              {/* <p className="mb-2">ใช่: {yesCount}</p>
              <p className="mb-2">ไม่ใช่: {noCount}</p> */}
              <div className="bg-white w-full h-50 rounded-lg justify-center items-center">
                {riskLevel === "Low" && (
                  <div className="h-50 flex flex-col justify-center items-center bg-[#F6F1E8] rounded-lg">
                    <div className="bg-green-100 p-8 rounded-full">
                      <BsEmojiGrin size={50} color="green"></BsEmojiGrin>
                    </div>
                    <div className="text-green-500 mt-2 text-2xl">
                      คุณมีความเสี่ยงต่ำ
                    </div>
                  </div>
                )}

                {riskLevel === "Moderate" && (
                  <div className="h-50 flex flex-col justify-center items-center bg-[#F6F1E8] rounded-lg">
                    <div className="bg-orange-100 p-8 rounded-full">
                      <BsEmojiFrown size={50} color="orange"></BsEmojiFrown>
                    </div>
                    <div className="text-orange-500 mt-2 text-2xl">
                      คุณมีความเสี่ยงปานกลาง
                    </div>
                  </div>
                )}

                {riskLevel === "High" && (
                  <div className="h-50 flex flex-col justify-center items-center bg-[#F6F1E8] rounded-lg">
                    <div className="bg-red-100 p-8 rounded-full">
                      <BsEmojiDizzy size={50} color="red"></BsEmojiDizzy>
                    </div>
                    <div className="text-red-500 mt-2 text-xl">
                      คุณมีความเสี่ยงปานกลาง
                    </div>
                  </div>
                )}
              </div>

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
        </div>
      </div>
    </>
  );
};

export default Quiz;
