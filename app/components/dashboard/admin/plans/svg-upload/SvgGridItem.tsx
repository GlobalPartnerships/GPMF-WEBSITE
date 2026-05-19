import { CloudinaryImage } from "./types";

export function SvgGridItem({
  image,
  onDelete,
  deleteLabel,
}: {
  image: CloudinaryImage;
  onDelete: (id: string) => void;
  deleteLabel: string;
}) {
  const imageUrl =
    (image as any).secure_url ??
    (image as any).url ??
    (image as any).public_id ??
    "";

  return (
    <div className="relative flex flex-col items-center justify-between rounded-lg border border-outline/10 bg-surface p-2 text-[11px]">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={image.id}
          className="h-16 w-16 rounded-md object-contain"
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-outline/10">
          {image.id}
        </div>
      )}
      <button
        type="button"
        onClick={() => onDelete(image.id)}
        className="mt-2 rounded-md bg-burgundy px-2 py-1 text-white"
      >
        {deleteLabel}
      </button>
    </div>
  );
}