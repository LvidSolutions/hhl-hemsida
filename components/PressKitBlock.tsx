import Button from "@/components/Button";

/** Gate-free press downloads on a stone band. Links are stubs in the MVP. */
export default function PressKitBlock({ projectTitle }: { projectTitle: string }) {
  return (
    <div className="bg-stone">
      <div className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
        <h2 className="t-label font-medium">Press kit</h2>
        <p className="t-caption mt-3 max-w-xl">
          12 photographs (print resolution) · fact sheet PDF · plans and sections · credit lines
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="#" meta="240 MB">
            Download press kit
          </Button>
          <Button href="#" variant="secondary">
            Fact sheet only (PDF)
          </Button>
        </div>
        <p className="t-caption mt-5 max-w-xl">
          Images for {projectTitle} are released for editorial use with the credit lines included. For
          other uses, contact press@hhl.se (sample address). Downloads are stubs in this MVP build.
        </p>
      </div>
    </div>
  );
}
