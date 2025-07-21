import { Badge } from "@/components/ui/badge";

interface AvailableBagdeProps {
  isAvailable: boolean;
}

const AvailableBagde = ({ isAvailable }: AvailableBagdeProps) => {
  return (
    <>
      {!isAvailable ? (
        <Badge className="absolute top-3 right-3 bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          Próximamente
        </Badge>
      ) : (
        <Badge className="absolute top-3 right-3 bg-emerald-700 text-white px-3 py-1 rounded-full text-xs font-medium">
          Disponible
        </Badge>
      )}
    </>
  );
};

export default AvailableBagde;
