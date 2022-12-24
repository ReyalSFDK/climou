import * as React from 'react';
import { NativeBaseProvider, Box, View, Heading, Text } from "native-base";
import { useLocalObservable } from "mobx-react-lite";
import Store from "./store";

export default function Home() {
	const store = useLocalObservable(() => new Store());

	React.useEffect(
		() => {
			store.positionShelf.requestLocation();
		},
		[store],
	)
	return (
		<NativeBaseProvider>
			<View>
				<Heading>Climou!</Heading>
				{
					store.positionShelf.loader.isLoading
						? <Text>Um instante enquanto carregamos sua localização atual</Text>
						: !!store.positionShelf.requestPositionError.value
							? <Text> Houve um erro ao carregar sua localização atual: {store.positionShelf.requestPositionError.value.code}</Text>
							: (
								<Box>
									<Text>Sua localização atual: </Text>
									<Text>
										Latitude: {store.positionShelf.currentUserPosition.value?.coords.latitude}
									</Text>
									<Text>
										Longitude: {store.positionShelf.currentUserPosition.value?.coords.longitude}
									</Text>
								</Box>
							)
				}
			</View>
		</NativeBaseProvider>
	);
}
