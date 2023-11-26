export async function GET(request, {params}) {
    const res = await fetch(`https://mhadri-final-database-af023718fb18.herokuapp.com/country_by_name/${params.country_name}/`);
    const data = await res.json();    
     
    return Response.json({ data });
  }