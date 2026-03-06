import { useState } from "react";
import { createWorker, PSM } from "tesseract.js";

// printed-only image
// const IMAGE_SRC = "/images/karticka-ver2.png";
const IMAGE_SRC = "/images/notepad.png";

const TesseractExample = () => {
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const preprocessImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        const scale = 3;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // light grayscale only
        for (let i = 0; i < data.length; i += 4) {
          const gray =
            0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas);
      };

      img.onerror = reject;
    });
  };

  const runOCR = async () => {
    setLoading(true);
    setProgress(0);
    setOcrText("");

    let worker;

    try {
      const processedCanvas = await preprocessImage(IMAGE_SRC);

      worker = await createWorker("ces", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round((m.progress || 0) * 100));
          }
        },
      });

      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SPARSE_TEXT,
        preserve_interword_spaces: "1",
      });

      const {
        data: { text },
      } = await worker.recognize(processedCanvas);

      setOcrText(text || "No text found.");
      console.log("OCR text:", text);
    } catch (error) {
      console.error("OCR error:", error);
      setOcrText("OCR failed.");
    } finally {
      if (worker) {
        await worker.terminate();
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Czech OCR Demo
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Plain printed Czech OCR with Tesseract.js
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-300">
                Source image
              </h2>

              <button
                onClick={runOCR}
                disabled={loading}
                className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? `Reading ${progress}%` : "Run OCR"}
              </button>
            </div>

            <div className="rounded-2xl bg-neutral-100 p-6">
              <img
                src={IMAGE_SRC}
                alt="printed card"
                className="mx-auto w-full max-w-[380px] object-contain"
              />
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur">
            <h2 className="mb-4 text-center text-sm font-medium text-zinc-300">
              OCR output
            </h2>

            <div className="min-h-[520px] rounded-2xl border border-white/10 bg-black p-5">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-6 text-zinc-100">
                {ocrText || "No OCR text yet."}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TesseractExample;
