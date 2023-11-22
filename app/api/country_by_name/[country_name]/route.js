export async function GET(request, {params}) {
    const res = await fetch(`http://127.0.0.1:8000/country_by_name/${params.country_name}/`);
    const data = await res.json();    
     
    return Response.json({ data });
  }