const fs = require("fs");
const path = require("path");

// Đường dẫn đến thư mục db
const DB_DIR = path.join(__dirname, "..", "db");

// Function để đảm bảo thư mục db tồn tại
function ensureDbDir() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

// Function để load dữ liệu từ file JSON
function loadDB(resourceName) {
  try {
    ensureDbDir();
    const filePath = path.join(DB_DIR, `${resourceName}.json`);

    // Kiểm tra file có tồn tại không
    if (!fs.existsSync(filePath)) {
      // Tạo file mới với array rỗng
      fs.writeFileSync(filePath, "[]", "utf-8");
      return [];
    }

    // Đọc file
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading ${resourceName}:`, error);
    return [];
  }
}

// Function để lưu dữ liệu vào file JSON
function saveDB(resourceName, data) {
  try {
    ensureDbDir();
    const filePath = path.join(DB_DIR, `${resourceName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error saving ${resourceName}:`, error);
    return false;
  }
}

module.exports = { loadDB, saveDB };
