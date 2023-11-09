export async function GET(request) {
    const res = await fetch('http://127.0.0.1:8000/country_course_count/');
    const data = await res.json();
   
    return Response.json({ data })
  }