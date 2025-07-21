import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@radix-ui/react-tooltip";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FavoriteButtonProps {
  isLiked: boolean;
  favLoading?: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const FavoriteButton = ({
  isLiked,
  favLoading,
  onClick,
}: FavoriteButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            disabled={favLoading}
            className={`absolute top-3 left-3 rounded-full cursor-pointer ${
              isLiked ? "bg-red-500 text-white" : "bg-white/80 hover:bg-white"
            } ${
              favLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
            aria-label={
              isLiked ? "Remover de favoritos" : "Agregar a favoritos"
            }
          >
            <Heart
              className={`h-5 w-5 ${
                isLiked ? "fill-current" : "text-gray-600"
              }`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isLiked ? "Remover de favoritos" : "Agregar a favoritos"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FavoriteButton;
