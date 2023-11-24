export async function GET(request, {params}) {
    const res = await fetch(`https://mhadri-final-database-af023718fb18.herokuapp.com/courses_by_category_code/${params.country_code}/${params.category}/`);
    const data = await res.json(); 
     
    return Response.json({ data });
  }