import type { Service as ServiceType } from "./types";
import { Card } from "@radix-ui/themes";

const Service = ({ service }: { service?: ServiceType }) => {
  return (
    <Card>
      {service !==undefined ? (
        <div className="p-4 rounded-lg shadow-md">
          <h3 className="font-semibold">{service.title}</h3>
          <p className="text-sm text-gray-500">{service.description}</p>
        </div>
      ) : (
        <div className="p-4 rounded-lg animate-pulse shadow-md space-y-2">
          <div className="h-4 w-2/3 bg-gray-300 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 rounded" />
        </div>
      )}
    </Card>
  );
};

export default Service;
