import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation
import CheckUserData from '../../hooks/auth/checkUserData';


export default function SignIn() {
  const navigation = useNavigation();  // Initialize useNavigation

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

   // Basic email validation regex
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };


  const handleSendOtp = () => {
    if (!email || !password ) {
      alert('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email');
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    setGeneratedOtp(otp);  // Store the generated OTP but don't show it directly
    setIsOtpSent(true);    // Indicate that OTP has been sent
    Alert.alert('OTP Sent', 'An OTP has been sent to your phone number. Please check and enter it below.');

    console.log(`Generated OTP: ${otp}`);
  };

  const handleVerifyOtp = async () => {
    if (otp === generatedOtp) {
        const formData = JSON.stringify({email, password});
        const response = await CheckUserData(formData)

        if(response.ok){
          Alert.alert("Logged in Successfully");
          navigation.navigate('Home')
        }
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

//   // Handle Sign In
//   const handleSignIn = () => {
//     // Example of handling sign in, navigate to home page after sign-in
//     console.log(`Email: ${email}, Password: ${password}`);
//     navigation.replace('signup'); // Navigate to home screen after successful login
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Sign You In</Text>

      <View style={styles.formContainer}>
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {isOtpSent ? (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter OTP"
                      placeholderTextColor="#A0A0A0"
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="numeric"
                    />
                    <TouchableOpacity onPress={handleVerifyOtp} style={styles.button}>
                      <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity onPress={handleSendOtp} style={styles.button}>
                    <Text style={styles.buttonText}>Send OTP</Text>
                  </TouchableOpacity>
                )}

        {/* Sign In Button
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity> */}
      </View>

      {/* Sign Up Link */}
      <View style={styles.signupLink}>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('SignUp')}  // Navigate to Sign Up page
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    marginTop: 0,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#000',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#777',
  },
  link: {
    color: '#4CAF50',
    fontWeight: '700',
  },
});
