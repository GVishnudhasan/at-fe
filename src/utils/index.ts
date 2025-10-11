import type { RowWiseData } from './typeUtils';

export const AppInfo = {
  site_name: 'Atchayam Trust',
  title: 'Atchayam Trust',
  description: "Beggar's Rehabilitation & Skill Development Centre",
  locale: 'en',
};

export const approvalOptions = [
  {
    optVal: 'pending approval',
    optName: 'pending approval',
  },
  {
    optVal: 'approved',
    optName: 'approve',
  },
  {
    optVal: 'need changes',
    optName: 'need changes',
  },
  {
    optVal: 'deleted',
    optName: 'delete',
  },
  {
    optVal: 'hard deleted',
    optName: 'hard delete',
  },
];

export const preventMouseDown = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export const parseString = (s: string): any => {
  try {
    // Attempt to parse the string as JSON
    const parsedJson = JSON.parse(s);

    // Check if the parsed result is an object (excluding arrays)
    if (typeof parsedJson === 'object' && !Array.isArray(parsedJson)) {
      return parsedJson;
    }
  } catch (error) {
    // If JSON parsing fails, treat the input as a regular string
  }

  // If JSON parsing fails or the result is not an object, return the original string
  return s;
};

export const dateNormalise = (date: string = '') => {
  const d = new Date(date);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(d.getDate())) return 'Invalid Date';
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

export const convertToSQLDate = (date = '1970-01-01') => {
  const dateObject = new Date(date);

  // Format the date to 'YYYY-MM-DD' for SQL
  const sqlDate = dateObject.toISOString().split('T')[0];
  return sqlDate;
};

export const convertObjectToCSV = (data) => {
  const headers = Object.keys(data[0]);
  const csvContent = `${headers.join(',')}\n${data
    .map((row) => headers.map((header) => row[header]).join(','))
    .join('\n')}`;

  return csvContent;
};

export const downloadBlob = (blob, fileName) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  // Make the anchor visually hidden
  link.style.display = 'none';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

export const imageUrlToBase64 = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image URL to Base64:', error);
    throw error;
  }
};

// Removing duplicate by updating the last appeared value in the list
export const removeDuplicates = (arr: RowWiseData[]) => {
  const refObj: { [key: string]: number } = {};
  const result: RowWiseData[] = [];
  arr.forEach((obj, i) => {
    const { id } = obj;
    if (id in refObj) {
      const index: number = refObj[id] || 0;
      result[index] = obj;
    } else {
      result.push(obj);
    }
    refObj[id] = i;
  });
  return result;
};

export const generateRandomColor = () => {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Combine components to create a hexadecimal color code
  const colorCode = `#${red.toString(16).padStart(2, '0')}${green
    .toString(16)
    .padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

  return colorCode;
};
