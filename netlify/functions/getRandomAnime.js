// Netlify Function: proxy AniDB HTTP API over HTTPS and return JSON
// This parses the returned AniDB XML (minimally) and returns a compact JSON object
// Note: GitHub Copilot generated code below; reviewed and modified as needed, as it was far more difficult than I originally expected/is outside the scope of this class.

exports.handler = async function (event) {
  const client = 'animatefinal';
  const clientver = '1';
  const protover = '1';
  const requestParam = (event.queryStringParameters && event.queryStringParameters.request) || 'randomrecommendation';

  const anidbUrl = `http://api.anidb.net:9001/httpapi?client=${client}&clientver=${clientver}&protover=${protover}&request=${encodeURIComponent(requestParam)}`;

  try {
    const res = await fetch(anidbUrl);
    const text = await res.text();

    // Check for AniDB XML error tag
    const errorMatch = text.match(/<error(?:\s+code="(\d+)")?>([\s\S]*?)<\/error>/i);
    if (errorMatch) {
      const code = errorMatch[1] || null;
      const message = (errorMatch[2] || '').trim();
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: { code, message }, raw: text })
      };
    }

    // Attempt to extract the first <anime ...>...</anime>
    const animeMatch = text.match(/<anime[^>]*id="(\d+)"[^>]*>([\s\S]*?)<\/anime>/i);
    if (animeMatch) {
      const aid = animeMatch[1];
      const inner = animeMatch[2];
      // Try to find a title typed as main, otherwise the first title
      const titleMatch = inner.match(/<title[^>]*type="main"[^>]*>([^<]+)<\/title>/i) || inner.match(/<title[^>]*>([^<]+)<\/title>/i);
      const pictureMatch = inner.match(/<picture>([^<]+)<\/picture>/i);
      const typeMatch = inner.match(/<type>([^<]+)<\/type>/i);
      const episodeCountMatch = inner.match(/<episodecount>(\d+)<\/episodecount>/i);

      const anime = {
        aid,
        title: titleMatch ? titleMatch[1].trim() : null,
        picture: pictureMatch ? pictureMatch[1].trim() : null,
        type: typeMatch ? typeMatch[1].trim() : null,
        episodecount: episodeCountMatch ? parseInt(episodeCountMatch[1], 10) : null
      };

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request: requestParam, anime, raw: text })
      };
    }

    // Fallback: return the raw text if we couldn't parse a known structure
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request: requestParam, raw: text })
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: `Error proxying AniDB request: ${err.message || err}` })
    };
  }
};
