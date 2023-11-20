export async function GET(request) {
    const res = await fetch("http://127.0.0.1:8000/thematic_focus_counts/");
    const data = await res.json();
    return Response.json({ data });
}