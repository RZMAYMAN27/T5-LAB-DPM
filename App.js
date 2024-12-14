import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  FlatList,
  Image,
  Button,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// Extend the theme
export const theme = extendTheme({ config });

// Daftar produk tas gunung
const products = [
  {
    id: "1",
    name: "Tas Gunung Eiger 40L",
    description: "Cocok untuk hiking dan pendakian ringan.",
    price: "Rp 750.000",
    image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSve_fFVABqvZwrTN8cbYwBSUAKxDZnK4Z7kQ&s" },
  },
  {
    id: "2",
    name: "Tas Gunung Rei 50L",
    description: "Desain kokoh dan nyaman untuk ekspedisi.",
    price: "Rp 1.200.000",
    image: { uri: "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/5/28/c0c6d44e-1e49-4057-92ae-85a6598a8814.jpg" },
  },
  {
    id: "3",
    name: "Tas Gunung Consina 60L",
    description: "Ideal untuk pendakian panjang.",
    price: "Rp 950.000",
    image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlNS_HRugmkm9r1ZczQqTO2Ex_eCu4KsPnUf3_2KWM7YTeXUPPm1lMSLLwWxcRCqpmq6w&usqp=CAU" },
  },
  {
    id: "4",
    name: "Tas Gunung Deuter 70L",
    description: "Tas berkualitas tinggi untuk perjalanan panjang.",
    price: "Rp 1.500.000",
    image: { uri: "https://img.lazcdn.com/g/ff/kf/S0070aa331c1a476fb23dc6f2957c1578q.jpg_720x720q80.jpg" },
  },
];

// Stack Navigator
const Stack = createStackNavigator();

// Halaman untuk menampilkan produk
function HomeScreen({ navigation }) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Box
          borderWidth={1}
          borderColor="coolGray.300"
          borderRadius="8"
          bg="white"
          shadow={2}
          p={4}
          m={3}
          _dark={{ bg: "blueGray.700", borderColor: "blueGray.600" }}
        >
          <Image
            source={item.image}
            alt={item.name}
            size="xl"
            borderRadius={8}
            resizeMode="cover"
          />
          <VStack space={2} mt={2}>
            <Text bold fontSize="lg" _dark={{ color: "white" }}>
              {item.name}
            </Text>
            <Text fontSize="sm" color="coolGray.600" _dark={{ color: "coolGray.300" }}>
              {item.description}
            </Text>
            <Text bold color="emerald.500" fontSize="md">
              {item.price}
            </Text>
            <Button
              colorScheme="emerald"
              mt={2}
              onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
            >
              Beli Sekarang
            </Button>
          </VStack>
        </Box>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

// Halaman Detail Produk
function ProductDetail({ route, navigation }) {
  const { productId } = route.params;
  const product = products.find((p) => p.id === productId);

  return (
    <VStack space={4} alignItems="center" mt={5} px={4}>
      <Box
        width="100%"
        height={300}
        mb={4}
        borderRadius="12"
        overflow="hidden"
        shadow={5}
        _dark={{ bg: "blueGray.700" }}
      >
        <Image
          source={product.image}
          alt={product.name}
          height="100%"
          width="100%"
          resizeMode="cover"
        />
      </Box>
      <Text bold fontSize="3xl" color="coolGray.800" _dark={{ color: "white" }} textAlign="center">
        {product.name}
      </Text>
      <Text mt={2} fontSize="md" color="coolGray.600" _dark={{ color: "coolGray.300" }} textAlign="center">
        {product.description}
      </Text>
      <Text mt={4} color="emerald.600" fontSize="2xl" bold textAlign="center">
        {product.price}
      </Text>
      <Button
        colorScheme="emerald"
        mt={6}
        size="lg"
        onPress={() => navigation.navigate("OrderScreen", { productId: product.id })}
      >
        Beli Sekarang
      </Button>
    </VStack>
  );
}

// Halaman Pemesanan (OrderScreen)
function OrderScreen({ route }) {
  const { productId } = route.params;
  const product = products.find((p) => p.id === productId);

  return (
    <VStack space={4} alignItems="center" mt={5} px={4}>
      <Heading size="lg">Halaman Pemesanan</Heading>
      <Text bold fontSize="xl">
        Anda Memilih:
      </Text>
      <Box
        borderWidth={1}
        borderColor="coolGray.300"
        borderRadius="8"
        bg="white"
        shadow={2}
        p={4}
        m={3}
        _dark={{ bg: "blueGray.700", borderColor: "blueGray.600" }}
        width="90%"
      >
        <Image
          source={product.image}
          alt={product.name}
          size="xl"
          borderRadius={8}
          resizeMode="cover"
        />
        <Text bold fontSize="lg" mt={2}>
          {product.name}
        </Text>
        <Text fontSize="sm" mt={1}>
          {product.description}
        </Text>
        <Text bold color="emerald.500" fontSize="lg" mt={2}>
          {product.price}
        </Text>
      </Box>
      <Button colorScheme="emerald" mt={6} size="lg">
        Lanjutkan Pembayaran
      </Button>
    </VStack>
  );
}

// App Component
  export default function App() {
    return (
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: "Adventure By R.U.A" }} 
            />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    );
}
