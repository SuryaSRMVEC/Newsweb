export default async function handler(req, res) {

  const API_KEY = process.env.GNEWS_API_KEY;

  const category = req.query.category || "general";

  const response = await fetch(
    `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=10&apikey=${API_KEY}`
  );

  const data = await response.json();

  res.status(200).json(data);
}