import {
	View,
	Text,
	TextInput,
	ImageBackground,
	StyleSheet,
	SafeAreaView,
	ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import One from "../assets/1.jpg";
import Two from "../assets/2.png";
import Three from "../assets/3.jpg";
import Four from "../assets/4.jpg";
import Five from "../assets/5.jpg";
import Six from "../assets/6.png";
import Seven from "../assets/7.jpg";

const images = [One, Two, Three, Four, Five, Six, Seven];

const Home = () => {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState({});
	const [loading, setLoading] = useState(false);
	const [randomImages, setRandomImages] = useState(images[0]);

	const getWeather = async () => {
		if (!city.trim()) return;
		setLoading(true);
		try {
			const res = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b1ab697e41f684246aa6695e339b3b54`
			);
			setWeather(res.data);
			const n = Math.floor(Math.random() * images.length);
			setRandomImages(images[n]);
			setLoading(false);
		} catch (error) {
			alert("تأكد من اسم المدينة");
			setLoading(false);
		}
	};

	return (
		<ImageBackground
			source={randomImages}
			style={styles.image}
			imageStyle={{ opacity: 0.9 }}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.textInputContainer}>
					<TextInput
						style={styles.textInput}
						value={city}
						placeholder="اكتب مدينتك"
						onChangeText={(text) => setCity(text)}
					/>

					{loading ? (
						<ActivityIndicator size="small" color="#212121" />
					) : (
						<FontAwesome5
							onPress={getWeather}
							name="check"
							size={18}
							color="black"
						/>
					)}
				</View>

				{Object.keys(weather).length > 0 ? (
					<>
						<View style={styles.locationContainer}>
							<Text style={styles.location}>
								{weather.name} , {weather.sys.country}
							</Text>
						</View>

						<View style={styles.weatherContainer}>
							<Text style={styles.temp}>
								{Math.round(weather.main.temp)} °C{" "}
							</Text>
							<Text style={styles.weather}>{weather.weather[0].main}</Text>
						</View>
					</>
				) : null}
			</SafeAreaView>
		</ImageBackground>
	);
};

export default Home;

const styles = StyleSheet.create({
	image: {
		flex: 1,
	},
	textInputContainer: {
		backgroundColor: "rgba(255,255,255,0.7)",
		alignItems: "center",
		alignSelf: "center",
		marginTop: 30,
		borderRadius: 10,
		paddingHorizontal: 10,
		width: "60%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	textInput: {
		height: 40,
		fontWeight: "600",
	},
	locationContainer: {
		marginVertical: 15,
	},
	location: {
		color: "#FFFFFF",
		fontSize: 35,
		fontWeight: "500",
		textAlign: "center",
		textShadowColor: "rgba(0, 0, 0, 0.55)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 5,
	},
	weatherContainer: {
		alignItems: "center",
	},
	temp: {
		alignItems: "center",
		color: "#FFF",
		fontSize: 100,
		fontWeight: "800",
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		paddingVertical: 20,
		paddingHorizontal: 30,
		borderRadius: 30,
		overflow: "hidden",
		marginTop: 10,
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: -3, height: 3 },
		textShadowRadius: 10,
	},
	weather: {
		color: "#FFF",
		fontSize: 48,
		fontWeight: "700",
		shadowColor: "#000000",
		shadowOffset: { width: -1, height: 3 },
		shadowOpacity: 0.77,
	},
});
