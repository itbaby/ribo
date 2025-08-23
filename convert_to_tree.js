import { readFileSync, writeFileSync } from 'fs';

// 读取原始JSON文件
const originalJson = JSON.parse(readFileSync('src/locales/zh.json', 'utf8'));

function convertToTree(flatObj) {
  const result = {};
  
  for (const [key, value] of Object.entries(flatObj)) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];
      
      // 处理数组索引（如 "services.0.title"）
      if (!isNaN(currentKey) && i > 0) {
        const prevKey = keys[i - 1];
        if (!Array.isArray(current[prevKey])) {
          current[prevKey] = [];
        }
        
        const index = parseInt(currentKey);
        if (i === keys.length - 1) {
          current[prevKey][index] = value;
        } else {
          if (!current[prevKey][index]) {
            current[prevKey][index] = {};
          }
          current = current[prevKey][index];
        }
        break;
      }
      
      if (i === keys.length - 1) {
        current[currentKey] = value;
      } else {
        if (!current[currentKey]) {
          // 检查下一个键是否是数字（数组索引）
          const nextKey = keys[i + 1];
          if (!isNaN(nextKey)) {
            current[currentKey] = [];
          } else {
            current[currentKey] = {};
          }
        }
        current = current[currentKey];
      }
    }
  }
  
  return result;
}

// 转换为树状结构
const treeStructure = convertToTree(originalJson);

// 写入新文件
writeFileSync(
  'src/locales/zh_tree.json', 
  JSON.stringify(treeStructure, null, 2),
  'utf8'
);

console.log('转换完成！已保存到 src/locales/zh_tree.json');