export interface Html2PdfInstance {
  set: (opts: Record<string, unknown>) => Html2PdfInstance;
  from: (el: HTMLElement) => Html2PdfInstance;
  save: () => Promise<void>;
}

declare global {
  interface Window {
    html2pdf?: () => Html2PdfInstance;
  }
}

let html2pdfLoader: Promise<NonNullable<Window["html2pdf"]>> | null = null;

/** Loads html2pdf.js from CDN at click time (avoids SSR bundling issues —
 * see dashboard.report.tsx history) and returns the factory function. */
export function loadHtml2Pdf() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("html2pdf can only run in the browser"));
  }
  if (window.html2pdf) return Promise.resolve(window.html2pdf);
  if (!html2pdfLoader) {
    html2pdfLoader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.3/html2pdf.bundle.min.js";
      script.async = true;
      script.onload = () => {
        if (window.html2pdf) resolve(window.html2pdf);
        else reject(new Error("html2pdf loaded but not found on window"));
      };
      script.onerror = () => reject(new Error("Failed to load PDF generator"));
      document.head.appendChild(script);
    });
  }
  return html2pdfLoader;
}

const DEFAULT_PDF_OPTS = {
  margin: 10,
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  pagebreak: { mode: ["avoid-all", "css", "legacy"] },
};

/** Renders a DOM node to a downloaded PDF file. */
export async function downloadNodeAsPdf(node: HTMLElement, filename: string) {
  const html2pdf = await loadHtml2Pdf();
  await html2pdf()
    .set({ ...DEFAULT_PDF_OPTS, filename })
    .from(node)
    .save();
}
