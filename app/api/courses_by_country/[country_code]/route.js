export async function GET(request, {params}) {
    const res = await fetch(`http://127.0.0.1:8000/courses_by_country/${params.country_code}`);
    const data = await res.json();    
     
    return Response.json({ data });
  }