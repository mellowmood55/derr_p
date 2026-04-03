type HobbiesCloudProps = {
  hobbies: readonly string[];
};

export function HobbiesCloud({ hobbies }: HobbiesCloudProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {hobbies.map((hobby) => (
        <span
          key={hobby}
          className="rounded-full border border-yellow-500/30 bg-black/60 px-3 py-1 text-sm text-zinc-200"
        >
          {hobby}
        </span>
      ))}
    </div>
  );
}
