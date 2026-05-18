export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameType = 'image' | 'word' | 'arrange';

export interface ImageQuestion {
  id: number;
  image: string;
  answer: string;
  options: string[];
  category: string;
}

export interface WordQuestion {
  id: number;
  clue: string;
  answer: string;
  hint: string;
}

export interface ArrangeQuestion {
  id: number;
  answer: string;
  hint: string;
  category: string;
}

// ── Tebak Gambar ──────────────────────────────────────────────────────────────

export const imageQuestions: Record<Difficulty, ImageQuestion[]> = {
  easy: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=480&h=360&fit=crop&auto=format',
      answer: 'Kucing',
      options: ['Kucing', 'Anjing', 'Kelinci', 'Tikus'],
      category: 'Hewan',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=480&h=360&fit=crop&auto=format',
      answer: 'Anjing',
      options: ['Serigala', 'Anjing', 'Rubah', 'Coyote'],
      category: 'Hewan',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=480&h=360&fit=crop&auto=format',
      answer: 'Apel',
      options: ['Apel', 'Pir', 'Jeruk', 'Mangga'],
      category: 'Buah',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGlzYW5nfGVufDB8fDB8fHww',
      answer: 'Pisang',
      options: ['Pisang', 'Singkong', 'Talas', 'Kentang'],
      category: 'Buah',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1597953601374-1ff2d5640c85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFuZGF8ZW58MHx8MHx8fDA%3D',
      answer: 'Panda',
      options: ['Beruang', 'Panda', 'Koala', 'Rakun'],
      category: 'Hewan',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=480&h=360&fit=crop&auto=format',
      answer: 'Rubah',
      options: ['Serigala', 'Anjing', 'Rubah', 'Coyote'],
      category: 'Hewan',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3VudW5nfGVufDB8fDB8fHww',
      answer: 'Gunung',
      options: ['Gunung', 'Bukit', 'Lembah', 'Pantai'],
      category: 'Alam',
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=480&h=360&fit=crop&auto=format',
      answer: 'Sepatu',
      options: ['Baju', 'Sepatu', 'Celana', 'Topi'],
      category: 'Benda',
    },
  ],
  medium: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=480&h=360&fit=crop&auto=format',
      answer: 'Harimau',
      options: ['Singa', 'Harimau', 'Cheetah', 'Jaguar'],
      category: 'Hewan Buas',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=480&h=360&fit=crop&auto=format',
      answer: 'Gajah',
      options: ['Badak', 'Kuda Nil', 'Gajah', 'Jerapah'],
      category: 'Hewan Besar',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWlmZmVsfGVufDB8fDB8fHww',
      answer: 'Menara Eiffel',
      options: ['Big Ben', 'Menara Eiffel', 'Menara Pisa', 'Colosseum'],
      category: 'Tempat Terkenal',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=480&h=360&fit=crop&auto=format',
      answer: 'Colosseum',
      options: ['Parthenon', 'Pantheon', 'Colosseum', 'Acropolis'],
      category: 'Tempat Terkenal',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=480&h=360&fit=crop&auto=format',
      answer: 'Mangga',
      options: ['Pepaya', 'Mangga', 'Nanas', 'Jambu'],
      category: 'Buah Tropis',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1576181177940-cb8592693079?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGplcnVrfGVufDB8fDB8fHww',
      answer: 'Jeruk',
      options: ['Lemon', 'Jeruk', 'Jeruk Nipis', 'Grapefruit'],
      category: 'Buah',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=480&h=360&fit=crop&auto=format',
      answer: 'Pug',
      options: ['Bulldog', 'Pug', 'Beagle', 'Poodle'],
      category: 'Anjing',
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=480&h=360&fit=crop&auto=format',
      answer: 'Susu',
      options: ['Air', 'Susu', 'Jus', 'Sirup'],
      category: 'Minuman',
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl6emF8ZW58MHx8MHx8fDA%3D',
      answer: 'Pizza',
      options: ['Spageti', 'Hotdog', 'Pizza', 'Tiramisu'],
      category: 'Makanan',
    },
  ],
  hard: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1612368195523-19e00a05b1cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmclMjB1dGFufGVufDB8fDB8fHww',
      answer: 'Orang Utan',
      options: ['Simpanse', 'Gorila', 'Orang Utan', 'Bonobo'],
      category: 'Primata',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1712874364529-2d17f6111bb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXhvbG90bHxlbnwwfHwwfHx8MA%3D%3D',
      answer: 'Axolotl',
      options: ['Salamander', 'Kadal', 'Axolotl', 'Iguana'],
      category: 'Hewan Langka',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1681407979872-0a4cbde28391?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJpZyUyMGJlbnxlbnwwfHwwfHx8MA%3D%3D',
      answer: 'Big Ben',
      options: ['Menara Elizabeth', 'Big Ben', 'Tower Bridge', 'Westminster'],
      category: 'Landmark',
    },
    {
      id: 4,
      image: 'https://plus.unsplash.com/premium_photo-1663047540698-12e93c082dda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmVidWxhfGVufDB8fDB8fHww',
      answer: 'Nebula',
      options: ['Galaksi', 'Nebula', 'Supernova', 'Pulsar'],
      category: 'Astronomi',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2FrdHVzfGVufDB8fDB8fHww',
      answer: 'Kaktus',
      options: ['Lidah Buaya', 'Kaktus', 'Sukulen', 'Agave'],
      category: 'Tanaman',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1519544442-93857b48665e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHVyaWFufGVufDB8fDB8fHww',
      answer: 'Durian',
      options: ['Rambutan', 'Durian', 'Salak', 'Nangka'],
      category: 'Buah Eksotis',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=480&h=360&fit=crop&auto=format',
      answer: 'Stroberi',
      options: ['Apel', 'Stroberi', 'Ceri', 'Frambos'],
      category: 'Buah',
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1571371867188-fdc3f1f8e62d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF1cm9yYXxlbnwwfHwwfHx8MA%3D%3D',
      answer: 'Aurora',
      options: ['Pelangi', 'Aurora', 'Bintang', 'Galaksi'],
      category: 'Fenomena',
    },
  ],
};

// ── Tebak Kata ────────────────────────────────────────────────────────────────

export const wordQuestions: Record<Difficulty, WordQuestion[]> = {
  easy: [
    { id: 1, clue: 'Benda langit yang bersinar di siang hari', answer: 'MATAHARI', hint: 'M _ _ _ _ _ _ _' },
    { id: 2, clue: 'Hewan yang bisa terbang dan berwarna-warni', answer: 'KUPU', hint: 'K _ _ _' },
    { id: 3, clue: 'Tempat kita tidur dan beristirahat', answer: 'RUMAH', hint: 'R _ _ _ _' },
    { id: 4, clue: 'Cairan yang kita minum setiap hari', answer: 'AIR', hint: 'A _ _' },
    { id: 5, clue: 'Benda untuk menulis di papan tulis', answer: 'KAPUR', hint: 'K _ _ _ _' },
    { id: 6, clue: 'Hewan peliharaan yang suka mengeong', answer: 'KUCING', hint: 'K _ _ _ _ _' },
    { id: 7, clue: 'Presiden pertama Indonesia', answer: 'SOEKARNO', hint: 'S _ _ _ _ _ _ _' },
    { id: 8, clue: 'Mata uang indonesia', answer: 'RUPIAH', hint: 'R _ _ _ _ _' },
    { id: 9, clue: 'Lawan elemen gelap', answer: 'CAHAYA', hint: 'C _ _ _ _ _' },
    { id: 10, clue: 'Sinonim kata sama ', answer: 'MIRIP', hint: 'M _ _ _ _' },
    { id: 11, clue: 'Permainan sepak bola dimainkan dengan ', answer: 'KAKI', hint: 'K _ _ _' },
    { id: 12, clue: 'Antonim kata keluar ', answer: 'MASUk', hint: 'M _ _ _ _' },
    { id: 13, clue: 'Hewan dengan leher panjang ', answer: 'JERAPAH', hint: 'J _ _ _ _ _ _' },
    { id: 14, clue: 'Alat untuk melihat benda jauh ', answer: 'TELESKOP', hint: 'T _ _ _ _ _ _ _' },
    { id: 15, clue: 'Tinta hitam keluar dari hewan laut ini', answer: 'CUMI', hint: 'C _ _ _' },
    { id: 16, clue: 'Burung yang suka meniru suara', answer: 'BEO', hint: 'B _ _' },
    { id: 17, clue: 'Tempat menyimpan buku', answer: 'RAK', hint: 'R _ _' },
    { id: 18, clue: 'Kendaraan yang berroda emapat', answer: 'MOBIL', hint: 'M _ _ _ _' },
    { id: 19, clue: 'Makanan Khas Padang yang terkenal', answer: 'RENDANG', hint: 'R _ _ _ _ _ _' },
    { id: 20, clue: 'Makanan kesukaan Panda', answer: 'BAMBU', hint: 'B _ _ _ _ ' },
  ],
  medium: [
    { id: 1, clue: 'Planet terbesar di tata surya kita', answer: 'YUPITER', hint: 'Y _ _ _ _ _ _' },
    { id: 2, clue: 'Proses perubahan ulat menjadi kupu-kupu', answer: 'METAMORFOSIS', hint: 'M _ _ _ _ _ _ _ _ _ _ _' },
    { id: 3, clue: 'Ilmu yang mempelajari tentang bintang dan planet', answer: 'ASTRONOMI', hint: 'A _ _ _ _ _ _ _ _' },
    { id: 4, clue: 'Bagian tumbuhan yang menyerap air dari tanah', answer: 'AKAR', hint: 'A _ _ _' },
    { id: 5, clue: 'Gas yang dibutuhkan manusia untuk bernapas', answer: 'OKSIGEN', hint: 'O _ _ _ _ _ _' },
    { id: 6, clue: 'Hewan yang bisa berubah warna sesuai lingkungan', answer: 'BUNGLON', hint: 'B _ _ _ _ _ _' },
    { id: 7, clue: 'Penemu gaya gravitasi', answer: 'NEWTON', hint: '_ _ _ _ _ N' },
    { id: 8, clue: 'Benua terbesar di dunia', answer: 'ASIA', hint: '_ _ _ A' },
    { id: 9, clue: 'Alat untuk mengukur suhu', answer: 'TERMOMETER', hint: '_ _ _ _ _ _ _ _ _ R' },
    { id: 10, clue: 'Gunung tertinggi di dunia', answer: 'EVEREST', hint: 'E _ _ _ _ _ _' },
    { id: 11, clue: 'Planet terdekat dengan Matahari', answer: 'MERKURIUS', hint: 'M _ _ _ _ _ _ _ _' },
    { id: 12, clue: 'Benua terkeci', answer: 'AUSTRALIA', hint: 'A _ _ _ _ _ _ _ _' },
    { id: 13, clue: 'Mata uang Jepang', answer: 'YEN', hint: 'A _ _ _ _ _ _ _ _' },
    { id: 14, clue: 'Hutan terbesar dunia', answer: 'AMAZON', hint: 'A _ _ _ _ _ ' },
    { id: 15, clue: 'Satuan listrik', answer: 'AMPERE', hint: 'A _ _ _ _ _ ' },
    { id: 16, clue: 'Bahan pembutan tempe dan tahu', answer: 'KEDELAI', hint: 'K _ _ _ _ _ _ ' },
    { id: 17, clue: 'Ibu kota Malaysia', answer: 'KUALALUMPUR', hint: 'K _ _ _ _ _ _ _ _ _ _ ' },
    { id: 18, clue: 'Organ pemompa darah', answer: 'JANTUNG', hint: 'J _ _ _ _ _ _' },
    { id: 19, clue: 'Hewan berdarah dingin', answer: 'REPTIL', hint: 'R _ _ _ _ _' },
    { id: 20, clue: 'Hewan tercepat di darat', answer: 'CHEETAH', hint: 'C _ _ _ _ _ _' },
    { id: 21, clue: 'Tumbuhan gurun yang bisa menyimpan air', answer: 'KAKTUS', hint: 'K _ _ _ _ _' },
  ],
  hard: [
    { id: 1, clue: 'Fenomena alam saat air naik ke langit dan turun sebagai hujan', answer: 'EVAPORASI', hint: 'E _ _ _ _ _ _ _ _' },
    { id: 2, clue: 'Ilmu yang mempelajari struktur dan fungsi tubuh makhluk hidup', answer: 'BIOLOGI', hint: 'B _ _ _ _ _ _' },
    { id: 3, clue: 'Proses pembuatan makanan oleh tumbuhan dengan bantuan sinar matahari', answer: 'FOTOSINTESIS', hint: 'F _ _ _ _ _ _ _ _ _ _ _' },
    { id: 4, clue: 'Kumpulan bintang yang membentuk kelompok di galaksi', answer: 'KONSTELASI', hint: 'K _ _ _ _ _ _ _ _ _' },
    { id: 5, clue: 'Gaya tarik antara dua benda bermassa yang ditemukan Newton', answer: 'GRAVITASI', hint: 'G _ _ _ _ _ _ _ _' },
    { id: 6, clue: 'Perubahan fisika dari cair menjadi gas', answer: 'PENGUAPAN', hint: 'P _ _ _ _ _ _ _ _' },
    { id: 7, clue: 'Simbol kimia emas', answer: 'AU', hint: 'A _' },
    { id: 8, clue: 'Kerajaan terbesar di Nusantara', answer: 'MAJAPAHIT', hint: 'M _ _ _ _ _ _ _ _' },
    { id: 9, clue: 'Alat ukur tekanan udara', answer: 'BAROMETER', hint: 'B _ _ _ _ _ _ _ _ ' },
    { id: 10, clue: 'Alat untuk melihat benda kecil', answer: 'MIKROSKOP', hint: 'M _ _ _ _ _ _ _ _ ' },
    { id: 11, clue: 'Negara asal Napoleon', answer: 'PRANCIS', hint: 'P _ _ _ _ _ _  ' },
    { id: 12, clue: 'Ibu kota Rusia', answer: 'MOSKOW', hint: 'M _ _ _ _ _ ' },
    { id: 13, clue: 'Seni bela diri Cina', answer: 'KUNGFU', hint: 'K _ _ _ _ _' },
    { id: 14, clue: 'Hewan yang aktif malam hari disebut', answer: 'NOKTURNAL', hint: 'N _ _ _ _ _ _ _ _' },
    { id: 15, clue: 'Hewan melahirkan disebut', answer: 'VIVIPAR', hint: 'V _ _ _ _ _ _' },
    { id: 16, clue: 'Hewan hidup di dua alam', answer: 'AMFIBI', hint: 'A _ _ _ _ _' },
    { id: 17, clue: 'Alat ukur gempa bumi', answer: 'SEISMOGRAF', hint: 'S _ _ _ _ _ _ _ _ _' },
    { id: 18, clue: 'Bintang paling terang di malam hari', answer: 'SIRIUS', hint: 'S _ _ _ _ _' },
    { id: 19, clue: 'Pakar yang meneliti fosil', answer: 'PALEONTOLOG', hint: 'P _ _ _ _ _ _ _ _ _ _' },
    { id: 20, clue: 'Hewan melata purba asli Indonesia yang masih hidup sampai sekarang', answer: 'KOMODO', hint: 'K _ _ _ _ _' },
  ],
};

// ── Susun Kata ────────────────────────────────────────────────────────────────

export const arrangeQuestions: Record<Difficulty, ArrangeQuestion[]> = {
  easy: [
    { id: 1, answer: 'BUKU', hint: 'Benda untuk membaca', category: 'Benda' },
    { id: 2, answer: 'MEJA', hint: 'Tempat belajar dan makan', category: 'Benda' },
    { id: 3, answer: 'BURUNG', hint: 'Hewan yang bisa terbang', category: 'Hewan' },
    { id: 4, answer: 'BUNGA', hint: 'Tanaman yang indah dan harum', category: 'Alam' },
    { id: 5, answer: 'LANGIT', hint: 'Ada di atas kita', category: 'Alam' },
    { id: 6, answer: 'SEPATU', hint: 'Dipakai di kaki', category: 'Pakaian' },
    { id: 7, answer: 'PISANG', hint: 'Buah berwarna kuning yang disukai monyet', category: 'Buah' },
    { id: 8, answer: 'LEMARI', hint: 'Tempat menyimpan baju', category: 'Perabotan' },
  ],
  medium: [
    { id: 1, answer: 'PELANGI', hint: 'Muncul setelah hujan', category: 'Alam' },
    { id: 2, answer: 'KUNYIT', hint: 'Bumbu dapur berwarna kuning', category: 'Bumbu' },
    { id: 3, answer: 'JEMBATAN', hint: 'Menghubungkan dua tempat', category: 'Bangunan' },
    { id: 4, answer: 'KOMPUTER', hint: 'Alat elektronik untuk bekerja', category: 'Elektronik' },
    { id: 5, answer: 'BERLIAN', hint: 'Batu permata paling keras', category: 'Mineral' },
    { id: 6, answer: 'KELELAWAR', hint: 'Hewan mamalia yang terbang malam', category: 'Hewan' },
    { id: 7, answer: 'TELESKOP', hint: 'Melihat benda langit yang jauh', category: 'Alat' },
    { id: 8, answer: 'ORKESTRA', hint: 'Sekelompok musisi yang bermain bersama', category: 'Musik' },
  ],
  hard: [
    { id: 1, answer: 'PERSAHABATAN', hint: 'Hubungan antara dua teman', category: 'Abstrak' },
    { id: 2, answer: 'KEBUDAYAAN', hint: 'Hasil karya dan adat suatu masyarakat', category: 'Sosial' },
    { id: 3, answer: 'KEMERDEKAAN', hint: 'Kebebasan dari penjajahan', category: 'Sejarah' },
    { id: 4, answer: 'PERPUSTAKAAN', hint: 'Tempat menyimpan dan meminjam buku', category: 'Tempat' },
    { id: 5, answer: 'PENGETAHUAN', hint: 'Informasi yang dipahami oleh seseorang', category: 'Abstrak' },
    { id: 6, answer: 'PEMANDANGAN', hint: 'Keindahan alam yang terlihat', category: 'Alam' },
    { id: 7, answer: 'KESEJAHTERAAN', hint: 'Keadaan hidup yang aman dan makmur', category: 'Sosial' },
    { id: 8, answer: 'KEBIJAKSANAAN', hint: 'Sifat orang yang arif dan cerdas', category: 'Sifat' },
  ],
};

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function scrambleWord(word: string): string[] {
  const letters = word.split('');
  return shuffleArray(letters);
}