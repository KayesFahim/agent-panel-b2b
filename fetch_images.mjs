import https from 'https';

const cities = [
  "Sydney", "Istanbul", "Singapore", "Dubai", "Manila", "Da Nang", "Maldives",
  "Bali", "Petra", "Sharm El Sheik", "Paris", "Rome", "London", "Greece",
  "New York", "Rio de Janeiro", "Los Angeles", "Buenos Aires", "Cairo",
  "Cape Town", "Serengeti", "Victoria Falls"
];

const results = {};

async function fetchUnsplashImage(city) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(city)}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/);
        if (match) {
          resolve(match[0] + "?auto=format&fit=crop&w=800&q=80");
        } else {
          resolve("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"); // fallback
        }
      });
    }).on('error', () => {
      resolve("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80");
    });
  });
}

async function main() {
  for (const city of cities) {
    results[city] = await fetchUnsplashImage(city);
    console.log(`${city}: ${results[city]}`);
  }
}

main();
