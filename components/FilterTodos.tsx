//Components
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

//Types
import type { Dispatch, SetStateAction } from "react";

type PropType = {
  setFilter: Dispatch<SetStateAction<string>>;
};
const FilterTodos = ({ setFilter }: PropType) => {
  return (
    <div>
      <Tabs defaultValue="All">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="All" onClick={() => setFilter("All")}>
            All
          </TabsTrigger>
          <TabsTrigger value="Active" onClick={() => setFilter("Active")}>
            Active
          </TabsTrigger>
          <TabsTrigger value="Completed" onClick={() => setFilter("Completed")}>
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default FilterTodos;
