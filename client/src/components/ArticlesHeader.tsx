import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ArticlesHeader = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}) => {
  return (
    <div className="w-full h-16  flex items-center justify-between">
      <h2 className="text-4xl font-title font-bold">Latest Articles</h2>
      <div>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="flex gap-4"
        >
          {categories.map((el) => (
            <ToggleGroupItem
              variant={"outline"}
              key={el}
              value={el}
              aria-label={`Toggle ${el}`}
              className="data-[state=on]:bg-black hover:bg-black/10 data-[state=on]:text-white h-8 bg-black/5 rounded-2xl border-0 font-medium font-satoshi shadow-none w-fit px-4"
            >
              {el}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default ArticlesHeader;
