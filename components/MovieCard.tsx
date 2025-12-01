import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";

// Movie Card Component
export const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image // Render image for movie
          source={{
            uri: poster_path  // Custom poster path image
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/000000/000000.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">

          {/* Movie Details (Years and Type) */}
          <Text className="text-xs mt-1 font-medium text-light-300 uppercase">
            Movie
          </Text>
          <Text className="text-xs text-light-300 font-medium mt-1">
            {/* Split Release data year */}
            {release_date?.split("-")[0]} 
          </Text>

        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
