import * as React from "react";
import { NativeBaseProvider } from "native-base";

import { Home } from "./Screens/Home";

const App: React.FC = () => {
	return (
		<NativeBaseProvider>
			<Home />
		</NativeBaseProvider>
	)
}

export default App;
