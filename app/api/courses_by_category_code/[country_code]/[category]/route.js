export async function GET(request, {params}) {
    const res = await fetch(`http://127.0.0.1:8000/courses_by_category_code/${params.country_code}/${params.category}/`);
    const data = await res.json(); 
     
    return Response.json({ data });
  }