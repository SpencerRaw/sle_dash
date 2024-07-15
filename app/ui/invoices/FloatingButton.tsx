// src/components/FloatingButton.tsx

import React, { useState } from "react";

const FloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportContent, setReportContent] = useState(
    "机器学习预测报告:\n\n- 预测模型: RandomForest\n- 准确率: 85%\n- 主要特征: 年龄, 症状A, 症状B\n- 建议治疗方案: 药物X, 药物Y\n\n备注: 这是一个自动生成的报告，可以在此编辑。"
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
    setShowReport(false);
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handleDownloadReport = () => {
    const element = document.createElement("a");
    const file = new Blob([reportContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "report.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="fixed bottom-4 left-45 z-50">
      {isOpen ? (
        <div className="w-96 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
          {showReport ? (
            <>
              <textarea
                className="w-full h-64 p-2 border border-gray-300 rounded-lg"
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  关闭
                </button>
                <button
                  onClick={handleDownloadReport}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  下载报告
                </button>
                <button
                  onClick={() => setShowReport(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  返回
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="font-semibold text-center">诊断预测</p>
              <p className="text-center mt-2">
                基于我们的AI模型，此患者可能患有SLE。
              </p>
              <p className="text-center mt-2">s+活动度得分: 7</p>
              <p className="text-center mt-2">
                请做进一步的诊断以获得更加准确的建议。
              </p>
              <div className="flex flex-col items-center mt-4">
                <div className="relative w-48 h-72 bg-white">
                  {/* 在这里加入人体轮廓图 */}
                  <img
                    src="https://t4.ftcdn.net/jpg/03/06/05/73/360_F_306057359_L3rCLJp1sD6iguWWhvmoed7GtBFtUyXf.jpg"
                    alt="人体轮廓图"
                    className="w-full h-full object-contain"
                  />
                  {/* 在人体图上加入红点 */}
                  <div className="absolute top-16 left-20 w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="absolute top-32 left-24 w-4 h-4 bg-red-500 rounded-full"></div>
                  {/* 添加更多红点根据需要 */}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="w-16 h-16 bg-red-200 border-4 border-gray-400 flex items-center justify-center rounded-lg">
                    蛋白
                  </div>
                  <div className="w-16 h-16 bg-gray-200 border-4 border-gray-400 flex items-center justify-center rounded-lg">
                    脂质
                  </div>
                  <div className="w-16 h-16 bg-red-200 border-4 border-gray-400 flex items-center justify-center rounded-lg">
                    血液
                  </div>
                  <div className="w-16 h-16 bg-red-200 border-4 border-gray-400 flex items-center justify-center rounded-lg">
                    脏器
                  </div>
                  <div className="w-16 h-16 bg-gray-200 border-4 border-gray-400 flex items-center justify-center rounded-lg">
                    内分泌
                  </div>
                  <div className="w-16 h-16 bg-gray-200 border-4 border-gray-400 flex items-center justify-center rounded-lg">
                    睡眠
                  </div>
                  {/* 添加更多正方形框根据需要 */}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  关闭
                </button>
                <button
                  onClick={handleShowReport}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  报告
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          AI
        </button>
      )}
    </div>
  );
};

export default FloatingButton;
