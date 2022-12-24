import { makeAutoObservable } from "mobx";
import Geolocation from "react-native-geolocation-service";
import AttributeShelf from "./AttributeShelf";
import LoaderShelf from "./LoaderShelf";

export default class PositionShelf {
	public currentUserPosition = new AttributeShelf<Geolocation.GeoPosition | null>(null);
	public requestPositionError = new AttributeShelf<Geolocation.GeoError | null>(null);
	public loader = new LoaderShelf();

	constructor() {
		makeAutoObservable(this);
	}

	public requestLocation = async () => {
		this.loader.start();
		await Geolocation.getCurrentPosition(
			(position) => {
				console.log(position);
				this.currentUserPosition.setValue(position);
				this.loader.end();
			},
			(error) => {
				console.log(error)
				this.requestPositionError.setValue(error);
				this.loader.end();
			},
			{
				showLocationDialog: true,
				forceRequestLocation: true,
			}
		)
	}
}
