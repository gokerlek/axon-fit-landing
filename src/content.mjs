export const DEPLOY_URL = 'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgokerlek%2Faxon-fit';
export const DEMO_URL = process.env.DEMO_URL || 'https://axon-fit-demo-zeta.vercel.app/demo/';
export const REPO_URL = 'https://github.com/gokerlek/axon-fit';

export const features = [
  { number: '01', title: 'Danışan ve davet', text: 'Danışanını oluştur, erişimini yönet ve bağlantı veya QR koduyla davet et. Danışanın GitHub hesabına ihtiyacı yok.' },
  { number: '02', title: 'Kütüphane', text: 'Egzersiz, cihaz ve aparatlarını tek yerde düzenle. Hazır hareketlerin yanına kendi kayıtlarını ve muadillerini ekle.' },
  { number: '03', title: 'Şablon ve program', text: 'Şablonlardan veya boş bir sayfadan günler, evreler, setler ve dinlenme süreleriyle program hazırla. Danışan kendi programını da kurup paylaşabilir.' },
  { number: '04', title: 'Antrenman', text: 'Danışan telefondan setlerini kaydeder, dinlenmesini takip eder, seansı bitirir. Yapılanlar geçmiş ve özet ekranında görünür.' },
  { number: '05', title: 'İlerleme', text: 'Antrenman geçmişi, takvim, kişisel rekorlar, ölçümler ve eğilimler aynı akışta buluşur. Veriler yeni antrenmanlarla güncellenir.' },
  { number: '06', title: 'Kamerayla hareket ölçümü', text: 'Danışanın sağlık onayıyla önden ve yandan duruş, squat, diz ve omuz hareketi gibi dokuz görevde 2D açı özeti al. Hesaplama cihazda yapılır; görüntü gönderilmez veya saklanmaz. Bu klinik ya da 3D eklem ölçümü değildir.' },
  { number: '07', title: 'AI koç desteği', text: 'Kayıtları yorumla ve düzenlenebilir program taslağı hazırla. Doğal dille hedef yorumlamak için isteğe bağlı Gemini bağlantısı kullanılabilir.' },
  { number: '08', title: 'Kendi görünümün', text: 'Uygulama adını, logoyu, temayı ve renkleri kendi antrenörlük markana göre ayarla. Açık ve koyu görünüm arasında geç.' },
  { number: '09', title: 'Güncelleme ve telefon', text: 'Kararlı sürümleri panelden kontrol et ve uygun sürümleri onaylayarak güncelle. Canlı siteyi telefonda ana ekrana ekleyebilirsin.' },
];

export const setupSteps = [
  { title: 'Kendi kopyanı yayınla', text: 'GitHub ve Vercel hesabınla Deploy düğmesini aç. Kaynak kodun kendi hesabına kopyalanır ve Vercel projen oluşur.' },
  { title: 'Production adresinde kurulumu aç', text: 'İlk yayın ortam ayarı olmadan /install ekranını açar. Geçici Preview adresi yerine kalıcı Production adresini kullan.' },
  { title: 'GitHub erişimini hazırla', text: 'Kendi hesabında süreli Classic PAT üret. Özel veri repoları için repo ve delete_repo; eksik güncelleme workflow dosyası için workflow izinleri gerekir.' },
  { title: 'OAuth App oluştur', text: 'GitHub girişini kendi OAuth App bilginle kur. Callback adresi canlı alan adının sonuna /api/auth/github/callback eklenmiş hâliyle tam eşleşmeli.' },
  { title: 'Ayarları kendi projene aktar', text: 'Gemini anahtarını istersen atla. Otomatik aktarım için kendi kısa süreli Vercel tokenını kullan veya .env değerlerini Vercel Production ortamına manuel ekle.' },
  { title: 'Giriş yap ve danışanını davet et', text: 'Yeni yayın hazır olunca GitHub hesabınla giriş yap, görünümü ayarla ve ilk danışanına davet bağlantısı gönder.' },
];
