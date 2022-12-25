import { PermissionsAndroid } from "react-native";

export const permissionLocationRequest = async (onRequestPermisionCallback: () => Promise<void>) => {
	const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

	if (!hasPermission) {
		const hasGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

		if (hasGranted === "denied") {
			throw new Error("Location Permission denied.");
		}
	}

	await onRequestPermisionCallback();
}
