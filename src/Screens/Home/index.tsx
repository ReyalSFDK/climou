import * as React from 'react';
import { Box, View, Heading, Text, Button } from "native-base";
import { useLocalObservable, observer } from "mobx-react-lite";
import Store from "./store";

export const Home: React.FC = observer(() => {
	const store = useLocalObservable(() => new Store());

	React.useEffect(
		() => {
			store.positionShelf.permissionLocationRequest();
			console.log("asdasd")
		},
		[store],
	);

	return (
		<View>
			<Heading>Climou!</Heading>
			{
				store.positionShelf.loader.isLoading
					? <Text>Um instante enquanto carregamos sua localização atual</Text>
					: !store.positionShelf.hasLocationPermission.value
						? (
							<Box>
								<Text> Houve um erro ao carregar sua localização atual</Text>
								<Button onPress={() => store.positionShelf.permissionLocationRequest()}> Clique aqui para tentar novamente </Button>
							</Box>
						)
						: (
							<Box>
								<Text>Sua localização atual: </Text>
								<Text>
									Latitude: {store.positionShelf.currentUserPosition.value?.coords.latitude}
								</Text>
								<Text>
									Longitude: {store.positionShelf.currentUserPosition.value?.coords.longitude}
								</Text>
								<Text>{JSON.stringify(store.positionShelf.currentUserPosition.value)}</Text>
							</Box>
						)
			}

			<Button onPress={() => store.positionShelf.permissionLocationRequest()}> Clique aqui para tentar novamente </Button>

		</View>
	);
});
