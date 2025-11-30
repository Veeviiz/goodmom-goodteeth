import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz");
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-8 font-display">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative">
            {/* วงกลมสีขาวหลังขดลวด */}
            <div className="absolute top-1 left-1/2  -translate-x-1/2 flex gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-white rounded-full border-2 border-[#5a4631]"
                ></div>
              ))}
            </div>

            {/* ขดลวดอยู่บนขอบ */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-8 bg-[#5a4631] rounded-full"
                ></div>
              ))}
            </div>

            {/* การ์ดหลัก */}
            <div className="bg-[#ffe680] w-80 h-40 rounded-xl shadow-lg p-6 text-center border-4 border-[#5a4631] flex flex-col justify-center">
              <p className="text-2xl font-medium text-[#5a4631]">แบบประเมิน</p>
              <p className="text-4xl font-bold text-[#5a4631]">คุณแม่ฟันดี</p>
            </div>
          </div>
          <div className="flex flex-col  bg-[#5a4631] text-white p-4 rounded-xl w-80 text-center leading-relaxed shadow mt-8 justify-center items-center">
            <div className="bg-[#ffe680] rounded-xl w-[50%] py-1 mb-2">
              <p className="font-semibold text-[#5a4631] text-2xl">ประโยชน์</p>
            </div>

            <p className="text-sm px-2 text-center">
              ใช้ประเมินถึงการดูแลสุขภาพช่องปากของหญิงตั้งครรภ์เพื่อนำไปสู่การรักษาทางทันตกรรมที่เหมาะสมทันเวลาเพื่อลดผล
              กระทบต่อหญิงตั้งครรภ์และทารกในครรภ์
            </p>
          </div>
          <button
            onClick={startQuiz}
            className="
            mt-8
        px-10 py-3 
        bg-[#f2d35f] 
        text-[#4a4439] 
        font-bold 
        text-3xl 
        shadow 
        hover:scale-105 
        transition
        [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]
      "
          >
            เริ่ม
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
