export async function GET(request) {
    const res = await fetch('https://mhadri-final-database-af023718fb18.herokuapp.com/type_of_course_counts/');
    const data = await res.json();
    return Response.json({ data })
  }