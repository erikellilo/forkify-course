import { TIMEOUT_SEC } from "./config";
import { async } from "regenerator-runtime";

// *Time Out Function
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // !ambil data dari API
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // !rubah data yang masuk dan diambil bodinya untuk dipakai
    const data = await res.json();

    // !buat eror jika data yang diambil dari API terjadi kesalahan
    if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     // !ambil data dari API
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     // !rubah data yang masuk dan diambil bodinya untuk dipakai
//     const data = await res.json();

//     // !buat eror jika data yang diambil dari API terjadi kesalahan
//     if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(uploadData),
//     });

//     // !ambil data dari API
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     // !rubah data yang masuk dan diambil bodinya untuk dipakai
//     const data = await res.json();

//     // !buat eror jika data yang diambil dari API terjadi kesalahan
//     if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
