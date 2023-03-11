import axios from 'axios';
export async function ScannedImages(data) {
    const options = {
      method: 'POST',
      url: `https://tecnorn.online/api/V1/report/ocr`,
      params:data,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    return await axios.request(options);
}