// app/api/countries/route.js

import fetch from 'node-fetch';

export async function GET(req) {
  try {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries');
    const data = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch data' }),
        { status: response.status }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
