// Indonesian text for the fields that are translated. Everything else (names, titles, stacks,
// links, images, periods) is taken from the English data files; `content.ts` merges the two and
// fails the build when an entry here is missing or has a different number of items.

export const profileId = {
	focus: 'Full-stack · Laravel & frontend modern · AI-driven apps',
	location: 'Jakarta Selatan, Indonesia',
	description:
		'Senior software engineer di Jakarta Selatan yang membangun aplikasi web full-stack, sistem enterprise, dan AI-driven apps untuk klien di ASEAN.',
	about: [
		'Saya Yudistira Eka Pratama, senior software engineer yang berbasis di Jakarta Selatan. Selama hampir lima tahun saya membangun aplikasi web full-stack, sistem enterprise, dan AI-driven apps untuk klien di ASEAN.',
		'Di backend saya paling banyak bekerja dengan PHP dan Laravel. Di frontend saya berpindah framework sesuai kebutuhan proyek: React, Next.js, Svelte, Angular, Ionic, Alpine. Belakangan sebagian besar pekerjaan saya AI-driven: asisten, pipeline dokumen, dan tools yang memakai model bahasa untuk keperluan praktis.',
		'Saya suka memegang satu masalah dari awal sampai akhir, dari sketsa arsitektur pertama sampai sistemnya berjalan di production. Di luar pekerjaan: film dan musik.'
	]
};

export interface ExperienceId {
	note?: string;
	location: string;
	/** One list per role, in the order of `roles` in `experience.ts`. */
	points: string[][];
}

/** Keyed by `company`. */
export const experienceId: Record<string, ExperienceId> = {
	IGCY: {
		note: 'Grup Alturian',
		location: 'Jakarta Selatan',
		points: [
			[
				'Satu-satunya engineer di divisi proyek berbasis AI, melapor ke CTO: merencanakan, membangun, dan men-deploy AI-driven apps untuk klien dan untuk perusahaan.',
				'Merancang dan membangun direktori mal interaktif untuk sebuah grup ritel besar, kini berjalan di beberapa mal: penunjuk arah antarlantai dalam 2D dan 3D, dengan panel admin yang dikelola sendiri oleh tim mal.',
				'Membangun sendiri produk in-house pertama perusahaan: platform AI multi-tenant dengan inti Laravel dan layanan agen Python, yang melayani asisten di web, Telegram, dan WhatsApp.',
				'Lead engineer untuk asisten belanja AI di kiosk toko dan mal. Juga membangun chatbot layanan pelanggan yang membaca data bisnis terkini, asisten karyawan yang jawabannya dari buku panduan disertai nomor halaman, dan pipeline dokumen dengan OCR, memakai OpenAI, Claude, dan Gemini.'
			],
			[
				'Membangun sendiri portal lowongan kerja untuk sebuah peritel fesyen, dari repository kosong sampai production. Kandidat mengisi profil secara manual atau profilnya terisi dari CV yang diunggah.',
				'Mengadaptasi platform HR yang dibangun untuk klien tersebut menjadi HRIS internal perusahaan untuk sekitar 80 karyawan, dengan PWA karyawan berbasis Angular dan Ionic serta dashboard admin dengan akses berbasis peran.',
				'Merancang arsitektur dan alur kerja teknis untuk proyek klien baru, serta me-review kode rekan satu tim.'
			],
			[
				'Bergabung dengan proyek ERP sebuah peritel fesyen yang sudah berjalan jauh dan mengerjakan berbagai modulnya, berlanjut hingga peran senior: pengadaan, faktur vendor, nota kredit dan debit, penggajian, pengelolaan shift, dan unggah jurnal.',
				'Membangun fitur untuk aplikasi loyalitas peritel yang sama beserta back office-nya: poin, hadiah, undian, hadiah ulang tahun, dan tingkatan member.',
				'Mengerjakan aplikasi merchandising untuk sebuah klien ritel swalayan, mencakup alur inventori dan stok.'
			]
		]
	},
	'The Prime': {
		location: 'Cianjur, Jawa Barat',
		points: [
			[
				'Membangun REST API dan fitur backend dengan Laravel di sebuah software house yang melayani bisnis lokal, sekolah, dan klien terkait pemerintah, dengan hingga lima proyek aktif dalam sebulan.',
				'Proyeknya antara lain aplikasi transportasi daerah dengan tiket dan top-up, sistem e-commerce dan inventori, serta platform penugasan guru untuk sebuah unit di Kementerian Pendidikan. Mengintegrasikan payment gateway dan API produk digital.'
			],
			[
				'Di samping peran backend, membangun aplikasi Flutter lintas platform dengan BLoC dan GetX, termasuk aplikasi pemesanan tiket kereta yang dipesan oleh sebuah pemerintah provinsi.'
			]
		]
	},
	Freelance: {
		location: 'Cianjur, Jawa Barat',
		points: [
			[
				'Mengambil pekerjaan berbayar sambil menyelesaikan SMK: landing page, mengubah desain UI menjadi HTML dan CSS, aplikasi Laravel kecil, serta situs portofolio dan template.'
			]
		]
	}
};

export interface ProjectId {
	summary: string;
	role: string;
	problem: string;
	approach: string[];
	outcome: string[];
	/** Alt text per screenshot, in the order of `shots` in `projects.ts`. */
	shotAlts?: string[];
}

/** Keyed by `slug`. Titles stay in English, as on the social images and the CV. */
export const projectsId: Record<string, ProjectId> = {
	'interactive-mall-directory': {
		summary:
			'Sistem penunjuk arah layar sentuh untuk pusat perbelanjaan: cari toko, lalu lihat rutenya digambar melintasi lantai, dalam 2D atau 3D.',
		role: 'Lead engineer, backend dan frontend',
		problem:
			'Pengunjung mal besar berlantai banyak perlu menemukan toko dan sampai ke sana, dari kiosk atau dari ponsel sendiri. Tim mal, di sisi lain, perlu menjaga data lantai, tenant, dan rute tetap terkini tanpa memanggil engineer.',
		approach: [
			'Rute dihitung di server dengan Dijkstra pada graf waypoint dan koridor. Rute antarlantai melewati lift, eskalator, dan tangga yang diberi bobot waktu tempuh, tidak pernah melewati lantai yang sama dua kali, dan mengabaikan segmen koridor yang akan memotong sebuah unit.',
			'Tampilan bawaan adalah peta 2D di atas Leaflet, dengan pencarian lewat keyboard di layar, penelusuran kategori, dan rute sekali ketuk ke fasilitas terdekat. Rute digambar dan dianimasikan lantai demi lantai.',
			'Tampilan 3D dengan three.js diekstrusi dari denah lantai yang sama dan baru dimuat saat dibuka, dengan karakter berjalan yang mengikuti rute. Geometri digabung dan label diambil dari satu texture atlas, sehingga tetap berjalan baik di perangkat kiosk.',
			'Panel admin membuat tim mal bisa mengerjakan sisanya sendiri: editor visual waypoint dan koridor, pengelola koneksi antarlantai, editor geometri 3D, perancang denah lantai, pengelolaan tenant, iklan, dan kiosk, serta dashboard kesehatan aplikasi.',
			'Setiap kiosk tahu posisinya, sehingga setiap rute berawal dari posisi kiosk itu. Kode QR bertanda tangan memindahkan rute ke ponsel pengunjung, dan antarmukanya tersedia dalam bahasa Inggris, Melayu, dan Mandarin.'
		],
		outcome: [
			'Berjalan di production di beberapa mal milik sebuah grup ritel besar di Malaysia, dilayani dari satu instalasi.',
			'Penunjuk arah 2D dan 3D di tujuh lantai, dari kiosk dan ponsel.',
			'Routing, geometri, dan editor-editornya tercakup oleh test suite PHPUnit dan Vitest.'
		]
	},
	'multi-tenant-ai-platform': {
		summary:
			'Platform yang memberi bisnis jasa dan ritel asisten AI masing-masing, terhubung ke cabang, katalog, dan booking mereka.',
		role: 'Satu-satunya engineer',
		problem:
			'Sebuah klinik atau salon menginginkan asisten yang menjawab pelanggan di web, Telegram, dan WhatsApp dari datanya sendiri. Setiap bisnis harus sepenuhnya terpisah dari yang lain.',
		approach: [
			'Sistem dibagi dua. Aplikasi Laravel menjadi system of record untuk tenant, cabang, katalog, booking, keluhan, FAQ, dan broadcast. Layanan Python terpisah menjalankan agen penalaran dan tidak menyimpan state sendiri.',
			'Agen hanya menjangkau data bisnis dengan memanggil balik Laravel lewat endpoint tool yang ditandatangani dengan HMAC, sehingga setiap jawaban melewati pemeriksaan tenant dan peran yang sama dengan aplikasi web.',
			'Retrieval berjalan di atas vector database. Sebelum memilih, saya membuat tool kecil untuk membandingkan dua kandidat pada dokumen yang sama.',
			'Guardrail menjaga asisten tetap pada topik dan menolak hal di luar lingkup bisnis, dan jawaban di-stream ke pelanggan selagi dihasilkan.'
		],
		outcome: [
			'Produk in-house pertama perusahaan, dirancang dan dibangun oleh satu engineer.',
			'Satu asisten per bisnis di web, Telegram, dan WhatsApp, dengan tenant yang terisolasi satu sama lain.',
			'Automated test dan laporan evaluasi di sisi PHP maupun Python.'
		]
	},
	'hris-platform': {
		summary:
			'Platform HR yang awalnya dibangun untuk sebuah peritel fesyen, lalu diadaptasi menjadi HRIS internal untuk sekitar 80 karyawan.',
		role: 'Full-stack engineer, UI dan backend',
		problem:
			'Dua organisasi membutuhkan satu tempat untuk urusan HR sehari-hari: presensi, cuti, pemantauan KPI, slip gaji, struktur organisasi, dan profil karyawan. Organisasi kedua punya cara kerja dan tampilan sendiri.',
		approach: [
			'Membangun modul HR untuk sebuah peritel fesyen di Malaysia: pencatatan presensi, pengelolaan cuti, pemantauan KPI, pembuatan slip gaji, struktur organisasi, dan profil.',
			'Mengadaptasi fondasi yang sama menjadi HRIS internal perusahaan saya sendiri, dengan merombak alur dan desainnya agar sesuai dengan cara kerja perusahaan.',
			'Menghadirkan PWA untuk karyawan dengan Angular dan Ionic, serta dashboard admin dengan kontrol akses berbasis peran, pengelolaan karyawan dan slip gaji, dan pemantauan operasional.'
		],
		outcome: [
			'HRIS internal ini melayani sekitar 80 karyawan.',
			'Dua organisasi berjalan di atas satu fondasi bersama.'
		]
	},
	'recruitment-platform': {
		summary:
			'Portal lowongan kerja untuk sebuah peritel fesyen, dibangun sendiri dari repository kosong sampai production, dengan profil kandidat yang terisi dari CV yang diunggah.',
		role: 'Satu-satunya engineer',
		problem:
			'Staf internal dan pelamar dari luar sama-sama membutuhkan satu tempat untuk melamar. Profil lengkap mencakup biodata, pengalaman, sertifikasi, keahlian, dan pendidikan, yang lama diketik padahal sebagian besar kandidat sudah memiliki semuanya dalam satu PDF.',
		approach: [
			'Membangun portal dari nol untuk rekrutmen internal maupun eksternal.',
			'Kandidat dapat melengkapi tiap bagian profil secara manual, atau mengunggah CV berformat PDF sehingga bagian-bagian itu terisi untuk kemudian mereka periksa.',
			'Tahap parsing memakai model bahasa untuk mengubah dokumen tak terstruktur menjadi data profil terstruktur.'
		],
		outcome: ['Dibawa dari nol sampai berjalan di production oleh satu engineer.']
	},
	'mall-ai-helper': {
		summary:
			'Asisten AI di kiosk layar sentuh yang menjawab pertanyaan pengunjung tentang produk, promo, tenant, dan acara di toko dan mal.',
		role: 'Lead engineer sejak bergabung dengan proyek',
		problem:
			'Ada pertanyaan yang tidak cocok dijawab dengan peta atau katalog. Pengunjung dan staf menanyakannya dengan kata-kata mereka sendiri, di kiosk, dan mengharapkan jawaban yang benar saat itu juga.',
		approach: [
			'Jawaban di-stream ke layar selagi dihasilkan, dengan system prompt dan perilaku yang diatur per toko.',
			'Pencarian produk digabung dengan harga promo yang sedang berlaku, sehingga jawaban menyebut harga promo bila ada.',
			'Scraper terjadwal menjaga data promo dan acara mal tetap terkini, dan satu area konten dijawab lewat retrieval atas dokumen yang diindeks.',
			'Prompt disetel agar jawabannya konsisten dan menolak upaya penyalahgunaan prompt, didukung spam guard.',
			'Asisten ini juga ditanam di Interactive Mall Directory sebagai panel chat.'
		],
		outcome: [
			'Dipakai pengunjung dan staf, dengan konfigurasi terpisah untuk tiap toko.',
			'Mengambil alih codebase yang sudah ada dan menjadi engineer utamanya.'
		]
	},
	petakin: {
		summary:
			'Mengubah denah lantai mal berformat raster menjadi peta unit SVG yang rapi dan bisa diedit.',
		role: 'Desain dan engineering',
		problem:
			'Denah lantai mal datang sebagai screenshot atau ekspor PDF yang penuh kode unit, ikon fasilitas, dan watermark. Tracer umum mengikuti teksnya dan menghasilkan path yang terpecah-pecah, padahal mal punya beberapa lantai yang semuanya harus tampak seragam.',
		approach: [
			'Editor pemetaan manual memakai denah dari vendor sebagai lapisan dasar: gambar tiap unit dengan tool persegi panjang, elips, atau poligon, termasuk kurva, pada snap grid.',
			'Unit disusun dalam layer dan kategori, dengan satu tab per lantai dan gaya yang seragam antarlantai; pekerjaan tersimpan otomatis di browser.',
			'Hasil ekspor murni vektor: satu path per unit, bisa dipilih di Figma, transparan, tanpa gambar raster yang tertanam.',
			'Mode otomatis menyegmentasi denah per kelompok warna dengan OpenCV untuk mengekstrak unit tanpa menggambar. Mode ini sedang dibangun ulang sambil segmentasi dan preset-nya diperketat.'
		],
		outcome: [
			'Pemetaan manual sudah berjalan di browser.',
			'Ekstraksi otomatis divalidasi pada mal lima lantai: 101 unit di lantai tersibuk, di bawah 10 detik per gambar.'
		],
		shotAlts: [
			'Halaman depan Petakin yang menampilkan denah lantai mal berkode warna di dalam editor pemetaan',
			'Editor pemetaan manual Petakin dengan tool gambar, tab lantai, kategori, dan panel layer'
		]
	},
	'kikoeru-lab': {
		summary:
			'Menggali keluhan nyata pengguna dari Hacker News dan Reddit, lalu memeringkat ide proyek yang tersembunyi di dalamnya.',
		role: 'Desain dan engineering',
		problem:
			'Ide proyek yang bagus berawal dari keluhan nyata, tetapi membaca forum secara manual tidak bisa diskalakan, dan LLM yang diminta memeringkat ide memberi jawaban berbeda setiap kali.',
		approach: [
			'Adapter sumber menarik post dari Hacker News dan Reddit; sumber yang gagal mencatat error dan tidak pernah menghentikan proses.',
			'Google Gemini mengekstrak kandidat ide dari tiap batch post.',
			'Urgensi dinilai secara deterministik di kode, bukan oleh model, sehingga peringkatnya bisa diulang.',
			'Cron harian di GitHub Actions memicu ingestion; setiap run dicatat, dan database dikunci dengan row-level security dan key khusus server.'
		],
		outcome: [
			'Dashboard ide berperingkat yang aktif, diperbarui setiap hari.',
			'Unit test berjalan tanpa akses jaringan, memakai fixture dan fake yang diinjeksi.'
		],
		shotAlts: [
			'Halaman depan Kikoeru Lab dengan kalimat: ideas you can hear before they exist',
			'Dashboard Kikoeru Lab yang menampilkan daftar ide berperingkat dengan filter status, effort, dan sumber'
		]
	}
};

/** Notes for `alsoBuilt`, keyed by `url`. */
export const alsoBuiltId: Record<string, string> = {
	'https://discover-almaarif.vercel.app/':
		'Portal informasi untuk sebuah masjid dan program komunitasnya',
	'https://omah-house.vercel.app/': 'Landing page untuk presentasi properti'
};
