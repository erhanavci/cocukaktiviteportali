# Çocuk Aktivite Portalı MVP

PDF brief'teki kapsamı temel alan bağımlılıksız web app prototipi.

## Çalıştırma

```bash
npm run dev
```

Ardından tarayıcıda:

```text
http://127.0.0.1:4173
```

## MVP İçeriği

- Ebeveyn için etkinlik keşfi, kategori/yaş/ilçe/tip/fiyat filtreleri
- Etkinlik detay, seans seçimi, çocuk profiliyle rezervasyon oluşturma
- Dummy POS mantığıyla confirmed booking ve komisyon hesaplama
- Favorilere ekleme/çıkarma ve rezervasyonlarım ekranı
- Satıcı panelinde dashboard, etkinlik listesi, takvim, rezervasyon ve gelir özeti
- Satıcı için pending etkinlik oluşturma akışı
- Admin panelinde satıcı/etkinlik onayı, ödeme/iade ve komisyon takibi
- Ebeveyn ve satıcı üyelik akışları ayrı rol olarak hazırlanmıştır
- Admin paneli sadece `esinaykanat@gmail.com` hesabıyla görünür
- Free aktif; Basic/Pro pasif/yakında pricing kartları

## Supabase Kurulumu

1. Supabase'de yeni proje oluşturun.
2. `SQL Editor` ekranında [supabase-schema.sql](supabase-schema.sql) dosyasındaki SQL'i çalıştırın.
3. `Authentication > Providers > Email` bölümünde Email provider açık olsun.
4. `Authentication > URL Configuration` bölümünde şunları ekleyin:
   - Site URL: Vercel domaininiz, ör. `https://cocuk-aktivite-portali.vercel.app`
   - Redirect URLs: aynı domain ve lokal test için `http://127.0.0.1:4173`
5. `Project Settings > API` ekranından `Project URL` ve `anon public key` değerlerini alın.
6. Lokal test için [config.js](config.js) içine geçici olarak yazabilirsiniz:

```js
window.SUPABASE_CONFIG = {
  url: "https://PROJECT_ID.supabase.co",
  anonKey: "SUPABASE_ANON_KEY",
};
```

Vercel deploy'da `config.js` boş kalabilir; `/api/config` endpoint'i Vercel environment variable değerlerini döndürür.

## GitHub'a Yükleme

```bash
git init
git add .
git commit -m "Initial MVP with Supabase auth"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git push -u origin main
```

GitHub'da önce boş bir repo oluşturun; sonra `KULLANICI_ADI/REPO_ADI` kısmını kendi repo adresinizle değiştirin.

## Vercel Deploy

1. Vercel'de `Add New > Project` ile GitHub reposunu seçin.
2. Framework preset olarak `Other` kalabilir.
3. Build command boş olabilir.
4. Output directory boş veya `.` olabilir.
5. Environment Variables bölümüne şunları ekleyin:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
6. Deploy sonrası çıkan domaini Supabase `Site URL` ve `Redirect URLs` alanlarına ekleyin.

## Notlar

Bu sürüm Vercel'e deploy edilebilen frontend MVP'dir. Supabase ayarı girilmezse demo modda çalışır. Supabase bağlandığında auth ve profil kayıtları veritabanına yazılır. Rezervasyon, ödeme ve komisyon ekranları hâlâ MVP simülasyonu olarak tutulmuştur; gerçek ödeme/webhook ve transaction tabanlı kontenjan kilidi sonraki backend adımıdır.
