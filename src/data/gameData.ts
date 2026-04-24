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
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=480&h=360&fit=crop&auto=format',
      answer: 'Pisang',
      options: ['Pisang', 'Singkong', 'Talas', 'Kentang'],
      category: 'Buah',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=480&h=360&fit=crop&auto=format',
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
      image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=480&h=360&fit=crop&auto=format',
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
      image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=480&h=360&fit=crop&auto=format',
      answer: 'Jeruk',
      options: ['Lemon', 'Jeruk', 'Jeruk Nipis', 'Grapefruit'],
      category: 'Buah',
    },
  ],
  hard: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=360&fit=crop&auto=format',
      answer: 'Orang Utan',
      options: ['Simpanse', 'Gorila', 'Orang Utan', 'Bonobo'],
      category: 'Primata',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=480&h=360&fit=crop&auto=format',
      answer: 'Axolotl',
      options: ['Salamander', 'Kadal', 'Axolotl', 'Iguana'],
      category: 'Hewan Langka',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=480&h=360&fit=crop&auto=format',
      answer: 'Big Ben',
      options: ['Menara Elizabeth', 'Big Ben', 'Tower Bridge', 'Westminster'],
      category: 'Landmark',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?w=480&h=360&fit=crop&auto=format',
      answer: 'Nebula',
      options: ['Galaksi', 'Nebula', 'Supernova', 'Pulsar'],
      category: 'Astronomi',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=480&h=360&fit=crop&auto=format',
      answer: 'Kaktus',
      options: ['Lidah Buaya', 'Kaktus', 'Sukulen', 'Agave'],
      category: 'Tanaman',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=480&h=360&fit=crop&auto=format',
      answer: 'Durian',
      options: ['Rambutan', 'Durian', 'Salak', 'Nangka'],
      category: 'Buah Eksotis',
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
  ],
  medium: [
    { id: 1, clue: 'Planet terbesar di tata surya kita', answer: 'YUPITER', hint: 'Y _ _ _ _ _ _' },
    { id: 2, clue: 'Proses perubahan ulat menjadi kupu-kupu', answer: 'METAMORFOSIS', hint: 'M _ _ _ _ _ _ _ _ _ _ _' },
    { id: 3, clue: 'Ilmu yang mempelajari tentang bintang dan planet', answer: 'ASTRONOMI', hint: 'A _ _ _ _ _ _ _ _' },
    { id: 4, clue: 'Bagian tumbuhan yang menyerap air dari tanah', answer: 'AKAR', hint: 'A _ _ _' },
    { id: 5, clue: 'Gas yang dibutuhkan manusia untuk bernapas', answer: 'OKSIGEN', hint: 'O _ _ _ _ _ _' },
    { id: 6, clue: 'Hewan yang bisa berubah warna sesuai lingkungan', answer: 'BUNGLON', hint: 'B _ _ _ _ _ _' },
  ],
  hard: [
    { id: 1, clue: 'Fenomena alam saat air naik ke langit dan turun sebagai hujan', answer: 'EVAPORASI', hint: 'E _ _ _ _ _ _ _ _' },
    { id: 2, clue: 'Ilmu yang mempelajari struktur dan fungsi tubuh makhluk hidup', answer: 'BIOLOGI', hint: 'B _ _ _ _ _ _' },
    { id: 3, clue: 'Proses pembuatan makanan oleh tumbuhan dengan bantuan sinar matahari', answer: 'FOTOSINTESIS', hint: 'F _ _ _ _ _ _ _ _ _ _ _' },
    { id: 4, clue: 'Kumpulan bintang yang membentuk kelompok di galaksi', answer: 'KONSTELASI', hint: 'K _ _ _ _ _ _ _ _ _' },
    { id: 5, clue: 'Gaya tarik antara dua benda bermassa yang ditemukan Newton', answer: 'GRAVITASI', hint: 'G _ _ _ _ _ _ _ _' },
    { id: 6, clue: 'Perubahan fisika dari cair menjadi gas', answer: 'PENGUAPAN', hint: 'P _ _ _ _ _ _ _ _' },
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
  ],
  medium: [
    { id: 1, answer: 'PELANGI', hint: 'Muncul setelah hujan', category: 'Alam' },
    { id: 2, answer: 'KUNYIT', hint: 'Bumbu dapur berwarna kuning', category: 'Bumbu' },
    { id: 3, answer: 'JEMBATAN', hint: 'Menghubungkan dua tempat', category: 'Bangunan' },
    { id: 4, answer: 'KOMPUTER', hint: 'Alat elektronik untuk bekerja', category: 'Elektronik' },
    { id: 5, answer: 'BERLIAN', hint: 'Batu permata paling keras', category: 'Mineral' },
    { id: 6, answer: 'KELELAWAR', hint: 'Hewan mamalia yang terbang malam', category: 'Hewan' },
  ],
  hard: [
    { id: 1, answer: 'PERSAHABATAN', hint: 'Hubungan antara dua teman', category: 'Abstrak' },
    { id: 2, answer: 'KEBUDAYAAN', hint: 'Hasil karya dan adat suatu masyarakat', category: 'Sosial' },
    { id: 3, answer: 'KEMERDEKAAN', hint: 'Kebebasan dari penjajahan', category: 'Sejarah' },
    { id: 4, answer: 'PERPUSTAKAAN', hint: 'Tempat menyimpan dan meminjam buku', category: 'Tempat' },
    { id: 5, answer: 'PENGETAHUAN', hint: 'Informasi yang dipahami oleh seseorang', category: 'Abstrak' },
    { id: 6, answer: 'PEMANDANGAN', hint: 'Keindahan alam yang terlihat', category: 'Alam' },
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
