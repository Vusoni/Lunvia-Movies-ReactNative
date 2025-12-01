import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

const Index = () => {
  const router = useRouter(); // Router to nvaigate user 

  // Fetching trending movies
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies); // Fetch trending movies using custom hook 

  // Fetching movies
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" })); // Custom use Fetch hook

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-44 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingLoading ? ( // Render conditional rendering moovies
          <ActivityIndicator
            size="large"
            color="white"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : ( // Rendering view if ther isn't loading 
          <View className="flex-1 mt-5">
            <SearchBar // Search bar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search latest movies"
            />

            
            Trening Movies Render
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Browse Movies
              </Text>

              <FlatList // Flat List
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />} // Destructure movies
                keyExtractor={(item) => item.id.toString()} // Say to React Native how many items they are and how positioned
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false} // Because the entire view is scrollable 
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
