export async function GET(request, {params}) {
    const res = await fetch(`http://127.0.0.1:8000/teaching_mechanism_counts_by_code/${params.country_code}/`);
    const data = await res.json();    
     
    return Response.json({ data });
  }