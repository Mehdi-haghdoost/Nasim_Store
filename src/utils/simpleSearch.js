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

// بررسی شباهت دو کلمه با آستانه Levenshtein
export const areWordsSimilar = (a, b) => {
  const distance = levenshteinDistance(a, b);
  const maxLen = Math.max(a.length, b.length);

  if (maxLen <= 4) return distance <= 1;
  if (maxLen <= 7) return distance <= 2;
  return distance <= 3;
};


// جستجوی ساده ولی هوشمند
export const simpleSearch = (text, query) => {
  if (!text || !query) return false;

  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);

  // اگر به‌صورت دقیق در متن باشه
  if (normalizedText.includes(normalizedQuery)) return true;

  // مقایسه fuzzy با کل متن
  if (areWordsSimilar(normalizedText, normalizedQuery)) return true;

  // مقایسه fuzzy با کلمات مجزا
  const words = normalizedText.split(/[^a-zA-Z0-9آ-ی]+/);
  return words.some(word => areWordsSimilar(word, normalizedQuery));
};
