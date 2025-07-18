// This is the Server Component (page.tsx)
import CoursePageClient from "./CoursePageClient";

// This runs on the server and can export generateStaticParams
export async function generateStaticParams() {
  // Return empty array for fully dynamic, or fetch your course IDs
  return [
    {
      courseId: "1",
    },
    {
      courseId: "2",
    },
    {
      courseId: "3",
    },
  ];

  // Or if you have course IDs:
  // const courseIds = await fetchCourseIds(); // Your API call
  // return courseIds.map((courseId) => ({
  //   courseId: courseId,
  // }));
}

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  // Pass the courseId to the client component
  return <CoursePageClient courseId={params.courseId} />;
}
