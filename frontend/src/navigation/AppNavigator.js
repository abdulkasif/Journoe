const Stack = createStackNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/auth/SignupScreen.js";
import SignIn from "../screens/auth/SignInScreen.js";
import { HomeScreen } from "../screens/home/HomeScreen.js";


const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
   initialRouteName="SignIn"
  >
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export default AppNavigator;