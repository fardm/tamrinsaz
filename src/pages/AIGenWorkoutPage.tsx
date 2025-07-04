import React, { useRef, useEffect, useState } from 'react';
import { Copy, Bot } from 'lucide-react';

// این کامپوننت صفحه مستقل برای تولید برنامه تمرینی با هوش مصنوعی است.
export function AIGenWorkoutPage() {
  const promptTextRef = useRef<HTMLTextAreaElement>(null); // رفرنس برای دسترسی به محتوای تکست‌آریا
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle'); // وضعیت دکمه کپی

  // متن پرامپت که کاربر می‌تواند آن را کپی کند
  const promptText = `یک برنامه بدنسازی بنویس که شامل ۴ جلسه باشد:
- جلسه ۱: سینه + جلو بازو
- جلسه ۲: پشت + لت + ساعد
- جلسه ۳: سرشانه + پشت بازو
- جلسه ۴: پا + شکم

از این قوانین پیروی کن:
۱. هر جلسه شامل تمرین‌هایی برای گروه عضلانی مشخص شده باشد، به‌طوری که هر گروه به طور کامل و متعادل درگیر شود.
۲. تعداد تمرین‌ها در هر جلسه حداقل ۵ تا ۷ حرکت باشد.
۳. تعداد ست‌ها و تکرارها متناسب با اصول هایپرتروفی باشد(مثلاً ۳ تا ۴ ست، ۸ تا ۱۵ تکرار).
۴. در تمریناتی مثل پلانک که تکرار معنا ندارد از توضیح مناسب استفاده کن(مثلا ۳ * ۱ دقیقه).
۵. تمرینات را فقط از لیست موجود در فایل exercises.ts که ارسال کردم انتخاب کن.
۶. خروجی را در قالب یک فایل JSON طبق ساختار زیر بساز (باحفظ نام فیلد فقط مقدار را بنویس):

{
  "sessions": [
    {
      "id": "1751438995832",
      "name": "جلسه 1",
      "exercises": [
        { "exerciseId": "46", "completed": false, "notes": "12*4" },
        { "exerciseId": "84", "completed": false, "notes": "15*3" }
      ],
      "createdAt": "2025-07-02T06:49:55.832Z"
    },
    {
      "id": "1751439812805",
      "name": "جلسه 2",
      "exercises": [
        { "exerciseId": "17", "completed": false, "notes": "12*4" },
        { "exerciseId": "15", "completed": false, "notes": "12*3" }
      ],
      "createdAt": "2025-07-02T07:03:32.805Z"
    }
  ]
}
`;

  // مدیریت کپی کردن متن به کلیپ‌بورد
  const handleCopy = () => {
    if (promptTextRef.current) {
      promptTextRef.current.select();
      document.execCommand('copy'); // استفاده از execCommand برای سازگاری بیشتر در محیط‌های مختلف
      setCopyStatus('copied'); // تغییر وضعیت دکمه به "کپی شد!"
      setTimeout(() => setCopyStatus('idle'), 2000); // بازگشت به حالت اولیه پس از 2 ثانیه
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* عنوان صفحه */}
      <div className="mb-8 flex items-center space-x-3 space-x-reverse">
        <Bot className="h-7 w-7 text-gray-700 dark:text-gray-300" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ساخت برنامه با AI
        </h1>
      </div>

      {/* بخش توضیحات و پرامپت */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col">
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-right leading-relaxed">
          برای ساخت برنامه می‌توانید از هوش مصنوعی کمک بگیرید. با دستور زیر یک کد JSON دریافت می‌کنید که از بخش "وارد کردن برنامه" می‌توانید آن را به سایت اضافه کنید.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-right leading-relaxed">
          1. یکی از سرویس‌های هوش مصنوعی را باز کنید. مدل‌هایی مثل ChatGPT و Gemini در این زمینه عملکرد خوبی دارند.</p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-right leading-relaxed">
          2. فایل <a href="https://github.com/fardm/tamrinsaz/blob/main/src/data/exercises.ts" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" target="_blank" rel="noopener noreferrer"> exercises.ts </a> را دانلود کرده و در محیط چت آپلود کنید.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-right leading-relaxed">
          3. سپس از پرامپت زیر استفاده کنید:
        </p>

        {/* کادر پرامپت با قابلیت اسکرول و دکمه کپی */}
        <div className="relative flex-grow rounded-lg bg-gray-100 dark:bg-gray-700 p-4 mb-4">
          <textarea
            ref={promptTextRef}
            readOnly
            value={promptText}
            className="w-full h-full bg-transparent text-gray-900 dark:text-white text-sm leading-relaxed resize-none outline-none border-none overflow-auto pr-10"
            style={{ minHeight: '200px', maxHeight: 'calc(90vh - 300px)' }} // ارتفاع ثابت برای تکست‌آریا با اسکرول
          />
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={copyStatus === 'copied' ? 'کپی شد!' : 'کپی به کلیپ بورد'}
          >
            {copyStatus === 'copied' ? (
              <span className="text-xs">کپی شد!</span>
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4 text-right leading-relaxed">
          ℹ️ بر اساس نیاز خود می‌توانید تعداد جلسات، تمرین‌ها و تکرارها را در پرامپت تغییر دهید. اما ساختار خروجی حتما باید مانند کد نمونه باشد تا تمرین ساخته شده به سایت اضافه شود.
        </p>
      </div>
    </div>
  );
}
