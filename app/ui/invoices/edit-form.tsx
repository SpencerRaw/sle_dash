"use client";

import { CustomerField, InvoiceForm } from "@/app/lib/definitions";
// import { updateInvoice } from "@/app/lib/actions";
import { updateInvoice, State } from "@/app/lib/actions";
import { useActionState } from "react";
import FloatingButton from "app/ui/invoices/FloatingButton";

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            选择患者
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={invoice.customer_id}
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
        </div>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">选择性别</legend>
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
          <label htmlFor="duration" className="mb-2 block text-sm font-medium">
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
            <div id="symptom-error" aria-live="polite" aria-atomic="true">
              {state.errors?.symptoms &&
                state.errors.symptoms.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
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
            <div
              id="clinical-symptoms-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.clinicalSymptoms &&
                state.errors.clinicalSymptoms.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>
        </div>

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
            <div
              id="thoracic-imaging-tests-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.thoracicImagingTests &&
                state.errors.thoracicImagingTests.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
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
                { label: "腹部B超异常", value: "abdominalUltrasoundAbnormal" },
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
            <div
              id="abdominal-imaging-tests-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.abdominalImagingTests &&
                state.errors.abdominalImagingTests.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
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
            <div
              id="cervical-vascular-imaging-tests-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.cervicalVascularImagingTests &&
                state.errors.cervicalVascularImagingTests.map(
                  (error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  )
                )}
            </div>
          </fieldset>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            确定金额
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice.amount}
                placeholder="输入金额"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">确定状态</legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === "pending"}
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
                  defaultChecked={invoice.status === "paid"}
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
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">保存</Button>
      </div>
      <FloatingButton />
    </form>
  );
}
