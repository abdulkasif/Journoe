const Stack = createStackNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignupScreen";
import SignIn from "../screens/SignInScreen";


const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
   initialRouteName="SignIn"
  >
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SignIn" component={SignIn} />
     
  </Stack.Navigator>
);

export default AppNavigator;