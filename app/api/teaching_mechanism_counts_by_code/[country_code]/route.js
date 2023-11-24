export async function GET(request, {params}) {
    const res = await fetch(`https://mhadri-final-database-af023718fb18.herokuapp.com/teaching_mechanism_counts_by_code/${params.country_code}/`);
    const data = await res.json();    
     
    return Response.json({ data });
  }