import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation
import StoreUserData from '../../hooks/auth/StoreUserData.js';

export default function SignUp() {
  const navigation = useNavigation();  // Replace useRouter with useNavigation

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Mock list of registered emails (for testing purposes)
  const registeredEmails = ['test@example.com', 'user1@domain.com'];

  // Basic email validation regex
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Phone number validation (basic check for length)
  const validatePhone = (phone) => {
    return phone.length === 10 && /^[0-9]+$/.test(phone);
  };

  const handleSendOtp = () => {
    if (!name || !email || !password || !confirmPassword || !phone) {
      alert('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email');
      return;
    }

    if (!validatePhone(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Check if the email is already registered
    if (registeredEmails.includes(email)) {
      alert('This email is already registered. Please use a different email.');
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    setGeneratedOtp(otp);  // Store the generated OTP but don't show it directly
    setIsOtpSent(true);    // Indicate that OTP has been sent
    Alert.alert('OTP Sent', 'An OTP has been sent to your phone number. Please check and enter it below.');

    console.log(`Generated OTP: ${otp}`);
  };

  const handleVerifyOtp =  async () => {
    if (otp === generatedOtp) {
      const formData = JSON.stringify({name, phone, email, password})
      console.log(formData);
      const response = await StoreUserData(formData)
      
      if (response.ok){
        Alert.alert("Signed Up Successfully, now you can log in"),
        navigation.navigate('SignIn')

      }
        
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Your Journey with Us!!</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#A0A0A0"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#A0A0A0"
          value={phone}
          keyboardType="numeric"
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={handleSendOtp} style={styles.button}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.signinLink}>
        <Text style={styles.signinText}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>  {/* Navigate to the SignIn screen */}
            Sign In
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
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
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
  signinLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signinText: {
    fontSize: 16,
    color: '#777',
  },
  link: {
    color: '#4CAF50',
    fontWeight: '700',
  },
});