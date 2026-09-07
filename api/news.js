export default async function handler(req, res) {
  try {
    const API_KEY = process.env.GNEWS_API_KEY;

    const category = req.query.category || "general";

    const url =
      `https://gnews.io/api/v4/top-headlines` +
      `?category=${category}` +
      `&lang=en` +
      `&country=in` +
      `&max=10` +
      `&apikey=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    console.log("GNews response:", data);

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
}