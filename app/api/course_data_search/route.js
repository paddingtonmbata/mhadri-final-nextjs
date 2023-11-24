export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('search');
    const res = await fetch(`https://mhadri-final-database-af023718fb18.herokuapp.com/course_data_search/?search=${query}`);
    const data = await res.json();
   console.log("search params");
    return Response.json({ data });
  }