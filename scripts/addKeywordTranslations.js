// Script to add 10 new language translations to localizedKeywords/index.ts
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'constants', 'localizedKeywords', 'index.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Translation map: English word -> { de, ja, ko, pt, ru, ar, hi, th, id, tr }
const translations = {
  // FOOD & DRINKS
  'Apple': { de: 'Apfel', ja: 'リンゴ', ko: '사과', pt: 'Maçã', ru: 'Яблоко', ar: 'تفاح', hi: 'सेब', th: 'แอปเปิ้ล', id: 'Apel', tr: 'Elma' },
  'Pear': { de: 'Birne', ja: '梨', ko: '배', pt: 'Pera', ru: 'Груша', ar: 'كمثرى', hi: 'नाशपाती', th: 'สาลี่', id: 'Pir', tr: 'Armut' },
  'Coffee': { de: 'Kaffee', ja: 'コーヒー', ko: '커피', pt: 'Café', ru: 'Кофе', ar: 'قهوة', hi: 'कॉफ़ी', th: 'กาแฟ', id: 'Kopi', tr: 'Kahve' },
  'Tea': { de: 'Tee', ja: 'お茶', ko: '차', pt: 'Chá', ru: 'Чай', ar: 'شاي', hi: 'चाय', th: 'ชา', id: 'Teh', tr: 'Çay' },
  'Pizza': { de: 'Pizza', ja: 'ピザ', ko: '피자', pt: 'Pizza', ru: 'Пицца', ar: 'بيتزا', hi: 'पिज़्ज़ा', th: 'พิซซ่า', id: 'Pizza', tr: 'Pizza' },
  'Burger': { de: 'Burger', ja: 'バーガー', ko: '버거', pt: 'Hambúrguer', ru: 'Бургер', ar: 'برجر', hi: 'बर्गर', th: 'เบอร์เกอร์', id: 'Burger', tr: 'Burger' },
  'Rice': { de: 'Reis', ja: 'ご飯', ko: '밥', pt: 'Arroz', ru: 'Рис', ar: 'أرز', hi: 'चावल', th: 'ข้าว', id: 'Nasi', tr: 'Pirinç' },
  'Noodles': { de: 'Nudeln', ja: '麺', ko: '국수', pt: 'Macarrão', ru: 'Лапша', ar: 'معكرونة', hi: 'नूडल्स', th: 'เส้นก๋วยเตี๋ยว', id: 'Mie', tr: 'Erişte' },
  'Chocolate': { de: 'Schokolade', ja: 'チョコレート', ko: '초콜릿', pt: 'Chocolate', ru: 'Шоколад', ar: 'شوكولاتة', hi: 'चॉकलेट', th: 'ช็อกโกแลต', id: 'Cokelat', tr: 'Çikolata' },
  'Candy': { de: 'Bonbon', ja: 'キャンディ', ko: '사탕', pt: 'Doce', ru: 'Конфета', ar: 'حلوى', hi: 'कैंडी', th: 'ลูกอม', id: 'Permen', tr: 'Şeker' },
  'Bread': { de: 'Brot', ja: 'パン', ko: '빵', pt: 'Pão', ru: 'Хлеб', ar: 'خبز', hi: 'रोटी', th: 'ขนมปัง', id: 'Roti', tr: 'Ekmek' },
  'Toast': { de: 'Toast', ja: 'トースト', ko: '토스트', pt: 'Torrada', ru: 'Тост', ar: 'توست', hi: 'टोस्ट', th: 'ขนมปังปิ้ง', id: 'Roti Panggang', tr: 'Tost' },
  'Milk': { de: 'Milch', ja: '牛乳', ko: '우유', pt: 'Leite', ru: 'Молоко', ar: 'حليب', hi: 'दूध', th: 'นม', id: 'Susu', tr: 'Süt' },
  'Yogurt': { de: 'Joghurt', ja: 'ヨーグルト', ko: '요거트', pt: 'Iogurte', ru: 'Йогурт', ar: 'زبادي', hi: 'दही', th: 'โยเกิร์ต', id: 'Yogurt', tr: 'Yoğurt' },
  'Steak': { de: 'Steak', ja: 'ステーキ', ko: '스테이크', pt: 'Bife', ru: 'Стейк', ar: 'ستيك', hi: 'स्टेक', th: 'สเต็ก', id: 'Steak', tr: 'Biftek' },
  'Pork Chop': { de: 'Schweinekotelett', ja: 'ポークチョップ', ko: '돼지갈비', pt: 'Costeleta', ru: 'Свиная отбивная', ar: 'شريحة لحم خنزير', hi: 'पोर्क चॉप', th: 'หมูทอด', id: 'Daging Babi', tr: 'Pirzola' },
  'Orange Juice': { de: 'Orangensaft', ja: 'オレンジジュース', ko: '오렌지주스', pt: 'Suco de Laranja', ru: 'Апельсиновый сок', ar: 'عصير برتقال', hi: 'संतरे का रस', th: 'น้ำส้ม', id: 'Jus Jeruk', tr: 'Portakal Suyu' },
  'Lemonade': { de: 'Limonade', ja: 'レモネード', ko: '레모네이드', pt: 'Limonada', ru: 'Лимонад', ar: 'عصير ليمون', hi: 'नींबू पानी', th: 'น้ำมะนาว', id: 'Limun', tr: 'Limonata' },
  'Sushi': { de: 'Sushi', ja: '寿司', ko: '초밥', pt: 'Sushi', ru: 'Суши', ar: 'سوشي', hi: 'सुशी', th: 'ซูชิ', id: 'Sushi', tr: 'Suşi' },
  'Sashimi': { de: 'Sashimi', ja: '刺身', ko: '사시미', pt: 'Sashimi', ru: 'Сашими', ar: 'ساشيمي', hi: 'साशिमी', th: 'ซาชิมิ', id: 'Sashimi', tr: 'Saşimi' },
  'Ice Cream': { de: 'Eiscreme', ja: 'アイスクリーム', ko: '아이스크림', pt: 'Sorvete', ru: 'Мороженое', ar: 'آيس كريم', hi: 'आइसक्रीम', th: 'ไอศกรีม', id: 'Es Krim', tr: 'Dondurma' },
  'Frozen Yogurt': { de: 'Frozen Joghurt', ja: 'フローズンヨーグルト', ko: '프로즌요거트', pt: 'Iogurte Gelado', ru: 'Замороженный йогурт', ar: 'زبادي مجمد', hi: 'फ्रोजन योगर्ट', th: 'โฟรเซนโยเกิร์ต', id: 'Yogurt Beku', tr: 'Donmuş Yoğurt' },
  'Soup': { de: 'Suppe', ja: 'スープ', ko: '수프', pt: 'Sopa', ru: 'Суп', ar: 'حساء', hi: 'सूप', th: 'ซุป', id: 'Sup', tr: 'Çorba' },
  'Stew': { de: 'Eintopf', ja: 'シチュー', ko: '스튜', pt: 'Ensopado', ru: 'Тушёное мясо', ar: 'يخنة', hi: 'स्टू', th: 'สตูว์', id: 'Semur', tr: 'Güveç' },
  'Cookie': { de: 'Keks', ja: 'クッキー', ko: '쿠키', pt: 'Biscoito', ru: 'Печенье', ar: 'كعكة', hi: 'कुकी', th: 'คุกกี้', id: 'Kue Kering', tr: 'Kurabiye' },
  'Biscuit': { de: 'Biskuit', ja: 'ビスケット', ko: '비스킷', pt: 'Bolacha', ru: 'Бисквит', ar: 'بسكويت', hi: 'बिस्कुट', th: 'บิสกิต', id: 'Biskuit', tr: 'Bisküvi' },
  'Cake': { de: 'Kuchen', ja: 'ケーキ', ko: '케이크', pt: 'Bolo', ru: 'Торт', ar: 'كيك', hi: 'केक', th: 'เค้ก', id: 'Kue', tr: 'Pasta' },
  'Pie': { de: 'Torte', ja: 'パイ', ko: '파이', pt: 'Torta', ru: 'Пирог', ar: 'فطيرة', hi: 'पाई', th: 'พาย', id: 'Pai', tr: 'Turta' },
  'Wine': { de: 'Wein', ja: 'ワイン', ko: '와인', pt: 'Vinho', ru: 'Вино', ar: 'نبيذ', hi: 'शराब', th: 'ไวน์', id: 'Anggur', tr: 'Şarap' },
  'Beer': { de: 'Bier', ja: 'ビール', ko: '맥주', pt: 'Cerveja', ru: 'Пиво', ar: 'بيرة', hi: 'बीयर', th: 'เบียร์', id: 'Bir', tr: 'Bira' },
  'Donut': { de: 'Donut', ja: 'ドーナツ', ko: '도넛', pt: 'Rosquinha', ru: 'Пончик', ar: 'دونات', hi: 'डोनट', th: 'โดนัท', id: 'Donat', tr: 'Donut' },
  'Muffin': { de: 'Muffin', ja: 'マフィン', ko: '머핀', pt: 'Muffin', ru: 'Маффин', ar: 'مافن', hi: 'मफिन', th: 'มัฟฟิน', id: 'Muffin', tr: 'Muffin' },
  'Pancake': { de: 'Pfannkuchen', ja: 'パンケーキ', ko: '팬케이크', pt: 'Panqueca', ru: 'Блин', ar: 'بان كيك', hi: 'पैनकेक', th: 'แพนเค้ก', id: 'Panekuk', tr: 'Krep' },
  'Waffle': { de: 'Waffel', ja: 'ワッフル', ko: '와플', pt: 'Waffle', ru: 'Вафля', ar: 'وافل', hi: 'वाफ़ल', th: 'วาฟเฟิล', id: 'Wafel', tr: 'Waffle' },
  'Honey': { de: 'Honig', ja: 'ハチミツ', ko: '꿀', pt: 'Mel', ru: 'Мёд', ar: 'عسل', hi: 'शहद', th: 'น้ำผึ้ง', id: 'Madu', tr: 'Bal' },
  'Syrup': { de: 'Sirup', ja: 'シロップ', ko: '시럽', pt: 'Xarope', ru: 'Сироп', ar: 'شراب', hi: 'सिरप', th: 'น้ำเชื่อม', id: 'Sirup', tr: 'Şurup' },
  'Butter': { de: 'Butter', ja: 'バター', ko: '버터', pt: 'Manteiga', ru: 'Масло', ar: 'زبدة', hi: 'मक्खन', th: 'เนย', id: 'Mentega', tr: 'Tereyağı' },
  'Margarine': { de: 'Margarine', ja: 'マーガリン', ko: '마가린', pt: 'Margarina', ru: 'Маргарин', ar: 'سمن نباتي', hi: 'मार्जरीन', th: 'มาร์การีน', id: 'Margarin', tr: 'Margarin' },
  'Popcorn': { de: 'Popcorn', ja: 'ポップコーン', ko: '팝콘', pt: 'Pipoca', ru: 'Попкорн', ar: 'فشار', hi: 'पॉपकॉर्न', th: 'ป๊อปคอร์น', id: 'Popcorn', tr: 'Patlamış Mısır' },
  'Chips': { de: 'Chips', ja: 'チップス', ko: '감자칩', pt: 'Batata Frita', ru: 'Чипсы', ar: 'شيبس', hi: 'चिप्स', th: 'มันฝรั่งทอด', id: 'Keripik', tr: 'Cips' },
  // ANIMALS
  'Dog': { de: 'Hund', ja: '犬', ko: '개', pt: 'Cachorro', ru: 'Собака', ar: 'كلب', hi: 'कुत्ता', th: 'สุนัข', id: 'Anjing', tr: 'Köpek' },
  'Wolf': { de: 'Wolf', ja: 'オオカミ', ko: '늑대', pt: 'Lobo', ru: 'Волк', ar: 'ذئب', hi: 'भेड़िया', th: 'หมาป่า', id: 'Serigala', tr: 'Kurt' },
  'Cat': { de: 'Katze', ja: '猫', ko: '고양이', pt: 'Gato', ru: 'Кошка', ar: 'قطة', hi: 'बिल्ली', th: 'แมว', id: 'Kucing', tr: 'Kedi' },
  'Tiger': { de: 'Tiger', ja: 'トラ', ko: '호랑이', pt: 'Tigre', ru: 'Тигр', ar: 'نمر', hi: 'बाघ', th: 'เสือ', id: 'Harimau', tr: 'Kaplan' },
  'Horse': { de: 'Pferd', ja: '馬', ko: '말', pt: 'Cavalo', ru: 'Лошадь', ar: 'حصان', hi: 'घोड़ा', th: 'ม้า', id: 'Kuda', tr: 'At' },
  'Zebra': { de: 'Zebra', ja: 'シマウマ', ko: '얼룩말', pt: 'Zebra', ru: 'Зебра', ar: 'حمار وحشي', hi: 'ज़ेबरा', th: 'ม้าลาย', id: 'Zebra', tr: 'Zebra' },
  'Butterfly': { de: 'Schmetterling', ja: '蝶', ko: '나비', pt: 'Borboleta', ru: 'Бабочка', ar: 'فراشة', hi: 'तितली', th: 'ผีเสื้อ', id: 'Kupu-kupu', tr: 'Kelebek' },
  'Moth': { de: 'Motte', ja: '蛾', ko: '나방', pt: 'Mariposa', ru: 'Моль', ar: 'عثة', hi: 'पतंगा', th: 'มอด', id: 'Ngengat', tr: 'Güve' },
  'Frog': { de: 'Frosch', ja: 'カエル', ko: '개구리', pt: 'Sapo', ru: 'Лягушка', ar: 'ضفدع', hi: 'मेंढक', th: 'กบ', id: 'Katak', tr: 'Kurbağa' },
  'Toad': { de: 'Kröte', ja: 'ヒキガエル', ko: '두꺼비', pt: 'Sapo', ru: 'Жаба', ar: 'علجوم', hi: 'भेक', th: 'คางคก', id: 'Kodok', tr: 'Kara Kurbağa' },
  'Turtle': { de: 'Schildkröte', ja: 'カメ', ko: '거북이', pt: 'Tartaruga', ru: 'Черепаха', ar: 'سلحفاة', hi: 'कछुआ', th: 'เต่า', id: 'Kura-kura', tr: 'Kaplumbağa' },
  'Tortoise': { de: 'Landschildkröte', ja: 'リクガメ', ko: '육지거북', pt: 'Jabuti', ru: 'Сухопутная черепаха', ar: 'سلحفاة برية', hi: 'कछुआ', th: 'เต่าบก', id: 'Kura-kura Darat', tr: 'Kara Kaplumbağası' },
  'Dolphin': { de: 'Delfin', ja: 'イルカ', ko: '돌고래', pt: 'Golfinho', ru: 'Дельфин', ar: 'دلفين', hi: 'डॉल्फिन', th: 'โลมา', id: 'Lumba-lumba', tr: 'Yunus' },
  'Shark': { de: 'Hai', ja: 'サメ', ko: '상어', pt: 'Tubarão', ru: 'Акула', ar: 'قرش', hi: 'शार्क', th: 'ฉลาม', id: 'Hiu', tr: 'Köpek Balığı' },
  'Eagle': { de: 'Adler', ja: 'ワシ', ko: '독수리', pt: 'Águia', ru: 'Орёл', ar: 'نسر', hi: 'गरुड़', th: 'นกอินทรี', id: 'Elang', tr: 'Kartal' },
  'Hawk': { de: 'Falke', ja: 'タカ', ko: '매', pt: 'Falcão', ru: 'Ястреб', ar: 'صقر', hi: 'बाज़', th: 'เหยี่ยว', id: 'Elang', tr: 'Şahin' },
  'Penguin': { de: 'Pinguin', ja: 'ペンギン', ko: '펭귄', pt: 'Pinguim', ru: 'Пингвин', ar: 'بطريق', hi: 'पेंगुइन', th: 'เพนกวิน', id: 'Penguin', tr: 'Penguen' },
  'Puffin': { de: 'Papageitaucher', ja: 'パフィン', ko: '퍼핀', pt: 'Papagaio-do-mar', ru: 'Тупик', ar: 'بفن', hi: 'पफिन', th: 'พัฟฟิน', id: 'Puffin', tr: 'Pufin' },
  'Lion': { de: 'Löwe', ja: 'ライオン', ko: '사자', pt: 'Leão', ru: 'Лев', ar: 'أسد', hi: 'शेर', th: 'สิงโต', id: 'Singa', tr: 'Aslan' },
  'Cheetah': { de: 'Gepard', ja: 'チーター', ko: '치타', pt: 'Guepardo', ru: 'Гепард', ar: 'فهد', hi: 'चीता', th: 'เสือชีตาห์', id: 'Cheetah', tr: 'Çita' },
  'Elephant': { de: 'Elefant', ja: '象', ko: '코끼리', pt: 'Elefante', ru: 'Слон', ar: 'فيل', hi: 'हाथी', th: 'ช้าง', id: 'Gajah', tr: 'Fil' },
  'Hippo': { de: 'Nilpferd', ja: 'カバ', ko: '하마', pt: 'Hipopótamo', ru: 'Бегемот', ar: 'فرس النهر', hi: 'दरियाई घोड़ा', th: 'ฮิปโป', id: 'Kuda Nil', tr: 'Su Aygırı' },
  'Rabbit': { de: 'Kaninchen', ja: 'ウサギ', ko: '토끼', pt: 'Coelho', ru: 'Кролик', ar: 'أرنب', hi: 'खरगोश', th: 'กระต่าย', id: 'Kelinci', tr: 'Tavşan' },
  'Hare': { de: 'Hase', ja: '野ウサギ', ko: '산토끼', pt: 'Lebre', ru: 'Заяц', ar: 'أرنب بري', hi: 'ख़रगोश', th: 'กระต่ายป่า', id: 'Kelinci Liar', tr: 'Yaban Tavşanı' },
  'Snake': { de: 'Schlange', ja: 'ヘビ', ko: '뱀', pt: 'Cobra', ru: 'Змея', ar: 'ثعبان', hi: 'साँप', th: 'งู', id: 'Ular', tr: 'Yılan' },
  'Lizard': { de: 'Eidechse', ja: 'トカゲ', ko: '도마뱀', pt: 'Lagarto', ru: 'Ящерица', ar: 'سحلية', hi: 'छिपकली', th: 'จิ้งจก', id: 'Kadal', tr: 'Kertenkele' },
  'Crocodile': { de: 'Krokodil', ja: 'ワニ', ko: '악어', pt: 'Crocodilo', ru: 'Крокодил', ar: 'تمساح', hi: 'मगरमच्छ', th: 'จระเข้', id: 'Buaya', tr: 'Timsah' },
  'Alligator': { de: 'Alligator', ja: 'アリゲーター', ko: '앨리게이터', pt: 'Jacaré', ru: 'Аллигатор', ar: 'قاطور', hi: 'एलीगेटर', th: 'อัลลิเกเตอร์', id: 'Aligator', tr: 'Timsah' },
  'Monkey': { de: 'Affe', ja: 'サル', ko: '원숭이', pt: 'Macaco', ru: 'Обезьяна', ar: 'قرد', hi: 'बंदर', th: 'ลิง', id: 'Monyet', tr: 'Maymun' },
  'Gorilla': { de: 'Gorilla', ja: 'ゴリラ', ko: '고릴라', pt: 'Gorila', ru: 'Горилла', ar: 'غوريلا', hi: 'गोरिल्ला', th: 'กอริลลา', id: 'Gorila', tr: 'Goril' },
  // TRANSPORTATION
  'Car': { de: 'Auto', ja: '車', ko: '자동차', pt: 'Carro', ru: 'Машина', ar: 'سيارة', hi: 'कार', th: 'รถยนต์', id: 'Mobil', tr: 'Araba' },
  'Bike': { de: 'Fahrrad', ja: '自転車', ko: '자전거', pt: 'Bicicleta', ru: 'Велосипед', ar: 'دراجة', hi: 'साइकिल', th: 'จักรยาน', id: 'Sepeda', tr: 'Bisiklet' },
  'Train': { de: 'Zug', ja: '電車', ko: '기차', pt: 'Trem', ru: 'Поезд', ar: 'قطار', hi: 'ट्रेन', th: 'รถไฟ', id: 'Kereta', tr: 'Tren' },
  'Subway': { de: 'U-Bahn', ja: '地下鉄', ko: '지하철', pt: 'Metrô', ru: 'Метро', ar: 'مترو', hi: 'मेट्रो', th: 'รถไฟใต้ดิน', id: 'MRT', tr: 'Metro' },
  'Airplane': { de: 'Flugzeug', ja: '飛行機', ko: '비행기', pt: 'Avião', ru: 'Самолёт', ar: 'طائرة', hi: 'हवाई जहाज़', th: 'เครื่องบิน', id: 'Pesawat', tr: 'Uçak' },
  'Helicopter': { de: 'Hubschrauber', ja: 'ヘリコプター', ko: '헬리콥터', pt: 'Helicóptero', ru: 'Вертолёт', ar: 'مروحية', hi: 'हेलीकॉप्टर', th: 'เฮลิคอปเตอร์', id: 'Helikopter', tr: 'Helikopter' },
  'Bus': { de: 'Bus', ja: 'バス', ko: '버스', pt: 'Ônibus', ru: 'Автобус', ar: 'حافلة', hi: 'बस', th: 'รถบัส', id: 'Bus', tr: 'Otobüs' },
  'Van': { de: 'Transporter', ja: 'バン', ko: '밴', pt: 'Van', ru: 'Фургон', ar: 'شاحنة صغيرة', hi: 'वैन', th: 'รถตู้', id: 'Van', tr: 'Minibüs' },
  'Boat': { de: 'Boot', ja: 'ボート', ko: '보트', pt: 'Barco', ru: 'Лодка', ar: 'قارب', hi: 'नाव', th: 'เรือ', id: 'Perahu', tr: 'Tekne' },
  'Ship': { de: 'Schiff', ja: '船', ko: '배', pt: 'Navio', ru: 'Корабль', ar: 'سفينة', hi: 'जहाज़', th: 'เรือใหญ่', id: 'Kapal', tr: 'Gemi' },
  'Motorcycle': { de: 'Motorrad', ja: 'バイク', ko: '오토바이', pt: 'Motocicleta', ru: 'Мотоцикл', ar: 'دراجة نارية', hi: 'मोटरसाइकिल', th: 'มอเตอร์ไซค์', id: 'Motor', tr: 'Motosiklet' },
  'Scooter': { de: 'Roller', ja: 'スクーター', ko: '스쿠터', pt: 'Scooter', ru: 'Скутер', ar: 'سكوتر', hi: 'स्कूटर', th: 'สกูตเตอร์', id: 'Skuter', tr: 'Scooter' },
  'Taxi': { de: 'Taxi', ja: 'タクシー', ko: '택시', pt: 'Táxi', ru: 'Такси', ar: 'تاكسي', hi: 'टैक्सी', th: 'แท็กซี่', id: 'Taksi', tr: 'Taksi' },
  'Uber': { de: 'Uber', ja: 'Uber', ko: '우버', pt: 'Uber', ru: 'Uber', ar: 'أوبر', hi: 'उबर', th: 'อูเบอร์', id: 'Uber', tr: 'Uber' },
  'Truck': { de: 'LKW', ja: 'トラック', ko: '트럭', pt: 'Caminhão', ru: 'Грузовик', ar: 'شاحنة', hi: 'ट्रक', th: 'รถบรรทุก', id: 'Truk', tr: 'Kamyon' },
  'Trailer': { de: 'Anhänger', ja: 'トレーラー', ko: '트레일러', pt: 'Reboque', ru: 'Прицеп', ar: 'مقطورة', hi: 'ट्रेलर', th: 'รถพ่วง', id: 'Trailer', tr: 'Römork' },
  'Skateboard': { de: 'Skateboard', ja: 'スケートボード', ko: '스케이트보드', pt: 'Skate', ru: 'Скейтборд', ar: 'لوح تزلج', hi: 'स्केटबोर्ड', th: 'สเก็ตบอร์ด', id: 'Skateboard', tr: 'Kaykay' },
  'Roller Skates': { de: 'Rollschuhe', ja: 'ローラースケート', ko: '롤러스케이트', pt: 'Patins', ru: 'Ролики', ar: 'تزلج بعجلات', hi: 'रोलर स्केट्स', th: 'โรลเลอร์สเก็ต', id: 'Sepatu Roda', tr: 'Paten' },
  'Hot Air Balloon': { de: 'Heißluftballon', ja: '熱気球', ko: '열기구', pt: 'Balão', ru: 'Воздушный шар', ar: 'منطاد', hi: 'गर्म हवा का गुब्बारा', th: 'บอลลูน', id: 'Balon Udara', tr: 'Sıcak Hava Balonu' },
  'Parachute': { de: 'Fallschirm', ja: 'パラシュート', ko: '낙하산', pt: 'Paraquedas', ru: 'Парашют', ar: 'مظلة', hi: 'पैराशूट', th: 'ร่มชูชีพ', id: 'Parasut', tr: 'Paraşüt' },
  // MUSIC & ENTERTAINMENT
  'Guitar': { de: 'Gitarre', ja: 'ギター', ko: '기타', pt: 'Guitarra', ru: 'Гитара', ar: 'جيتار', hi: 'गिटार', th: 'กีตาร์', id: 'Gitar', tr: 'Gitar' },
  'Piano': { de: 'Klavier', ja: 'ピアノ', ko: '피아노', pt: 'Piano', ru: 'Пианино', ar: 'بيانو', hi: 'पियानो', th: 'เปียโน', id: 'Piano', tr: 'Piyano' },
  'Violin': { de: 'Geige', ja: 'バイオリン', ko: '바이올린', pt: 'Violino', ru: 'Скрипка', ar: 'كمان', hi: 'वायलिन', th: 'ไวโอลิน', id: 'Biola', tr: 'Keman' },
  'Cello': { de: 'Cello', ja: 'チェロ', ko: '첼로', pt: 'Violoncelo', ru: 'Виолончель', ar: 'تشيلو', hi: 'चेलो', th: 'เชลโล', id: 'Cello', tr: 'Çello' },
  'Drum': { de: 'Trommel', ja: 'ドラム', ko: '드럼', pt: 'Tambor', ru: 'Барабан', ar: 'طبل', hi: 'ढोल', th: 'กลอง', id: 'Drum', tr: 'Davul' },
  'Cymbal': { de: 'Becken', ja: 'シンバル', ko: '심벌즈', pt: 'Címbalo', ru: 'Тарелка', ar: 'صنج', hi: 'झांझ', th: 'ฉาบ', id: 'Simbal', tr: 'Zil' },
  'Flute': { de: 'Flöte', ja: 'フルート', ko: '플루트', pt: 'Flauta', ru: 'Флейта', ar: 'ناي', hi: 'बांसुरी', th: 'ฟลูต', id: 'Seruling', tr: 'Flüt' },
  'Clarinet': { de: 'Klarinette', ja: 'クラリネット', ko: '클라리넷', pt: 'Clarinete', ru: 'Кларнет', ar: 'كلارينيت', hi: 'शहनाई', th: 'คลาริเน็ต', id: 'Klarinet', tr: 'Klarnet' },
  'Trumpet': { de: 'Trompete', ja: 'トランペット', ko: '트럼펫', pt: 'Trompete', ru: 'Труба', ar: 'بوق', hi: 'तुरही', th: 'ทรัมเป็ต', id: 'Terompet', tr: 'Trompet' },
  'Trombone': { de: 'Posaune', ja: 'トロンボーン', ko: '트롬본', pt: 'Trombone', ru: 'Тромбон', ar: 'ترومبون', hi: 'ट्रॉम्बोन', th: 'ทรอมโบน', id: 'Trombon', tr: 'Trombon' },
  'Microphone': { de: 'Mikrofon', ja: 'マイク', ko: '마이크', pt: 'Microfone', ru: 'Микрофон', ar: 'ميكروفون', hi: 'माइक्रोफ़ोन', th: 'ไมโครโฟน', id: 'Mikrofon', tr: 'Mikrofon' },
  'Speaker': { de: 'Lautsprecher', ja: 'スピーカー', ko: '스피커', pt: 'Alto-falante', ru: 'Колонка', ar: 'سماعة', hi: 'स्पीकर', th: 'ลำโพง', id: 'Speaker', tr: 'Hoparlör' },
  'Headphones': { de: 'Kopfhörer', ja: 'ヘッドフォン', ko: '헤드폰', pt: 'Fone de Ouvido', ru: 'Наушники', ar: 'سماعات', hi: 'हेडफ़ोन', th: 'หูฟัง', id: 'Headphone', tr: 'Kulaklık' },
  'Earbuds': { de: 'Ohrhörer', ja: 'イヤホン', ko: '이어폰', pt: 'Fone Intra', ru: 'Вкладыши', ar: 'سماعات أذن', hi: 'ईयरबड', th: 'หูฟังเอียร์บัด', id: 'Earbuds', tr: 'Kulak İçi' },
  'DJ': { de: 'DJ', ja: 'DJ', ko: 'DJ', pt: 'DJ', ru: 'Диджей', ar: 'دي جي', hi: 'डीजे', th: 'ดีเจ', id: 'DJ', tr: 'DJ' },
  'Producer': { de: 'Produzent', ja: 'プロデューサー', ko: '프로듀서', pt: 'Produtor', ru: 'Продюсер', ar: 'منتج', hi: 'प्रोड्यूसर', th: 'โปรดิวเซอร์', id: 'Produser', tr: 'Yapımcı' },
  'Concert': { de: 'Konzert', ja: 'コンサート', ko: '콘서트', pt: 'Show', ru: 'Концерт', ar: 'حفلة', hi: 'कॉन्सर्ट', th: 'คอนเสิร์ต', id: 'Konser', tr: 'Konser' },
  'Festival': { de: 'Festival', ja: 'フェスティバル', ko: '페스티벌', pt: 'Festival', ru: 'Фестиваль', ar: 'مهرجان', hi: 'फेस्टिवल', th: 'เทศกาล', id: 'Festival', tr: 'Festival' },
  'Singer': { de: 'Sänger', ja: '歌手', ko: '가수', pt: 'Cantor', ru: 'Певец', ar: 'مغني', hi: 'गायक', th: 'นักร้อง', id: 'Penyanyi', tr: 'Şarkıcı' },
  'Rapper': { de: 'Rapper', ja: 'ラッパー', ko: '래퍼', pt: 'Rapper', ru: 'Рэпер', ar: 'مغني راب', hi: 'रैपर', th: 'แรปเปอร์', id: 'Rapper', tr: 'Rapçi' },
  // SPORTS & GAMES
  'Soccer': { de: 'Fußball', ja: 'サッカー', ko: '축구', pt: 'Futebol', ru: 'Футбол', ar: 'كرة قدم', hi: 'फ़ुटबॉल', th: 'ฟุตบอล', id: 'Sepak Bola', tr: 'Futbol' },
  'Football': { de: 'American Football', ja: 'アメフト', ko: '미식축구', pt: 'Futebol Americano', ru: 'Американский футбол', ar: 'كرة قدم أمريكية', hi: 'अमेरिकन फ़ुटबॉल', th: 'อเมริกันฟุตบอล', id: 'Sepak Bola Amerika', tr: 'Amerikan Futbolu' },
  'Basketball': { de: 'Basketball', ja: 'バスケットボール', ko: '농구', pt: 'Basquete', ru: 'Баскетбол', ar: 'كرة سلة', hi: 'बास्केटबॉल', th: 'บาสเกตบอล', id: 'Basket', tr: 'Basketbol' },
  'Volleyball': { de: 'Volleyball', ja: 'バレーボール', ko: '배구', pt: 'Vôlei', ru: 'Волейбол', ar: 'كرة طائرة', hi: 'वॉलीबॉल', th: 'วอลเลย์บอล', id: 'Voli', tr: 'Voleybol' },
  'Tennis': { de: 'Tennis', ja: 'テニス', ko: '테니스', pt: 'Tênis', ru: 'Теннис', ar: 'تنس', hi: 'टेनिस', th: 'เทนนิส', id: 'Tenis', tr: 'Tenis' },
  'Badminton': { de: 'Badminton', ja: 'バドミントン', ko: '배드민턴', pt: 'Badminton', ru: 'Бадминтон', ar: 'تنس الريشة', hi: 'बैडमिंटन', th: 'แบดมินตัน', id: 'Bulu Tangkis', tr: 'Badminton' },
  'Swimming': { de: 'Schwimmen', ja: '水泳', ko: '수영', pt: 'Natação', ru: 'Плавание', ar: 'سباحة', hi: 'तैराकी', th: 'ว่ายน้ำ', id: 'Berenang', tr: 'Yüzme' },
  'Diving': { de: 'Tauchen', ja: 'ダイビング', ko: '다이빙', pt: 'Mergulho', ru: 'Дайвинг', ar: 'غوص', hi: 'डाइविंग', th: 'ดำน้ำ', id: 'Menyelam', tr: 'Dalış' },
  'Boxing': { de: 'Boxen', ja: 'ボクシング', ko: '복싱', pt: 'Boxe', ru: 'Бокс', ar: 'ملاكمة', hi: 'मुक्केबाज़ी', th: 'มวย', id: 'Tinju', tr: 'Boks' },
  'Wrestling': { de: 'Ringen', ja: 'レスリング', ko: '레슬링', pt: 'Luta Livre', ru: 'Борьба', ar: 'مصارعة', hi: 'कुश्ती', th: 'มวยปล้ำ', id: 'Gulat', tr: 'Güreş' },
  'Chess': { de: 'Schach', ja: 'チェス', ko: '체스', pt: 'Xadrez', ru: 'Шахматы', ar: 'شطرنج', hi: 'शतरंज', th: 'หมากรุก', id: 'Catur', tr: 'Satranç' },
  'Checkers': { de: 'Dame', ja: 'チェッカー', ko: '체커', pt: 'Damas', ru: 'Шашки', ar: 'داما', hi: 'चेकर्स', th: 'หมากฮอส', id: 'Dam', tr: 'Dama' },
  'Poker': { de: 'Poker', ja: 'ポーカー', ko: '포커', pt: 'Pôquer', ru: 'Покер', ar: 'بوكر', hi: 'पोकर', th: 'โป๊กเกอร์', id: 'Poker', tr: 'Poker' },
  'Blackjack': { de: 'Blackjack', ja: 'ブラックジャック', ko: '블랙잭', pt: 'Vinte-e-um', ru: 'Блэкджек', ar: 'بلاك جاك', hi: 'ब्लैकजैक', th: 'แบล็คแจ็ค', id: 'Blackjack', tr: 'Blackjack' },
  'Running': { de: 'Laufen', ja: 'ランニング', ko: '달리기', pt: 'Corrida', ru: 'Бег', ar: 'جري', hi: 'दौड़', th: 'วิ่ง', id: 'Lari', tr: 'Koşu' },
  'Jogging': { de: 'Joggen', ja: 'ジョギング', ko: '조깅', pt: 'Cooper', ru: 'Бег трусцой', ar: 'هرولة', hi: 'जॉगिंग', th: 'จ๊อกกิ้ง', id: 'Joging', tr: 'Jogging' },
  'Skiing': { de: 'Skifahren', ja: 'スキー', ko: '스키', pt: 'Esqui', ru: 'Лыжи', ar: 'تزلج', hi: 'स्कीइंग', th: 'สกี', id: 'Ski', tr: 'Kayak' },
  'Snowboarding': { de: 'Snowboarden', ja: 'スノーボード', ko: '스노보드', pt: 'Snowboard', ru: 'Сноуборд', ar: 'تزلج على الثلج', hi: 'स्नोबोर्डिंग', th: 'สโนว์บอร์ด', id: 'Snowboard', tr: 'Snowboard' },
  'Golf': { de: 'Golf', ja: 'ゴルフ', ko: '골프', pt: 'Golfe', ru: 'Гольф', ar: 'جولف', hi: 'गोल्फ़', th: 'กอล์ฟ', id: 'Golf', tr: 'Golf' },
  'Mini Golf': { de: 'Minigolf', ja: 'ミニゴルフ', ko: '미니골프', pt: 'Minigolfe', ru: 'Мини-гольф', ar: 'جولف مصغر', hi: 'मिनी गोल्फ़', th: 'มินิกอล์ฟ', id: 'Mini Golf', tr: 'Mini Golf' },
  // TECHNOLOGY
  'Phone': { de: 'Telefon', ja: '電話', ko: '전화', pt: 'Telefone', ru: 'Телефон', ar: 'هاتف', hi: 'फ़ोन', th: 'โทรศัพท์', id: 'Telepon', tr: 'Telefon' },
  'Tablet': { de: 'Tablet', ja: 'タブレット', ko: '태블릿', pt: 'Tablet', ru: 'Планшет', ar: 'جهاز لوحي', hi: 'टैबलेट', th: 'แท็บเล็ต', id: 'Tablet', tr: 'Tablet' },
  'Laptop': { de: 'Laptop', ja: 'ノートPC', ko: '노트북', pt: 'Notebook', ru: 'Ноутбук', ar: 'حاسوب محمول', hi: 'लैपटॉप', th: 'แล็ปท็อป', id: 'Laptop', tr: 'Laptop' },
  'Desktop': { de: 'Desktop', ja: 'デスクトップ', ko: '데스크톱', pt: 'Desktop', ru: 'Десктоп', ar: 'حاسوب مكتبي', hi: 'डेस्कटॉप', th: 'เดสก์ท็อป', id: 'Komputer', tr: 'Masaüstü' },
  'Keyboard': { de: 'Tastatur', ja: 'キーボード', ko: '키보드', pt: 'Teclado', ru: 'Клавиатура', ar: 'لوحة مفاتيح', hi: 'कीबोर्ड', th: 'คีย์บอร์ด', id: 'Keyboard', tr: 'Klavye' },
  'Mouse': { de: 'Maus', ja: 'マウス', ko: '마우스', pt: 'Mouse', ru: 'Мышь', ar: 'فأرة', hi: 'माउस', th: 'เมาส์', id: 'Mouse', tr: 'Fare' },
  'TV': { de: 'Fernseher', ja: 'テレビ', ko: 'TV', pt: 'TV', ru: 'Телевизор', ar: 'تلفزيون', hi: 'टीवी', th: 'ทีวี', id: 'TV', tr: 'TV' },
  'Monitor': { de: 'Monitor', ja: 'モニター', ko: '모니터', pt: 'Monitor', ru: 'Монитор', ar: 'شاشة', hi: 'मॉनिटर', th: 'จอมอนิเตอร์', id: 'Monitor', tr: 'Monitör' },
  'Camera': { de: 'Kamera', ja: 'カメラ', ko: '카메라', pt: 'Câmera', ru: 'Камера', ar: 'كاميرا', hi: 'कैमरा', th: 'กล้อง', id: 'Kamera', tr: 'Kamera' },
  'Webcam': { de: 'Webcam', ja: 'ウェブカメラ', ko: '웹캠', pt: 'Webcam', ru: 'Веб-камера', ar: 'كاميرا ويب', hi: 'वेबकैम', th: 'เว็บแคม', id: 'Webcam', tr: 'Web Kamera' },
  'Facebook': { de: 'Facebook', ja: 'Facebook', ko: 'Facebook', pt: 'Facebook', ru: 'Facebook', ar: 'فيسبوك', hi: 'फ़ेसबुक', th: 'Facebook', id: 'Facebook', tr: 'Facebook' },
  'Instagram': { de: 'Instagram', ja: 'Instagram', ko: 'Instagram', pt: 'Instagram', ru: 'Instagram', ar: 'إنستغرام', hi: 'इंस्टाग्राम', th: 'Instagram', id: 'Instagram', tr: 'Instagram' },
  'YouTube': { de: 'YouTube', ja: 'YouTube', ko: 'YouTube', pt: 'YouTube', ru: 'YouTube', ar: 'يوتيوب', hi: 'यूट्यूब', th: 'YouTube', id: 'YouTube', tr: 'YouTube' },
  'TikTok': { de: 'TikTok', ja: 'TikTok', ko: 'TikTok', pt: 'TikTok', ru: 'TikTok', ar: 'تيك توك', hi: 'टिकटॉक', th: 'TikTok', id: 'TikTok', tr: 'TikTok' },
  'Google': { de: 'Google', ja: 'Google', ko: 'Google', pt: 'Google', ru: 'Google', ar: 'جوجل', hi: 'गूगल', th: 'Google', id: 'Google', tr: 'Google' },
  'Bing': { de: 'Bing', ja: 'Bing', ko: 'Bing', pt: 'Bing', ru: 'Bing', ar: 'بينج', hi: 'बिंग', th: 'Bing', id: 'Bing', tr: 'Bing' },
  'Email': { de: 'E-Mail', ja: 'メール', ko: '이메일', pt: 'E-mail', ru: 'Электронная почта', ar: 'بريد إلكتروني', hi: 'ईमेल', th: 'อีเมล', id: 'Email', tr: 'E-posta' },
  'Text Message': { de: 'SMS', ja: 'テキスト', ko: '문자', pt: 'SMS', ru: 'СМС', ar: 'رسالة نصية', hi: 'मैसेज', th: 'ข้อความ', id: 'SMS', tr: 'Mesaj' },
  'WiFi': { de: 'WLAN', ja: 'Wi-Fi', ko: '와이파이', pt: 'Wi-Fi', ru: 'Wi-Fi', ar: 'واي فاي', hi: 'वाईफ़ाई', th: 'Wi-Fi', id: 'WiFi', tr: 'WiFi' },
  'Bluetooth': { de: 'Bluetooth', ja: 'Bluetooth', ko: '블루투스', pt: 'Bluetooth', ru: 'Bluetooth', ar: 'بلوتوث', hi: 'ब्लूटूथ', th: 'Bluetooth', id: 'Bluetooth', tr: 'Bluetooth' },
  // NATURE & WEATHER
  'Rain': { de: 'Regen', ja: '雨', ko: '비', pt: 'Chuva', ru: 'Дождь', ar: 'مطر', hi: 'बारिश', th: 'ฝน', id: 'Hujan', tr: 'Yağmur' },
  'Snow': { de: 'Schnee', ja: '雪', ko: '눈', pt: 'Neve', ru: 'Снег', ar: 'ثلج', hi: 'बर्फ़', th: 'หิมะ', id: 'Salju', tr: 'Kar' },
  'Sun': { de: 'Sonne', ja: '太陽', ko: '태양', pt: 'Sol', ru: 'Солнце', ar: 'شمس', hi: 'सूरज', th: 'ดวงอาทิตย์', id: 'Matahari', tr: 'Güneş' },
  'Moon': { de: 'Mond', ja: '月', ko: '달', pt: 'Lua', ru: 'Луна', ar: 'قمر', hi: 'चाँद', th: 'ดวงจันทร์', id: 'Bulan', tr: 'Ay' },
  'Mountain': { de: 'Berg', ja: '山', ko: '산', pt: 'Montanha', ru: 'Гора', ar: 'جبل', hi: 'पहाड़', th: 'ภูเขา', id: 'Gunung', tr: 'Dağ' },
  'Hill': { de: 'Hügel', ja: '丘', ko: '언덕', pt: 'Colina', ru: 'Холм', ar: 'تل', hi: 'पहाड़ी', th: 'เนินเขา', id: 'Bukit', tr: 'Tepe' },
  'Ocean': { de: 'Ozean', ja: '海', ko: '대양', pt: 'Oceano', ru: 'Океан', ar: 'محيط', hi: 'महासागर', th: 'มหาสมุทร', id: 'Samudra', tr: 'Okyanus' },
  'Sea': { de: 'Meer', ja: '海', ko: '바다', pt: 'Mar', ru: 'Море', ar: 'بحر', hi: 'समुद्र', th: 'ทะเล', id: 'Laut', tr: 'Deniz' },
  'River': { de: 'Fluss', ja: '川', ko: '강', pt: 'Rio', ru: 'Река', ar: 'نهر', hi: 'नदी', th: 'แม่น้ำ', id: 'Sungai', tr: 'Nehir' },
  'Stream': { de: 'Bach', ja: '小川', ko: '시내', pt: 'Córrego', ru: 'Ручей', ar: 'جدول', hi: 'धारा', th: 'ลำธาร', id: 'Sungai Kecil', tr: 'Dere' },
  'Forest': { de: 'Wald', ja: '森', ko: '숲', pt: 'Floresta', ru: 'Лес', ar: 'غابة', hi: 'जंगल', th: 'ป่า', id: 'Hutan', tr: 'Orman' },
  'Jungle': { de: 'Dschungel', ja: 'ジャングル', ko: '정글', pt: 'Selva', ru: 'Джунгли', ar: 'أدغال', hi: 'जंगल', th: 'ป่าดงดิบ', id: 'Rimba', tr: 'Orman' },
  'Cloud': { de: 'Wolke', ja: '雲', ko: '구름', pt: 'Nuvem', ru: 'Облако', ar: 'سحابة', hi: 'बादल', th: 'เมฆ', id: 'Awan', tr: 'Bulut' },
  'Fog': { de: 'Nebel', ja: '霧', ko: '안개', pt: 'Neblina', ru: 'Туман', ar: 'ضباب', hi: 'कोहरा', th: 'หมอก', id: 'Kabut', tr: 'Sis' },
  'Thunder': { de: 'Donner', ja: '雷', ko: '천둥', pt: 'Trovão', ru: 'Гром', ar: 'رعد', hi: 'गरज', th: 'ฟ้าร้อง', id: 'Guntur', tr: 'Gök Gürültüsü' },
  'Lightning': { de: 'Blitz', ja: '稲妻', ko: '번개', pt: 'Relâmpago', ru: 'Молния', ar: 'برق', hi: 'बिजली', th: 'ฟ้าแลบ', id: 'Petir', tr: 'Şimşek' },
  'Flower': { de: 'Blume', ja: '花', ko: '꽃', pt: 'Flor', ru: 'Цветок', ar: 'زهرة', hi: 'फूल', th: 'ดอกไม้', id: 'Bunga', tr: 'Çiçek' },
  'Plant': { de: 'Pflanze', ja: '植物', ko: '식물', pt: 'Planta', ru: 'Растение', ar: 'نبات', hi: 'पौधा', th: 'พืช', id: 'Tanaman', tr: 'Bitki' },
  'Tree': { de: 'Baum', ja: '木', ko: '나무', pt: 'Árvore', ru: 'Дерево', ar: 'شجرة', hi: 'पेड़', th: 'ต้นไม้', id: 'Pohon', tr: 'Ağaç' },
  'Bush': { de: 'Busch', ja: '茂み', ko: '덤불', pt: 'Arbusto', ru: 'Куст', ar: 'شجيرة', hi: 'झाड़ी', th: 'พุ่มไม้', id: 'Semak', tr: 'Çalı' },
  // HOME & OBJECTS
  'Bed': { de: 'Bett', ja: 'ベッド', ko: '침대', pt: 'Cama', ru: 'Кровать', ar: 'سرير', hi: 'बिस्तर', th: 'เตียง', id: 'Tempat Tidur', tr: 'Yatak' },
  'Couch': { de: 'Sofa', ja: 'ソファ', ko: '소파', pt: 'Sofá', ru: 'Диван', ar: 'أريكة', hi: 'सोफ़ा', th: 'โซฟา', id: 'Sofa', tr: 'Kanepe' },
  'Chair': { de: 'Stuhl', ja: '椅子', ko: '의자', pt: 'Cadeira', ru: 'Стул', ar: 'كرسي', hi: 'कुर्सी', th: 'เก้าอี้', id: 'Kursi', tr: 'Sandalye' },
  'Stool': { de: 'Hocker', ja: 'スツール', ko: '스툴', pt: 'Banqueta', ru: 'Табурет', ar: 'مقعد', hi: 'स्टूल', th: 'เก้าอี้สตูล', id: 'Bangku', tr: 'Tabure' },
  'Table': { de: 'Tisch', ja: 'テーブル', ko: '테이블', pt: 'Mesa', ru: 'Стол', ar: 'طاولة', hi: 'मेज़', th: 'โต๊ะ', id: 'Meja', tr: 'Masa' },
  'Desk': { de: 'Schreibtisch', ja: 'デスク', ko: '책상', pt: 'Escrivaninha', ru: 'Письменный стол', ar: 'مكتب', hi: 'डेस्क', th: 'โต๊ะทำงาน', id: 'Meja Kerja', tr: 'Çalışma Masası' },
  'Lamp': { de: 'Lampe', ja: 'ランプ', ko: '램프', pt: 'Lâmpada', ru: 'Лампа', ar: 'مصباح', hi: 'लैंप', th: 'โคมไฟ', id: 'Lampu', tr: 'Lamba' },
  'Candle': { de: 'Kerze', ja: 'ろうそく', ko: '초', pt: 'Vela', ru: 'Свеча', ar: 'شمعة', hi: 'मोमबत्ती', th: 'เทียน', id: 'Lilin', tr: 'Mum' },
  'Mirror': { de: 'Spiegel', ja: '鏡', ko: '거울', pt: 'Espelho', ru: 'Зеркало', ar: 'مرآة', hi: 'दर्पण', th: 'กระจก', id: 'Cermin', tr: 'Ayna' },
  'Window': { de: 'Fenster', ja: '窓', ko: '창문', pt: 'Janela', ru: 'Окно', ar: 'نافذة', hi: 'खिड़की', th: 'หน้าต่าง', id: 'Jendela', tr: 'Pencere' },
  'Door': { de: 'Tür', ja: 'ドア', ko: '문', pt: 'Porta', ru: 'Дверь', ar: 'باب', hi: 'दरवाज़ा', th: 'ประตู', id: 'Pintu', tr: 'Kapı' },
  'Gate': { de: 'Tor', ja: '門', ko: '대문', pt: 'Portão', ru: 'Ворота', ar: 'بوابة', hi: 'गेट', th: 'ประตูรั้ว', id: 'Gerbang', tr: 'Kapı' },
  'Refrigerator': { de: 'Kühlschrank', ja: '冷蔵庫', ko: '냉장고', pt: 'Geladeira', ru: 'Холодильник', ar: 'ثلاجة', hi: 'फ्रिज', th: 'ตู้เย็น', id: 'Kulkas', tr: 'Buzdolabı' },
  'Freezer': { de: 'Gefrierschrank', ja: '冷凍庫', ko: '냉동고', pt: 'Freezer', ru: 'Морозильник', ar: 'فريزر', hi: 'फ्रीज़र', th: 'ช่องแช่แข็ง', id: 'Freezer', tr: 'Dondurucu' },
  'Oven': { de: 'Ofen', ja: 'オーブン', ko: '오븐', pt: 'Forno', ru: 'Духовка', ar: 'فرن', hi: 'ओवन', th: 'เตาอบ', id: 'Oven', tr: 'Fırın' },
  'Microwave': { de: 'Mikrowelle', ja: '電子レンジ', ko: '전자레인지', pt: 'Micro-ondas', ru: 'Микроволновка', ar: 'ميكروويف', hi: 'माइक्रोवेव', th: 'ไมโครเวฟ', id: 'Microwave', tr: 'Mikrodalga' },
  'Washing Machine': { de: 'Waschmaschine', ja: '洗濯機', ko: '세탁기', pt: 'Máquina de Lavar', ru: 'Стиральная машина', ar: 'غسالة', hi: 'वॉशिंग मशीन', th: 'เครื่องซักผ้า', id: 'Mesin Cuci', tr: 'Çamaşır Makinesi' },
  'Dryer': { de: 'Trockner', ja: '乾燥機', ko: '건조기', pt: 'Secadora', ru: 'Сушилка', ar: 'مجفف', hi: 'ड्रायर', th: 'เครื่องอบผ้า', id: 'Pengering', tr: 'Kurutma Makinesi' },
  'Fan': { de: 'Ventilator', ja: '扇風機', ko: '선풍기', pt: 'Ventilador', ru: 'Вентилятор', ar: 'مروحة', hi: 'पंखा', th: 'พัดลม', id: 'Kipas', tr: 'Vantilatör' },
  'Air Conditioner': { de: 'Klimaanlage', ja: 'エアコン', ko: '에어컨', pt: 'Ar-condicionado', ru: 'Кондиционер', ar: 'مكيف', hi: 'एयर कंडीशनर', th: 'เครื่องปรับอากาศ', id: 'AC', tr: 'Klima' },
  'Clock': { de: 'Uhr', ja: '時計', ko: '시계', pt: 'Relógio', ru: 'Часы', ar: 'ساعة', hi: 'घड़ी', th: 'นาฬิกา', id: 'Jam', tr: 'Saat' },
  'Watch': { de: 'Armbanduhr', ja: '腕時計', ko: '손목시계', pt: 'Relógio de Pulso', ru: 'Наручные часы', ar: 'ساعة يد', hi: 'कलाई घड़ी', th: 'นาฬิกาข้อมือ', id: 'Jam Tangan', tr: 'Kol Saati' },
  'Book': { de: 'Buch', ja: '本', ko: '책', pt: 'Livro', ru: 'Книга', ar: 'كتاب', hi: 'किताब', th: 'หนังสือ', id: 'Buku', tr: 'Kitap' },
  'Magazine': { de: 'Zeitschrift', ja: '雑誌', ko: '잡지', pt: 'Revista', ru: 'Журнал', ar: 'مجلة', hi: 'पत्रिका', th: 'นิตยสาร', id: 'Majalah', tr: 'Dergi' },
  'Pen': { de: 'Kugelschreiber', ja: 'ペン', ko: '펜', pt: 'Caneta', ru: 'Ручка', ar: 'قلم', hi: 'कलम', th: 'ปากกา', id: 'Pulpen', tr: 'Kalem' },
  'Pencil': { de: 'Bleistift', ja: '鉛筆', ko: '연필', pt: 'Lápis', ru: 'Карандаш', ar: 'قلم رصاص', hi: 'पेंसिल', th: 'ดินสอ', id: 'Pensil', tr: 'Kurşun Kalem' },
  'Bag': { de: 'Tasche', ja: 'バッグ', ko: '가방', pt: 'Bolsa', ru: 'Сумка', ar: 'حقيبة', hi: 'बैग', th: 'กระเป๋า', id: 'Tas', tr: 'Çanta' },
  'Backpack': { de: 'Rucksack', ja: 'リュック', ko: '배낭', pt: 'Mochila', ru: 'Рюкзак', ar: 'حقيبة ظهر', hi: 'बैकपैक', th: 'กระเป๋าเป้', id: 'Ransel', tr: 'Sırt Çantası' },
  'Umbrella': { de: 'Regenschirm', ja: '傘', ko: '우산', pt: 'Guarda-chuva', ru: 'Зонт', ar: 'مظلة', hi: 'छाता', th: 'ร่ม', id: 'Payung', tr: 'Şemsiye' },
  'Raincoat': { de: 'Regenmantel', ja: 'レインコート', ko: '우비', pt: 'Capa de Chuva', ru: 'Дождевик', ar: 'معطف مطر', hi: 'बरसाती', th: 'เสื้อกันฝน', id: 'Jas Hujan', tr: 'Yağmurluk' },
};

// For each keyword entry, find the zh line and add the 10 new languages after it
const locales = ['de', 'ja', 'ko', 'pt', 'ru', 'ar', 'hi', 'th', 'id', 'tr'];

// Process: find each `zh: { civilian: '...', spy: '...' },` line and insert 10 new lines after it
const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  newLines.push(line);

  // Check if this is a zh translation line
  const zhMatch = line.match(/^\s+zh: \{ civilian: '.*', spy: '.*' \},?\s*$/);
  if (zhMatch) {
    // Find the en line above to get the English words
    let enCivilian = '';
    let enSpy = '';
    for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
      const enMatch = lines[j].match(/en: \{ civilian: '([^']+)', spy: '([^']+)' \}/);
      if (enMatch) {
        enCivilian = enMatch[1];
        enSpy = enMatch[2];
        break;
      }
    }

    if (enCivilian && enSpy && translations[enCivilian] && translations[enSpy]) {
      const indent = line.match(/^(\s+)/)?.[1] || '      ';
      for (const locale of locales) {
        const civTrans = translations[enCivilian][locale] || enCivilian;
        const spyTrans = translations[enSpy][locale] || enSpy;
        newLines.push(`${indent}${locale}: { civilian: '${civTrans}', spy: '${spyTrans}' },`);
      }
    }
  }
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
console.log('Done! Added 10 new language translations to all 100 keyword pairs.');
