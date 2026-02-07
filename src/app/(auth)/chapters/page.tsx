export default function ChapterPage() {
  return (
    <div className="min-h-screen bg-bg-main p-[clamp(1rem,2vw,2rem)] flex flex-col gap-[clamp(1.5rem,2.5vw,2.5rem)]">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-heading text-text-primary">
          Chapters (Muhud) Library
        </h1>
        <p className="text-text-secondary text-[clamp(0.875rem,1vw,1rem)]">
          Manage, edit, and organize the complete collection of chapters
          (muhud).
        </p>
      </div>
    </div>
  );
}
