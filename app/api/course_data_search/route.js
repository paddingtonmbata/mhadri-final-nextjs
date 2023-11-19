export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('search');
    const res = await fetch(`http://127.0.0.1:8000/course_data_search/?search=${query}`);
    const data = await res.json();
   console.log("search params");
    return Response.json({ data });
  }