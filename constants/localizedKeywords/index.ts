// Localized default keywords — all 100 free keyword pairs with translations
// Each keyword has: en, vi, es, fr, zh
import { LocalizedKeywordPair } from '../defaultKeywords';

export const DEFAULT_KEYWORDS_LOCALIZED: LocalizedKeywordPair[] = [
  // ============================================================
  // FOOD & DRINKS (20 pairs)
  // ============================================================
  {
    translations: {
      en: { civilian: 'Apple', spy: 'Pear' },
      vi: { civilian: 'Táo', spy: 'Lê' },
      es: { civilian: 'Manzana', spy: 'Pera' },
      fr: { civilian: 'Pomme', spy: 'Poire' },
      zh: { civilian: '苹果', spy: '梨' },
    },
    category: 'Food', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Coffee', spy: 'Tea' },
      vi: { civilian: 'Cà phê', spy: 'Trà' },
      es: { civilian: 'Café', spy: 'Té' },
      fr: { civilian: 'Café', spy: 'Thé' },
      zh: { civilian: '咖啡', spy: '茶' },
    },
    category: 'Drinks', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Pizza', spy: 'Burger' },
      vi: { civilian: 'Pizza', spy: 'Bánh mì kẹp' },
      es: { civilian: 'Pizza', spy: 'Hamburguesa' },
      fr: { civilian: 'Pizza', spy: 'Hamburger' },
      zh: { civilian: '披萨', spy: '汉堡' },
    },
    category: 'Food', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Rice', spy: 'Noodles' },
      vi: { civilian: 'Cơm', spy: 'Mì' },
      es: { civilian: 'Arroz', spy: 'Fideos' },
      fr: { civilian: 'Riz', spy: 'Nouilles' },
      zh: { civilian: '米饭', spy: '面条' },
    },
    category: 'Food', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Chocolate', spy: 'Candy' },
      vi: { civilian: 'Sô cô la', spy: 'Kẹo' },
      es: { civilian: 'Chocolate', spy: 'Caramelo' },
      fr: { civilian: 'Chocolat', spy: 'Bonbon' },
      zh: { civilian: '巧克力', spy: '糖果' },
    },
    category: 'Food', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Bread', spy: 'Toast' },
      vi: { civilian: 'Bánh mì', spy: 'Bánh mì nướng' },
      es: { civilian: 'Pan', spy: 'Tostada' },
      fr: { civilian: 'Pain', spy: 'Toast' },
      zh: { civilian: '面包', spy: '吐司' },
    },
    category: 'Food', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Milk', spy: 'Yogurt' },
      vi: { civilian: 'Sữa', spy: 'Sữa chua' },
      es: { civilian: 'Leche', spy: 'Yogur' },
      fr: { civilian: 'Lait', spy: 'Yaourt' },
      zh: { civilian: '牛奶', spy: '酸奶' },
    },
    category: 'Drinks', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Steak', spy: 'Pork Chop' },
      vi: { civilian: 'Bò bít tết', spy: 'Sườn heo' },
      es: { civilian: 'Bistec', spy: 'Chuleta de cerdo' },
      fr: { civilian: 'Steak', spy: 'Côtelette de porc' },
      zh: { civilian: '牛排', spy: '猪排' },
    },
    category: 'Food', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Orange Juice', spy: 'Lemonade' },
      vi: { civilian: 'Nước cam', spy: 'Nước chanh' },
      es: { civilian: 'Jugo de naranja', spy: 'Limonada' },
      fr: { civilian: 'Jus d\'orange', spy: 'Limonade' },
      zh: { civilian: '橙汁', spy: '柠檬水' },
    },
    category: 'Drinks', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Sushi', spy: 'Sashimi' },
      vi: { civilian: 'Sushi', spy: 'Sashimi' },
      es: { civilian: 'Sushi', spy: 'Sashimi' },
      fr: { civilian: 'Sushi', spy: 'Sashimi' },
      zh: { civilian: '寿司', spy: '刺身' },
    },
    category: 'Food', difficulty: 'hard',
  },
  {
    translations: {
      en: { civilian: 'Ice Cream', spy: 'Frozen Yogurt' },
      vi: { civilian: 'Kem', spy: 'Sữa chua đông lạnh' },
      es: { civilian: 'Helado', spy: 'Yogur helado' },
      fr: { civilian: 'Glace', spy: 'Yaourt glacé' },
      zh: { civilian: '冰淇淋', spy: '冻酸奶' },
    },
    category: 'Food', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Soup', spy: 'Stew' },
      vi: { civilian: 'Súp', spy: 'Hầm' },
      es: { civilian: 'Sopa', spy: 'Guiso' },
      fr: { civilian: 'Soupe', spy: 'Ragoût' },
      zh: { civilian: '汤', spy: '炖菜' },
    },
    category: 'Food', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Cookie', spy: 'Biscuit' },
      vi: { civilian: 'Bánh quy', spy: 'Bánh bích quy' },
      es: { civilian: 'Galleta', spy: 'Bizcocho' },
      fr: { civilian: 'Cookie', spy: 'Biscuit' },
      zh: { civilian: '饼干', spy: '曲奇' },
    },
    category: 'Food', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Cake', spy: 'Pie' },
      vi: { civilian: 'Bánh kem', spy: 'Bánh nướng' },
      es: { civilian: 'Pastel', spy: 'Tarta' },
      fr: { civilian: 'Gâteau', spy: 'Tarte' },
      zh: { civilian: '蛋糕', spy: '派' },
    },
    category: 'Food', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Wine', spy: 'Beer' },
      vi: { civilian: 'Rượu vang', spy: 'Bia' },
      es: { civilian: 'Vino', spy: 'Cerveza' },
      fr: { civilian: 'Vin', spy: 'Bière' },
      zh: { civilian: '葡萄酒', spy: '啤酒' },
    },
    category: 'Drinks', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Donut', spy: 'Muffin' },
      vi: { civilian: 'Bánh rán', spy: 'Bánh nướng xốp' },
      es: { civilian: 'Dona', spy: 'Muffin' },
      fr: { civilian: 'Beignet', spy: 'Muffin' },
      zh: { civilian: '甜甜圈', spy: '松饼' },
    },
    category: 'Food', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Pancake', spy: 'Waffle' },
      vi: { civilian: 'Bánh kếp', spy: 'Bánh waffle' },
      es: { civilian: 'Panqueque', spy: 'Gofre' },
      fr: { civilian: 'Crêpe', spy: 'Gaufre' },
      zh: { civilian: '煎饼', spy: '华夫饼' },
    },
    category: 'Food', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Honey', spy: 'Syrup' },
      vi: { civilian: 'Mật ong', spy: 'Xi-rô' },
      es: { civilian: 'Miel', spy: 'Jarabe' },
      fr: { civilian: 'Miel', spy: 'Sirop' },
      zh: { civilian: '蜂蜜', spy: '糖浆' },
    },
    category: 'Food', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Butter', spy: 'Margarine' },
      vi: { civilian: 'Bơ', spy: 'Bơ thực vật' },
      es: { civilian: 'Mantequilla', spy: 'Margarina' },
      fr: { civilian: 'Beurre', spy: 'Margarine' },
      zh: { civilian: '黄油', spy: '人造黄油' },
    },
    category: 'Food', difficulty: 'hard',
  },
  {
    translations: {
      en: { civilian: 'Popcorn', spy: 'Chips' },
      vi: { civilian: 'Bỏng ngô', spy: 'Khoai tây chiên' },
      es: { civilian: 'Palomitas', spy: 'Papas fritas' },
      fr: { civilian: 'Pop-corn', spy: 'Chips' },
      zh: { civilian: '爆米花', spy: '薯片' },
    },
    category: 'Food', difficulty: 'easy',
  },

  // ============================================================
  // ANIMALS (15 pairs)
  // ============================================================
  {
    translations: {
      en: { civilian: 'Dog', spy: 'Wolf' },
      vi: { civilian: 'Chó', spy: 'Sói' },
      es: { civilian: 'Perro', spy: 'Lobo' },
      fr: { civilian: 'Chien', spy: 'Loup' },
      zh: { civilian: '狗', spy: '狼' },
    },
    category: 'Animals', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Cat', spy: 'Tiger' },
      vi: { civilian: 'Mèo', spy: 'Hổ' },
      es: { civilian: 'Gato', spy: 'Tigre' },
      fr: { civilian: 'Chat', spy: 'Tigre' },
      zh: { civilian: '猫', spy: '老虎' },
    },
    category: 'Animals', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Horse', spy: 'Zebra' },
      vi: { civilian: 'Ngựa', spy: 'Ngựa vằn' },
      es: { civilian: 'Caballo', spy: 'Cebra' },
      fr: { civilian: 'Cheval', spy: 'Zèbre' },
      zh: { civilian: '马', spy: '斑马' },
    },
    category: 'Animals', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Butterfly', spy: 'Moth' },
      vi: { civilian: 'Bướm', spy: 'Bướm đêm' },
      es: { civilian: 'Mariposa', spy: 'Polilla' },
      fr: { civilian: 'Papillon', spy: 'Papillon de nuit' },
      zh: { civilian: '蝴蝶', spy: '飞蛾' },
    },
    category: 'Animals', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Frog', spy: 'Toad' },
      vi: { civilian: 'Ếch', spy: 'Cóc' },
      es: { civilian: 'Rana', spy: 'Sapo' },
      fr: { civilian: 'Grenouille', spy: 'Crapaud' },
      zh: { civilian: '青蛙', spy: '蟾蜍' },
    },
    category: 'Animals', difficulty: 'hard',
  },
  {
    translations: {
      en: { civilian: 'Turtle', spy: 'Tortoise' },
      vi: { civilian: 'Rùa biển', spy: 'Rùa cạn' },
      es: { civilian: 'Tortuga marina', spy: 'Tortuga terrestre' },
      fr: { civilian: 'Tortue marine', spy: 'Tortue terrestre' },
      zh: { civilian: '海龟', spy: '陆龟' },
    },
    category: 'Animals', difficulty: 'hard',
  },
  {
    translations: {
      en: { civilian: 'Dolphin', spy: 'Shark' },
      vi: { civilian: 'Cá heo', spy: 'Cá mập' },
      es: { civilian: 'Delfín', spy: 'Tiburón' },
      fr: { civilian: 'Dauphin', spy: 'Requin' },
      zh: { civilian: '海豚', spy: '鲨鱼' },
    },
    category: 'Animals', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Eagle', spy: 'Hawk' },
      vi: { civilian: 'Đại bàng', spy: 'Diều hâu' },
      es: { civilian: 'Águila', spy: 'Halcón' },
      fr: { civilian: 'Aigle', spy: 'Faucon' },
      zh: { civilian: '鹰', spy: '隼' },
    },
    category: 'Animals', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Penguin', spy: 'Puffin' },
      vi: { civilian: 'Chim cánh cụt', spy: 'Chim hải âu' },
      es: { civilian: 'Pingüino', spy: 'Frailecillo' },
      fr: { civilian: 'Pingouin', spy: 'Macareux' },
      zh: { civilian: '企鹅', spy: '海鹦' },
    },
    category: 'Animals', difficulty: 'hard',
  },
  {
    translations: {
      en: { civilian: 'Lion', spy: 'Cheetah' },
      vi: { civilian: 'Sư tử', spy: 'Báo gêpa' },
      es: { civilian: 'León', spy: 'Guepardo' },
      fr: { civilian: 'Lion', spy: 'Guépard' },
      zh: { civilian: '狮子', spy: '猎豹' },
    },
    category: 'Animals', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Elephant', spy: 'Hippo' },
      vi: { civilian: 'Voi', spy: 'Hà mã' },
      es: { civilian: 'Elefante', spy: 'Hipopótamo' },
      fr: { civilian: 'Éléphant', spy: 'Hippopotame' },
      zh: { civilian: '大象', spy: '河马' },
    },
    category: 'Animals', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Rabbit', spy: 'Hare' },
      vi: { civilian: 'Thỏ nhà', spy: 'Thỏ rừng' },
      es: { civilian: 'Conejo', spy: 'Liebre' },
      fr: { civilian: 'Lapin', spy: 'Lièvre' },
      zh: { civilian: '兔子', spy: '野兔' },
    },
    category: 'Animals', difficulty: 'hard',
  },
  {
    translations: {
      en: { civilian: 'Snake', spy: 'Lizard' },
      vi: { civilian: 'Rắn', spy: 'Thằn lằn' },
      es: { civilian: 'Serpiente', spy: 'Lagarto' },
      fr: { civilian: 'Serpent', spy: 'Lézard' },
      zh: { civilian: '蛇', spy: '蜥蜴' },
    },
    category: 'Animals', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Crocodile', spy: 'Alligator' },
      vi: { civilian: 'Cá sấu', spy: 'Cá sấu mõm ngắn' },
      es: { civilian: 'Cocodrilo', spy: 'Caimán' },
      fr: { civilian: 'Crocodile', spy: 'Alligator' },
      zh: { civilian: '鳄鱼', spy: '短吻鳄' },
    },
    category: 'Animals', difficulty: 'hard',
  },
  {
    translations: {
      en: { civilian: 'Monkey', spy: 'Gorilla' },
      vi: { civilian: 'Khỉ', spy: 'Khỉ đột' },
      es: { civilian: 'Mono', spy: 'Gorila' },
      fr: { civilian: 'Singe', spy: 'Gorille' },
      zh: { civilian: '猴子', spy: '大猩猩' },
    },
    category: 'Animals', difficulty: 'easy',
  },

  // ============================================================
  // TRANSPORTATION (10 pairs)
  // ============================================================
  {
    translations: {
      en: { civilian: 'Car', spy: 'Bike' },
      vi: { civilian: 'Ô tô', spy: 'Xe đạp' },
      es: { civilian: 'Coche', spy: 'Bicicleta' },
      fr: { civilian: 'Voiture', spy: 'Vélo' },
      zh: { civilian: '汽车', spy: '自行车' },
    },
    category: 'Transport', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Train', spy: 'Subway' },
      vi: { civilian: 'Tàu hỏa', spy: 'Tàu điện ngầm' },
      es: { civilian: 'Tren', spy: 'Metro' },
      fr: { civilian: 'Train', spy: 'Métro' },
      zh: { civilian: '火车', spy: '地铁' },
    },
    category: 'Transport', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Airplane', spy: 'Helicopter' },
      vi: { civilian: 'Máy bay', spy: 'Trực thăng' },
      es: { civilian: 'Avión', spy: 'Helicóptero' },
      fr: { civilian: 'Avion', spy: 'Hélicoptère' },
      zh: { civilian: '飞机', spy: '直升机' },
    },
    category: 'Transport', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Bus', spy: 'Van' },
      vi: { civilian: 'Xe buýt', spy: 'Xe tải nhỏ' },
      es: { civilian: 'Autobús', spy: 'Furgoneta' },
      fr: { civilian: 'Bus', spy: 'Camionnette' },
      zh: { civilian: '公交车', spy: '面包车' },
    },
    category: 'Transport', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Boat', spy: 'Ship' },
      vi: { civilian: 'Thuyền', spy: 'Tàu' },
      es: { civilian: 'Bote', spy: 'Barco' },
      fr: { civilian: 'Bateau', spy: 'Navire' },
      zh: { civilian: '船', spy: '轮船' },
    },
    category: 'Transport', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Motorcycle', spy: 'Scooter' },
      vi: { civilian: 'Xe máy', spy: 'Xe tay ga' },
      es: { civilian: 'Motocicleta', spy: 'Scooter' },
      fr: { civilian: 'Moto', spy: 'Scooter' },
      zh: { civilian: '摩托车', spy: '踏板车' },
    },
    category: 'Transport', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Taxi', spy: 'Uber' },
      vi: { civilian: 'Taxi', spy: 'Xe công nghệ' },
      es: { civilian: 'Taxi', spy: 'Uber' },
      fr: { civilian: 'Taxi', spy: 'VTC' },
      zh: { civilian: '出租车', spy: '网约车' },
    },
    category: 'Transport', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Truck', spy: 'Trailer' },
      vi: { civilian: 'Xe tải', spy: 'Xe moóc' },
      es: { civilian: 'Camión', spy: 'Remolque' },
      fr: { civilian: 'Camion', spy: 'Remorque' },
      zh: { civilian: '卡车', spy: '拖车' },
    },
    category: 'Transport', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Skateboard', spy: 'Roller Skates' },
      vi: { civilian: 'Ván trượt', spy: 'Giày patin' },
      es: { civilian: 'Monopatín', spy: 'Patines' },
      fr: { civilian: 'Skateboard', spy: 'Rollers' },
      zh: { civilian: '滑板', spy: '轮滑鞋' },
    },
    category: 'Transport', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Hot Air Balloon', spy: 'Parachute' },
      vi: { civilian: 'Khinh khí cầu', spy: 'Dù' },
      es: { civilian: 'Globo aerostático', spy: 'Paracaídas' },
      fr: { civilian: 'Montgolfière', spy: 'Parachute' },
      zh: { civilian: '热气球', spy: '降落伞' },
    },
    category: 'Transport', difficulty: 'hard',
  },

  // ============================================================
  // MUSIC & INSTRUMENTS (10 pairs)
  // ============================================================
  {
    translations: {
      en: { civilian: 'Guitar', spy: 'Piano' },
      vi: { civilian: 'Đàn ghi-ta', spy: 'Đàn piano' },
      es: { civilian: 'Guitarra', spy: 'Piano' },
      fr: { civilian: 'Guitare', spy: 'Piano' },
      zh: { civilian: '吉他', spy: '钢琴' },
    },
    category: 'Instruments', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Violin', spy: 'Cello' },
      vi: { civilian: 'Vĩ cầm', spy: 'Đại hồ cầm' },
      es: { civilian: 'Violín', spy: 'Violonchelo' },
      fr: { civilian: 'Violon', spy: 'Violoncelle' },
      zh: { civilian: '小提琴', spy: '大提琴' },
    },
    category: 'Instruments', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Drum', spy: 'Cymbal' },
      vi: { civilian: 'Trống', spy: 'Chũm chọe' },
      es: { civilian: 'Tambor', spy: 'Platillo' },
      fr: { civilian: 'Tambour', spy: 'Cymbale' },
      zh: { civilian: '鼓', spy: '钹' },
    },
    category: 'Instruments', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Flute', spy: 'Clarinet' },
      vi: { civilian: 'Sáo', spy: 'Kèn clarinet' },
      es: { civilian: 'Flauta', spy: 'Clarinete' },
      fr: { civilian: 'Flûte', spy: 'Clarinette' },
      zh: { civilian: '长笛', spy: '单簧管' },
    },
    category: 'Instruments', difficulty: 'hard',
  },
  {
    translations: {
      en: { civilian: 'Trumpet', spy: 'Trombone' },
      vi: { civilian: 'Kèn trumpet', spy: 'Kèn trombone' },
      es: { civilian: 'Trompeta', spy: 'Trombón' },
      fr: { civilian: 'Trompette', spy: 'Trombone' },
      zh: { civilian: '小号', spy: '长号' },
    },
    category: 'Instruments', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Microphone', spy: 'Speaker' },
      vi: { civilian: 'Micro', spy: 'Loa' },
      es: { civilian: 'Micrófono', spy: 'Altavoz' },
      fr: { civilian: 'Microphone', spy: 'Haut-parleur' },
      zh: { civilian: '麦克风', spy: '音响' },
    },
    category: 'Music', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Headphones', spy: 'Earbuds' },
      vi: { civilian: 'Tai nghe chụp', spy: 'Tai nghe nhét' },
      es: { civilian: 'Auriculares', spy: 'Audífonos' },
      fr: { civilian: 'Casque', spy: 'Écouteurs' },
      zh: { civilian: '头戴耳机', spy: '入耳耳机' },
    },
    category: 'Music', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'DJ', spy: 'Producer' },
      vi: { civilian: 'DJ', spy: 'Nhà sản xuất' },
      es: { civilian: 'DJ', spy: 'Productor' },
      fr: { civilian: 'DJ', spy: 'Producteur' },
      zh: { civilian: 'DJ', spy: '制作人' },
    },
    category: 'Music', difficulty: 'hard',
  },
  {
    translations: {
      en: { civilian: 'Concert', spy: 'Festival' },
      vi: { civilian: 'Hòa nhạc', spy: 'Lễ hội' },
      es: { civilian: 'Concierto', spy: 'Festival' },
      fr: { civilian: 'Concert', spy: 'Festival' },
      zh: { civilian: '演唱会', spy: '音乐节' },
    },
    category: 'Music', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Singer', spy: 'Rapper' },
      vi: { civilian: 'Ca sĩ', spy: 'Rapper' },
      es: { civilian: 'Cantante', spy: 'Rapero' },
      fr: { civilian: 'Chanteur', spy: 'Rappeur' },
      zh: { civilian: '歌手', spy: '说唱歌手' },
    },
    category: 'Music', difficulty: 'easy',
  },

  // ============================================================
  // SPORTS & GAMES (10 pairs)
  // ============================================================
  {
    translations: {
      en: { civilian: 'Soccer', spy: 'Football' },
      vi: { civilian: 'Bóng đá', spy: 'Bóng bầu dục' },
      es: { civilian: 'Fútbol', spy: 'Fútbol americano' },
      fr: { civilian: 'Football', spy: 'Football américain' },
      zh: { civilian: '足球', spy: '橄榄球' },
    },
    category: 'Sports', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Basketball', spy: 'Volleyball' },
      vi: { civilian: 'Bóng rổ', spy: 'Bóng chuyền' },
      es: { civilian: 'Baloncesto', spy: 'Voleibol' },
      fr: { civilian: 'Basketball', spy: 'Volleyball' },
      zh: { civilian: '篮球', spy: '排球' },
    },
    category: 'Sports', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Tennis', spy: 'Badminton' },
      vi: { civilian: 'Quần vợt', spy: 'Cầu lông' },
      es: { civilian: 'Tenis', spy: 'Bádminton' },
      fr: { civilian: 'Tennis', spy: 'Badminton' },
      zh: { civilian: '网球', spy: '羽毛球' },
    },
    category: 'Sports', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Swimming', spy: 'Diving' },
      vi: { civilian: 'Bơi lội', spy: 'Lặn' },
      es: { civilian: 'Natación', spy: 'Buceo' },
      fr: { civilian: 'Natation', spy: 'Plongée' },
      zh: { civilian: '游泳', spy: '跳水' },
    },
    category: 'Sports', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Boxing', spy: 'Wrestling' },
      vi: { civilian: 'Quyền Anh', spy: 'Đấu vật' },
      es: { civilian: 'Boxeo', spy: 'Lucha libre' },
      fr: { civilian: 'Boxe', spy: 'Lutte' },
      zh: { civilian: '拳击', spy: '摔跤' },
    },
    category: 'Sports', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Chess', spy: 'Checkers' },
      vi: { civilian: 'Cờ vua', spy: 'Cờ đam' },
      es: { civilian: 'Ajedrez', spy: 'Damas' },
      fr: { civilian: 'Échecs', spy: 'Dames' },
      zh: { civilian: '国际象棋', spy: '跳棋' },
    },
    category: 'Games', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Poker', spy: 'Blackjack' },
      vi: { civilian: 'Poker', spy: 'Xì dách' },
      es: { civilian: 'Póker', spy: 'Blackjack' },
      fr: { civilian: 'Poker', spy: 'Blackjack' },
      zh: { civilian: '扑克', spy: '二十一点' },
    },
    category: 'Games', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Running', spy: 'Jogging' },
      vi: { civilian: 'Chạy bộ', spy: 'Chạy chậm' },
      es: { civilian: 'Correr', spy: 'Trotar' },
      fr: { civilian: 'Course', spy: 'Jogging' },
      zh: { civilian: '跑步', spy: '慢跑' },
    },
    category: 'Sports', difficulty: 'hard',
  },
  {
    translations: {
      en: { civilian: 'Skiing', spy: 'Snowboarding' },
      vi: { civilian: 'Trượt tuyết', spy: 'Lướt ván tuyết' },
      es: { civilian: 'Esquí', spy: 'Snowboard' },
      fr: { civilian: 'Ski', spy: 'Snowboard' },
      zh: { civilian: '滑雪', spy: '单板滑雪' },
    },
    category: 'Sports', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Golf', spy: 'Mini Golf' },
      vi: { civilian: 'Golf', spy: 'Golf mini' },
      es: { civilian: 'Golf', spy: 'Mini Golf' },
      fr: { civilian: 'Golf', spy: 'Mini Golf' },
      zh: { civilian: '高尔夫', spy: '迷你高尔夫' },
    },
    category: 'Sports', difficulty: 'easy',
  },

  // ============================================================
  // TECHNOLOGY (10 pairs)
  // ============================================================
  {
    translations: {
      en: { civilian: 'Phone', spy: 'Tablet' },
      vi: { civilian: 'Điện thoại', spy: 'Máy tính bảng' },
      es: { civilian: 'Teléfono', spy: 'Tableta' },
      fr: { civilian: 'Téléphone', spy: 'Tablette' },
      zh: { civilian: '手机', spy: '平板电脑' },
    },
    category: 'Technology', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Laptop', spy: 'Desktop' },
      vi: { civilian: 'Máy tính xách tay', spy: 'Máy tính bàn' },
      es: { civilian: 'Portátil', spy: 'Ordenador de escritorio' },
      fr: { civilian: 'Ordinateur portable', spy: 'Ordinateur de bureau' },
      zh: { civilian: '笔记本电脑', spy: '台式电脑' },
    },
    category: 'Technology', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Keyboard', spy: 'Mouse' },
      vi: { civilian: 'Bàn phím', spy: 'Chuột' },
      es: { civilian: 'Teclado', spy: 'Ratón' },
      fr: { civilian: 'Clavier', spy: 'Souris' },
      zh: { civilian: '键盘', spy: '鼠标' },
    },
    category: 'Technology', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'TV', spy: 'Monitor' },
      vi: { civilian: 'Tivi', spy: 'Màn hình' },
      es: { civilian: 'Televisión', spy: 'Monitor' },
      fr: { civilian: 'Télévision', spy: 'Moniteur' },
      zh: { civilian: '电视', spy: '显示器' },
    },
    category: 'Technology', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Camera', spy: 'Webcam' },
      vi: { civilian: 'Máy ảnh', spy: 'Webcam' },
      es: { civilian: 'Cámara', spy: 'Webcam' },
      fr: { civilian: 'Caméra', spy: 'Webcam' },
      zh: { civilian: '相机', spy: '网络摄像头' },
    },
    category: 'Technology', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Facebook', spy: 'Instagram' },
      vi: { civilian: 'Facebook', spy: 'Instagram' },
      es: { civilian: 'Facebook', spy: 'Instagram' },
      fr: { civilian: 'Facebook', spy: 'Instagram' },
      zh: { civilian: 'Facebook', spy: 'Instagram' },
    },
    category: 'Technology', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'YouTube', spy: 'TikTok' },
      vi: { civilian: 'YouTube', spy: 'TikTok' },
      es: { civilian: 'YouTube', spy: 'TikTok' },
      fr: { civilian: 'YouTube', spy: 'TikTok' },
      zh: { civilian: 'YouTube', spy: 'TikTok' },
    },
    category: 'Technology', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Google', spy: 'Bing' },
      vi: { civilian: 'Google', spy: 'Bing' },
      es: { civilian: 'Google', spy: 'Bing' },
      fr: { civilian: 'Google', spy: 'Bing' },
      zh: { civilian: 'Google', spy: 'Bing' },
    },
    category: 'Technology', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Email', spy: 'Text Message' },
      vi: { civilian: 'Email', spy: 'Tin nhắn' },
      es: { civilian: 'Correo electrónico', spy: 'Mensaje de texto' },
      fr: { civilian: 'E-mail', spy: 'SMS' },
      zh: { civilian: '电子邮件', spy: '短信' },
    },
    category: 'Technology', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'WiFi', spy: 'Bluetooth' },
      vi: { civilian: 'WiFi', spy: 'Bluetooth' },
      es: { civilian: 'WiFi', spy: 'Bluetooth' },
      fr: { civilian: 'WiFi', spy: 'Bluetooth' },
      zh: { civilian: 'WiFi', spy: '蓝牙' },
    },
    category: 'Technology', difficulty: 'medium',
  },

  // ============================================================
  // NATURE & WEATHER (10 pairs)
  // ============================================================
  {
    translations: {
      en: { civilian: 'Rain', spy: 'Snow' },
      vi: { civilian: 'Mưa', spy: 'Tuyết' },
      es: { civilian: 'Lluvia', spy: 'Nieve' },
      fr: { civilian: 'Pluie', spy: 'Neige' },
      zh: { civilian: '雨', spy: '雪' },
    },
    category: 'Weather', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Sun', spy: 'Moon' },
      vi: { civilian: 'Mặt trời', spy: 'Mặt trăng' },
      es: { civilian: 'Sol', spy: 'Luna' },
      fr: { civilian: 'Soleil', spy: 'Lune' },
      zh: { civilian: '太阳', spy: '月亮' },
    },
    category: 'Nature', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Mountain', spy: 'Hill' },
      vi: { civilian: 'Núi', spy: 'Đồi' },
      es: { civilian: 'Montaña', spy: 'Colina' },
      fr: { civilian: 'Montagne', spy: 'Colline' },
      zh: { civilian: '山', spy: '丘陵' },
    },
    category: 'Nature', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Ocean', spy: 'Sea' },
      vi: { civilian: 'Đại dương', spy: 'Biển' },
      es: { civilian: 'Océano', spy: 'Mar' },
      fr: { civilian: 'Océan', spy: 'Mer' },
      zh: { civilian: '海洋', spy: '海' },
    },
    category: 'Nature', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'River', spy: 'Stream' },
      vi: { civilian: 'Sông', spy: 'Suối' },
      es: { civilian: 'Río', spy: 'Arroyo' },
      fr: { civilian: 'Rivière', spy: 'Ruisseau' },
      zh: { civilian: '河流', spy: '小溪' },
    },
    category: 'Nature', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Forest', spy: 'Jungle' },
      vi: { civilian: 'Rừng', spy: 'Rừng nhiệt đới' },
      es: { civilian: 'Bosque', spy: 'Selva' },
      fr: { civilian: 'Forêt', spy: 'Jungle' },
      zh: { civilian: '森林', spy: '丛林' },
    },
    category: 'Nature', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Cloud', spy: 'Fog' },
      vi: { civilian: 'Mây', spy: 'Sương mù' },
      es: { civilian: 'Nube', spy: 'Niebla' },
      fr: { civilian: 'Nuage', spy: 'Brouillard' },
      zh: { civilian: '云', spy: '雾' },
    },
    category: 'Weather', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Thunder', spy: 'Lightning' },
      vi: { civilian: 'Sấm', spy: 'Sét' },
      es: { civilian: 'Trueno', spy: 'Relámpago' },
      fr: { civilian: 'Tonnerre', spy: 'Éclair' },
      zh: { civilian: '雷', spy: '闪电' },
    },
    category: 'Weather', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Flower', spy: 'Plant' },
      vi: { civilian: 'Hoa', spy: 'Cây' },
      es: { civilian: 'Flor', spy: 'Planta' },
      fr: { civilian: 'Fleur', spy: 'Plante' },
      zh: { civilian: '花', spy: '植物' },
    },
    category: 'Nature', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Tree', spy: 'Bush' },
      vi: { civilian: 'Cây', spy: 'Bụi cây' },
      es: { civilian: 'Árbol', spy: 'Arbusto' },
      fr: { civilian: 'Arbre', spy: 'Buisson' },
      zh: { civilian: '树', spy: '灌木' },
    },
    category: 'Nature', difficulty: 'easy',
  },

  // ============================================================
  // HOUSEHOLD & OBJECTS (15 pairs)
  // ============================================================
  {
    translations: {
      en: { civilian: 'Bed', spy: 'Couch' },
      vi: { civilian: 'Giường', spy: 'Ghế sofa' },
      es: { civilian: 'Cama', spy: 'Sofá' },
      fr: { civilian: 'Lit', spy: 'Canapé' },
      zh: { civilian: '床', spy: '沙发' },
    },
    category: 'Household', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Chair', spy: 'Stool' },
      vi: { civilian: 'Ghế', spy: 'Ghế đẩu' },
      es: { civilian: 'Silla', spy: 'Taburete' },
      fr: { civilian: 'Chaise', spy: 'Tabouret' },
      zh: { civilian: '椅子', spy: '凳子' },
    },
    category: 'Household', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Table', spy: 'Desk' },
      vi: { civilian: 'Bàn ăn', spy: 'Bàn làm việc' },
      es: { civilian: 'Mesa', spy: 'Escritorio' },
      fr: { civilian: 'Table', spy: 'Bureau' },
      zh: { civilian: '桌子', spy: '书桌' },
    },
    category: 'Household', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Lamp', spy: 'Candle' },
      vi: { civilian: 'Đèn', spy: 'Nến' },
      es: { civilian: 'Lámpara', spy: 'Vela' },
      fr: { civilian: 'Lampe', spy: 'Bougie' },
      zh: { civilian: '台灯', spy: '蜡烛' },
    },
    category: 'Household', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Mirror', spy: 'Window' },
      vi: { civilian: 'Gương', spy: 'Cửa sổ' },
      es: { civilian: 'Espejo', spy: 'Ventana' },
      fr: { civilian: 'Miroir', spy: 'Fenêtre' },
      zh: { civilian: '镜子', spy: '窗户' },
    },
    category: 'Household', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Door', spy: 'Gate' },
      vi: { civilian: 'Cửa', spy: 'Cổng' },
      es: { civilian: 'Puerta', spy: 'Portón' },
      fr: { civilian: 'Porte', spy: 'Portail' },
      zh: { civilian: '门', spy: '大门' },
    },
    category: 'Household', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Refrigerator', spy: 'Freezer' },
      vi: { civilian: 'Tủ lạnh', spy: 'Tủ đông' },
      es: { civilian: 'Refrigerador', spy: 'Congelador' },
      fr: { civilian: 'Réfrigérateur', spy: 'Congélateur' },
      zh: { civilian: '冰箱', spy: '冷冻柜' },
    },
    category: 'Household', difficulty: 'medium',
  },
  {
    translations: {
      en: { civilian: 'Oven', spy: 'Microwave' },
      vi: { civilian: 'Lò nướng', spy: 'Lò vi sóng' },
      es: { civilian: 'Horno', spy: 'Microondas' },
      fr: { civilian: 'Four', spy: 'Micro-ondes' },
      zh: { civilian: '烤箱', spy: '微波炉' },
    },
    category: 'Household', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Washing Machine', spy: 'Dryer' },
      vi: { civilian: 'Máy giặt', spy: 'Máy sấy' },
      es: { civilian: 'Lavadora', spy: 'Secadora' },
      fr: { civilian: 'Machine à laver', spy: 'Sèche-linge' },
      zh: { civilian: '洗衣机', spy: '烘干机' },
    },
    category: 'Household', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Fan', spy: 'Air Conditioner' },
      vi: { civilian: 'Quạt', spy: 'Máy lạnh' },
      es: { civilian: 'Ventilador', spy: 'Aire acondicionado' },
      fr: { civilian: 'Ventilateur', spy: 'Climatiseur' },
      zh: { civilian: '风扇', spy: '空调' },
    },
    category: 'Household', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Clock', spy: 'Watch' },
      vi: { civilian: 'Đồng hồ treo tường', spy: 'Đồng hồ đeo tay' },
      es: { civilian: 'Reloj de pared', spy: 'Reloj de pulsera' },
      fr: { civilian: 'Horloge', spy: 'Montre' },
      zh: { civilian: '时钟', spy: '手表' },
    },
    category: 'Objects', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Book', spy: 'Magazine' },
      vi: { civilian: 'Sách', spy: 'Tạp chí' },
      es: { civilian: 'Libro', spy: 'Revista' },
      fr: { civilian: 'Livre', spy: 'Magazine' },
      zh: { civilian: '书', spy: '杂志' },
    },
    category: 'Objects', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Pen', spy: 'Pencil' },
      vi: { civilian: 'Bút bi', spy: 'Bút chì' },
      es: { civilian: 'Bolígrafo', spy: 'Lápiz' },
      fr: { civilian: 'Stylo', spy: 'Crayon' },
      zh: { civilian: '钢笔', spy: '铅笔' },
    },
    category: 'Objects', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Bag', spy: 'Backpack' },
      vi: { civilian: 'Túi xách', spy: 'Ba lô' },
      es: { civilian: 'Bolsa', spy: 'Mochila' },
      fr: { civilian: 'Sac', spy: 'Sac à dos' },
      zh: { civilian: '包', spy: '背包' },
    },
    category: 'Objects', difficulty: 'easy',
  },
  {
    translations: {
      en: { civilian: 'Umbrella', spy: 'Raincoat' },
      vi: { civilian: 'Ô', spy: 'Áo mưa' },
      es: { civilian: 'Paraguas', spy: 'Impermeable' },
      fr: { civilian: 'Parapluie', spy: 'Imperméable' },
      zh: { civilian: '雨伞', spy: '雨衣' },
    },
    category: 'Objects', difficulty: 'easy',
  },
];
