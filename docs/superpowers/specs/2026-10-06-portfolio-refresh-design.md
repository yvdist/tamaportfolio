# Portfolio refresh untuk job hunting (Senior Full-Stack)

## Context

Portfolio `tama-portfolio` masih berisi konten dummy: project fiktif, tech stack yang tidak cocok dengan CV, email dan link GitHub palsu, form kontak yang hanya memunculkan `alert`. Tidak ada section pengalaman kerja sama sekali. Yudistira akan job hunting dengan target **Senior Full-Stack Engineer**, jadi situs harus memuat data asli dari CV (Maret 2026) dan menonjolkan hasil kerja, tanpa kehilangan rasa minimalis, artsy, dan menenangkan (rujukan: situs Ichiko Aoba dan Haruka Nakamura).

Keputusan yang sudah disepakati:

| Topik           | Keputusan                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Positioning     | Senior Full-Stack (Laravel + SvelteKit), AI integration sebagai nilai tambah                        |
| Struktur        | Satu halaman utama + halaman case study `/work/[slug]`                                              |
| Project klien   | Tanpa screenshot, nama klien disamarkan, case study berbasis teks                                   |
| Project pribadi | Dari pinned repo `github.com/yvdist`                                                                |
| Gambar          | Unsplash dikurasi ulang, disimpan di repo (bukan hotlink)                                           |
| Kontak          | Form dihapus, diganti link langsung                                                                 |
| CV              | Tombol download disiapkan; tampil hanya jika `static/cv.pdf` ada (versi publik disiapkan Yudistira) |

## Desain

### 1. Lapisan data (`src/lib/data/`)

Semua konten keluar dari komponen, masuk ke file TypeScript bertipe. Komponen hanya merender.

- `profile.ts`: nama, peran, lokasi, ringkasan, email (`yudistiraeka.pratama012@gmail.com`), LinkedIn (`in/yudistira-eka-pratama`), GitHub (`yvdist`), `siteUrl`, `hasCv`.
- `experience.ts`: IGCY, Alturian Indonesia, Atara SaQT Group, The Prime (dua peran). Tiap entri: peran, perusahaan, periode, 2–3 poin terpilih, stack. Magang data entry 2020 tidak ditampilkan.
- `projects.ts` (ganti isi fiktif yang ada): tipe `Project` baru dengan `slug`, `kind: 'client' | 'personal'`, `title`, `summary`, `year`, `role`, `stack`, `problem`, `approach[]`, `outcome[]`, `links?: { demo, repo }`, `cover`.
- `skills.ts`: grup Backend, Frontend, AI & LLM, Mobile, Tools, sesuai CV.

Enam case study:

| Slug                             | Jenis   | Sumber                                                           |
| -------------------------------- | ------- | ---------------------------------------------------------------- |
| `hris-platform`                  | klien   | HRIS internal ~80 karyawan, dibangun dari nol, UI + backend      |
| `recruitment-platform`           | klien   | Platform rekrutmen + AI CV parsing, live di produksi             |
| `ai-conversation-classification` | klien   | Batch classification 100.000+ percakapan, biaya API turun 90%+   |
| `mall-ai-helper`                 | klien   | AI Helper untuk mal ritel besar di Malaysia, RAG                 |
| `petakin`                        | pribadi | Floor-plan mal ke SVG editable, demo + repo                      |
| `kikoeru-lab`                    | pribadi | Penambang ide dari Hacker News/Reddit dengan Gemini, demo + repo |

`discover-almaarif` dan `omah` tampil sebagai daftar kecil "also" dengan link keluar, tanpa halaman sendiri. `nike-landing-page` dan `photographer-portfolio` tidak ditampilkan (level belajar, melemahkan positioning senior).

Teks case study ditulis dari CV dan README repo. Tidak ada angka atau klaim yang tidak ada di sumber. Nama klien tidak disebut.

### 2. Routing

- `src/routes/+layout.ts`: `export const prerender = true` (situs sepenuhnya statis).
- `src/routes/work/[slug]/+page.ts`: `load` mencari project berdasarkan slug, `error(404)` jika tidak ada; `entries()` mengembalikan semua slug.
- `src/routes/work/[slug]/+page.svelte`: judul, ringkasan, meta (tahun, peran, stack), lalu Masalah / Pendekatan / Hasil, link demo dan repo untuk project pribadi, navigasi ke project berikutnya.

### 3. Halaman utama (`src/routes/+page.svelte`)

Urutan baru: Navbar, Hero, About, Experience, Selected Work, Stack, Contact, Footer.

- **Hero**: nama dan "Senior Software Engineer, full-stack" jadi teks utama yang terbaca; teks Jepang turun jadi aksen kecil.
- **About**: ringkasan dari CV (4+ tahun, klien Indonesia dan Malaysia), nada personal dipertahankan.
- **Experience** (baru, `Experience.svelte`): daftar tenang, satu baris per peran dengan periode di sisi, poin terpilih di bawahnya.
- **Selected Work** (`Projects.svelte` dan `Work.svelte` dilebur jadi `SelectedWork.svelte`): enam kartu dari `projects.ts`, tiap kartu link ke `/work/[slug]`.
- **Stack** (`Skills.svelte`): grup dari `skills.ts`.
- **Contact**: form dihapus; email, LinkedIn, GitHub tampil besar; tombol CV jika `hasCv`.
- `ExploreMyWork.svelte` dan `Divider.svelte` dipertahankan sebagai jeda foto di antara section.

`Navbar.svelte`: link jadi `/#about`, `/#experience`, `/#works`, `/#contact` supaya berfungsi dari halaman case study; tambah varian solid untuk halaman tanpa hero foto.

### 4. Poles visual

- **Tipografi**: font di-host sendiri lewat `@fontsource` (EB Garamond untuk heading, satu mincho Jepang untuk aksen), menggantikan `@import` Google Fonts yang sekarang dimuat tapi tidak dipakai. Token font masuk ke `@theme` di `src/routes/layout.css`.
- **Keterbacaan**: label minimal 11px, teks isi 15–16px, teks yang harus dibaca minimal `charcoal/60`. Rasa lapang dijaga lewat tracking dan ruang kosong, bukan ukuran huruf mikro.
- **Gerak**: fade-in halus saat scroll lewat satu Svelte action (`src/lib/actions/reveal.ts`, IntersectionObserver), mati saat `prefers-reduced-motion`.
- **Gambar**: 6–8 foto Unsplash satu nada, diunduh sebagai WebP ke `static/images/`, dengan `width`/`height`, `loading="lazy"`, dan `alt` yang benar. Kredit fotografer di footer.

### 5. SEO dan metadata

Komponen `Seo.svelte` dipakai di kedua route: title, meta description, canonical, Open Graph, Twitter card. Tambah gambar OG statis, favicon pengganti default Svelte, dan `sitemap.xml` yang di-prerender.

### 6. Sintaks Svelte

Komponen yang disentuh (hampir semua) dipindah ke runes Svelte 5 (`$state`, `$props`, `onclick`), karena `on:click` sudah deprecated dan layout sudah pakai runes. `CLAUDE.md` diperbarui mengikuti.

## File utama

- Baru: `src/lib/data/{profile,experience,skills}.ts`, `src/lib/components/{Experience,SelectedWork,Seo}.svelte`, `src/lib/actions/reveal.ts`, `src/routes/+layout.ts`, `src/routes/work/[slug]/{+page.ts,+page.svelte}`, `src/routes/sitemap.xml/+server.ts`, `static/images/*`.
- Diubah: `src/lib/data/projects.ts`, `src/routes/+page.svelte`, `src/routes/layout.css`, `Navbar`, `Hero`, `About`, `Skills`, `Contact`, `Footer`, `ExploreMyWork`, `Divider`, `package.json`, `CLAUDE.md`.
- Dihapus: `src/lib/components/{Projects,Work}.svelte`.

## Di luar cakupan

Blog, dark mode, CMS, multi-bahasa, analytics, form kontak dengan backend, pembaruan isi CV PDF.

## Langkah setelah disetujui

1. Simpan desain ini ke `docs/superpowers/specs/2026-10-06-portfolio-refresh-design.md`.
2. Susun rencana implementasi bertahap (skill writing-plans), urutan: data, routing, komponen, visual, SEO.
3. Implementasi per tahap; draf teks case study diserahkan untuk direview sebelum final.

## Verifikasi

- `npm run check` dan `npm run lint` lolos.
- `npm run build` berhasil; keenam `/work/<slug>` dan `sitemap.xml` ter-prerender.
- `npm run preview`, lalu cek di browser pada lebar mobile dan desktop: semua anchor navbar bekerja dari `/` dan dari halaman case study, slug tak dikenal memberi 404, tidak ada request gambar ke `images.unsplash.com`, tidak ada sisa teks dummy (`example.com`, `github.com/yudistira`, judul fiktif).
- Tombol CV tidak tampil selama `static/cv.pdf` belum ada.
