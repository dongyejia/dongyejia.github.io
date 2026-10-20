import React, { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export default function PdfViewer({ src, title }) {
  const [doc, setDoc] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(800);
  const wrapper = useRef(null);
  const canvas = useRef(null);
  useEffect(() => {
    const observer = new ResizeObserver(entries => setWidth(Math.max(200, entries[0].contentRect.width - 32)));
    if (wrapper.current) observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let disposed = false;
    const task = pdfjs.getDocument({ url: src, cMapUrl: '/pdfjs/cmaps/', cMapPacked: true, standardFontDataUrl: '/pdfjs/standard_fonts/' });
    setLoading(true); setError(''); setPage(1);
    task.promise.then(pdf => { if (!disposed) setDoc(pdf); }).catch(() => { if (!disposed) { setError('暂时无法载入文档，请使用上方的打开或下载按钮。'); setLoading(false); } });
    return () => { disposed = true; task.destroy(); };
  }, [src]);
  useEffect(() => {
    if (!doc) return;
    let disposed = false, renderTask;
    setLoading(true);
    doc.getPage(page).then(pdfPage => {
      if (disposed || !canvas.current) return;
      const original = pdfPage.getViewport({ scale: 1 });
      const viewport = pdfPage.getViewport({ scale: width / original.width });
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const target = canvas.current;
      target.width = Math.floor(viewport.width * ratio);
      target.height = Math.floor(viewport.height * ratio);
      target.style.width = viewport.width + 'px'; target.style.height = viewport.height + 'px';
      renderTask = pdfPage.render({ canvasContext: target.getContext('2d'), viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
      return renderTask.promise;
    }).then(() => { if (!disposed) setLoading(false); }).catch(err => { if (!disposed && err.name !== 'RenderingCancelledException') { setError('页面暂时无法显示，请下载原文档查看。'); setLoading(false); } });
    return () => { disposed = true; renderTask?.cancel(); };
  }, [doc, page, width]);
  return <div className="pdf-reader">
    <div className="pdf-controls"><button disabled={!doc || page <= 1} onClick={() => { setPage(page - 1); wrapper.current.scrollTop = 0; }}>← 上一页</button><span aria-live="polite">{doc ? `${page} / ${doc.numPages}` : '读取文档中'}</span><button disabled={!doc || page >= doc.numPages} onClick={() => { setPage(page + 1); wrapper.current.scrollTop = 0; }}>下一页 →</button></div>
    <div className="pdf-page" ref={wrapper} aria-busy={loading}>{loading && <p className="pdf-loading" role="status">正在渲染文档…</p>}{error && <p className="pdf-loading" role="alert">{error}</p>}<canvas ref={canvas} role="img" aria-label={`${title}，第 ${page} 页`} /></div>
  </div>;
}
