import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { Link } from 'expo-router';
import {Ionicons} from "@expo/vector-icons";

const SignUpScreen = () => {
  const [email, setEmail] = useState('anthony.morah11@gmail.com');
  const [password, setPassword] = useState('••••••');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Azapal</Text>
        
        <Text style={styles.heading}>Create your account</Text>
        <Text style={styles.subheading}>Join thousands who trust Azapal for secure social commerce transactions.</Text>
        
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-tiktok" size={24} color="#333" />

          <Text style={styles.socialButtonText}>Continue with TikTok</Text>
        </TouchableOpacity>
        
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with email</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
              <View style={styles.eyeIcon}>
                <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>first name</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>last name</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Signup</Text>
        </TouchableOpacity>
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <Link href="/">
            <Text style={styles.signupLink}>Login</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F15A24',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign:"center"
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    width: '100%',
    marginBottom: 20,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    backgroundColor: '#f5f8ff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f5f8ff',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    padding: 12,
  },
  loginButton: {
    backgroundColor: '#F15A24',
    borderRadius: 8,
    padding: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#333',
  },
  signupLink: {
    color: '#F15A24',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;