# Axon Fit tanıtım sitesi

Axon Fit'in tek sayfalık tanıtım sitesi. Program, antrenman, ölçüm, kamera analizi ve kendi hesabında kurulum akışını anlatır. Görseller gerçek uygulamadan alınmıştır. Animasyonlar Motion ile çalışır ve azaltılmış hareket tercihini izler.

Canlı demo ayrı projededir: https://github.com/gokerlek/axon-fit-demo. Asıl uygulama ve kurulum kaynağı: https://github.com/gokerlek/axon-fit.

## Geliştirme

Node.js 22 veya yenisiyle:

```bash
npm ci
npm run check
```

`dist/` statik çıktıdır. `DEMO_URL` verilirse demo bağlantıları o adrese yönlenir; varsayılan adres `https://axon-fit-demo-zeta.vercel.app/demo/`. `SITE_URL` canonical ve sitemap için kullanılabilir; Vercel Production URL otomatik algılanır.

## Vercel

Bu repoyu ayrı bir Vercel projesine bağla. Framework: Other, Build Command: `npm run build`, Output Directory: `dist`. Bu projeye uygulama sırları veya danışan verileri ekleme.
