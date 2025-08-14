interface StudentPageProps {
  params: {
    name: string;
  };
}

export default async function StudentPage({ params }: StudentPageProps) {
  const { name } = await params;
  return (
    <div>
      <h1>Student Name: {name}</h1>
    </div>
  );
}
