"use client";
// import React, { useState } from 'react';
import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import { createInvoice, State } from "@/app/lib/actions";
import { useActionState } from "react";
import FloatingButton from "app/ui/invoices/FloatingButton";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
// import { createInvoice } from "@/app/lib/actions";
import { useState } from "react";

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);
  const [step, setStep] = useState(1); // 用于控制当前步骤
  const [showAISuggestions, setShowAISuggestions] = useState(false); // 用于控制AI建议显示
  const [medicalRecord, setMedicalRecord] = useState(`
    深圳市第二人民医院
    入院记录
    
    姓名：杨梅        性别：女        年龄：23岁
    科室：风湿免疫科        病房：828        住院号：100049531
    
    T: 36.3℃        P: 110次/分        R: 18次/分        BP: 88/62mmHg
    
    体格检查：
    发育正常，营养良好，面容无异常，表情自然，神志清楚，自主体位，查体合作。全身皮肤黏膜肤色正常，弹性正常，未见肝掌、未见蜘蛛痣，未见皮下出血点及瘀斑，毛发分布正常，右侧臀部及腰部皮肤温度高，弹性正常，未见肝掌、未见蜘蛛痣，双眼结膜无苍白、无充血，双侧巩膜无黄染，未见颈静脉怒张，甲状腺未见肿大，双侧肺部叩诊清音，双肺呼吸音清，未闻及干湿性啰音，心前区无隆起，心尖搏动不明显，心界不大，心率110次/分，律齐，各瓣膜听诊区未闻及病理性杂音。腹部平软，无压痛，反跳痛阴性，肝脾肋下未触及，Murphy征阴性。双肾区无叩痛，移动性浊音阴性。四肢无浮肿，关节无肿胀，压痛，活动度正常。双下肢无水肿。肌力、肌张力正常，病理征阴性。脊柱四肢外观正常，生理弯曲存在，未见畸形。神经系统检查：感觉运动正常，双侧病理征阴性。
    
    专科检查：
    精神状态可，毛发无稀疏，全身无皮疹，双眼结膜无苍白，水肿，口腔黏膜光滑，无糜烂，牙齿无脱落，咽无充血，扁桃体无肿大。颈软，无抵抗，气管居中，甲状腺未触及。双肺叩清音，呼吸音清，双肺未闻及干湿性啰音，心率110次/分，律齐，心界不大，各瓣膜听诊区未闻及病理性杂音。腹平软，无压痛，反跳痛阴性，肝脾未触及，Murphy征阴性。双肾区无叩痛，移动性浊音阴性。双上肢无浮肿，关节无畸形，活动自如，双下肢无浮肿。皮肤温暖，无紫绀，四肢肌力肌张力正常。双侧病理征阴性。
    
    辅助检查：
    2024-06-09 深圳市第二人民医院：怀疑脂肪肝；红细胞沉降率及血常规+超敏C反应蛋白检测：超敏C反应蛋白 79.05mg/L，血红蛋白 97.0g/L，白细胞计数 18.71×10^9/L，血小板计数 601.0×10^9/L，血红细胞沉降率 134.74mm/h。肝功能检测：谷丙转氨酶 22.31 U/L，谷草转氨酶 13.88 U/L。肾功能检测：肌酐 80.1μmol/L，尿素氮 5.8mmol/L。抗核抗体检测：ANA(+)，抗双链DNA抗体阴性。
    
    初步诊断：
    1. 肺部感染；2. 肺部阴影；3. 食管恶性肿瘤；4. 高血压；
    
    处理：
    建议住院治疗；积极抗感染治疗后复查；随访
    `);

  const aiSuggestions = {
    diagnosis: "AI诊断结果: 可能存在系统性红斑狼疮",
    severity: "AI诊断严重程度: 中度",
    recommendations: "下一步推荐检测项目: 血常规, 抗核抗体测试",
  };

  const downloadMedicalRecord = () => {
    const element = document.createElement("a");
    const file = new Blob([medicalRecord], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "medical_record.txt";
    document.body.appendChild(element);
    element.click();
  };

  const steps = 4; // 总步骤数
  const progressPercentage = (step / steps) * 100;

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  步骤 {step} / {steps}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {progressPercentage}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </div>
        {/* Customer Name */}
        {step === 1 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="customer"
                className="mb-2 block text-sm font-medium"
              >
                选择患者
              </label>
              <div className="relative">
                <select
                  id="customer"
                  name="customerId"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="customer-error"
                >
                  <option value="" disabled>
                    选择一个患者
                  </option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
              <div id="customer-error" aria-live="polite" aria-atomic="true">
                {state.errors?.customerId &&
                  state.errors.customerId.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <fieldset>
              <legend className="mb-2 block text-sm font-medium">
                选择性别
              </legend>
              <div className="rounded-md border border-gray-200 bg-white px-4 py-3">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      id="male"
                      name="gender"
                      type="radio"
                      value="male"
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="male"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      男性
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="female"
                      name="gender"
                      type="radio"
                      value="female"
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="female"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      女性
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>

            {/* 年龄 */}

            <div className="mb-4">
              <label htmlFor="age" className="mb-2 block text-sm font-medium">
                输入年龄
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="输入年龄"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  {/* <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="duration"
                className="mb-2 block text-sm font-medium"
              >
                输入病程（疾病持续时间）
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="duration"
                    name="duration"
                    type="text"
                    placeholder="输入病程"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>

            {/* 既往病史 */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">既往病史</label>
              <fieldset className="border border-gray-200 rounded-md bg-white p-4">
                <div className="relative">
                  {[
                    { label: "吸烟", value: "smoking" },
                    { label: "酗酒", value: "drinking" },
                    { label: "高血压病", value: "hypertension" },
                    { label: "糖尿病", value: "diabetes" },
                    { label: "冠心病", value: "coronaryHeartDisease" },
                    { label: "肿瘤", value: "cancer" },
                    { label: "乙肝", value: "hepatitisB" },
                    { label: "结核", value: "tuberculosis" },
                  ].map((history) => (
                    <div key={history.value} className="flex items-center mb-2">
                      <input
                        id={history.value}
                        name={history.value}
                        type="checkbox"
                        className="peer cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={history.value}
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        {history.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* 临床 */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                选择普遍临床症状
              </label>
              <fieldset className="border border-gray-200 rounded-md bg-white p-4">
                <div className="relative">
                  {[
                    { label: "面部红斑", value: "facialErythema" },
                    { label: "雷诺现象", value: "raynaudPhenomenon" },

                    { label: "发热", value: "fever" },
                    { label: "口腔溃疡", value: "oralUlcers" },
                    { label: "脱发", value: "hairLoss" },
                    { label: "关节疼痛", value: "jointPain" },
                    {
                      label: "肢端肌肉疼痛、无力",
                      value: "musclePainWeakness",
                    },

                    { label: "光过敏", value: "photosensitivity" },
                    { label: "水肿", value: "edema" },
                  ].map((symptom) => (
                    <div key={symptom.value} className="flex items-center mb-2">
                      <input
                        id={symptom.value}
                        name={symptom.value}
                        type="checkbox"
                        className="peer cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={symptom.value}
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        {symptom.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </>
        )}

        {step === 1 && (
          <div className="mb-4 flex gap-4">
            <button
              type="button"
              onClick={() => {
                setStep(2);
                setShowAISuggestions(false);
              }}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              进一步填写
            </button>
            <button
              type="button"
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className="rounded-lg bg-green-500 px-4 py-2 text-white"
            >
              AI建议
            </button>
          </div>
        )}

        {showAISuggestions && step === 1 && (
          <div className="mb-4 p-4 border rounded-md bg-gray-100">
            <p className="mb-2 text-sm font-medium">
              {aiSuggestions.diagnosis}
            </p>
            <p className="mb-2 text-sm font-medium">{aiSuggestions.severity}</p>
            <p className="text-sm font-medium">
              {aiSuggestions.recommendations}
            </p>
          </div>
        )}

        {/* 性别 */}
        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                特定于女性的症状
              </label>
              <fieldset className="border border-gray-200 rounded-md bg-white p-4">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "月经不规律", value: "menstrualStatus" },
                    { label: "流产", value: "miscarriage" },
                  ].map((symptom) => (
                    <div key={symptom.value} className="flex items-center">
                      <input
                        id={symptom.value}
                        name={symptom.value}
                        type="checkbox"
                        className="peer cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={symptom.value}
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        {symptom.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">其他症状</label>
              <fieldset className="border border-gray-200 rounded-md bg-white p-4">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      label: "新出现脑血管意外",
                      value: "newCerebrovascularAccident",
                    },
                    { label: "狼疮头痛", value: "lupusHeadache" },
                    { label: "血管炎表现", value: "vasculitisManifestation" },
                    { label: "精神异常", value: "psychiatricAbnormality" },
                    { label: "视力受损", value: "visualImpairment" },
                    {
                      label: "股骨头坏死",
                      value: "avascularNecrosisOfFemoralHead",
                    },
                    { label: "骨质疏松", value: "osteoporosis" },
                  ].map((symptom) => (
                    <div key={symptom.value} className="flex items-center">
                      <input
                        id={symptom.value}
                        name={symptom.value}
                        type="checkbox"
                        className="peer cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={symptom.value}
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        {symptom.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">服用药物</label>
              <fieldset className="border border-gray-200 rounded-md bg-white p-4">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "羟氯喹",
                    "甲氨蝶呤",
                    "硫唑嘌呤",
                    "来氟米特",
                    "吗替麦考酚酯",
                    "环孢素",
                    "雷公藤",
                    "白芍总苷",
                    "沙利度胺",
                    "柳氮磺胺嘧啶",
                    "环磷酰胺",
                    "类固醇",
                    "他克莫司",
                  ].map((medicine, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`medicine_${index}`}
                        name={`medicine_${index}`}
                        type="checkbox"
                        className="peer cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`medicine_${index}`}
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        {medicine}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="mb-4 flex gap-4">
            <button
              type="button"
              onClick={() => {
                setStep(3);
                setShowAISuggestions(false);
              }}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              进一步填写
            </button>
            <button
              type="button"
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className="rounded-lg bg-green-500 px-4 py-2 text-white"
            >
              AI建议
            </button>
          </div>
        )}
        {showAISuggestions && step === 2 && (
          <div className="mb-4 p-4 border rounded-md bg-gray-100">
            <p className="mb-2 text-sm font-medium">
              {aiSuggestions.diagnosis}
            </p>
            <p className="mb-2 text-sm font-medium">{aiSuggestions.severity}</p>
            <p className="text-sm font-medium">
              {aiSuggestions.recommendations}
            </p>
          </div>
        )}

        {/* Invoice Amount */}
        {step === 3 && (
          <>
            {/* 胸部影像学检查 */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                选择胸部影像学检查
              </label>
              <fieldset className="border border-gray-200 rounded-md bg-white p-4">
                <div className="relative">
                  {[
                    { label: "胸膜炎", value: "pleurisy" },
                    { label: "胸部CT", value: "chestCT" },
                  ].map((test) => (
                    <div key={test.value} className="flex items-center mb-2">
                      <input
                        id={test.value}
                        name={test.value}
                        type="checkbox"
                        className="peer cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={test.value}
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        {test.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* 腹部影像学检查 */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                选择腹部影像学检查
              </label>
              <fieldset className="border border-gray-200 rounded-md bg-white p-4">
                <div className="relative">
                  {[
                    {
                      label: "腹部B超异常",
                      value: "abdominalUltrasoundAbnormal",
                    },
                    { label: "胃肠镜异常", value: "gastroscopyAbnormal" },
                  ].map((test) => (
                    <div key={test.value} className="flex items-center mb-2">
                      <input
                        id={test.value}
                        name={test.value}
                        type="checkbox"
                        className="peer cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={test.value}
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        {test.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* 颈部血管影像学检查 */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                选择颈部血管影像学检查
              </label>
              <fieldset className="border border-gray-200 rounded-md bg-white p-4">
                <div className="relative">
                  {[
                    { label: "颈部血管斑块", value: "cervicalArteryPlaque" },
                    {
                      label: "颈部血管内膜增厚",
                      value: "cervicalArteryIntimalThickening",
                    },
                  ].map((test) => (
                    <div key={test.value} className="flex items-center mb-2">
                      <input
                        id={test.value}
                        name={test.value}
                        type="checkbox"
                        className="peer cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={test.value}
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        {test.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium"
              >
                输入金额
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="输入所需费用"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>

            {/* Invoice Status */}
            <fieldset>
              <legend className="mb-2 block text-sm font-medium">
                确定状态
              </legend>
              <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      id="pending"
                      name="status"
                      type="radio"
                      value="pending"
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="pending"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      治疗中 <ClockIcon className="h-4 w-4" />
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="paid"
                      name="status"
                      type="radio"
                      value="paid"
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="paid"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                    >
                      可出院 <CheckIcon className="h-4 w-4" />
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </>
        )}
      </div>

      {step === 3 && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setStep(4);
              setShowAISuggestions(false);
            }}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            编辑病历
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="mb-4">
          <label
            htmlFor="medicalRecord"
            className="mb-2 block text-sm font-medium"
          >
            病历
          </label>
          <textarea
            id="medicalRecord"
            name="medicalRecord"
            rows={6}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            value={medicalRecord}
            onChange={(e) => setMedicalRecord(e.target.value)}
          />
        </div>
      )}
      {step <= 3 && (
        <>
          <div className="mt-6 flex justify-end gap-4">
            {/* <a
      href="public/hero-desktop.png" // 替换为你要下载的文件路径
      download
      className="flex h-10 items-center rounded-lg bg-blue-100 px-4 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-200"
    >
      下载病历
    </a> */}

            <Link
              href="/dashboard/invoices"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              取消
            </Link>
            <Button type="submit">保存</Button>
          </div>
          <FloatingButton />
        </>
      )}
      {step === 4 && (
        <div className="mt-4 flex justify-end gap-4">
          <button
            type="button"
            onClick={downloadMedicalRecord}
            className="rounded-lg bg-green-500 px-4 py-2 text-white"
          >
            下载病历
          </button>
          <Link
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            取消
          </Link>
          <Button type="submit">保存</Button>
        </div>
      )}
    </form>
  );
}
