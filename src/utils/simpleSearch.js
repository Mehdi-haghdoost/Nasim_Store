// نرمال‌سازی برای متن فارسی و انگلیسی
export const normalizeText = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/[ك]/g, "ک")
    .replace(/[\u064B-\u0652]/g, "") // حذف حرکات عربی
    .replace(/\s+/g, " ")
    .trim();
};

// محاسبه فاصله Levenshtein بین دو کلمه
export const levenshteinDistance = (a, b) => {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // حذف
          dp[i][j - 1],     // اضافه
          dp[i - 1][j - 1]  // جایگزینی
        );
      }
    }
  }

  return dp[m][n];
};

// بررسی شباهت دو کلمه با آستانه سخت‌گیرانه‌تر
export const areWordsSimilar = (a, b) => {
  const distance = levenshteinDistance(a, b);
  const maxLen = Math.max(a.length, b.length);
  const minLen = Math.min(a.length, b.length);

  // اگر تفاوت طول کلمات زیاد باشه، احتمالاً مطابقت نداره
  if (Math.abs(a.length - b.length) > maxLen * 0.5) {
    return false;
  }

  // آستانه‌های سخت‌گیرانه‌تر
  if (maxLen <= 3) return distance === 0; // کلمات کوتاه باید دقیقاً مطابقت داشته باشند
  if (maxLen <= 5) return distance <= 1;
  if (maxLen <= 8) return distance <= 2;
  return distance <= Math.floor(maxLen * 0.25); // حداکثر 25% اختلاف
};

// تابع جدید برای بررسی شباهت دقیق‌تر
export const isExactOrCloseMatch = (word, query) => {
  // ابتدا بررسی دقیق
  if (word === query) return true;
  
  // بررسی اینکه آیا یکی شامل دیگری است (برای کلمات طولانی)
  if (query.length >= 4) {
    if (word.includes(query) || query.includes(word)) return true;
  }
  
  // بررسی شباهت با آستانه سخت‌گیرانه
  return areWordsSimilar(word, query);
};

// جستجوی بهینه شده با دقت بیشتر
export const simpleSearch = (text, query) => {
  if (!text || !query) return false;

  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);

  // اگر query خیلی کوتاه باشه (کمتر از 3 کاراکتر)، فقط exact match
  if (normalizedQuery.length < 3) {
    return normalizedText.includes(normalizedQuery);
  }

  // اگر به‌صورت دقیق در متن باشه - بالاترین اولویت
  if (normalizedText.includes(normalizedQuery)) return true;

  // تقسیم متن به کلمات (حذف علائم نگارشی و فاصله‌های اضافی)
  const words = normalizedText.split(/[^a-zA-Z0-9آ-ی]+/).filter(word => word.length > 0);
  
  // بررسی هر کلمه به‌صورت جداگانه
  for (const word of words) {
    // برای کلمات مهم (طولانی‌تر از 4 کاراکتر)
    if (word.length >= 4 && normalizedQuery.length >= 4) {
      if (isExactOrCloseMatch(word, normalizedQuery)) {
        return true;
      }
    }
    // برای کلمات کوتاه، فقط exact match
    else if (word === normalizedQuery) {
      return true;
    }
  }

  return false;
};

// تابع اضافی برای جستجوی دقیق‌تر در فیلدهای مختلف
export const searchInProduct = (product, query) => {
  if (!query || query.trim() === '') return true;

  const searchTerm = query.trim();
  
  // اولویت‌بندی جستجو
  const searchFields = [
    { field: product.title, weight: 10 },
    { field: product.originalName, weight: 8 },
    { field: product.brand, weight: 6 },
    { field: product.category?.name, weight: 4 },
    { field: product.description, weight: 2 }
  ];

  let maxScore = 0;
  
  for (const { field, weight } of searchFields) {
    if (field && simpleSearch(field, searchTerm)) {
      const normalizedField = normalizeText(field);
      const normalizedQuery = normalizeText(searchTerm);
      
      // امتیاز بیشتر برای exact match
      if (normalizedField.includes(normalizedQuery)) {
        maxScore = Math.max(maxScore, weight * 2);
      } else {
        maxScore = Math.max(maxScore, weight);
      }
    }
  }

  // فقط نتایج با امتیاز بالا را برگردان
  return maxScore >= 4; // حداقل امتیاز برای نمایش
};