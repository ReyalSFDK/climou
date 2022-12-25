import { makeAutoObservable } from "mobx";
import Geolocation from "react-native-geolocation-service";
import AttributeShelf from "./AttributeShelf";
import LoaderShelf from "./LoaderShelf";
import { PermissionsAndroid, PermissionStatus } from "react-native";

export default class PositionShelf {
	public grantedPermission = new AttributeShelf<PermissionStatus>("denied");
	public hasLocationPermission = new AttributeShelf(false);
	public currentUserPosition = new AttributeShelf<Geolocation.GeoPosition | null>(null);
	public requestPositionError = new AttributeShelf<Geolocation.GeoError | null>(null);
	public loader = new LoaderShelf();

	constructor() {
		makeAutoObservable(this);
	}

	public requestLocation = async () => {
		console.log("requestLocation");
		await Geolocation.getCurrentPosition(
			(position) => {
				console.log("pos", position);
				this.currentUserPosition.setValue(position);
			},
			(error) => {
				console.log("Err", error)
				this.requestPositionError.setValue(error);
			},
			{
				showLocationDialog: true,
				forceRequestLocation: true,
				enableHighAccuracy: true,
				timeout: 15000,
				maximumAge: 10000,
			}
		)
		console.log("FINISHED")
	}

	public permissionLocationRequest = async () => {
		this.loader.start();
		try {
			const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
			console.log(hasPermission, "hasPermission")

			if (!hasPermission) {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						title: "Precisamos da sua localização",
						message: "Para podermos retornar o clima atual do seu local, precisamos da permissão para pegar sua localização.",
						buttonPositive: "Beleza!",
						buttonNegative: "Não, obrigado...",
						buttonNeutral: "Talvez uma outra hora.",
					},
				);
				this.grantedPermission.setValue(granted);

				if (granted !== "granted") {
					return;
				}
			}

			this.hasLocationPermission.setValue(true);
			await this.requestLocation();
		} catch (e) {
			this.hasLocationPermission.setValue(false);
			console.log(e);
		} finally {
			this.loader.end();
		}
	}
}
