import React, { useState } from "react";
import { questions } from "../assets/question";
import { resultDetails } from "../assets/result";
import { calculateFinalResults } from "../utils/quizUtils";
import { FaRegSmile, FaRegMeh } from "react-icons/fa";
import { FaRegFaceFrown } from "react-icons/fa6";
import { MdOutlineReplay } from "react-icons/md";
const getQuestionText = (q) => {
  if (typeof q === "string") return q;
  if (!q) return "";
  return q.text ?? q.question ?? q.q ?? JSON.stringify(q);
};

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const finished = index >= (Array.isArray(questions) ? questions.length : 0);

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
  const results = finished ? calculateFinalResults(answers) : [];
  console.log(answers);

  console.log(results);
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
                <p className="text-xl text-[#5a4631] mb-4 font-bold">
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
                    const resultObj = resultDetails[resultId];
                    const riskConfig = {
                      low: {
                        textColor: "text-green-600",
                        color: "bg-green-500",
                        icon: <FaRegSmile size={56} />, // ความเสี่ยงต่ำ
                      },
                      medium: {
                        textColor: "text-yellow-600",
                        color: "bg-yellow-500",
                        icon: <FaRegMeh size={56} />, // ความเสี่ยงปานกลาง
                      },
                      high: {
                        textColor: "text-red-600",
                        color: "bg-red-500",
                        icon: <FaRegFaceFrown size={56} />, // ความเสี่ยงสูง
                      },
                    };
                    if (!resultObj) return null;

                    return (
                      <div
                        key={index}
                        className=" p-4 bg-[#5a4631] rounded-2xl mt-3 whitespace-pre-line "
                      >
                        <div
                          className={`${riskConfig[resultId].color} rounded-xl p-4 flex flex-col items-center `}
                        >
                          {riskConfig[resultId].icon}

                          <h2 className="text-2xl font-bold mt-1 ">
                            {resultObj.message}
                          </h2>
                        </div>

                        <h1 className="text-[#f6f1e8] mt-2 font-bold">
                          คำแนะนำ
                        </h1>
                        <div className="text-[#f6f1e8] text-left text-sm">
                          <ul className="list-disc list-inside ">
                            {resultObj.protect.split("\n").map((line, idx) => (
                              <li key={idx} className="">
                                {line.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex gap-3 justify-center mt-6 ">
                <button
                  onClick={() =>
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLSd12UTIiGvMC4mMvadvvq_BePUAjjvY5huNScYRC4SZbUneTg/viewform",
                      "_blank"
                    )
                  }
                  className="bg-[#ffe680] text-[#5a4631] px-4 py-2 rounded-lg font-medium border-2"
                >
                  แบบประเมินความพึ่งพอใจ
                </button>
              </div>
              <div className="flex gap-3 justify-center mt-2 ">
                <button
                  onClick={handleRestart}
                  className=" text-[#5a4631] px-4 py-2 rounded-lg font-medium"
                >
                  <MdOutlineReplay size={32} />
                </button>
              </div>
              <div className="left-1/2 translate-x-1  translate-y-10 w-full ">
                <h1 className="text-[#5a4631]">จัดทำโดย</h1>
                <h1 className="text-[#5a4631]">
                  นักศึกษาทันตสาธารณสุข ชั้นปีที่ 4
                </h1>
                <h1 className="text-[#5a4631]">
                  วิทยาลัยการสาธารณสุขสิรินธร จังหวัดยะลา
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
